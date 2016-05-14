module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "installedESLint": true,
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "comma-dangle": ["error", 'only-multiline'],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    'jsx-quotes': ["error", 'prefer-double'],
    "semi": [
      "error",
      "always"
    ],
    "no-console": "warn",
    "keyword-spacing": ["error", {
      "before": true,
      "after": true
    }],
    "comma-spacing": ["error", {
      "before": false,
      "after": true
    }],
    "no-unused-vars": ["error", { "args": "none" }]
  }
};



