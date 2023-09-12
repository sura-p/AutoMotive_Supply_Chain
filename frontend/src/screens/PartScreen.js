import React, { useState } from 'react'

function PartScreen(props) {
    console.log(props.signer.address);
    const [serialNumber, setSerialNumber] = useState();
    const [partType, setPartType] = useState();
     const handleSerialChange = (e) => {
         setSerialNumber(e.target.value);
         console.log(serialNumber);
     };
      const handleOptionChange = (e) => {
        setPartType(e.target.value);
        console.log(partType);
      };
    const handleSubmit = (event) => {
     console.log(event.target);
    }
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      ></form>
      <h2>Part Factory</h2>
      <div class="row">
        <div class="col s6">
          <label>Address: </label>
          <p id="part-factory-address">{props.signer.address}</p>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <label>Serial Number: </label>
          <input
            type="text"
            id="create-serial-number"
            placeholder="Part Serial Number"
            value={serialNumber}
            onChange={(e) => {
              handleSerialChange(e);
            }}
          />
          <label>Part Type: </label>
          <select
            id="create-part-type"
            class="browser-default"
            value={partType}
            onChange={(e) => {
              handleOptionChange(e);
            }}
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
      <div class="row">
        <div id="part-list" class="collection with-header">
          <p class="collection-header">Parts Owned</p>
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

export default PartScreen