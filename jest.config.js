module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.test.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!*.{js,ts}",
    "!**/node_modules/**",
    "!<rootDir>/prisma/**",
    "!<rootDir>/.next/**",
    "!<rootDir>/.jest/**",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    "^.+\\.css$": "<rootDir>/cssTransform.js",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  roots: ["<rootDir>"],
  testPathIgnorePatterns: [".int."],
  coverageDirectory: ".jest/unit",
};
