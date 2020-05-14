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

import {PhoneNumber} from "./phoneNumber";
import {Address} from "./address";
import {Name} from "./name";
import {EmailAddress} from "./emailAddress";
import {CICCustomUserResponse} from "./cICCustomUserResponse";
import {MetaV2} from "./metaV2";
import {EnterpriseUser} from "./enterpriseUser";
import {Groups} from "./groups";
import {Manager} from "./manager";

/**
 * Profile information schema
 */
export interface ProfileInfoInterface {
    /**
     * The unique identifier for the user that is typically used by the user to directly authenticate to the service provider. It is often displayed to the user as their unique identifier within the system (as opposed to the id or externalId attributes, which are generally opaque and not user-friendly identifiers). Each user must include a non-empty userName value. This identifier must be unique across the service consumer's entire set of users. It must be a stable ID that does not change when the same user is returned in subsequent requests.
     */
    userName: string;
    /**
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
    urnietfparamsscimschemasextensionibm20User?: CICCustomUserResponse;
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
export interface ProfileSchemaInterface {
    /**
     * The display name for a custom attribute.  Its used to show the attribute name in the email that is sent to the end user when the attribute value changes.
     */
    displayName?: string;
    /**
     * The description for the schema attribute.
     */
    description?: string;
    /**
     * The attribute name that is associated with the attribute source.
     */
    attributeName?: string;
    /**
     * The SCIM name that is associated with the schema attribute.
     */
    scimName?: string;
    /**
     * A flag to indicate this schema attribute is read only.   Defaults to false.  Any value that is specified for a user in a read only attribute is ignored, except for custom attributes where it can be set on a POST.  Values specified in a PUT or PATCH request payload for read only attributes are ignored.
     */
    readOnly?: boolean;
    /**
     * A flag to indicate this schema attribute supports multiple values.
     */
    multiValue?: boolean;
    /**
     * A flag that indicates whether this is a custom attribute.
     */
    customAttribute?: boolean;
    /**
     * An array of strings that contains the URIs that indicate the namespaces of the SCIM schemas that define the attributes present in the current JSON structure.   The schema URI must be \"urn:ietf:params:scim:schemas:ibm:core:2.0:SchemaAttribute\" as required by the SCIM specification.
     */
    schemas: Array<string>;
    /**
     * The data type for the schema attribute.
     */
    type?: SchemaAttributeResponse.TypeEnum;
    /**
     * The schema attribute name.
     */
    name: string;

    subAttributes?: ProfileSchemaInterface[];
}

export namespace SchemaAttributeResponse {
    export type TypeEnum = 'string' | 'boolean' | 'integer' | 'DN';
    export const TypeEnum = {
        String: 'string' as TypeEnum,
        Boolean: 'boolean' as TypeEnum,
        Integer: 'integer' as TypeEnum,
        DN: 'DN' as TypeEnum
    };
}

    /**
     * Empty profile info object.
     *
     * @return {ProfileInfoInterface}
     */
    export const emptyProfileInfo = ({

        userName: "",

        phoneNumbers: [],

        addresses: [],

        displayName: "",

        name: "",

        title: "",

        preferredLanguage: "",

        urnietfparamsscimschemasextensionibm20User: "",

        emails: [],

        meta: "",

        externalId: "",

        groups: "",

        active: false,

        urnietfparamsscimschemasextensionenterprise20User: new class implements EnterpriseUser {
            department: "";
            employeeNumber: "";
            manager: Manager;
        },

        id: "",

        schemas: [],

    });
