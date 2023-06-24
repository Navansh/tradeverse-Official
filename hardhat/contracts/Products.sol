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
        string location;
    }

    struct Product {
        string name;
        string category;
        string[] imageLink;
        string descLink;
        uint price;
        uint index;
        OrderStatus status;
        string location;
        uint256 maxQuantity;
        address payable owner;
        uint256 shippingFee;
        bool sellerActive;
        string meetingId;
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

    struct StoreImage {
        string profile;
        string coverImage;
    }

    address owner;
    uint256 public orderIdCounter;
    mapping(address => StoreImage) addressToImages;
    mapping(uint256 => Live) lives;
    mapping(uint256 => Order) public orders;
    mapping(address => bool) public arbiters;
    mapping(uint256 => Product) products;
    mapping(address => Product[]) addressToProducts;
    mapping(address => Product) addressToSingleProduct;
    mapping(address => Store) storeList;
    uint256 productsId;
    uint256 noOfLives;
    Product[] allProduct;
    Store[] allStores;
    Live[] allLives;
    Order[] allOrders;

    function addProfile(string memory _profile) external {
        StoreImage storage newProfile = addressToImages[msg.sender];
        newProfile.profile = _profile;
    }

    function addCoverImage(string memory _profile) external {
        StoreImage storage newProfile = addressToImages[msg.sender];
        newProfile.profile = _profile;
    }

    event OrderCreated(
        uint256 orderId,
        address buyer,
        address seller,
        uint256 price
    );

    modifier onlyOwner() {
        require(
            msg.sender == storeList[msg.sender].owner,
            "Only the contract owner can call this function."
        );
        _;
    }

    modifier onlyBuyer(uint256 _orderId) {
        require(
            msg.sender == orders[_orderId].buyer,
            "Only the buyer can call this function."
        );
        _;
    }

    modifier onlySeller(uint256 _orderId) {
        require(
            msg.sender == orders[_orderId].seller,
            "Only the seller can call this function."
        );
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
        string memory _description,
        string memory _location
    ) external {
        Store storage newStore = storeList[msg.sender];
        newStore.storeName = _storeName;
        newStore.owner = msg.sender;
        newStore.name = _name;
        newStore.category = _category;
        newStore.lastName = _lastName;
        newStore.description = _description;
        newStore.isSellerActive = false;
        newStore.location = _location;
        allStores.push(newStore);
    }

    function addProduct(
        string memory _name,
        string memory _category,
        string[] memory _imageLink,
        string memory _descLink,
        uint _price,
        string memory _location,
        uint256 _maxQuantity,
        uint256 _refundTimeLimit
    ) public onlyIfStoreExist returns (uint) {
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
        newProduct.status = OrderStatus.Available;
        newProduct.shippingFee = _refundTimeLimit;
        newProduct.sellerActive = false;
        allProduct.push(newProduct);
        return productsId;
    }

    function placeOrder(uint256 id, uint256 _price) public payable {
        Order storage newOrder = orders[orderIdCounter];
        require(msg.value >= products[id].price, "Insufficient payment.");
        require(!newOrder.isPaid, "Payment has already been made.");
        require(
            products[id].status == OrderStatus.Available,
            "Product is not available."
        );
        address payable _seller = products[id].owner; // Only allow the owner to sell items for now
        Escrow escrowInstance = new Escrow();
        escrowInstance.initialize(
            _seller,
            0x8D45EA72697C5f395EE1509cB39067Cb977d9Cb6,
            _price
        );
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
        allOrders.push(newOrder);
        storeList[products[id].owner].customer.push(msg.sender);
        emit OrderCreated(orderIdCounter, msg.sender, _seller, _price);
    }

    event OrderDelivered(uint256 orderId);

    function confirmDelivery(
        uint256 _orderId,
        bool _success
    ) external onlyBuyer(_orderId) {
        Order storage order = orders[_orderId];
        require(order.isPaid, "Payment has not been made.");
        require(
            order.status == OrderStatus.Shipped,
            "Order has not been shipped."
        );

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

        // Call the refundBuyer function in the Escrow contract
        order.escrow.refundBuyer();

        order.status = OrderStatus.Refunded;
        order.isRefunded = true;

        emit OrderRefunded(_orderId);
    }

    function getStoreDetails() external view returns (Store[] memory) {
        return allStores;
    }

    function getProductDetails() external view returns (Product[] memory) {
        return allProduct;
    }

    function getAllOrder() external view returns (Order[] memory) {
        return allOrders;
    }

    function getProductByAddress(
        address _owner
    ) external view returns (Product[] memory) {
        return addressToProducts[_owner];
    }

    function startStream(
        string memory _callId
    ) external onlyIfStoreExist returns (bool) {
        Live storage goLive = lives[noOfLives];
        goLive.callId = _callId;
        goLive.storeName = storeList[msg.sender].storeName;
        storeList[msg.sender].isSellerActive = true;
        storeList[msg.sender].meetingId = _callId; 
        addressToSingleProduct[msg.sender].sellerActive = true;
        addressToSingleProduct[msg.sender].meetingId = _callId;
        return storeList[msg.sender].isSellerActive;
    }

    function getLiveDetail() external view returns (Live[] memory) {
        return allLives;
    }

    function cancelLive(uint256 _id) external returns (bool) {
        delete lives[_id];
        storeList[msg.sender].isSellerActive = false;
        addressToSingleProduct[msg.sender].sellerActive = false;
        return storeList[msg.sender].isSellerActive;
    }

    function isSellerActive(address _owner) external view returns (bool) {
        return storeList[_owner].isSellerActive;
    }
}
