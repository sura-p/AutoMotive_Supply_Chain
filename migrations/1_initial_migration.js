const productManagement = artifacts.require("ProductManagement");
const changeOwnerShip = artifacts.require("ChangeOwnership");
module.exports = function (deployer) {
  deployer.deploy(productManagement).then(function () {
    return deployer.deploy(changeOwnerShip, productManagement.address);
  });
};
