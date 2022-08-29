module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
        "react-app",
        "react-app/jest"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
            modules: true,
            jsx: true
        }
    },
    plugins: ["eslint-plugin-import", "eslint-plugin-jsdoc", "eslint-plugin-prefer-arrow", "eslint-plugin-unicorn", "import", "react", "@typescript-eslint", "@typescript-eslint/tslint"],
    rules: {
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array"
            }
        ],
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    Object: {
                        message: "Avoid using the `Object` type. Did you mean `object`?"
                    },
                    Function: {
                        message: "Avoid using the `Function` type. Prefer a specific function type, like `() => void`."
                    },
                    Boolean: {
                        message: "Avoid using the `Boolean` type. Did you mean `boolean`?"
                    },
                    Number: {
                        message: "Avoid using the `Number` type. Did you mean `number`?"
                    },
                    String: {
                        message: "Avoid using the `String` type. Did you mean `string`?"
                    },
                    Symbol: {
                        message: "Avoid using the `Symbol` type. Did you mean `symbol`?"
                    }
                }
            }
        ],
        "@typescript-eslint/consistent-type-assertions": "error",
        "@typescript-eslint/consistent-type-definitions": 0,
        "@typescript-eslint/dot-notation": "error",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/explicit-member-accessibility": [
            "off",
            {
                accessibility: "explicit"
            }
        ],
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                ObjectExpression: "first",
                FunctionDeclaration: {
                    parameters: "first"
                },
                FunctionExpression: {
                    parameters: "first"
                },
                SwitchCase: 1 
            }
        ],
        "@typescript-eslint/member-delimiter-style": 0,
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-empty-interface": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                hoist: "all"
            }
        ],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unused-expressions": "error",
        "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-var-requires": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                path: "always",
                types: "prefer-import",
                lib: "always"
            }
        ],
        "@typescript-eslint/unified-signatures": "error",
        complexity: "off",
        "constructor-super": "error",
        "dot-notation": "error",
        eqeqeq: ["error", "smart"],
        "guard-for-in": "error",
        "id-denylist": ["error", "any", "Number", "number", "String", "string", "Boolean", "boolean", "Undefined", "undefined"],
        "id-match": "error",
        "import/extensions": [
            0,
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never"
            }
        ],
        "import/no-extraneous-dependencies": "error",
        "import/no-internal-modules": 0,
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal", "parent", "sibling", "index", "unknown"],
                "newlines-between": "always"
            }
        ],
        "import/prefer-default-export": 1,
        indent: ["error", 4, { "SwitchCase": 1 }],
        "jsdoc/check-alignment": "error",
        "jsdoc/check-indentation": "error",
        "jsdoc/newline-after-description": "error",
        "max-classes-per-file": ["error", 1],
        "new-parens": "error",
        "newline-before-return": 1,
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": 1,
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-duplicate-imports": "error",
        "no-empty": "error",
        "no-empty-function": ["error", { allow: ["arrowFunctions"] }],
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["state"] }],
        "no-redeclare": "error",
        "no-return-assign": "off",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-shadow": 1,
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
        "no-unused-labels": "error",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "no-useless-return": 1,
        "no-var": "error",
        "object-shorthand": "error",
        "one-var": ["error", "never"],
        "prefer-arrow/prefer-arrow-functions": "error",
        "prefer-const": 1,
        "prefer-object-spread": "error",
        "prefer-spread": 1,
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ],
        radix: "error",
        "react/jsx-indent": [0],
        "react/react-in-jsx-scope": 0,
        "react/require-default-props": [2, { ignoreFunctionalComponents: true }],
        "react/jsx-indent-props": [2, "first"],
        "react/jsx-props-no-spreading": "off",
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "no-use-before-define": [0],
        "react/display-name": 0,
        "react/prop-types": 0,
        "space-in-parens": ["error", "never"],
        "spaced-comment": [
            "error",
            "always",
            {
                markers: ["/"]
            }
        ],
        "unicorn/prefer-ternary": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        "@typescript-eslint/tslint/config": [
            "error",
            {
                rules: {
                    whitespace: [true, "check-branch", "check-decl", "check-operator", "check-separator", "check-type", "check-typecast", "check-type-operator", "check-rest-spread"]
                }
            }
        ]
    },
    settings: {
        "import/resolver": {
            alias: {
                map: [
                    ["@", "./src/client"],
                    ["@components", "./src/client/components"],
                    ["@resources", "./src/resources"],
                    ["@server", "./src/server"],
                    ["@api", "./src/server/api"],
                    ["@utils", "./src/utils"]
                ],
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
            },
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".module.scss", "*.svg"],
                moduleDirectory: ["node_modules", "src/"],
                paths: ["src"]
            }
        },
        react: {
            version: "detect"
        }
    }
};
