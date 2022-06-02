// Without making use of the Chai libraray

const emoji = artifacts.require('emoji');

contract('emoji' , function(accounts) {
    let contract;
    before(async () => {
        contract = await emoji.deployed();
    });


    describe('deployment', async () => {
        it('deploys successfully', async () => {
            const address = contract.address
            console.log(address)
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        });

        it('has a proper name', async () => {
            const name = await contract.name();
            // console.log(name);
            assert.equal(name, 'crypto-emoji')
        });

        it('has a defined symbol', async () => {
            const symbol = await contract.symbol();
            // console.log(symbol);
            assert.equal(symbol, 'CEMOJI')
        });
    });


    describe('minting', async () => {
        it('creates a new emoji token', async () => {
            const result = await contract.mint('&#x1F600;')
            const totalSupply = await contract.totalSupply()
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 0, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
            assert.equal(event.to, accounts[0], 'to is correct')

            // FAILURE: same emoji cannot be minted again
            try{
                await contract.mint('&#x1F600;');
            } catch(error){
                assert(error.message.includes('revert'));
                return;
            }
            assert(false, 'same emoji cannot be minted again');
        });
    });


    describe('indexing', async () => {
        it('lists all emojis', async () => {
            // Mint some more tokens
            await contract.mint('&#x1F923;')
            await contract.mint('&#x1F601;')
            await contract.mint('&#x1F602;')
            const totalSupply = await contract.totalSupply()
            
            let emoji
            let result = []

            for (var i = 1; i <= totalSupply; i++)
            {
                emoji = await contract.emojis(i-1)
                result.push(emoji)
            }

            let expected = ['&#x1F600;', '&#x1F923;', '&#x1F601;', '&#x1F602;']
            assert.equal(result.join(',') , expected.join(','))
        });
    });
});

