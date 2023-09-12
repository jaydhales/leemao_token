// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LMAO is ERC20("LEEMAO", "LMAO"), Ownable {
    constructor() {
        _mint(msg.sender, 1_000e18);
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        uint amountToDeduct = (amount * 8) / 100;
        uint amountToSend = amount - amountToDeduct;

        super._transfer(from, to, amountToSend);
        super._transfer(from, owner(), amountToDeduct);
    }
}