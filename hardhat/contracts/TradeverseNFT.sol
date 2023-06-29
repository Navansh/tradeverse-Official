// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TradeverseNFT is ERC1155, ERC1155Supply {
    address owner;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    constructor(uint256 id, uint256 amount) ERC1155("") {
        owner = payable(msg.sender);

        _setApprovalForAll(address(this), owner, true);
        _mint(msg.sender, id, amount, "");
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(uint256 id, uint256 amount) public {
        _setApprovalForAll(owner, msg.sender, true);
        safeTransferFrom(owner, msg.sender, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}
