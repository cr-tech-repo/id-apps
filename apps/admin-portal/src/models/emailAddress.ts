/**
 * IBM Cloud Identity API
 * Use these API definitions to develop and integrate applications with the IBM Cloud Identity services such as authentication, customization, users and groups management, and others.  A new version of the API will be released if there are attributes that are removed or renamed. New resources, parameters, or attributes can be added without advance notice. When you use these APIs, ignore the unrecognized response parameters.
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface EmailAddress {
    /**
     * A label that indicates the attribute function; for example, \"work\".  Only a single email is allowed.
     */
    type: EmailAddress.TypeEnum;
    /**
     * The e-mail addresses for the user. The value is canonicalized by the service provider. For example, bjensen@example.com instead of bjensen@EXAMPLE.COM. Must be RFC 2822 compliant. Maximum length is 80 characters.
     */
    value: string;
}
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EmailAddress {
    export type TypeEnum = 'work';
    export const TypeEnum = {
        Work: 'work' as TypeEnum
    };
}
