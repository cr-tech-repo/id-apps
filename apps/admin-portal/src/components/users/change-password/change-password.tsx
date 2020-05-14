/**
 * Copyright (c) 2019, cic Inc. (http://www.cic.org) All Rights Reserved.
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

import { Field, Forms, useTrigger, Validation } from "@cicis/forms";
import React, { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Divider, Form, Modal } from "semantic-ui-react";
import { SettingsSectionIcons } from "../../../configs";
import { AlertInterface, AlertLevels } from "../../../models";
import { EditSection, SettingsSection } from "../../shared"
import {BasicProfileInterface} from "../../../models";
import {deleteUser, updateUserPassword} from "../../../api";
import {DangerZone, DangerZoneGroup} from "@cicis/react-components";
import {history} from "../../../helpers";

/**
 * Constant to store the change password from identifier.
 * @type {string}
 */
const CHANGE_PASSWORD_FORM_IDENTIFIER: string = "changePasswordForm";

/**
 * Prop types for the change password component.
 */
interface ChangePasswordProps {
    onAlertFired: (alert: AlertInterface) => void;
    user: BasicProfileInterface;
    setUser: (userInfo: BasicProfileInterface) => void;
}

/**
 * Change password component.
 *
 * @param {ChangePasswordProps} props - Props injected to the change password component.
 * @return {JSX.Element}
 */
