## About

This project is an implementation of [OpenZeppelin's ERC-721 token standard](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC721) that allows the user to mint emojis (or combination of emojis) as Non-Fungible Tokens (NFTs) on Ethereum's [Rinkeby test network](https://www.rinkeby.io/#stats).

NOTE: The tokens get minted **from** the minter's (user's) address and **to** the contract address. No further ownership transfer takes place.

## Project screenshot

![](crypto-emojis.png "crypto-emojis website")

## Steps to mint

* Visit the project website
* Connect your Ethereum wallet (Metamask) to the website (make sure that the Rinkeby testnet is selected)
* Enter the hexcode of the emoji(s) that you'd want to mint (the hexcode reference on the site can be used)
* Spend Rinkeby fake ethers as gas fee to complete the transaction
* See the emoji(s) come to life as an NFT!

## To-do

* Website ain't currently responsive for different screen sizes
* Include other formats of emoji hexcodes
* Frontend can be bettered (loop display takes time)
* Mainnet deployment with a proper project format



