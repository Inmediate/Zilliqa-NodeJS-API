# Zilliqa-NodeJS-API
==========================

NodeJS Rest API wrapper to interact with Zilliqa platform build on top of https://github.com/Zilliqa/Zilliqa-JavaScript-Library 

## Installation

```
git clone git@github.com:Inmediate/Zilliqa-NodeJS-API.git
yarn install
```

Then, edit `zil_node` at `config/default.json ` that point to your Zilliqa node. In this case, the Scilla testnet. Finally, start server `node index.js`


## APIs

1. Transfer Zil: `POST http://localhost:3000/api/v1/zilliqa/transfer`, payload:
```
{
    "to": ${receiver_address},
    "key": ${sender_private_key},
    "amount": ${amount_to_send}
}
```

2. Check account balance: `GET http://localhost:3000/api/v1/zilliqa/balances?address=${account_address}`

3. Get transaction info: `GET http://localhost:3000/api/v1/zilliqa/transaction?txHash=${transaction_hash}`

4. Deploy `HelloWorld` smart contract:
    - `HelloWorld` smart contract is at `contract/HelloWorld.scilla`
    - Execute `POST http://localhost:3000/api/v1/zilliqa/contract/deploy` with payload
    ```
        {
            "nameId": "HelloWorld", // Must be same with "HelloWorld.scilla"
            "params": [{
                "vname" : "owner",
                "type" : "Address", 
                "value" : ${owner_address}
            }],
            "key": ${private_key}
        }
    ``` 
    to deploy the contract. Reference: https://scilla.readthedocs.io/en/latest/interface.html

5. List all contracts deployed by an account: `GET http://localhost:3000/api/v1/zilliqa/contract/list?address=${account_address}`

6. Execute contract method `POST http://localhost:3000/api/v1/zilliqa/contract/execute` with pauload:

```
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
To execute `setHello` method.