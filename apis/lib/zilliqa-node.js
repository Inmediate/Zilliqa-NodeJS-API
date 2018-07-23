const { Zilliqa } = require('zilliqa.js')
const config = require('config')

const zilliqa = new Zilliqa({
    nodeUrl: config.get('api.zil_node')
})

module.exports = zilliqa
