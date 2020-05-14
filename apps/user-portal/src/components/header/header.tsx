/**
 * Copyright (c) 2019, cic (http://www.cic.org) All Rights Reserved.
 *
 * cic licenses this file to you under the Apache License,
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

import _ from "lodash";
import React, {SyntheticEvent, useContext, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {Link, NavLink} from "react-router-dom";
import {
    Button,
    Container,
    Divider,
    Dropdown,
    Icon,
    Item,
    Menu,
    Placeholder,
    Responsive
} from "semantic-ui-react";
import { getGravatarImage, switchAccount } from "../../api";
import {GlobalConfig, SidePanelIcons} from "../../configs";
import {AppConfig, resolveUserDisplayName, resolveUsername} from "../../helpers";
import { AlertLevels, AuthStateInterface, LinkedAccountInterface } from "../../models";
import { AppState } from "../../store";
import { addAlert, getProfileInformation, getProfileLinkedAccounts } from "../../store/actions";
import {ThemeIcon, Title, UserAvatar} from "../shared";
import {filteredRoutes, hasScope} from "../../utils";
import * as UIConstants from "../../constants/ui-constants";
import * as ApplicationConstants from "../../constants/application-constants";
import {SidePanelMobile} from "../side-panel/side-panel-mobile";

/**
 * Header component prop types.
 */
interface HeaderProps {
    onSidePanelToggleClick?: () => void;
    showSidePanelToggle?: boolean;
    type: "desktop" | "mobile";
    headerHeight: number;
    onSidePanelItemClick: () => void;
}

/**
 * Header component.
 *
 * @param {HeaderProps} props - Props supplied to the header component.
 * @return {JSX.Element}
 */
