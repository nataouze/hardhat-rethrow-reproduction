// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract RethrowAtFunctionCall {
    function test(address target, bytes memory data) external {
        (bool success, bytes memory returndata) = target.delegatecall(data);
        if (!success) {
            assembly {
                revert(add(32, returndata), mload(returndata))
            }
        }
    }
}
