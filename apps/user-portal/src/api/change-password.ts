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

import { AuthenticateSessionUtil, AuthenticateUserKeys } from "@cicis/authentication";
import { AxiosHttpClient } from "@cicis/http";
import { ServiceResourcesEndpoint } from "../configs";
import { HttpMethods } from "../models";
import {GlobalConfig} from "../../../admin-portal/src/configs";
import {getAccessToken, getAllSessionParameters, getSessionParameter} from "@cicis/authentication/src/actions/session";
import {ACCESS_TOKEN} from "@cicis/authentication/src/constants";

/**
 * Get an axios instance.
 *
 * @type {AxiosHttpClientInstance}
 */
const httpClient = AxiosHttpClient.getInstance();

/**
 * Updates the user's password.
 *
 * @param {string} currentPassword currently registered password.
 * @param {string} newPassword newly assigned password.
 * @return {Promise<any>} a promise containing the response.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const updatePassword = (currentPassword: string, newPassword: string): Promise<any> => {
    // We're currently using basic auth to validate the current password. If the password is
    // different, the server responds with a status code `401`. The callbacks handle 401 errors and
    // terminates the session. To bypass the callbacks disable the handler when the client is initialized.
    // TODO: Remove this once the API supports current password validation.
    httpClient.disableHandler();

    const requestConfig = {
        data:
            {
            newPassword: newPassword,
            currentPassword: currentPassword,
            'urn:ietf:params:scim:schemas:extension:ibm:2.0:Notification': {
                notifyType: "EMAIL",
                notifyPassword: false
            },
            schemas: [
                "urn:ietf:params:scim:schemas:ibm:core:2.0:ChangePassword",
                "urn:ietf:params:scim:schemas:extension:ibm:2.0:Notification"
            ]
        },
        headers: {
            "Content-Type": "application/scim+json",
            "Accept": "*/*",
            "Authorization": "Bearer "+getSessionParameter(ACCESS_TOKEN)
        },
        method: HttpMethods.POST,
        url: ServiceResourcesEndpoint.me+"/password"
    };

    return httpClient.request(requestConfig)
        .then((response) => {
            if (response.status !== 204) {
                return Promise.reject("Failed to update password.");
            }
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        })
        .finally(() => {
            // TODO: Remove this once the API supports current password validation.
            httpClient.enableHandler();
        });
};
