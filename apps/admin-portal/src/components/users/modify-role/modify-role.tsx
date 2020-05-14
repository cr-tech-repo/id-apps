/**
 * Copyright (c) 2020, cic Inc. (http://www.cic.org) All Rights Reserved.
 *
 * cic Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {ReactElement, useCallback, useEffect, useState} from "react";
import { Grid, Icon, Input, Label, List, Message, Segment } from "semantic-ui-react";
import _ from "lodash";
import {AlertInterface, AlertLevels, BasicProfileInterface} from "../../../models";
import {Groups} from "../../../models/groups";
import {addUserRole, getUserDetails} from "../../../api";
import {useDispatch} from "react-redux";
import { useTranslation } from "react-i18next";

/**
 * Proptypes for the application consents list component.
 */
interface ModifyUserRoleProps {
    onAlertFired: (alert: AlertInterface) => void;
    user: BasicProfileInterface;
    setUser: (userInfo: BasicProfileInterface) => void;
    rolesList: Array<Groups>;
    setRolesList;
}
/**
 * User role component.
 *
 * @return {JSX.Element}
 */
export const ModifyUserRole: React.FunctionComponent<ModifyUserRoleProps> = (props: ModifyUserRoleProps): ReactElement => {
    const {  onAlertFired, user, setUser, rolesList, setRolesList  } = props;
    const [ effectiveRoleList, setEffectiveRoleList ] = useState([]);
    const [ userRoleList, setUserRoleList ] = useState([]);
    const [ duplicationError, setError ] = useState();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const tempArrayList: Array<Groups> = user.groups as Array<Groups>;
        if (tempArrayList ) {
            setUserRoleList(tempArrayList);
                for (const role of rolesList) {
                    if (!tempArrayList.find(item => item.id === role.id))
                        if (!effectiveRoleList.find(effectiveRole => effectiveRole.id === role.id)) {
                            effectiveRoleList.push(role);
                        }
                }
                setEffectiveRoleList(effectiveRoleList);
            }
    }, []);

    useEffect( () => {
        getUserDetails(user.id)
            .then((response) => {
            if (response.status === 200) {
                setUser(response.data);
            }
        });
    }, [effectiveRoleList]);


    const handleRemoveRoleItem = (role: any) => {
        const data = {
            Operations: [
                {
                    op: "remove",
                    path: "members[value eq \""+user.id+"\"]"
                }
            ],
            schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        };

        addUserRole(data, role.id)
            .then((response) => {
                if (response.status === 204) {
                    if (!(effectiveRoleList.includes(role))) {
                        setEffectiveRoleList([ ...effectiveRoleList, role ]);
                        const userRolesCopy = [ ...userRoleList ];
                        userRolesCopy.splice(userRoleList.indexOf(role), 1);
                        setUserRoleList(userRolesCopy);
                    }
                }
            })
            .catch((error) => {
                if (!error.response || error.response.status === 401) {
                    dispatch(onAlertFired({
                        description: t(
                            "views:components.users.notifications.addUser.error.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.users.notifications.addUser.error.message"
                        )
                    }));
                } else if (error.response && error.response.data && error.response.data.detail) {

                    dispatch(onAlertFired({
                        description: t(
                            "views:components.users.notifications.addUser.error.description",
                            { description: error.response.data.detail }
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.users.notifications.addUser.error.message"
                        )
                    }));
                } else {
                    // Generic error message
                    dispatch(onAlertFired({
                        description: t(
                            "views:components.users.notifications.addUser.genericError.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.users.notifications.addUser.genericError.message"
                        )
                    }));
                }
            });
    };

    /**
     * This function handles assigning the roles to the user.
     */
    const assignUserRole = (role: any) => {
        const data = {
            Operations: [
                {
                    op: "add",
                    path: "members",
                    value: [{
                        type: "user",
                        value: user.id
                    }]
                }
            ],
            schemas: ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
        };

    addUserRole(data, role.id)
        .then((response) => {
            if (response.status === 204) {
                if (!(userRoleList.includes(role))) {
                    setUserRoleList([ ...userRoleList, role ]);
                    const userRolesCopy = [ ...effectiveRoleList ];
                    userRolesCopy.splice(userRoleList.indexOf(role), 1);
                    setEffectiveRoleList(userRolesCopy);
                }
            }
        })
        .catch((error) => {
            if (!error.response || error.response.status === 401) {
                dispatch(onAlertFired({
                    description: t(
                        "views:components.users.notifications.addUser.error.description"
                    ),
                    level: AlertLevels.ERROR,
                    message: t(
                        "views:components.users.notifications.addUser.error.message"
                    )
                }));
            } else if (error.response && error.response.data && error.response.data.detail) {

                dispatch(onAlertFired({
                    description: t(
                        "views:components.users.notifications.addUser.error.description",
                        { description: error.response.data.detail }
                    ),
                    level: AlertLevels.ERROR,
                    message: t(
                        "views:components.users.notifications.addUser.error.message"
                    )
                }));
            } else {
                // Generic error message
                dispatch(onAlertFired({
                    description: t(
                        "views:components.users.notifications.addUser.genericError.description"
                    ),
                    level: AlertLevels.ERROR,
                    message: t(
                        "views:components.users.notifications.addUser.genericError.message"
                    )
                }));
            }
        });
    };

    const handleSearchFieldChange = (e, { value }) => {
        let isMatch = false;
        const filteredRoleList = [];

        if (!_.isEmpty(value)) {
            const re = new RegExp(_.escapeRegExp(value), 'i');

            effectiveRoleList && effectiveRoleList.map((role) => {
                isMatch = re.test(role.displayName);
                if (isMatch) {
                    filteredRoleList.push(role);
                    setEffectiveRoleList(filteredRoleList);
                }
            });
        } else {
            setEffectiveRoleList(rolesList);
        }
    };

    return (
            <Grid>
                <Grid.Row columns={ 2 }>
                    <Grid.Column>
                        <Grid.Row columns={ 1 } className={ "urlComponentLabelRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                                <label>Assigned roles</label>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                                <Segment className={ "user-assigned-roles-segment" }>
                                    {
                                        userRoleList && userRoleList.map((role, index) => {
                                            return (
                                                <Label key={ index }>
                                                    { role.displayName }
                                                    <Icon
                                                        name="delete"
                                                        onClick={ () => handleRemoveRoleItem(role) }
                                                    />
                                                </Label>
                                            );
                                        })
                                    }
                                </Segment>
                                {
                                    duplicationError && (
                                        <Message negative>
                                            <p>
                                                { duplicationError }
                                            </p>
                                        </Message>
                                    )
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row columns={ 2 }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                                <label>Roles list</label>
                            </Grid.Column>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                                <Input
                                    icon={ <Icon name="search"/> }
                                    fluid
                                    onChange={ handleSearchFieldChange }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={ 2 }>
                            <Grid.Column>
                                <Segment className={ "user-role-list-segment" }>
                                    <List className={ "user-role-list" }>
                                        {
                                            effectiveRoleList &&
                                        effectiveRoleList.map((role, index) =>{
                                            return (
                                                <List.Item
                                                    key={ index }
                                                    className={ "user-role-list-item" }
                                                    onClick={ () => assignUserRole(role) }
                                                >
                                                    { role.displayName }
                                                    <Icon
                                                        name="add"
                                                    />
                                                </List.Item>
                                            )
                                        })
                                        }
                                    </List>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
    );
};
