# cic Identity Server - Core module for Identity apps.

Commonly used configs, schemas, utilities and low level services for cic Identity Server frontend apps.

## Install
Add following dependency in your package.json file.
`"@cicis/core": "<VERSION>"`

## Sub modules

The following sub modules are available for use and can be imported in to the projects.

1. api - Contains common API requests (`cicis/core/api`)
2. configs - Common configs such as endpoints etc. (`cicis/core/configs`)
3. constants - Common constants (`cicis/core/constants`)
4. exceptions - Common exceptions (`cicis/core/exceptions`)
5. helpers - Helper functions such as history, parsers etc. (`cicis/core/helpers`)
6. hooks - Contains reusable react hooks. (`cicis/core/hooks`)
7. models - Commonly used models and schemas. (`cicis/core/models`)
8. store - Common redux actions, types and reducers (`cicis/core/store`)
9. utils - Common utils (`cicis/core/utils`)

## Notes

If TSLint starts detecting submodule imports such as `cicis/core/utils` as an error, you can edit `no-submodule-imports` rule in the TSLint configuration to whitelist them.

```json
{
    "rules": {
        "no-submodule-imports": [
            true,
            "@cicis/core/api",
            "@cicis/core/configs",
            "@cicis/core/constants",
            "@cicis/core/exceptions",
            "@cicis/core/helpers",
            "@cicis/core/hooks",
            "@cicis/core/models",
            "@cicis/core/store",
            "@cicis/core/utils"
        ]
    }
}
``` 

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.

