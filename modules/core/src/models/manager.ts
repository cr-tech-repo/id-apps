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


export interface Manager { 
    /**
     * The display name of the user's manager. This value is readonly.  
     */
    displayName?: string;
    /**
     * The \"id\" of the SCIM resource representing the user's manager.   
     */
    value?: string;
    /**
     * The URI of the SCIM resource representing the user's manager.  This value is readonly.  
     */
    ref?: string;
}
