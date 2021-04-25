#!/usr/bin/env bash
docker run -d --rm --name $CONTAINER_NAME \
  -e POSTGRES_USER=root \
  -e POSTGRES_PASSWORD=root \
  -e POSTGRES_DB=db \
  -p 127.0.0.1:$PORT:5432 \
  --health-cmd='pg_isready || exit 1' \
  --health-interval=5s \
  postgres:12 \
&& ./scripts/wait-for-healthy-container.sh $CONTAINER_NAME