// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract emoji is ERC721, ERC721Enumerable {
    string[] public emojis;
    // A mapping that checks if this colour exists
    mapping(string => bool) _emojiExists;
    
    // basically specifying the inital name and symbol for the token
    constructor() ERC721("crypto-emoji", "CEMOJI") {
    }
    
    // Open Zeppelin's contracts overridden
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Keeping this function public allows anyone to call the mint function. 
    // However in real projects, the minter roles are specific ..
    function mint(string memory _emoji) public payable {
        // Require unique emoji
        require(!_emojiExists[_emoji]);
        
        // Add the emoji to the array
        emojis.push(_emoji);
        uint _id = emojis.length - 1;

        // Call the mint function
        _mint(msg.sender, _id);
        
        // Emoji - track it
        _emojiExists[_emoji] = true;

    }

}