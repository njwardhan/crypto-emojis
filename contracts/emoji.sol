// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract emoji is ERC721 {
    // basically specifying the inital name and symbol for the token
    constructor() ERC721("crypto-emoji", "CEMOJI") {
    }
}