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

import { GlobalConfig } from "./globals";

interface ServiceResourcesType {
    applications: string;
    associations: string;
    authorize: string;
    challenges: string;
    challengeAnswers: string;
    consents: string;
    federatedAssociations: string;
    fidoEnd: string;
    fidoMetaData: string;
    fidoStart: string;
    fidoStartUsernameless: string;
    issuer: string;
    jwks: string;
    logout: string;
    me: string;
    pendingApprovals: string;
    profileSchemas: string;
    receipts: string;
    sessions: string;
    token: string;
    totp: string;
    smsotp: string;
    emailotp: string;
    totpSecret: string;
    user: string;
    revoke: string;
    wellKnown: string;
}

export const ServiceResourcesEndpoint: ServiceResourcesType = {
    applications: `${GlobalConfig.serverHost}/v1.0/user/applications`,
    associations: `${GlobalConfig.serverHost}/api/users/v1/me/associations`,
    authorize: `${GlobalConfig.serverHost}/oidc/endpoint/default/authorize`,
    challengeAnswers: `${GlobalConfig.serverHost}/v2.0/factors/questions`,
    challenges: `${GlobalConfig.serverHost}/factors/v2.0/factors/discover`,
    consents: `${GlobalConfig.serverHost}/v1.0/appconsents`,
    federatedAssociations: `${GlobalConfig.serverHost}/api/users/v1/me/federated-associations`,
    fidoEnd: `${GlobalConfig.serverHost}/api/users/v2/me/webauthn/finish-registration`,
    fidoMetaData: `${GlobalConfig.serverHost}/v2.0/factors/fido2/registrations`,
    fidoStart: `${GlobalConfig.serverHost}/api/users/v2/me/webauthn/start-registration`,
    fidoStartUsernameless: `${GlobalConfig.serverHost}/api/users/v2/me/webauthn/start-usernameless-registration`,
    issuer: `${GlobalConfig.serverHost}/oidc/endpoint/default`,
    jwks: `${GlobalConfig.serverHost}/oidc/endpoint/default/jwks`,
    logout: `${GlobalConfig.serverHost}/oidc/logout`,
    me: `${GlobalConfig.serverHost}/v2.0/Me`,
    pendingApprovals: `${GlobalConfig.serverHost}/api/users/v1/me/approval-tasks`,
    profileSchemas: `${GlobalConfig.serverHost}/v2.0/Schema/attributes`,
    receipts: `${GlobalConfig.serverHost}/api/identity/consent-mgt/v1.0/consents/receipts`,
    revoke: `${GlobalConfig.serverHost}/oidc/endpoint/default/revoke`,
    sessions: `${GlobalConfig.serverHost}/v1.0/usergrants`,
    token: `${GlobalConfig.serverHost}/oidc/endpoint/default/token`,
    totp: `${GlobalConfig.serverHost}/v1.0/authnmethods/totp`,
    smsotp: `${GlobalConfig.serverHost}/v1.0/authnmethods/smsotp`,
    emailotp: `${GlobalConfig.serverHost}/v1.0/authnmethods/smsotp`,
    totpSecret: `${GlobalConfig.serverHost}/api/users/v1/me/totp/secret`,
    user: `${GlobalConfig.serverHost}/v2.0/Me`,
    wellKnown: `${GlobalConfig.serverHost}/oidc/endpoint/default/.well-known/openid-configuration`
};
