# exit when any command fails
set -e

npm run test -- --collect-coverage
npm run test:integration -- --collect-coverage
npx istanbul-merge --out ./.jest/coverage.json ./.jest/unit/coverage-final.json ./.jest/int/coverage-final.json
npx istanbul report --reporter text --include ./.jest/coverage.json
npx istanbul report --reporter lcov --include ./.jest/coverage.json --dir .jest
