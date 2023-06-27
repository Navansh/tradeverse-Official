// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Store {
    using Counters for Counters.Counter;
    Counters.Counter private _storeID;
    Counters.Counter private _liveID;

    struct StoreData {
        address owner;
        string storeName;
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

    mapping(address => StoreData) public addressToStore;
    mapping(address => Stream) public addressToStream;
    mapping(address => mapping(uint256 => Stream)) public addressToUintStream;

    StoreData[] public arrayStore;
    Stream[] public arrayStream;

    function createAStore(
        string memory _storeName,
        string memory _category,
        string memory _name,
        string memory _lastName,
        string memory _description,
        string memory _location
    ) public {
        _storeID.increment();
        StoreData storage newStore = addressToStore[msg.sender];
        newStore.storeName = _storeName;
        newStore.owner = msg.sender;
        newStore.name = _name;
        newStore.category = _category;
        newStore.lastName = _lastName;
        newStore.description = _description;
        newStore.location = _location;
        newStore.id = _storeID.current();
        arrayStore.push(newStore);
    }

    function addProfileImage(string memory _profile) public {
        StoreData storage store = addressToStore[msg.sender];
        store.profileImg = _profile;
    }

    function addCoverImage(string memory _cover) public {
        StoreData storage store = addressToStore[msg.sender];
        store.coverImage = _cover;
    }

    function getStoreByAddress(address _owner) public view returns (StoreData memory) {
        return addressToStore[_owner];
    }

    function retrieveStreamInfo(address _owner) public view returns (bool, string memory, string memory) {
        Stream memory stream = addressToStream[_owner];
        return (stream.isActive, stream.streamId, stream.storeName);
    }

    function getAllStore() public view returns (StoreData[] memory) {
        return arrayStore;
    }

    function getAllStream() public view returns (Stream[] memory) {
        return arrayStream;
    }

    function cancelStream() public {
        delete addressToStream[msg.sender];
        addressToStream[msg.sender].isActive = false;
        addressToStream[msg.sender].streamId = "";
        arrayStream.push(addressToStream[msg.sender]);
    }

    function startStream(string memory _callId) public {
        require(!addressToStream[msg.sender].isActive, "You are already active");
        require(msg.sender != address(0), "Address cannot be zero");
        _liveID.increment();
        addressToStream[msg.sender].id = _liveID.current();
        addressToStream[msg.sender].streamId = _callId;
        addressToStream[msg.sender].isActive = true;
        addressToStream[msg.sender].storeName = addressToStore[msg.sender].storeName;
        addressToStream[msg.sender].owner = msg.sender;
        arrayStream.push(addressToStream[msg.sender]);
        _liveID.increment();
    }
}