module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "google",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "plugins": [
    "react",
  ],
  "settings": {
    "react": {
      "version": "detect",
    },
  },
  "env": {
    "browser": true,
  },
};