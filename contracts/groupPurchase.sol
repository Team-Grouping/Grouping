// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity >=0.8.13 <0.9.0;

import { inEuint32, euint32, FHE } from "@fhenixprotocol/contracts/FHE.sol";
import { FHERC20 } from "./fherc20.sol";

struct Purchase {
    euint32 goalAmount;
    euint32 totalPledged;
    euint32 deadline;
    bool goalReached;
    bool purchaseCompleted;
    bool purchaseCanceled;
    mapping(address => euint32) pledges;
}

contract GroupPurchaseFHE {
    uint256 public purchaseCount;
    mapping(uint256 => Purchase) public purchases;
    address public admin;
    FHERC20 internal _wfhenix;
    euint32 internal CONST_0_ENCRYPTED;

    event PurchaseProposed(uint256 indexed purchaseId, uint32 goalAmount, uint32 deadline);
    event Pledge(uint256 indexed purchaseId, address indexed pledger, uint32 amount);
    event PurchaseCompleted(uint256 indexed purchaseId, uint32 totalAmount);
    event PurchaseCanceled(uint256 indexed purchaseId);
    event RefundIssued(uint256 indexed purchaseId, address indexed pledger, uint32 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier purchaseExists(uint256 _purchaseId) {
        require(_purchaseId > 0 && _purchaseId <= purchaseCount, "Purchase does not exist");
        _;
    }

    modifier beforeDeadline(uint256 _purchaseId) {
        require(FHE.decrypt(purchases[_purchaseId].deadline) > block.timestamp, "Purchase deadline has passed");
        _;
    }

    modifier afterDeadline(uint256 _purchaseId) {
        require(FHE.decrypt(purchases[_purchaseId].deadline) <= block.timestamp, "Purchase deadline not yet reached");
        _;
    }

    modifier goalNotReached(uint256 _purchaseId) {
        require(!purchases[_purchaseId].goalReached, "Goal has already been reached");
        _;
    }

    modifier purchaseNotCompleted(uint256 _purchaseId) {
        require(!purchases[_purchaseId].purchaseCompleted, "Purchase has already been completed");
        _;
    }

    modifier purchaseNotCanceled(uint256 _purchaseId) {
        require(!purchases[_purchaseId].purchaseCanceled, "Purchase has been canceled");
        _;
    }

    constructor(address wfhenix) {
        admin = msg.sender;
        _wfhenix = FHERC20(wfhenix);
        CONST_0_ENCRYPTED = FHE.asEuint32(0);
    }

    function proposePurchase(inEuint32 calldata _goalAmount, inEuint32 calldata _duration) external {
        require(FHE.decrypt(_goalAmount) > 0, "Goal amount must be greater than 0");
        require(FHE.decrypt(_duration) > 0, "Duration must be greater than 0");

        purchaseCount++;
        Purchase storage newPurchase = purchases[purchaseCount];
        newPurchase.goalAmount = _goalAmount;
        newPurchase.deadline = FHE.asEuint32(block.timestamp) + _duration;

        emit PurchaseProposed(purchaseCount, FHE.decrypt(_goalAmount), FHE.decrypt(newPurchase.deadline));
    }

    function pledge(uint256 _purchaseId, inEuint32 calldata amount) external purchaseExists(_purchaseId) beforeDeadline(_purchaseId) purchaseNotCanceled(_purchaseId) goalNotReached(_purchaseId) {
        require(FHE.decrypt(amount) > 0, "Pledge amount must be greater than 0");

        Purchase storage purchase = purchases[_purchaseId];
        euint32 spent = _wfhenix.transferFromEncrypted(msg.sender, address(this), amount);

        purchase.pledges[msg.sender] = purchase.pledges[msg.sender] + spent;
        purchase.totalPledged = purchase.totalPledged + spent;

        emit Pledge(_purchaseId, msg.sender, FHE.decrypt(spent));

        if (FHE.decrypt(purchase.totalPledged) >= FHE.decrypt(purchase.goalAmount)) {
            purchase.goalReached = true;
        }
    }

    function completePurchase(uint256 _purchaseId) external onlyAdmin purchaseExists(_purchaseId) afterDeadline(_purchaseId) purchaseNotCompleted(_purchaseId) purchaseNotCanceled(_purchaseId) {
        Purchase storage purchase = purchases[_purchaseId];
        require(purchase.goalReached, "Goal amount not reached");

        purchase.purchaseCompleted = true;
        _wfhenix.transferEncrypted(msg.sender, purchase.totalPledged);

        emit PurchaseCompleted(_purchaseId, FHE.decrypt(purchase.totalPledged));
    }

    function cancelPurchase(uint256 _purchaseId) external onlyAdmin purchaseExists(_purchaseId) beforeDeadline(_purchaseId) purchaseNotCanceled(_purchaseId) {
        Purchase storage purchase = purchases[_purchaseId];
        purchase.purchaseCanceled = true;

        emit PurchaseCanceled(_purchaseId);
    }

    function refund(uint256 _purchaseId) external purchaseExists(_purchaseId) afterDeadline(_purchaseId) purchaseNotCompleted(_purchaseId) {
        Purchase storage purchase = purchases[_purchaseId];
        require(purchase.purchaseCanceled || !purchase.goalReached, "Refunds are only available if purchase is canceled or goal not reached");

        euint32 pledgedAmount = purchase.pledges[msg.sender];
        require(FHE.decrypt(pledgedAmount) > 0, "No pledges to refund");

        purchase.pledges[msg.sender] = CONST_0_ENCRYPTED;
        _wfhenix.transferEncrypted(msg.sender, pledgedAmount);

        emit RefundIssued(_purchaseId, msg.sender, FHE.decrypt(pledgedAmount));
    }

    function getPledge(uint256 _purchaseId, address _pledger) external view purchaseExists(_purchaseId) returns (uint32) {
        return FHE.decrypt(purchases[_purchaseId].pledges[_pledger]);
    }

    function getRemainingTime(uint256 _purchaseId) external view purchaseExists(_purchaseId) returns (uint32) {
        if (FHE.decrypt(purchases[_purchaseId].deadline) <= block.timestamp) {
            return 0;
        }
        return FHE.decrypt(purchases[_purchaseId].deadline) - uint32(block.timestamp);
    }
}