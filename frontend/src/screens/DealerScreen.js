import React from 'react'

function DealerScreen() {
  return (
    <>
      <div class="row">
        <div class="col s6">
          <h2>Dealer</h2>
          <label>Address: </label>
          <p id="dealer-address">0x9F61DD37328502Dd8d6bE5d7A0B0af466986cbF7</p>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <div id="car-history" class="collection with-header">
            <p class="collection-header">Cars History</p>
          </div>
          <div id="car-details">
            <label>Owner History: </label>
            <p id="car-owners"></p>
          </div>
        </div>
        <div class="col s6">
          <div id="parts-history" class="collection with-header">
            <p class="collection-header">Parts History</p>
          </div>
          <div id="parts-details">
            <label>Owner History: </label>
            <p id="part-owners"></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DealerScreen