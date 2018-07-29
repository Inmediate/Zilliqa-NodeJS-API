const zilliqa = require('./zilliqa-node')
const config = require('config')

const { gasPrice, gasLimit, version } = config.get('api')

const cb = (resolve, reject) => (err, data) => {
    const error = err || data.error
    if (error) {
        return reject(error)
    }
    return resolve(data)
}

const createTransactionAsync = (privateKey, txnDetails) => new Promise((resolve, reject) => {
    const txn = zilliqa.util.createTransactionJson(privateKey, txnDetails)
    zilliqa.node.createTransaction(txn, cb(resolve, reject))
})

function getBalance (address) {
    return new Promise((resolve, reject) => zilliqa.node.getBalance({ address }, cb(resolve, reject)))
}

function getTransaction (txHash) {
    return new Promise((resolve, reject) => zilliqa.node.getTransaction({ txHash }, cb(resolve, reject)))
}

async function deployContract (code, initParams, privateKey) {
    const address = zilliqa.util.getAddressFromPrivateKey(privateKey)
    const { result: { nonce } } = await getBalance(address)
    const txnDetails = {
        version,
        nonce: nonce + 1,
        to: '0000000000000000000000000000000000000000',
        amount: 0,
        gasPrice,
        gasLimit,
        code: code,
        data: JSON.stringify(initParams).replace(/\\"/g, '"')
    }

    return await createTransactionAsync(privateKey, txnDetails)
}

async function executeContract (to, message, privateKey) {
    const address = zilliqa.util.getAddressFromPrivateKey(privateKey)
    const { result: { nonce } } = await getBalance(address)
    const txnDetails = {
        version,
        nonce: nonce + 1,
        to,
        amount: 0,
        gasPrice,
        gasLimit,
        data: JSON.stringify(message).replace(/\\"/g, '"')
    }

    return await createTransactionAsync(privateKey, txnDetails)
}

async function transferZil(to, amount, privateKey) {
    const address = zilliqa.util.getAddressFromPrivateKey(privateKey)
    const { result: { nonce } } = await getBalance (address)
    const txnDetails = {
        version,
        nonce: nonce + 1,
        to,
        amount,
        gasPrice,
        gasLimit
    }

    return await createTransactionAsync(privateKey, txnDetails)
}

const getSmartContracts = async (address) => new Promise((resolve, reject) => zilliqa.node.getSmartContracts({ address }, cb(resolve, reject)))

const getSmartContractState = async (address) => new Promise((resolve, reject) => zilliqa.node.getSmartContractState({ address }, cb(resolve, reject)))


module.exports = {
    getBalance,
    deployContract,
    transferZil,
    getTransaction,
    executeContract,
    getSmartContracts,
    getSmartContractState
}