export const ChangePassword: FunctionComponent<ChangePasswordProps> = (props: ChangePasswordProps): JSX.Element => {
    const { onAlertFired, user } = props;
    const [errors, setErrors] = useState({
        confirmPassword: "",
        currentPassword: "",
        newPassword: ""
    });
    const [editingForm, setEditingForm] = useState({
        [CHANGE_PASSWORD_FORM_IDENTIFIER]: false
    });
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [reset, resetForm] = useTrigger();

    const { t } = useTranslation();

    /**
     * Handles the `onSubmit` event of forms.
     *
     * @param {string} formName - Name of the form
     */
    const handleSubmit = (formName: string): void => {
        setShowConfirmationModal(true);
    };

    /**
     * Calls the API and updates the user password.
     */
    const changePassword = (newPassword) => {

        updateUserPassword(user.id,newPassword).then((response) => {
            if (response.status === 204) {
                    // reset the form.
                    resetForm();
                    // hide the change password form
                    hideFormEditView(CHANGE_PASSWORD_FORM_IDENTIFIER);

                    onAlertFired({
                        description: t(
                            "views:components.changePassword.forms.passwordResetForm.validations.submitSuccess." +
                            "description"
                        ),
                        level: AlertLevels.SUCCESS,
                        message: t(
                            "views:components.changePassword.forms.passwordResetForm.validations.submitSuccess.message"
                        )
                    });
                }
            })
            .catch((error) => {
                // Axios throws a generic `Network Error` for 401 status.
                // As a temporary solution, a check to see if a response
                // is available has be used.
                if (!error.response || error.response.status === 400) {
                    // set an error in the current password field.
                    setErrors({
                        ...errors,
                        currentPassword: t(
                            "views:components.changePassword.forms.passwordResetForm.inputs.currentPassword." +
                            "validations.invalid"
                        )
                    });

                    onAlertFired({
                        description: t(
                            "views:components.changePassword.forms.passwordResetForm.validations." +
                            "submitError.description",
                            { description: error.response.data.detail }
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.changePassword.forms.passwordResetForm.validations." +
                            "invalidCurrentPassword.message"
                        )
                    });
                } else if (error.response && error.response.data && error.response.data.detail) {
                    // reset the form.
                    resetForm();
                    // hide the change password form
                    hideFormEditView(CHANGE_PASSWORD_FORM_IDENTIFIER);

                    onAlertFired({
                        description: t(
                            "views:components.changePassword.forms.passwordResetForm.validations." +
                            "submitError.description",
                            { description: error.response.data.detail }
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.changePassword.forms.passwordResetForm.validations.submitError.message"
                        )
                    });
                } else {
                    // reset the form.
                    resetForm();
                    // hide the change password form
                    hideFormEditView(CHANGE_PASSWORD_FORM_IDENTIFIER);

                    // Generic error message
                    onAlertFired({
                        description: t(
                            "views:components.changePassword.forms.passwordResetForm.validations." +
                            "genericError.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "views:components.changePassword.forms.passwordResetForm.validations.genericError.message"
                        )
                    });
                }
            });
        // Close the modal
        setShowConfirmationModal(false);
    };

    /**
     * This function handles deletion of the user.
     *
     * @param userId
     */
    const handleUserDelete = (userId: string): void => {
        deleteUser(userId)
            .then(() => {
                onAlertFired({
                    description: t(
                        "views:components.users.notifications.deleteUser.success.description"
                    ),
                    level: AlertLevels.SUCCESS,
                    message: t(
                        "views:components.users.notifications.deleteUser.success.message"
                    )
                });
                history.push("/users");
            });
    };

    /**
     * Handle the confirmation modal close event.
     */
    const handleConfirmationModalClose = (): void => {
        setShowConfirmationModal(false);
    };

    /**
     * Handles the onClick event of the edit button.
     *
     * @param formName - Name of the form
     */
    const showFormEditView = (formName: string): void => {
        setEditingForm({
            ...editingForm,
            [formName]: true
        });
    };

    /**
     * Handles the onClick event of the cancel button.
     *
     * @param formName - Name of the form
     */
    const hideFormEditView = (formName: string): void => {
        setEditingForm({
            ...editingForm,
            [formName]: false
        });
    };

    const confirmationModal = (
        <Modal size="mini" open={ showConfirmationModal } onClose={ handleConfirmationModalClose } dimmer="blurring">
            <Modal.Content>
                <Container>
                    <h3>{ t("views:components.changePassword.modals.confirmationModal.heading") }</h3>
                </Container>
                <Divider hidden={ true } />
                <p>{ t("views:components.changePassword.modals.confirmationModal.message") }</p>
            </Modal.Content>
            <Modal.Actions>
                <Button className="link-button" onClick={ handleConfirmationModalClose }>
                    { t("common:cancel") }
                </Button>
                <Button primary={ true } onClick={ changePassword }>
                    { t("common:continue") }
                </Button>
            </Modal.Actions>
        </Modal>
    );

    const showChangePasswordView = editingForm[CHANGE_PASSWORD_FORM_IDENTIFIER] ? (
        <EditSection>
            <Forms
                onSubmit={ (value) => {
                    changePassword(value.get("newPassword").toString())
                } }
                resetState={ reset }
            >
                <Field
                    hidePassword={ t("common:hidePassword") }
                    label={ t(
                        "views:components.changePassword.forms.passwordResetForm.inputs" + ".newPassword.label"
                    ) }
                    name="newPassword"
                    placeholder={ t(
                        "views:components.changePassword.forms.passwordResetForm.inputs." +
                        "newPassword.placeholder"
                    ) }
                    required={ true }
                    requiredErrorMessage={ t(
                        "views:components.changePassword.forms.passwordResetForm." +
                        "inputs.newPassword.validations.empty"
                    ) }
                    showPassword={ t("common:showPassword") }
                    type="password"
                    width={ 9 }
                />
                <Field
                    hidePassword={ t("common:hidePassword") }
                    label={ t(
                        "views:components.changePassword.forms.passwordResetForm.inputs" + ".confirmPassword.label"
                    ) }
                    name="confirmPassword"
                    placeholder={ t(
                        "views:components.changePassword.forms.passwordResetForm.inputs." +
                        "confirmPassword.placeholder"
                    ) }
                    required={ true }
                    requiredErrorMessage={ t(
                        "views:components.changePassword.forms.passwordResetForm." +
                        "inputs.confirmPassword.validations.empty"
                    ) }
                    showPassword={ t("common:showPassword") }
                    type="password"
                    validation={ (value: string, validation: Validation, formValues) => {
                        if (formValues.get("newPassword") !== value) {
                            validation.isValid = false;
                            validation.errorMessages.push(
                                t(
                                    "views:components.changePassword.forms.passwordResetForm.inputs" +
                                    ".confirmPassword.validations.mismatch"
                                )
                            );
                        }
                    } }
                    width={ 9 }
                />
                <Field
                    hidden={ true }
                    type="divider"
                />
                <Form.Group>
                    <Field
                        size="small"
                        type="submit"
                        value={ t("common:submit").toString() }
                    />
                    <Field
                        className="link-button"
                        onClick={ () => {
                            hideFormEditView(CHANGE_PASSWORD_FORM_IDENTIFIER);
                        } }
                        size="small"
                        type="button"
                        value={ t("common:cancel").toString() }
                    />
                </Form.Group>

            </Forms>
        </EditSection>
    ) : null;

    return (
        <>
        <SettingsSection
            description={ t("views:sections.changePassword.description") }
            header={ t("views:sections.changePassword.heading") }
            icon={ SettingsSectionIcons.changePassword }
            iconMini={ SettingsSectionIcons.changePasswordMini }
            iconSize="auto"
            iconStyle="colored"
            iconFloated="right"
            onPrimaryActionClick={ () => showFormEditView(CHANGE_PASSWORD_FORM_IDENTIFIER) }
            primaryAction={ t("views:sections.changePassword.actionTitles.change") }
            primaryActionIcon="key"
            showActionBar={ !editingForm[CHANGE_PASSWORD_FORM_IDENTIFIER] }
        >
            { showChangePasswordView }
            { confirmationModal }
        </SettingsSection>

        <Divider hidden />
        <DangerZoneGroup sectionHeader="Danger Zone">
            <DangerZone
                actionTitle="Delete user"
                header="Delete the user"
                subheader="This action is irreversible. Please proceed with caution."
                onActionClick={ () => handleUserDelete(user.id) }
            />
        </DangerZoneGroup>
    </>

    );
};
