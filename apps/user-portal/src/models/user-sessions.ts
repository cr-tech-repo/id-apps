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

/**
 * User sessions model.
 */
export interface UserSessions {
    /**
     * User ID.
     */
    userId: string;
    /**
     * List of active sessions.
     */
    sessions: UserSession[];
}

/**
 * Model to represent a single login session.
 */
export interface UserSession {


    location: Array<any>[];
    /**
     * List of applications in the session.
     */
    attributes: Attributes[];
    /**
     * User agent of the session.
     */
    userAgent: string;
    /**
     * IP address of the session.
     */
    originIP: string;
    /**
     * Login time of the session.
     */
    issuedOn: string;
    /**
     * Last access time of the session.
     */
    lastUsed: string;
    /**
     * ID of the session.
     */
    id: string;
    /**
     * appID of the session.
     */
    appId: string;
    /**
     * clientID of the session.
     */
    clientId: string;
}

/**
 * Model to represent logged in application details.
 */
export interface Attributes {
    /**
     * Username of the logged in user for the application.
     */
    values: string;
    /**
     * Name of the application.
     */
    name: string;
    /**
     * ID of the application.
     */
    id: string;

    sensitive: boolean;

    readOnly: boolean;
}

/**
 * Model to represent logged in application details.
 */
interface Location {
    /**
     * Username of the logged in user for the application.
     */
    subject: string;
    /**
     * Name of the application.
     */
    appName: string;
    /**
     * ID of the application.
     */
    appId: string;
}

/**
 * Returns an empty user sessions object.
 *
 * @return {UserSessions} An empty user sessions object
 */
export const emptyUserSessions = (): UserSessions => ({
    sessions: [],
    userId: ""
});

/**
 * Returns an empty user session object.
 *
 * @return {UserSession} An empty user session object
 */
export const emptyUserSession = (): UserSession => ({
    location: [],

    attributes: [],

    userAgent: "",

    originIP: "",

    issuedOn: "",

    lastUsed: "",

    id: "",

    appId: "",

    clientId: ""
});
