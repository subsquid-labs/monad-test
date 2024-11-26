# Monad stress test squid

This example squid indexes `Transfer(address,address,uint256)` events by the `0xF5A8061bB2C5D9Dc9bC9c5C633D870DAC7bD351e` contract on Monad Testnet.

## Prerequisites

- Node >=20
- Docker

## Running 

Navigate to the example folder.

```bash
npm ci
npm run build
docker compose up -d
npx squid-typeorm-migration apply
# starts a long-running ETL and blocks the terminal
node -r dotenv/config lib/main.js
# starts the GraphQL API server at localhost:4350/graphql
npx squid-graphql-server
```
