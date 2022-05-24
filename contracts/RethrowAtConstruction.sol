// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract RethrowAtConstruction {
    constructor(address target, bytes memory data) {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        if (!success) {
            assembly {
                revert(add(32, returndata), mload(returndata))
            }
        }
    }
}
