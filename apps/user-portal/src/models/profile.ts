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

 import {PhoneNumber} from "../../../admin-portal/src/models/phoneNumber";
import {Address} from "../../../admin-portal/src/models/address";
import {CICCustomUserResponse} from "../../../admin-portal/src/models/cICCustomUserResponse";
import {EmailAddress} from "../../../admin-portal/src/models/emailAddress";
import {MetaV2} from "../../../admin-portal/src/models/metaV2";
import {Groups} from "../../../admin-portal/src/models/groups";
import {EnterpriseUser} from "../../../admin-portal/src/models/enterpriseUser";
import {CustomAttribute} from "../../../admin-portal/src/models/customAttribute";
import {Manager} from "../../../admin-portal/src/models/manager";
import {Type} from "@cicis/forms/dist/src";

/**
  * Multi-valued attribute model
  */
export interface MultiValue {
    type: string;
    value: string;
}

/**
 * Name model
 */
export interface Name {
    givenName: string;
    familyName: string;
}

/**
 * Profile Model
 */
export interface BasicProfileInterface {
/**
 * The unique identifier for the user that is typically used by the user to directly authenticate to the service provider. It is often displayed to the user as their unique identifier within the system (as opposed to the id or externalId attributes, which are generally opaque and not user-friendly identifiers). Each user must include a non-empty userName value. This identifier must be unique across the service consumer's entire set of users. It must be a stable ID that does not change when the same user is returned in subsequent requests.
 */
userName: string;
/**ß
 * A list of phone numbers that are associated with the user.
 */
phoneNumbers?: Array<PhoneNumber>;
/**
 * A list of addresses that are associated with the user.
 */
addresses: Array<Address>;
/**
 * The name of the user that is displayed to users. Each user returned may include a non-empty displayName value. Typically it is the full name of the user being described, for example, Babs Jensen or Ms. Barbara J Jensen. However, if that information is unavailable, a username or handle can be used, for example, bjensen. The value is the primary textual label by which this user is normally displayed by the service provider when presenting information to users.
 */
displayName?: string;
/**
 * The components of the user's real name. Providers can return just the full name as a single string in the formatted sub-attribute, or return just the individual component attributes using the other sub-attributes, or return both. If both variants are returned, they must describe the same name, with the formatted name that indicates how the component attributes are to be combined.
 */
name: Name;
/**
 * The user's title, such as \"Vice President.\"
 */
title?: string;
/**
 * The language code identifying the preferred language of this identity, for example, en-us or fr-ca.
 */
preferredLanguage?: string;
/**
 * The custom attributes schema.
 */
"urn:ietf:params:scim:schemas:extension:ibm:2.0:User"?: CICCustomUserResponse;
/**
 * A list of email addresses that are associated with the user. Only one is supported.
 */
emails: Array<EmailAddress>;
/**
 * The user meta data.
 */
meta?: MetaV2;
/**
 * A unique identifier for the resource that is defined by the provisioning client. It identifies a resource between the provisioning client and the service provider. The client can use a filter to locate the resource with an identifier from the provisioning domain.
 */
externalId?: string;
/**
 * The list of groups that the user belongs to. Any value that is specified for this attribute in the JSON POST or PUT request payload is ignored. Group membership is managed by using the /Groups API.
 */
groups?: Array<Groups>;
/**
 * A Boolean value that indicates the user's administrative status. The definitive meaning of this attribute is determined by the service provider. For example, a value of true indicates that the user can, log in, while a value of false indicates that the user's account has been suspended. If not specified, the value defaults to true.
 */
active?: boolean;
/**
 * The enterprise user schema.
 */
urnietfparamsscimschemasextensionenterprise20User?: EnterpriseUser;
/**
 * The unique identifier for the resource as defined by the service. This attribute is read-only and ise sent by the service. Any value that is specified for this attribute in the JSON POST or PUT request payload is ignored.
 */
id: string;
/**
 * An array of strings that contain the URIs that indicate the namespaces of the SCIM schemas that define the attributes in the current JSON structure. The schemas \"urn:ietf:params:scim:schemas:core:2.0:User\", \"urn:ietf:params:scim:schemas:extension:ibm:2.0:User\" and \"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User\" are returned in the response.
 */
schemas: Array<string>;

}

