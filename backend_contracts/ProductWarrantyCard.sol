// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.1/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.1/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.7.1/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@4.7.1/utils/Counters.sol";

error Product_Not_Purchased();
error Product_Creator_Unidentified();
error Product_Owner_Unidentified();

contract WarrantyCard is ERC721, ERC721URIStorage, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public currentOwner; // Store address of current owner of Warranty Card
    address payable private i_nftCreator = payable(address(0)); // Store address of creator of Warranty Card
    uint256 private warrantyDuration; // Store the duration of warranty
    address[] private allOwners; // Stores the addresses of all the owners in order of purchase history
    string public i_productName; // Stores the name/title of the product
    uint256 private warrantyStartTime;
    uint256 private warrantyEndTime;

    // Only the creator of the product warranty card can call a function
    modifier onlyByCreator(address accountAddress) {
        if (accountAddress != i_nftCreator) {
            revert Product_Creator_Unidentified();
        }
        _;
    }

    // Only the owner of the product warranty card can call a function
    modifier onlyByOwner(address accountAddress) {
        if (accountAddress != currentOwner) {
            revert Product_Owner_Unidentified();
        }
        _;
    }

    // WarrantyCard Constructor takes in the warranty duration and productName as arguments
    // ERC721 takes the NFT name and another Shorthand
    constructor(
        uint256 duration,
        string memory productName,
        string memory productUri
    ) ERC721("WarrantyCard", "WFP") {
        // Set the values of variables
        currentOwner = msg.sender;
        i_nftCreator = payable(msg.sender);
        warrantyDuration = duration;
        i_productName = productName;
        safeMint(msg.sender, productUri);
    }

    // Change/Transfer ownership of a product warranty card upon resale
    function changeCurrentOwner(bool hasPurchased, address newOwner)
        public
        onlyByOwner(msg.sender)
    {
        // Revert the transaction if the product has not been purchased
        if (!hasPurchased) {
            revert Product_Not_Purchased();
        }

        warrantyStartTime = block.timestamp;
        warrantyEndTime = warrantyStartTime + warrantyDuration;
        currentOwner = newOwner;
        allOwners.push(newOwner);
    }

    // Extend the duration of warranty. Only the brand/retailer can do so.
    function extendWarrantyDuration(uint256 increasedDuration)
        public
        onlyByCreator(msg.sender)
    {
        warrantyDuration += increasedDuration;
        warrantyEndTime += increasedDuration;
    }

    function checkForEndOfWarranty() public {
        if (block.timestamp >= warrantyEndTime) {
            selfdestruct(i_nftCreator);
        }
    }

    // Safely mint the tokens i.e. only the retailer can add more NFT's in this collection
    function safeMint(address to, string memory uri)
        public
        onlyByCreator(msg.sender)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // Returns the tokenURI i.e the json metadata
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // function getCurrentOwner() public view returns(address){
    //     if(currentOwner != i_nftCreator){
    //         return currentOwner;
    //     }

    //     return address(0);
    // }

    function getCurrentWarrantyDuration() public view returns (uint256) {
        return warrantyDuration;
    }

    function getEndTime() public view returns (uint256) {
        return warrantyEndTime;
    }

    function getPreviousOwner(uint256 index) public view returns (address) {
        if (allOwners.length > 0 && allOwners[index] != currentOwner) {
            return allOwners[index];
        }
        return address(0);
    }

    function getStartTime() public view returns (uint256) {
        return warrantyStartTime;
    }

    function getBlockTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }

    function getProductName() public view returns (string memory) {
        return i_productName;
    }
}
