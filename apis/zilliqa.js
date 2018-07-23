/**
 * Common apis on zilliqa network
 */
const fs = require('fs-extra')
const { 
    getBalance, deployContract, transferZil,
    getTransaction, executeContract, getSmartContracts 
} = require('./lib/transaction')

module.exports = (app) => {
    app.post('/api/v1/zilliqa/transfer', async (req, res) => {
        try {
            const { to, key, amount } = req.body
            const { result } = await transferZil(to, amount, key)
            res.send({ txHash: result })
        } catch (err) {
            res.status(500).send({ message: err })
        }
    })

    app.get('/api/v1/zilliqa/balances', async (req, res) => {
        try {
            const { address } = req.query
            const { result } = await getBalance(address)
            res.send(result)
        } catch (err) {
            res.status(500).send({ message: err.toString() })
        }
    })

    app.get('/api/v1/zilliqa/transaction', async (req, res) => {
        try {
            const { txHash } = req.query
            const { result } = await getTransaction(txHash)
            res.send(result)
        } catch (err) {
            res.status(500).send({ message: err.toString() })
        }
    })

    app.post('/api/v1/zilliqa/contract/deploy', async (req, res) => {
        try {
            const { nameId, params, key } = req.body
            const code = await fs.readFile(`./contract/${nameId}.scilla`)
            const   { result } = await deployContract(code.toString(), params, key)
            res.send({ txHash: result })
        } catch (err) {
            res.status(500).send({ message: err.toString() })
        }
    })

    app.post('/api/v1/zilliqa/contract/execute', async (req, res) => {
        try {
            const { address, message, key } = req.body
            const { result } = await executeContract(address, message, key)
            res.send({ txHash: result })
        } catch (err) {
            res.status(500).send({ message: err.toString() })
        }
    })

    app.get('/api/v1/zilliqa/contract/list', async (req, res) => {
        try {
            const { address } = req.query
            const { result } = await getSmartContracts(address)
            res.send({ result })
        } catch (err) {
            res.status(500).send({ message: err.toString() })
        }
    })
}