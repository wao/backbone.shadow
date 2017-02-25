module.exports = {
    "env" : {
        "node" : true,
        "browser" : true,
        "es6" : false,
    },

    "extends": [ "eslint:recommended" , "google" ],

    "plugins": [
        "node",
        "promise",
        "underscore",
    ],

    "rules": {
        "space-before-blocks" : [ "error", "never" ],
        "spaced-comment" : [ "error", "always", { "exceptions": ["="] } ],
        "quotes" : [ "error", "double"],
        "no-var" : "off",
        "require-jsdoc" : "off",
        "prefer-rest-params" : "off",
        "prefer-spread" : "off",
        "valid-jsdoc" : "off",
        "space-before-function-paren" : [ "error", "never" ],
        "computed-property-spacing" : [ "error", "always" ],
        "comma-spacing" : [ "error", { "before" : false, "after" : true } ],
        "array-bracket-spacing" : [ "error", "never" ],
        "key-spacing" : ["error", {
            "beforeColon": true,
            "afterColon": true,
            "align" : {
                "beforeColon": true,
                "afterColon": true,
                "on": "colon"
            }
        }],
        "one-var" : "off",
        "object-curly-spacing" : ["error", "always", { "objectsInObjects": false }],
        "brace-style" : [ "error", "1tbs", { "allowSingleLine": true } ], 
        "space-in-parens" : ["error", "always", { "exceptions": ["{}"] }],
        //Underscore
        // "underscore/collection-return": 2,
        // "underscore/no-return-value-from-each-iteratee": 2,
        // "underscore/no-unnecessary-bind": 2,
        // "underscore/prop-shorthand": [2, "always"],
        // "underscore/matches-shorthand": [2, "always"],
        "underscore/collection-return": 2,
        "underscore/identity-shorthand": [2, "always"],
        "underscore/jquery-each": [2, "never"],
        "underscore/jquery-extend": [2, "never"],
        "underscore/jquery-proxy": [2, "never"],
        "underscore/matches-shorthand": [2, "always"],
        "underscore/no-return-value-from-each-iteratee": 2,
        "underscore/no-unnecessary-bind": 2,
        "underscore/prefer-chain": [2, 3],
        "underscore/prefer-compact": 2,
        "underscore/prefer-constant": 2,
        "underscore/prefer-filter": 2,
        "underscore/prefer-findwhere": 2,
        "underscore/prefer-invoke": 2,
        "underscore/prefer-map": 2,
        "underscore/prefer-matches": 2,
        "underscore/prefer-noop": 2,
        //TODO
        //"underscore/prefer-pick": [2, {objectsLargerThan: 3}],
        //"underscore/prefer-underscore-method": 2,
        "underscore/prefer-pluck": 2,
        "underscore/prefer-reject": 2,
        "underscore/prefer-times": 2,
        "underscore/prefer-underscore-typecheck": 2,
        "underscore/prefer-where": 2,
        "underscore/preferred-alias": 2,
        "underscore/prop-shorthand": [2, "always"],

        //Node
        "node/exports-style": [
            "error",
            "module.exports",
            {
                "allowBatchAssign": true
            }
        ],

        //TODO
        "max-len" : "off",
    },

};
