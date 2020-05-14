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

/**
 * Interface for the service resource endpoints.
 */
interface CommonServiceResourceEndpointsInterface {
    authorize: string;
    jwks: string;
    logout: string;
    me: string;
    profileSchemas: string;
    revoke: string;
    token: string;
    wellKnown: string;
}

/**
 * Common Service resource endpoints.
 */
export const CommonServiceResourcesEndpoints = (serverHost: string): CommonServiceResourceEndpointsInterface => ({
    authorize: `${serverHost}/oidc/endpoint/default/authorize`,
    jwks: `${serverHost}/oidc/endpoint/default/jwks`,
    logout: `${serverHost}/oidc/logout`,
    me: `${serverHost}/v2.0/Me`,
    profileSchemas: `${serverHost}/v2.0/Schema/attributes`,
    revoke: `${serverHost}/oidc/endpoint/default/revoke`,
    token: `${serverHost}/oidc/endpoint/default/token`,
    wellKnown: `${serverHost}/oidc/endpoint/default/.well-known/openid-configuration`
});
