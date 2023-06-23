
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Products.sol";

contract Escrow {
    address payable public buyer;
    address payable public seller;
    address payable public arbiter;
    uint public price;
    bool public isPaid;
    bool public isDelivered;
    
    event PaymentReleased(address receiver, uint amount);
    event DeliveryConfirmed(bool success);

    function initialize(address payable _seller, address _arbiter, uint256 _price) external payable {
         require(msg.value > 0);
        buyer = payable(msg.sender);
        seller = _seller;
        arbiter = payable(_arbiter);
        price = _price;
        isPaid = false;
        isDelivered = false;
    }
    
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function.");
        _;
    }
    
    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this function.");
        _;
    }
    
    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this function.");
        _;
    }
    
    modifier inEscrow() {
        require(!isPaid && !isDelivered, "Escrow is already completed.");
        _;
    }
    
    function deposit() external payable onlyBuyer inEscrow {
        require(msg.value == price, "Incorrect deposit amount.");
        payable(address(this)).transfer(msg.value);
        isPaid = true;
    }
    
    function confirmDelivery(bool success) external onlyBuyer {
        require(isPaid, "Payment has not been made.");
        require(!isDelivered, "Delivery is already confirmed.");
        
        if (success) {
            seller.transfer(price);
            emit PaymentReleased(seller, price);
        } else {
            buyer.transfer(price);
            emit PaymentReleased(buyer, price);
        }
        
        isDelivered = true;
        emit DeliveryConfirmed(success);
    }
    
    function refundBuyer() external onlyBuyer {
        require(isPaid, "Payment has not been made.");
        require(!isDelivered, "Delivery is already confirmed.");
        
        buyer.transfer(price);
        emit PaymentReleased(buyer, price);
        
        isPaid = false;
        isDelivered = true;
        emit DeliveryConfirmed(false);
    }
    
    function withdrawArbiterFees() external onlyArbiter {
        require(isPaid && isDelivered, "Escrow is not completed yet.");
        
        uint arbiterFee = address(this).balance;
        arbiter.transfer(arbiterFee);
        emit PaymentReleased(arbiter, arbiterFee);
    }

    function getContractBalance() external view  returns(uint) {
        return address(this).balance;
    }
}
