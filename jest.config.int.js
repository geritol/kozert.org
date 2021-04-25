module.exports = {
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.test.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!<rootDir>/prisma/**",
  ],
  testRegex: "int.(test|spec)\\.[jt]sx?$",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.int.ts"],
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
  roots: ["<rootDir>"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  coverageDirectory: ".jest/int",
};
