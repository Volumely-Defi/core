// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "../utils/Governable.sol";

contract Chainlink is Governable {

    // -- Constants -- //

    uint256 public constant UNIT = 10**18;
    uint256 public constant GRACE_PERIOD_TIME = 3600;


    // -- Variables -- //
    
    AggregatorV3Interface internal sequencerUptimeFeed;

    // -- Errors -- //

    error SequencerDown();
    error GracePeriodNotOver();

    /**
    * For a list of available sequencer proxy addresses, see:
    * https://docs.chain.link/docs/l2-sequencer-flag/#available-networks
    */

    // -- Constructor -- //

    constructor() Governable() {
      // ETH Price feed
        sequencerUptimeFeed = AggregatorV3Interface(0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70);
    }

    function getPrice(address feed) public view returns (uint256) {

        if (feed == address(0)) return 0;

    	(
	      /*uint80 roundId*/,
	      int256 answer,
	      uint256 startedAt,
	      /*uint256 updatedAt*/,
	      /*uint80 answeredInRound*/
	    ) = sequencerUptimeFeed.latestRoundData();

	    // Answer == 0: Sequencer is up
	    // Answer == 1: Sequencer is down
	    bool isSequencerUp = answer == 0;
	    if (!isSequencerUp) {
	      revert SequencerDown();
	    }

	    // Make sure the grace period has passed after the sequencer is back up.
	    uint256 timeSinceUp = block.timestamp - startedAt;

	    if (timeSinceUp <= GRACE_PERIOD_TIME) {
	      revert GracePeriodNotOver();
	    }

    	AggregatorV3Interface priceFeed = AggregatorV3Interface(feed);
        (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();

        uint8 decimals = priceFeed.decimals();

        // Return 18 decimals standard
        return uint256(price) * UNIT / 10**decimals;

    }

}