export const Header: React.FunctionComponent<HeaderProps> = (props: HeaderProps): JSX.Element => {
    const isApplicationsPageVisible = useSelector((state: AppState) => state.global.isApplicationsPageVisible);
    const activeRoute = (path: string) => {
        const pathname = window.location.pathname;
        const urlTokens = path.split("/");
        return pathname.indexOf(urlTokens[ 1 ]) > -1 ? "active" : "";
    };
    const appConfig = useContext(AppConfig);
    const { t } = useTranslation();
    const { onSidePanelToggleClick, showSidePanelToggle, type, headerHeight, onSidePanelItemClick } = props;
    const profileDetails: AuthStateInterface = useSelector((state: AppState) => state.authenticationInformation);
    const linkedAccounts: LinkedAccountInterface[] = useSelector((state: AppState) => state.profile.linkedAccounts);
    const isProfileInfoLoading: boolean = useSelector((state: AppState) => state.loaders.isProfileInfoLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        if (_.isEmpty(profileDetails)) {
            dispatch(getProfileInformation());
        }

       /* if (_.isEmpty(linkedAccounts)) {
            dispatch(getProfileLinkedAccounts());
        }*/
    }, []);

    const trigger = (
        <span className="user-dropdown-trigger">
                {/*<div className="username" style = {display = inline}>
                    {
                    isProfileInfoLoading
                        ? (
                            <Placeholder>
                                <Placeholder.Line />
                            </Placeholder>
                        )
                        : resolveUserDisplayName(profileDetails)
                }
                </div>*/}
            <UserAvatar isLoading={ isProfileInfoLoading } authState={ profileDetails } size="mini" />
        </span>
    );

    /**
     * Stops the dropdown from closing on click.
     *
     * @param { React.SyntheticEvent<HTMLElement> } e - Click event.
     */
    const handleUserDropdownClick = (e: SyntheticEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    const style = type === "desktop"
        ? {
            position: "sticky",
            top: `${ headerHeight + UIConstants.DESKTOP_CONTENT_TOP_PADDING }px`
        }
        : null;

    /**
     * Validates if the side panel item should be displayed.
     *
     * @param {string} path - specific route.
     * @return {boolean}
     */
    const validateSidePanelVisibility = (path: string): boolean => {
        if (path === ApplicationConstants.APPLICATIONS_PAGE_PATH) {
            return isApplicationsPageVisible;
        }
        return true;
    };

    /**
     * Handles the account switch click event.
     *
     * @param { LinkedAccountInterface } account - Target account.
     */
    const handleLinkedAccountSwitch = (account: LinkedAccountInterface) => {
        switchAccount(account)
            .then(() => {
                // reload the page on successful account switch.
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.detail) {
                    dispatch(
                        addAlert({
                            description: t(
                                "views:components.linkedAccounts.notifications.switchAccount.error.description",
                                { description: error.response.data.detail }
                            ),
                            level: AlertLevels.ERROR,
                            message: t(
                                "views:components.linkedAccounts.notifications.switchAccount.error.message"
                            )
                        })
                    );

                    return;
                }

                dispatch(
                    addAlert({
                        description: t(
                            "views:components.linkedAccounts.notifications.switchAccount.genericError.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.linkedAccounts.notifications.switchAccount.genericError.message"
                        )
                    })
                );
            });
    };

    return (
        <Menu id="app-header" className="app-header" fixed="top" borderless>
            <Container>
                { showSidePanelToggle ?
                    (
                        <Responsive as={ Menu.Item } maxWidth={ Responsive.onlyComputer.minWidth }>
                            <Icon name="bars" size="large" onClick={ onSidePanelToggleClick } link />
                        </Responsive>
                    )
                    : null
                }
{/*
                <Responsive minWidth={ Responsive.onlyMobile.minWidth }>
*/}
                    <Menu.Item as={ Link } to={ GlobalConfig.appHomePath } header>
                        <Title style={ { marginTop: 0 } } />
                    </Menu.Item>
{/*
                </Responsive>
*/}
                {
                    filteredRoutes(appConfig).map((route, index) => (
                        (route.showOnSidePanel
                            && (route.scope ? hasScope(route.scope) : true)
                            && validateSidePanelVisibility(route.path))
                            ? (
                                <Responsive as={ Menu.Item }  minWidth={ Responsive.onlyComputer.minWidth } className={ "side-panel-item" }>
                                    <Menu.Menu className={ `side-panel ${ type }` }  fluid>
                                    <Menu.Item
                                        as={ NavLink }
                                        to={ route.path }
                                        name={ route.name }
                                        className={  `side-panel-item ${ activeRoute(route.path) }`  }
                                        active={ activeRoute(route.path) === "active" }
                                        onClick={ onSidePanelItemClick }
                                        key={ index }

                                    >
                                        <ThemeIcon
                                            icon={ SidePanelIcons[ route.icon ] }
                                            size="micro"
                                            floated="left"
                                            spaced="right"
                                            transparent
                                        />
                                        <span className="route-name">{ t(route.name) }</span>
                                    </Menu.Item>
                                    </Menu.Menu>
                                </Responsive>
                            )
                            : null
                    ))
                }
                { (
                    <Menu.Menu position="right">

                        <Dropdown
                            item
                            trigger={ trigger }
                            floating
                            icon={ null }
                            className="user-dropdown"
                        >
                            <Dropdown.Menu onClick={ handleUserDropdownClick }>
                                <Item.Group className="authenticated-user" unstackable>
                                    <Item
                                        className="header"
                                        key={ `logged-in-user-${profileDetails.profileInfo.userName}` }
                                    >
                                        <UserAvatar
                                            authState={ profileDetails }
                                            isLoading={ isProfileInfoLoading }
                                            size="tiny"
                                        />
                                        <Item.Content verticalAlign="middle">
                                            <Item.Description>
                                                < div className="name">
                                                    {
                                                        isProfileInfoLoading
                                                            ? <Placeholder><Placeholder.Line /></Placeholder>
                                                            : resolveUserDisplayName(profileDetails)
                                                    }
                                                </div>

                                                {
                                                    (profileDetails.profileInfo.emails !== undefined
                                                        && profileDetails.profileInfo.emails !== null)
                                                    && (
                                                        <div className="email">
                                                            { isProfileInfoLoading
                                                                ? <Placeholder><Placeholder.Line /></Placeholder>
                                                                : typeof profileDetails.profileInfo
                                                                    .emails[0] === "string"
                                                                    ? profileDetails.profileInfo.emails[0]
                                                                    : typeof profileDetails.profileInfo
                                                                        .emails[0] === "object"
                                                                        ? profileDetails.profileInfo.emails[0].value
                                                                        : ""
                                                            }
                                                        </div>
                                                    )
                                                }
                                                <Divider hidden />
                                                <Button
                                                    as={ Link }
                                                    to="/personal-info"
                                                    size="tiny"
                                                    primary
                                                >
                                                    { t("common:personalInfo") }
                                                </Button>
                                            </Item.Description>
                                        </Item.Content>
                                    </Item>
                                </Item.Group>
                                <Dropdown.Divider />
                                {
                                    (linkedAccounts && linkedAccounts.length && linkedAccounts.length > 0)
                                        ? (
                                            <Item.Group className="linked-accounts-list" unstackable>
                                                {
                                                    linkedAccounts.map((association, index) => (
                                                        <Item
                                                            className="linked-account"
                                                            key={ `${association.userId}-${index}` }
                                                            onClick={
                                                                () => handleLinkedAccountSwitch(association)
                                                            }
                                                        >
                                                            <UserAvatar
                                                                bordered
                                                                avatar
                                                                size="little"
                                                                image={
                                                                    association.email
                                                                    && getGravatarImage(association.email)
                                                                }
                                                                name={ association.username }
                                                            />
                                                            <Item.Content verticalAlign="middle">
                                                                <Item.Description>
                                                                    <div className="name">
                                                                        {
                                                                            resolveUsername(
                                                                                association.username,
                                                                                association.userStoreDomain
                                                                            )
                                                                        }
                                                                    </div>
                                                                    <div className="email">
                                                                        { association.tenantDomain }
                                                                    </div>
                                                                </Item.Description>
                                                            </Item.Content>
                                                        </Item>
                                                    ))
                                                }
                                            </Item.Group>
                                        )
                                        : null
                                }
                                <Dropdown.Item className="action-panel">
                                    <Link className="action-button" to={ APP_LOGOUT_PATH }>
                                        { t("common:logout") }
                                    </Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                ) }
            </Container>
        </Menu>
    );
};

/**
 * Default prop types for the header component.
 */
Header.defaultProps = {
    onSidePanelToggleClick: () => null,
    showSidePanelToggle: true
};
