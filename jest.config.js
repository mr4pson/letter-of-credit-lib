module.exports = {
  displayName: "core-ui-common",
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.(html|svg)$",
    },
  },
  transform: {
    "^.+\\.(ts|js|html|svg)$": "jest-preset-angular",
    "^.+.(ts|mjs|js|html)$": "jest-preset-angular",
  },
  transformIgnorePatterns: [
    "node_modules/(?!@angular|ngx-dropzone|@angular/core|@psb/icons|@psb/angular-tools|@psb/fe-ui-kit|@psb/validations)",
  ],
  snapshotSerializers: [
    "jest-preset-angular/build/serializers/no-ng-attributes",
    "jest-preset-angular/build/serializers/ng-snapshot",
    "jest-preset-angular/build/serializers/html-comment",
  ],
};
