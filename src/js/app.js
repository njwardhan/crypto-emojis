App = {
    web3provider: null,
    contracts: {},
    account: '0x0',

    init: function() {
        console.log("App initialized...")
        return App.initWeb3();
    },

    initWeb3: async function() {
        if (window.ethereum) {
           // If a web3 instance is already provided by Meta Mask.
        //    await window.ethereum.request({ method: 'eth_requestAccounts' });
           App.web3provider = window.ethereum;
           web3 = new Web3(App.web3provider)
           return App.initContract();
        }
        else {
           // Alert the user about their browser's incompetence xD
            window.alert("Oops! Non-Ethereum browser detected." + "\n" + "Try using Metamask for your desktop web3 instance.")
        }      
    },

    initContract: function() {
        // Get the contract abstractions from the build directory (JSON representations)
        $.getJSON("emoji.json", function(Emoji) {
            App.contracts.emoji = TruffleContract(Emoji);
            App.contracts.emoji.setProvider(App.web3provider);
            App.contracts.emoji.deployed().then(function(Emoji) {
                console.log("Emoji Contract Address:", Emoji.address);
            })
        })
        return App.render()
    },

    render: function() {
        // Load account data
        if(window.ethereum){
            window.ethereum.request({method: 'eth_requestAccounts'}).then(function(acc){
                App.account = acc[0];
                console.log("Current Account:", App.account);
                document.getElementById("accountAddress").innerHTML += "Current Account : " + App.account;
            })
        }

        // Loading the contract name, symbol and total-supply for verification
        $.getJSON("emoji.json", function(Emoji) {
            App.contracts.emoji = TruffleContract(Emoji);
            App.contracts.emoji.setProvider(App.web3provider);
            App.contracts.emoji.deployed().then(async function(Emoji) {
                const name = await Emoji.name();
                const symbol = await Emoji.symbol();
                const supply = await Emoji.totalSupply();
                console.log("Contract Namess:", name);
                console.log("Contract Symbol:", symbol);
                console.log("Current total supply of tokens:", supply.toNumber());
            })
        })
        return App.minting();        
    },

    minting: function() {
        $.getJSON("emoji.json", function(Emoji) {
            App.contracts.emoji = TruffleContract(Emoji);
            App.contracts.emoji.setProvider(App.web3provider);
            App.contracts.emoji.deployed().then(async function(instance) {
                return instance.mint()
            })
        })
    }
}

window.onload = function() {
    App.init();
};

