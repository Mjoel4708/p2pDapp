const PeerToPeerLending = artifacts.require("PeerToPeerLending");

module.exports = function (deployer) {
  deployer.deploy(PeerToPeerLending);
};
