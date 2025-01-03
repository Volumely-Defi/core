// hardhat.config.ts

import "dotenv/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-solhint";
import "@nomiclabs/hardhat-ethers";
// import "@tenderly/hardhat-tenderly";
import "@nomiclabs/hardhat-waffle";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-abi-exporter";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import "hardhat-gas-reporter";
import "hardhat-spdx-license-identifier";
import "hardhat-typechain";
import "hardhat-watcher";
import "solidity-coverage";
// import "./tasks"

import { HardhatUserConfig } from "hardhat/types";
import { removeConsoleLog } from "hardhat-preprocessor";

const accounts = {
  mnemonic:
    process.env.MNEMONIC ||
    "test test test test test test test test test test test junk",
  // accountsBalance: "990000000000000000000",
};

const accountKey = ["0x5fbf7d84cec4fc2737046b3990f1e109b205787a94c95ad9eb9e6809196a654d","0x5fbf7d84cec4fc2737046b3990f1e109b205787a94c95ad9eb9e6809196a654d","0x5fbf7d84cec4fc2737046b3990f1e109b205787a94c95ad9eb9e6809196a654d","0x5fbf7d84cec4fc2737046b3990f1e109b205787a94c95ad9eb9e6809196a654d"];

const config: HardhatUserConfig = {
  abiExporter: {
    path: "./abi",
    clear: false,
    flat: true,
    // only: [],
    // except: []
  },
  solidity: {
    compilers: [
       {
        version: "0.8.17",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.13",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.12",
        settings: {
          viaIR: true,
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.2",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },

      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },

      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.4.18",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: "8XW3YQUACFABZK7HVMDDNKXQTYR8HVEAYY",
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  gasReporter: {
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    currency: "USD",
    enabled: process.env.REPORT_GAS === "true",
    excludeContracts: ["contracts/mocks/", "contracts/libraries/"],
  },
  mocha: {
    timeout: 20000,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    dev: {
      // Default to 1
      default: 0,
    },
    treasury: {
      default: 1,
    },
    investor: {
      default: 2,
    },
  },
  networks: {
 
    hardhat: {
      forking: {
        enabled: true,
        url: "https://api.avax.network/ext/bc/C/rpc",
        blockNumber: 6394745,
      },
      live: false,
      saveDeployments: true,
      tags: ["test", "local"],
    },
  
    arbitrum: {
      url: "https://arb1.arbitrum.io/rpc",
      accounts: accountKey,
      chainId: 42161,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
      gas: "auto",
      gasPrice: "auto",
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: accountKey,
      chainId: 8453,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasMultiplier: 2,
      gas: "auto",
      gasPrice: "auto",
    },

 
  },
  paths: {
    artifacts: "artifacts",
    cache: "cache",
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
    sources: "contracts",
    tests: "test",
  },
  preprocess: {
    eachLine: removeConsoleLog(
      (bre) =>
        bre.network.name !== "hardhat" && bre.network.name !== "localhost"
    ),
  },

  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  // tenderly: {
  //   project: process.env.TENDERLY_PROJECT!,
  //   username: process.env.TENDERLY_USERNAME!,
  // },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  watcher: {
    compile: {
      tasks: ["compile"],
      files: ["./contracts"],
      verbose: true,
    },
  },
};

export default config;