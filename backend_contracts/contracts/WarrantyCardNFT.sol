// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

error Product_Not_Purchased();
error Product_Creator_Unidentified();
error Product_Owner_Unidentified();
error Product_WarrantyPeriod_Over();

contract WarrantyCard is ERC721, ERC721URIStorage, ERC721Burnable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct nftInfo {
        uint256 duration;
        uint256 startTime;
        uint256 endTime;
    }

    address payable private i_nftCreator = payable(address(0)); // Store address of creator of Warranty Card
    // string public i_productName; // Stores the name/title of the product
    mapping(uint256 => nftInfo) private tokenIdToNFTInfo;

    // Only the creator of the product warranty card can call a function
    modifier onlyByCreator(address accountAddress) {
        if (accountAddress != i_nftCreator) {
            revert Product_Creator_Unidentified();
        }
        _;
    }

    // Only the owner of the product warranty card can call a function
    modifier onlyByOwner(address accountAddress, uint256 tokenId) {
        // address[] memory temp = tokenIdToNFTInfo[tokenId].owners;
        // uint256 len = temp.length;
        // address currentOwnerAddress = temp[len - 1];
        address currentOwnerAddress = ownerOf(tokenId);
        if (accountAddress != currentOwnerAddress) {
            revert Product_Owner_Unidentified();
        }
        _;
    }

    modifier checkForEndOfWarranty(uint256 tokenId) {
        if (tokenIdToNFTInfo[tokenId].endTime != 0) {
            if (block.timestamp >= tokenIdToNFTInfo[tokenId].endTime) {
                revert Product_WarrantyPeriod_Over();
            }
        }
        _;
    }

    // WarrantyCard Constructor takes in the warranty duration and productName as arguments
    // ERC721 takes the NFT name and another Shorthand
    constructor(string memory nftName, string memory nftShortHand)
        ERC721(nftName, nftShortHand)
    {
        i_nftCreator = payable(msg.sender);
    }

    // Set the starting and ending time of warranty, change start time on resale
    function changeWarrantyPeriod(bool hasPurchased, uint256 tokenId)
        public
        onlyByOwner(msg.sender, tokenId)
        checkForEndOfWarranty(tokenId)
    {
        // Revert the transaction if the product has not been purchased
        if (!hasPurchased) {
            revert Product_Not_Purchased();
        }

        tokenIdToNFTInfo[tokenId].startTime = block.timestamp;

        if (tokenIdToNFTInfo[tokenId].endTime == 0) {
            tokenIdToNFTInfo[tokenId].endTime =
                tokenIdToNFTInfo[tokenId].startTime +
                tokenIdToNFTInfo[tokenId].duration;
        }

        // tokenIdToNFTInfo[tokenId].owners.push(newOwner);
    }

    // Extend the duration of warranty. Only the brand/retailer can do so.
    // function extendWarrantyDuration(uint256 increasedDuration) public onlyByCreator(msg.sender) {
    //     warrantyDuration += increasedDuration;
    //     warrantyEndTime += increasedDuration;
    // }

    // Safely mint the tokens i.e. only the retailer can add more NFT's/warranty cards in this collection
    function safeMint(address to, string memory uri)
        public
        onlyByCreator(msg.sender)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setDurationForTokenId(uint256 tokenId, uint256 duration)
        public
        checkForEndOfWarranty(tokenId)
        onlyByCreator(msg.sender)
    {
        tokenIdToNFTInfo[tokenId] = nftInfo({
            duration: duration,
            startTime: 0,
            endTime: 0
        });
        // tokenIdToNFTInfo[tokenId].owners.push(msg.sender);
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

    function getCurrentWarrantyDuration(uint256 tokenId)
        public
        view
        checkForEndOfWarranty(tokenId)
        returns (uint256)
    {
        return tokenIdToNFTInfo[tokenId].duration;
    }

    function redeemWarranty(uint256 tokenId)
        public
        checkForEndOfWarranty(tokenId)
        onlyByOwner(msg.sender, tokenId)
    {
        tokenIdToNFTInfo[tokenId].endTime -= tokenIdToNFTInfo[tokenId].duration;
    }

    function getEndTime(uint256 tokenId) public view returns (uint256) {
        return tokenIdToNFTInfo[tokenId].endTime;
    }

    // function getPreviousOwner(uint256 tokenId, uint256 index) public view returns(address){
    //     address[] memory owners = tokenIdToNFTInfo[tokenId].owners;
    //     if(owners.length > 0){
    //         return owners[index];
    //     }
    //     return address(0);
    // }

    function getStartTime(uint256 tokenId) public view returns (uint256) {
        return tokenIdToNFTInfo[tokenId].startTime;
    }

    function getBlockTimeStamp() public view returns (uint256) {
        return block.timestamp;
    }
}
