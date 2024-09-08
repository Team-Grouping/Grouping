// SPDX-License-Identifier: BSD-3-Clause-Clear
pragma solidity >=0.8.13 <0.9.0;

import { inEuint32, euint32, FHE } from "@fhenixprotocol/contracts/FHE.sol";
import { FHERC20 } from "./fherc20.sol";
import "./ConfAddress.sol";

contract GroupPurchaseFHE is Permissioned {
    uint256 public purchaseCount;
    mapping(uint256 => Purchase) public purchases;
    address public seller;
    FHERC20 internal _wfhenix;
    euint32 internal CONST_0_ENCRYPTED;

    struct Purchase {
        euint32 goalAmount;
        euint32 totalPledged;
        euint32 deadline;
        bool goalReached;
        bool purchaseCompleted;
        bool purchaseCanceled;
        mapping(address => euint32) pledges;
        mapping(address => euint32) quantities; // 수량 정보를 암호화
    }

    event PurchaseProposed(uint256 indexed purchaseId, uint32 goalAmount, uint32 deadline);
    event Pledge(uint256 indexed purchaseId, uint32 amount, uint32 quantity); // 금액, 수량 따로 지정 (공동구매 뭐사는지에 따라 금액이 달라져서)
    event UnpledgeIssued(uint256 indexed purchaseId, uint32 amount);
    event PurchaseCompleted(uint256 indexed purchaseId, uint32 totalAmount);
    event PurchaseCanceled(uint256 indexed purchaseId);
    event FinalStatus(uint256 indexed purchaseId, bool success); // 공동구매 성사 여부

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this function");
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

    modifier goalNotReached(uint256 _purchaseId) {
        require(!purchases[_purchaseId].goalReached, "Goal has already been reached");
        _;
    }

    constructor(address wfhenix) {
        seller = msg.sender;
        _wfhenix = FHERC20(wfhenix);
        CONST_0_ENCRYPTED = FHE.asEuint32(0);
    }

    // 공동구매 제안
    function proposePurchase(inEuint32 calldata _goalAmount, inEuint32 calldata _duration) external onlySeller {
        require(FHE.decrypt(_goalAmount) > 0, "Goal amount must be greater than 0");
        require(FHE.decrypt(_duration) > 0, "Duration must be greater than 0");

        purchaseCount++;
        Purchase storage newPurchase = purchases[purchaseCount];
        newPurchase.goalAmount = _goalAmount;
        newPurchase.deadline = FHE.asEuint32(block.timestamp) + _duration;

        emit PurchaseProposed(purchaseCount, FHE.decrypt(_goalAmount), FHE.decrypt(newPurchase.deadline));
    }

    // 구매 (금액과 수량 수정)
    function pledge(uint256 _purchaseId, inEuint32 calldata amount, inEuint32 calldata quantity) 
        external 
        purchaseExists(_purchaseId) 
        beforeDeadline(_purchaseId) 
        goalNotReached(_purchaseId) 
    {
        require(FHE.decrypt(amount) > 0, "Pledge amount must be greater than 0");
        require(FHE.decrypt(quantity) > 0, "Quantity must be greater than 0");

        Purchase storage purchase = purchases[_purchaseId];
        euint32 spent = _wfhenix.transferFromEncrypted(msg.sender, address(this), amount);

        purchase.pledges[msg.sender] = purchase.pledges[msg.sender] + spent;
        purchase.quantities[msg.sender] = purchase.quantities[msg.sender] + quantity;
        purchase.totalPledged = purchase.totalPledged + spent;

        emit Pledge(_purchaseId, FHE.decrypt(spent), FHE.decrypt(quantity));

        if (FHE.decrypt(purchase.totalPledged) >= FHE.decrypt(purchase.goalAmount)) {
            purchase.goalReached = true;
        }
    }

    // 공동구매 완료 처리
    function completePurchase(uint256 _purchaseId) 
        external 
        onlySeller 
        purchaseExists(_purchaseId) 
    {
        Purchase storage purchase = purchases[_purchaseId];
        require(purchase.goalReached, "Goal amount not reached");

        purchase.purchaseCompleted = true;
        _wfhenix.transferEncrypted(msg.sender, purchase.totalPledged);

        emit PurchaseCompleted(_purchaseId, FHE.decrypt(purchase.totalPledged));
        emit FinalStatus(_purchaseId, true); // 공동구매 성사 여부 알림
    }

    // 공동구매 취소
    function cancelPurchase(uint256 _purchaseId) 
        external 
        onlySeller 
        purchaseExists(_purchaseId) 
    {
        Purchase storage purchase = purchases[_purchaseId];
        purchase.purchaseCanceled = true;

        refund(_purchaseId);
        emit PurchaseCanceled(_purchaseId);
        emit FinalStatus(_purchaseId, false); // 공동구매 실패 여부 알림
    }

    // 환불 처리
    function refund(uint256 _purchaseId) internal {
        Purchase storage purchase = purchases[_purchaseId];

        for (uint256 i = 0; i < purchaseCount; i++) {
            address pledger = address(i);
            euint32 pledgedAmount = purchase.pledges[pledger];

            if (FHE.decrypt(pledgedAmount) > 0) {
                purchase.pledges[pledger] = CONST_0_ENCRYPTED;
                _wfhenix.transferEncrypted(pledger, pledgedAmount);
                emit UnpledgeIssued(_purchaseId, FHE.decrypt(pledgedAmount));
            }
        }
    }

    // 사용자 자신의 구매 내역 조회 (본인만 접근 가능)
    function getUserPledge(uint256 _purchaseId, Permission memory signature) 
        public 
        view 
        onlyPermitted(signature, msg.sender) 
        returns (bytes memory) 
    {
        Purchase storage purchase = purchases[_purchaseId];
        require(FHE.isInitialized(purchase.pledges[msg.sender]), "No pledge found");
        return FHE.sealoutput(purchase.pledges[msg.sender], signature.publicKey);
    }

    // 공동구매 성사 여부 및 최종 금액 조회 (모든 참여자가 확인 가능)
    function getFinalDetails(uint256 _purchaseId) 
        external 
        view 
        returns (uint32 finalAmount, bool success) 
    {
        Purchase storage purchase = purchases[_purchaseId];
        require(purchase.purchaseCompleted || purchase.purchaseCanceled, "Purchase is not finalized");
        return (FHE.decrypt(purchase.totalPledged), purchase.goalReached);
    }

    // 공동구매 마감일까지 남은 시간 조회
    function getRemainingTime(uint256 _purchaseId) 
        external 
        view 
        purchaseExists(_purchaseId) 
        returns (uint32) 
    {
        if (FHE.decrypt(purchases[_purchaseId].deadline) <= block.timestamp) {
            return 0;
        }
        return FHE.decrypt(purchases[_purchaseId].deadline) - uint32(block.timestamp);
    }
}