// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Escrow.sol";

contract Products {
    enum OrderStatus {
        Available,
        Pending,
        Shipped,
        Delivered,
        Refunded
    }

    struct Live {
        string callId;
        string storeName;
        address[] participant;
    }

    struct Store {
        address owner;
        string storeName;
        bool isSellerActive;
        string category;
        string name;
        string lastName;
        address[] customer;
        string description;
        string meetingId;
    }

    struct Product {
        string name;
        string category;
        string imageLink;
        string descLink;
        uint price;
        uint index;
        OrderStatus status;
        uint256 quantity;
        string location;
        uint256 maxQuantity;
        address payable owner;
        uint256 refundTimeLimit;
    }

    struct Order {
        uint256 orderId;
        address buyer;
        address seller;
        uint256 price;
        OrderStatus status;
        bool isPaid;
        bool isFulfilled;
        bool isRefunded;
        Escrow escrow; // Instance of the Escrow contract
    }

    address owner;
    uint256 public orderIdCounter;
    mapping(uint256 => Live) lives;
    mapping(uint256 => Order) public orders;
    mapping(address => bool) public arbiters;
    mapping(uint256 => Product) products;
    mapping(address => Product[]) addressToProducts;
    mapping(address => Store) storeList;
    uint256 productsId;
    uint256 noOfLives;
    Product[] allProduct;
    Store[] allStores;
    Live[] allLives;

    event OrderCreated(uint256 orderId, address buyer, address seller, uint256 price);

    modifier onlyOwner() {
        require(
            msg.sender == storeList[msg.sender].owner,
            "Only the contract owner can call this function."
        );
        _;
    }

    modifier onlyBuyer(uint256 _orderId) {
        require(msg.sender == orders[_orderId].buyer, "Only the buyer can call this function.");
        _;
    }

    modifier onlySeller(uint256 _orderId) {
        require(msg.sender == orders[_orderId].seller, "Only the seller can call this function.");
        _;
    }

    modifier onlyIfStoreExist() {
        require(checkUserExists(msg.sender), "Store does not exist.");
        _;
    }

    // CHECK USER EXISTS
    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(storeList[pubkey].storeName).length > 0;
    }

    function createAStore(
        string memory _storeName,
        string memory _category,
        string memory _name,
        string memory _lastName,
        string memory _description
    ) external {
        Store storage newStore = storeList[msg.sender];
        newStore.storeName = _storeName;
        newStore.owner = msg.sender;
        newStore.name = _name;
        newStore.category = _category;
        newStore.lastName = _lastName;
        newStore.description = _description;
        newStore.isSellerActive = false;
    }

    function addProduct(
        string memory _name,
        string memory _category,
        string memory _imageLink,
        string memory _descLink,
        uint _price,
        string memory _location,
        uint256 _maxQuantity,
        uint256 _refundTimeLimit
    ) public onlyOwner onlyIfStoreExist returns (uint) {
        require(msg.sender != address(0), "Invalid sender address.");
        productsId++;
        Product storage newProduct = products[productsId];
        newProduct.name = _name;
        newProduct.owner = payable(msg.sender);
        newProduct.category = _category;
        newProduct.descLink = _descLink;
        newProduct.imageLink = _imageLink;
        newProduct.index = productsId;
        newProduct.location = _location;
        newProduct.maxQuantity = _maxQuantity;
        newProduct.price = _price;
        newProduct.quantity = 0;
        newProduct.status = OrderStatus.Available;
        newProduct.refundTimeLimit = _refundTimeLimit;
        allProduct.push(newProduct);
        return productsId;
    }

    function placeOrder(uint256 id, uint256 _price, address payable _arbiter) public payable {
        Order storage newOrder = orders[orderIdCounter];
        require(msg.value >= products[id].price, "Insufficient payment.");
        require(!newOrder.isPaid, "Payment has already been made.");
        require(products[id].status == OrderStatus.Available, "Product is not available.");
        address payable _seller = products[id].owner; // Only allow the owner to sell items for now
        Escrow escrowInstance = new Escrow();
        escrowInstance.initialize(_seller, _arbiter, _price);
        escrowInstance.deposit{value: msg.value}();
        orderIdCounter++;
        newOrder.orderId = orderIdCounter;
        newOrder.buyer = msg.sender;
        newOrder.seller = _seller;
        newOrder.price = _price;
        newOrder.status = OrderStatus.Pending;
        newOrder.isPaid = false;
        newOrder.isFulfilled = false;
        newOrder.isRefunded = false;
        newOrder.escrow = escrowInstance;
        storeList[products[id].owner].customer.push(msg.sender);
        emit OrderCreated(orderIdCounter, msg.sender, _seller, _price);
    }

    event OrderDelivered(uint256 orderId);

    function confirmDelivery(uint256 _orderId, bool _success) external onlyBuyer(_orderId) {
        Order storage order = orders[_orderId];
        require(order.isPaid, "Payment has not been made.");
        require(order.status == OrderStatus.Shipped, "Order has not been shipped.");

        // Call the confirmDelivery function in the Escrow contract
        order.escrow.confirmDelivery(_success);

        if (_success) {
            order.status = OrderStatus.Delivered;
        } else {
            order.status = OrderStatus.Refunded;
            order.isRefunded = true;
        }

        order.isFulfilled = true;

        emit OrderDelivered(_orderId);
    }

    event OrderRefunded(uint256 orderId);

    function refundOrder(uint256 _orderId) external onlySeller(_orderId) {
        Order storage order = orders[_orderId];
        require(order.isPaid, "Payment has not been made.");
        require(!order.isFulfilled, "Order has already been fulfilled.");

        // Check if the refund request is made within the time limit
        require(
            block.timestamp >= products[_orderId].refundTimeLimit,
            "Refund time limit has not been reached."
        );

        // Call the refundBuyer function in the Escrow contract
        order.escrow.refundBuyer();

        order.status = OrderStatus.Refunded;
        order.isRefunded = true;

        emit OrderRefunded(_orderId);
    }

    function getUserStoreDetails(
        address _owner
    )
        external
        view
        returns (
            address,
            string memory,
            bool,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            storeList[_owner].owner,
            storeList[_owner].category,
            storeList[_owner].isSellerActive,
            storeList[_owner].description,
            storeList[_owner].lastName,
            storeList[_owner].name,
            storeList[_owner].storeName
        );
    }

    function getProductByAddress(address _owner) external view returns(Product[] memory){
        return addressToProducts[_owner];
    }

    function startStream(string memory _callId) external returns (bool) {
        Live storage goLive = lives[noOfLives];
        goLive.callId = _callId;
        goLive.storeName = storeList[msg.sender].storeName;
        storeList[msg.sender].isSellerActive = true;
        storeList[msg.sender].meetingId = _callId;
        return storeList[msg.sender].isSellerActive;
    }

    function getLiveDetail() external view returns (Live[] memory) {
        return allLives;
    }

    function cancelLive(uint256 _id) external returns (bool) {
        delete lives[_id];
        storeList[msg.sender].isSellerActive = false;
        return storeList[msg.sender].isSellerActive;
    }
}
