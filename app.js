const pocket = require('./source/blockchain');

let blockchain = new pocket.BlockChain();

blockchain.addNewBlock(new pocket.Block(1, "01/06/2020", {sender: "Iris Ljesnjanin", recipient: "Cosima Mielke", quantity: 50}));
blockchain.addNewBlock(new pocket.Block(2, "01/07/2020", {sender: "Vitaly Friedman", recipient: "Ricardo Gimenes", quantity: 100}));

console.log(JSON.stringify(blockchain, null, 4));