import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import ChangeOwnership from "../artifacts/ChangeOwnership.json";
import ProductManagenment from "../artifacts/ProductManagement.json";
const signerMetaMask = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return provider.getSigner();
};
function CarScreen() {
   
    const [signer, setSigner] = useState();
    const [productContract, setProductContract] = useState()
    const [ownershipContract, setOwnershipContract] = useState();
    const [partOwned,setPartOwner] = useState()
  useEffect(() => {
      signerMetaMask().then((ele) => {
         const productContract = new ethers.Contract(
          ProductManagenment.networks[11155111].address,
           ProductManagenment.abi,
           ele
         );
         const ownershipContract = new ethers.Contract(
            ChangeOwnership.networks[11155111].address,
           ChangeOwnership.abi,
           ele
         );
          
          
          setSigner(ele);
          setOwnershipContract(ownershipContract);
          setProductContract(productContract)
    });
      productContract.getPartList().then((ele) => {
          Promise.all(ele.map(async(ele1) => {
                  let owner = await ownershipContract.currentPartOwner(ele1);
              if (signer.address == owner) {
                      setPartOwner(ele)
                  }
              }))
          });
    
  }, []);
  console.log("signer", signer);
  return (
    <>
      <h2>Car Factory</h2>
      <div class="row">
        <div class="col s6">
          <label>Address: </label>
          <p id="car-factory-address">{signer?.address}</p>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <div id="car-part-list" class="collection with-header">
            <p class="collection-header">Parts Owned</p>
          </div>
        </div>
        <div class="col s6">
          <label>Serial Number: </label>
          <input
            type="text"
            id="create-car-serial-number"
            placeholder="Car Serial Number"
          />
          <button id="build-car" class="waves-effect waves-light btn">
            Build Car
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <div id="car-list" class="collection with-header">
            <p class="collection-header">Cars Owned</p>
          </div>
        </div>
        <div class="col s6">
          <div id="car-list-details">
            <label>Manufacturer Address:</label>
            <p id="car-details-address"></p>
            <label>Serial Number:</label>
            <p id="car-details-serial-num"></p>
            <label>Parts:</label>
            <p id="car-details-parts"></p>
            <label>Creation Date:</label>
            <p id="car-details-creation-date"></p>
            <input
              id="car-change-ownership-input"
              type="text"
              placeholder="Insert address"
            />
            <button
              id="car-change-ownership-btn"
              class="waves-effect waves-light btn"
            >
              Change Ownership
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarScreen;
