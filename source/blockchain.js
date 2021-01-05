const sha256 = require('crypto-js/sha256');

class BlockChain {
    constructor() {
        this.blockchain = [this.initBlockchain()];
        this.difficulty = 4;
    }

    initBlockchain() {
        let block = new Block(0, "03/01/2021", "Initial block", ""); 

        return block;
    }

    getLastestBlock() {
        return this.blockchain[this.blockchain.length - 1];
    }

    addNewBlock(block) {
        block.prev = this.getLastestBlock().hash;
        block.proofOfWork(this.difficulty); 

        this.blockchain.push(block);
    }

    checkChainValidity() {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i];
            const precedingBlock = this.blockchain[i - 1];

            if (currentBlock.hash !== currentBlock.computeHash()) {
                return false;
            }

            if (currentBlock.prev !== precedingBlock.hash) {
                return false;
            }
        }

        return true;
    }
}
 
class Block {
    constructor(index, time, data, prev="") {
        this.index = index;
        this.time = time;
        this.data = data;
        this.nonce = 0;
        this.prev = prev;

        this.hash = this.generateHash();
    }

    generateHash() {
        return sha256(this.time + this.index + this.prev + JSON.stringify(this.data) + this.nonce).toString();
    }

    proofOfWork(difficulty) {
        while (
        this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.generateHash();
        }
    }
}

module.exports = {BlockChain, Block};