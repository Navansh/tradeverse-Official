//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Stores {
    using Counters for Counters.Counter;
    Counters.Counter private _storeID;
    Counters.Counter private _liveID;

    struct Store {
        address owner;
        string storeName;
        bool isSellerActive;
        string category;
        string name;
        string lastName;
        string description;
        string location;
        string profileImg;
        string coverImage;
        uint256 id;
    }

    struct Stream {
        uint256 id;
        string streamId;
        string storeName;
        address owner;
        bool isActive;
    }

    Store[] arrayStore;
    Stream[] arrayStream;
    mapping(address => Store) public addressToStore;
    mapping(address => Stream) public addressToStream;
    mapping(address => mapping(uint256 => Stream)) public addressToUintStream;

    function createAStore(
        string memory _storeName,
        string memory _category,
        string memory _name,
        string memory _lastName,
        string memory _description,
        string memory _location
    ) external {
        Store storage newStore = addressToStore[msg.sender];
        _storeID.increment();
        newStore.storeName = _storeName;
        newStore.owner = msg.sender;
        newStore.name = _name;
        newStore.category = _category;
        newStore.lastName = _lastName;
        newStore.description = _description;
        newStore.isSellerActive = false;
        newStore.location = _location;
        newStore.id = _storeID.current();
        arrayStore.push(newStore);
    }

    function getStoreByAddress(
        address _owner
    ) external view returns (Store memory) {
        return addressToStore[_owner];
    }

    function retriveStreamInfo(
        address _owner
    ) external view returns (bool, string memory, string memory) {
        return (
            addressToStream[_owner].isActive,
            addressToStream[_owner].streamId,
            addressToStream[_owner].storeName
        );
    }

    function getAllStore() external view returns (Store[] memory) {
        return arrayStore;
    }

    function getAllStream() external view returns (Stream[] memory) {
        return arrayStream;
    }

    function cancelStream(uint id) external {
        delete addressToUintStream[msg.sender][id];
    }

    function startStream(string memory _callId) external {
        require(!addressToStore[msg.sender].isSellerActive, "You Active");
        require(msg.sender != address(0), "address cant be zero");
        _liveID.increment();
        addressToStream[msg.sender].id = _liveID.current();
        addressToStore[msg.sender].isSellerActive = true;
        addressToStream[msg.sender].streamId = _callId;
        addressToStream[msg.sender].isActive = true;
        addressToStream[msg.sender].storeName = addressToStore[msg.sender]
            .storeName;
        _liveID.increment();
    }
}
