# Reclaim - Nibiru


## Deployments

| Chain Name | Deployed address | Explorer Link |
|:-----------|:-----------------|:--------------|
| Nibiru Mainnet | nibi1d7ffxpewty3zd0lq39l9rxc2wtmgv8j3gsg3qf5yglzewqp84mkqlttmme | https://explorer.nibiru.fi/cataclysm-1/account/nibi1d7ffxpewty3zd0lq39l9rxc2wtmgv8j3gsg3qf5yglzewqp84mkqlttmme|
| Nibiru Testnet | nibi1l0yhggdxmvkcjd9a304gkel770rkyl2vy272q58seyp5sys7486spversq | https://explorer.nibiru.fi/nibiru-testnet-1/account/nibi1l0yhggdxmvkcjd9a304gkel770rkyl2vy272q58seyp5sys7486spversq|

## Environment

Compile client contract:

```
make build
```

In node directory, populate your .env:

```
MNEMONIC= // Your mnemonic
```

In the same directory:

```
npm install
npm run start
```