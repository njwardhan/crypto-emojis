App = {
    web3provider: null,
    contracts: {},
    account: '0x0',
    loading: false,

    init: function () {
        console.log("App initialized...")
        return App.initWeb3();
    },

    initWeb3: async function () {
        if (App.loading) {
            return;
        }
        App.loading = true;

        var loader = $('#loader');
        var content1 = $('#flex-one');
        var content2 = $('#flex-two');
        
        loader.show();
        content1.hide();
        content2.hide();

        if (window.ethereum) {
            // If a web3 instance is already provided by Meta Mask.
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            App.web3provider = window.ethereum;

            App.loading = false;
            loader.hide();
            content1.show();
            content2.show();

            return App.initContract();
        }
        else {
            // Alert the user about their browser's incompetence xD
            loader.hide();
            document.write("<h3>Oops! Non-Ethereum browser detected. Try using Metamask for your desktop web3 instance.</h3>")
        }
    },

    initContract: function () {
        // Get the contract abstraction from the build directory (JSON representations)
        $.getJSON("emoji.json", function (Emoji) {
            App.contracts = TruffleContract(Emoji);
            App.contracts.setProvider(App.web3provider);
            App.contracts.deployed().then(function (Emoji) {
                console.log("Emoji Contract Address:", Emoji.address);
            })
        })
        return App.render()
    },

    render: async function () {
        // Load account data
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then(async function (acc) {
                App.account = acc[0];
                console.log("Current Account:", App.account);
                document.getElementById("accountAddress").innerHTML += "Current Account : " + App.account;
                return App.tokenListing();
            })
        }

        //Loading the contract name, symbol and total-supply for verification
        $.getJSON("emoji.json", function (Emoji) {
            App.contracts = TruffleContract(Emoji);
            App.contracts.setProvider(App.web3provider);
            App.contracts.deployed().then(async function (Emoji) {
                const name = await Emoji.name();
                const symbol = await Emoji.symbol();
                const supply = await Emoji.totalSupply();
                console.log("Contract Name:", name);
                console.log("Contract Symbol:", symbol);
                console.log("Current token count for the contract:", supply.toNumber());
            })
        })
    },

    // List all the minted tokens (up till the point of the function call)
    tokenListing: function () {
        $.getJSON("emoji.json", function (Emoji) {
            App.contracts = TruffleContract(Emoji);
            App.contracts.setProvider(App.web3provider);
            // console.log("The minted tokens for this account are:")
            App.contracts.deployed().then(async function (Emoji) {
                const supply = await Emoji.totalSupply();
                for (var i = 1; i <= supply; i++) {
                    var tokens = await Emoji.emojis(i - 1)
                    // console.log(tokens)

                    var emoji_elements = document.createElement("NJW");
                    emoji_elements.innerHTML = tokens;

                    // emoji_elements.innerHTML += i;
                    document.getElementById('flex-two').appendChild(emoji_elements);
                    // document.getElementsByName('NJW').innerHTML = i;
                    // var id = document.createElement("LM7");
                    // id.innerHTML = i;
                    // document.getElementsByName('NJW').innerHTML += id;
                    // var code_value = String(tokens);
                    // var code_value = document.createElement("LM7");
                    // code_value.innerHTML = $('#hex').val();
                    // document.getElementById('emoji-display').appendChild(code_value);
                    // document.getElementById('flex-two').appendChild(hex_value);
                    // document.getElementById("emoji-display").innerHTML += emoji_elements;
                }
            })
        })
    },


    minting: function () {
        $.getJSON("emoji.json", function (Emoji) {
            var hexcode = $('#hex').val()
            App.contracts = TruffleContract(Emoji);
            App.contracts.setProvider(App.web3provider);
            App.contracts.deployed().then(async function (instance) {
                return instance.mint(hexcode, {
                    from: App.account,
                    gas: 500000
                }).then(function (result) {
                    location.reload();
                    console.log("Token minted!")
                    return App.tokenListing();
                })
            })
        })
    }
}

$(function () {
    $(window).load(function () {
        return App.init();
    })
});