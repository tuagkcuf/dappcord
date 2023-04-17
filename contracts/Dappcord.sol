// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721 {
    uint256 public totalChannels;
    address public owner;

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;
    }

    mapping (uint256 => Channel) channels;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
    }

    function createChannel(string memory _name, uint256 _cost) public {
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }

    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }
}