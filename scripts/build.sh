#!/usr/bin/env bash

# exit when any command fails
set -e

npx prisma migrate deploy
npx prisma generate
npm run build