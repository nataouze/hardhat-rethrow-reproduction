// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract CustomErrorContract {
    error MyCustomErrror();

    function a() external pure {
        revert MyCustomErrror();
    }
}