/**
 * Linked account interface.
 */
export interface LinkedAccountInterface {
    /**
     * Associated user's email address.
     */
    email: string;
    /**
     * Associated user's last name.
     */
    lastName: string;
    /**
     * Tenant domain.
     */
    tenantDomain: string;
    /**
     * ID of the associated user.
     */
    userId: string;
    /**
     * User store domain.
     */
    userStoreDomain: string;
    /**
     * Username of the associated user.
     */
    username: string;
}

/**
 * Profile schema interface.
 */
export interface ProfileSchema {
    customAttribute: string;
    displayName: string;
    name: string;
    displayOrder: string;
    description: string;
    type: Type;
    readOnly: boolean;
    scimName: string;
    attributeName: string;
    subAttributes?: ProfileSchema[];
    required: boolean;
}

/**
 * Enum for profile completion statuses.
 *
 * @readonly
 * @enum {string}
 */
export enum ProfileCompletionStatus {
    ERROR = "error",
    WARNING = "warning",
    SUCCESS = "success"
}

/**
 * Profile completion interface.
 */
export interface ProfileCompletion {
    optional: ProfileCompletionResult;
    required: ProfileCompletionResult;
    percentage: number;
}

/**
 * Interface to handle individual profile status types.
 */
interface ProfileCompletionResult {
    completedAttributes: ProfileAttribute[];
    completedCount: number;
    incompleteAttributes: ProfileAttribute[];
    totalCount: number;
}

/**
 * Interface to map the `completed` or `incomplete` attributes.
 */
export interface ProfileAttribute {
    displayName: string;
    name: string;
}

/**
 * Interface for Profile resucer state.
 */
export interface ProfileReducerStateInterface {
    completion: ProfileCompletion;
    isSCIMEnabled: boolean;
    linkedAccounts: LinkedAccountInterface[];
}

/**
 * Empty profile completion object.
 *
 * @return {ProfileCompletion}
 */
export const emptyProfileCompletion = (): ProfileCompletion => ({
    optional: {
        completedAttributes: [],
        completedCount: 0,
        incompleteAttributes: [],
        totalCount: 0
    },
    percentage: 0,
    required: {
        completedAttributes: [],
        completedCount: 0,
        incompleteAttributes: [],
        totalCount: 0
    },
});

export const createEmptyProfile = (): BasicProfileInterface => ({

    userName: "",

    phoneNumbers: [],

    addresses: [],

    displayName: "",

    name: new class implements Name {
        familyName: "";
        givenName: "";
    },

    title: "",

    preferredLanguage: "",

    "urn:ietf:params:scim:schemas:extension:ibm:2.0:User": new class implements CICCustomUserResponse {
        customAttributes: Array<CustomAttribute>;
        delegate: "";
        emailVerified: "";
        lastLogin: "";
        lastLoginRealm: "";
        lastLoginType: "";
        linkedAccounts: [];
        pwdAccountLockedTime: "";
        pwdChangedTime: 0;
        pwdExpirationWarned: "";
        pwdFailureTime: [];
        pwdGraceUseTime: [];
        pwdReset: false;
        realm: "";
        twoFactorAuthentication: false;
        unqualifiedUserName: "";
        userCategory: "regular";
    },

    emails: [],

    meta: new class implements MetaV2 {
        created: "";
        lastModified: "";
        location: "";
        resourceType: "";
    },

    externalId: "",

    groups: [],

    active: false,

    urnietfparamsscimschemasextensionenterprise20User: new class implements EnterpriseUser {
        department: "";
        employeeNumber: "";
        manager: Manager;
    },

    id: "",

    schemas: []
});
