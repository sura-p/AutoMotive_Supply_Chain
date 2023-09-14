import React, { useEffect, useState } from "react";
import * as ethers from "ethers";
import ChangeOwnership from "../artifacts/ChangeOwnership.json";
import ProductManagenment from "../artifacts/ProductManagement.json";
function PartScreen(props) {
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.g.alchemy.com/v2/Zg0fGGNnFHhAll9YiaK2vz6YkhdeFNqB"
  );

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
  const [partDetail, setPartDetail] = useState();
  const [partHash, setPartHash] = useState();
  const [partOwned, getPartOwner] = useState([]);
  const [address, setAddress] = useState("");
  useEffect(() => {
    // getPartOwner(JSON.parse(localStorage.getItem("partHash")));
    const part = JSON.parse(localStorage.getItem("partHash"));
    async function fetctOwner() {
      let array = [];
      Promise.all(
        part.map(async (ele) => {
          let owner = await ownershipContract.currentPartOwner(ele);
          if (owner == props.signer.address) {
            array.push(ele);

            getPartOwner([...partOwned, ...array]);
          }
        })
      );
    }

    fetctOwner();
  }, []);

  const handlePara = async (ele) => {
    setPartHash(ele);
    const data = await productContract.parts(ele);

    setPartDetail(data);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const changeOwnership = async (e) => {
    e.preventDefault();
    await ownershipContract.changeOwnership(0, partHash, address);
  };

  const handlePartInfoChange = (e) => {
    setPartInfo({ ...partInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let array = [];
    let partHash = JSON.parse(localStorage.getItem("partHash"));
    const data = await productContract.buildPart.staticCall(
      partInfo.serialNo,
      partInfo.partType,
      new Date().toLocaleDateString().toString()
    );
    await productContract.buildPart(
      partInfo.serialNo,
      partInfo.partType,
      new Date().toLocaleDateString().toString()
    );

    await ownershipContract.addOwnership(0, data);
    if (partHash) {
      partHash.push(data);
      localStorage.setItem("partHash", JSON.stringify(partHash));
    } else {
      array.push(data);
      localStorage.setItem("partHash", JSON.stringify(array));
    }
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
          {partOwned?.map((ele, i) => {
            return (
              <p
                key={i}
                class="collection-header"
                onClick={() => {
                  handlePara(ele);
                }}
              >
                {ele}
              </p>
            );
          })}
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <div id="part-list-details">
            <label>Manufacturer Address:</label>
            <p id="details-address">
              {partDetail != undefined ? partDetail[0] : ""}
            </p>
            <label>Serial Number:</label>
            <p id="details-serial-num">
              {partDetail != undefined ? partDetail[1] : ""}
            </p>
            <label>Part Type:</label>
            <p id="details-part-type">
              {partDetail != undefined ? partDetail[2] : ""}
            </p>
            <label>Creation Date:</label>
            <p id="details-creation-date">
              {partDetail != undefined ? partDetail[3] : ""}
            </p>
            <form
              onSubmit={(e) => {
                changeOwnership(e);
              }}
            >
              <input
                id="part-change-ownership-input"
                type="text"
                placeholder="Insert address"
                name="address"
                value={address}
                onChange={handleAddressChange}
              />
              <button
                id="part-change-ownership-btn"
                class="waves-effect waves-light btn"
                type="submit"
              >
                Change Ownership
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PartScreen;
