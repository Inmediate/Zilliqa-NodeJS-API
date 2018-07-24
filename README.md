# Zilliqa-NodeJS-API
=============================

NodeJS Rest API skeleton to interact with Zilliqa platform build on top of https://github.com/Zilliqa/Zilliqa-JavaScript-Library 

## Features

### General APIs
- Deploy smart contract
- List all contracts deployed by an account
- Transfer Zil into an account address
- Check account balance
- Get transaction info by hash

### HelloWorld APIs
- Execute contract method: setHello.


## Installation

```
git clone git@github.com:Inmediate/Zilliqa-NodeJS-API.git
yarn install
```

- Edit `zil_node` at `config/default.json ` that point to your Zilliqa node. In this case, the Scilla testnet. Finally, start server `node index.js`


## Examples

### General APIs: Deploy smart contract
- `POST http://localhost:3000/api/v1/zilliqa/contract/deploy`
- Payload:
```js
{
    "nameId": "HelloWorld",
    "params": [{
        "vname" : "owner",
        "type" : "Address", 
        "value" : ${owner_address}
    }],
    "key": ${private_key}
}
```
- The contract `HelloWorld` is at `contract/HelloWorld.scilla`
- `nameId`: Corresponding to contract file name, which is `HelloWorld.scilla`
- `params`: Corresponding to immutable contract params: `(owner: Address)`

### General APIs: List all contracts deployed by an account: 
```js
GET http://localhost:3000/api/v1/zilliqa/contract/list?address=${account_address}
```

### General APIs: Transfer Zil into an account address
- `POST http://localhost:3000/api/v1/zilliqa/transfer`
- Payload:
```js
{
    "to": ${receiver_address},
    "key": ${sender_private_key},
    "amount": ${amount_to_send}
}
```

### General APIs: Check account balance
```js
GET http://localhost:3000/api/v1/zilliqa/balances?address=${account_address}
```

### General APIs: Get transaction info by hash
```js
GET http://localhost:3000/api/v1/zilliqa/transaction?txHash=${transaction_hash}
```

### HelloWorld API: Execute setHello method
- `POST http://localhost:3000/api/v1/zilliqa/contract/execute`
- Payload:
```js
{
    "address": ${contract_address},
    "message": {
        "_tag": "setHello",
        "_amount": "0",
        "_sender" : ${sender_address},
        "params": [{
            "vname": "msg",
            "type": "String",
            "value": "Hello World"
        }]
    },
    "key": ${sender_private_key}
}
```

## Next Release Features
- Listener for smart contract events