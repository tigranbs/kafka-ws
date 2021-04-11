module.exports = {
  ignorePatterns: [".eslintrc.js"],
  extends: ["airbnb-typescript"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  "rules": {
    "import/prefer-default-export": "off",
  }
};
