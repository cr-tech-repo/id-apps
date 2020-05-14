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

import { GlobalConfig } from "./globals";

interface ServiceResourcesType {
    applications: string;
    associations: string;
    authorize: string;
    challenges: string;
    challengeAnswers: string;
    consents: string;
    groups: string;
    claims: string;
    externalClaims: string;
    identityProviders: string;
    issuer: string;
    jwks: string;
    localClaims: string;
    logout: string;
    me: string;
    permission: string;
    profileSchemas: string;
    sessions: string;
    token: string;
    user: string;
    users: string;
    userStores: string;
    revoke: string;
    wellKnown: string;
}

export const ServiceResourcesEndpoint: ServiceResourcesType = {
    applications: `${GlobalConfig.serverHost}/v1.0/applications`,
    associations: `${GlobalConfig.serverHost}/api/users/v1.0/me/associations`,
    authorize: `${GlobalConfig.serverHost}/oidc/endpoint/default/authorize`,
    challengeAnswers: `${GlobalConfig.serverHost}/api/users/v1/me/challenge-answers`,
    challenges: `${GlobalConfig.serverHost}/api/users/v1/me/challenges`,
    claims: `${GlobalConfig.serverHost}/v1.0/grants`,
    consents: `${GlobalConfig}/v1.0/consents`,
    externalClaims:`${GlobalConfig.serverHost}/v1.0/grants`,
    groups: `${GlobalConfig.serverHost}/v2.0/Groups`,
    identityProviders: `${GlobalConfig.serverHost}/api/server/v1/identity-providers`,
    issuer: `${GlobalConfig.serverHost}/oauth2/token`,
    jwks: `${GlobalConfig.serverHost}/oauth2/jwks`,
    localClaims: `${GlobalConfig.serverHost}/v1.0/grants`,
    logout: `${GlobalConfig.serverHost}/oidc/logout`,
    me: `${GlobalConfig.serverHost}/v2.0/Me`, // TODO: Remove this endpoint and use ID token to get the details
    permission: `${GlobalConfig.serverHost}/api/server/v1/permission-management/permissions`,
    profileSchemas: `${GlobalConfig.serverHost}/v2.0/Schema/attributes`,
    revoke: `${GlobalConfig.serverHost}/oidc/endpoint/default/revoke`,
    sessions: `${GlobalConfig.serverHost}/api/users/v1/me/sessions`,
    token: `${GlobalConfig.serverHost}/oidc/endpoint/default/token`,
    user: `${GlobalConfig.serverHost}/v2.0/Me`,
    userStores: `${GlobalConfig.serverHost}/v1.0/identitysources`,
    users: `${GlobalConfig.serverHost}/v2.0/Users`,
    wellKnown: `${GlobalConfig.serverHost}/oidc/endpoint/default/.well-known/openid-configuration`
};
