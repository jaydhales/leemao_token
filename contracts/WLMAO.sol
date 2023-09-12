// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WrappedLMAO is ERC20("Wrapped Leemao", "WLMO") {
    IERC20 public Lmao;
    constructor(address _lmao) {
        Lmao = IERC20(_lmao);
    }
    function depositLMAO(uint _amount) external {
        bool success = Lmao.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transfer from Failed");
        uint amountToMint = (_amount * 92) / 100;
        _mint(msg.sender, amountToMint);
    }

    function withdrawLMAO(uint _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Insufficient Amount");
        _burn(msg.sender, _amount);
        Lmao.transfer(msg.sender, _amount);
    }
}
