const emoji = artifacts.require("emoji");

module.exports = function (deployer) {
  deployer.deploy(emoji);
};
