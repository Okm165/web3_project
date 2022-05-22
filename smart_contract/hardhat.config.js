require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    goerli: {
      url: 'https://eth-goerli.alchemyapi.io/v2/lS46eXnQ0-jlvTpqY9GG6aXgavNnXxwy',
      accounts: ['637cf0cb529ff41499db61e0913674570ebd68c9d7c9a7a021cffd3c02c85427']
    }
  }
}