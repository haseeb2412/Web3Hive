// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Transactions.sol";

contract TransactionsTest is Test {
    Transactions transactions;

    function setUp() public {
        transactions = new Transactions();
    }

    function testTransactionCount() public {
        assertEq(transactions.getTransactionCount(), 0);
    }

    function testAddTransaction() public {
        transactions.addtoBlockchain(payable(address(0x123)), 100, "Test", "Tag");
        assertEq(transactions.getTransactionCount(), 1);
    }
}
