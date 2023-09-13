import React, { useEffect, useState } from "react";
import * as ethers from "ethers";
import ChangeOwnership from "../artifacts/ChangeOwnership.json";
import ProductManagenment from "../artifacts/ProductManagement.json";
function PartScreen(props) {
  const [partOwned, getPartOwner] = useState([]);
  useEffect(() => {
    getPartOwner(JSON.parse(localStorage.getItem("partHash")));
  }, []);

  console.log(partOwned);
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/Zg0fGGNnFHhAll9YiaK2vz6YkhdeFNqB"
  );
  console.log(provider);
  const productContract = new ethers.Contract(
    "0xddA97267b9b8a8aAd51E3d3e9a9DF96768389251",
    ProductManagenment.abi,
    props.signer
  );
  const ownershipContract = new ethers.Contract(
    "0x34E7cB6E1c4eD88A94b79b8924FE1ad7AFF7cb34",
    ChangeOwnership.abi,
    props.signer
  );

  const [partInfo, setPartInfo] = useState({ serialNo: "", partType: "" });

  const handlePartInfoChange = (e) => {
    setPartInfo({ ...partInfo, [e.target.name]: e.target.value });
  };
  console.log(partInfo);
  const handleSubmit = async (event) => {
    event.preventDefault();
   let data =  await productContract.parts.staticCall(
      "0x954941535ba4f42388623cca1b0f2535e10ee2466d640a2d1078436c9ed37424"
   );
    console.log(data["0"]);
    // let array = [];
    // let partHash = JSON.parse(localStorage.getItem("partHash"));
    // const data = await productContract.buildPart.staticCall(
    //   partInfo.serialNo,
    //   partInfo.partType,
    //   new Date()
    // );
    // await productContract.buildPart(
    //   partInfo.serialNo,
    //   partInfo.partType,
    //   new Date()
    // );
    // if (partHash) {
    //   partHash.push(data);
    //   localStorage.setItem("partHash", JSON.stringify(partHash));
    // } else {
    //   array.push(data);
    //   localStorage.setItem("partHash", JSON.stringify(array));
    // }
  };
  return (
    <>
      <h2>Part Factory</h2>
      <div class="row">
        <div class="col s6">
          <label>Address: </label>
          <p id="part-factory-address">{props.signer.address}</p>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div class="row">
          <div class="col s12">
            <label>Serial Number: </label>
            <input
              type="text"
              id="create-serial-number"
              name="serialNo"
              placeholder="Part Serial Number"
              value={partInfo.serialNo}
              onChange={handlePartInfoChange}
            />
            <label>Part Type: </label>
            <select
              id="create-part-type"
              class="browser-default"
              name="partType"
              value={partInfo.partType}
              onChange={handlePartInfoChange}
            >
              <option value="wheel">Wheel</option>
              <option value="Engine">Engine</option>
              <option value="Transmission">Transmission</option>
            </select>
            <button
              type="submit"
              id="build-part"
              class="waves-effect waves-light btn"
            >
              Build Part
            </button>
          </div>
        </div>
      </form>
      <div class="row">
        <div id="part-list" class="collection with-header">
          <p class="collection-header">Parts Owned</p>
          {partOwned.map((ele, i) => {
            return <p class="collection-header">{ele}</p>;
          })}
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div id="part-list-details">
            <label>Manufacturer Address:</label>
            <p id="details-address"></p>
            <label>Serial Number:</label>
            <p id="details-serial-num"></p>
            <label>Part Type:</label>
            <p id="details-part-type"></p>
            <label>Creation Date:</label>
            <p id="details-creation-date"></p>
            <input
              id="part-change-ownership-input"
              type="text"
              placeholder="Insert address"
            />
            <button
              id="part-change-ownership-btn"
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

export default PartScreen;
