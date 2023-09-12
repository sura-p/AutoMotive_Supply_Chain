import React from 'react'

function CarScreen() {
    return (
      <>
    <h2>Car Factory</h2>
        <div class="row">
            <div class="col s6">
                <label>Address: </label>
                <p id="car-factory-address">0xcE94908BFF18F5D0a58042325e73Ca3caF8285cE</p>
            </div>
        </div>
        <div class="row">
            <div class="col s6">
                <div id="car-part-list" class="collection with-header">
                    <p class="collection-header">Parts Owned</p>
                </div>
            </div>
            <div class="col s6">
                <label>Serial Number: </label><input type="text" id="create-car-serial-number" placeholder="Car Serial Number"/>
                <button id="build-car" class="waves-effect waves-light btn">Build Car</button>
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
                    <input id="car-change-ownership-input" type="text" placeholder="Insert address"/>
                    <button id="car-change-ownership-btn" class="waves-effect waves-light btn">Change Ownership</button>
                </div>
            </div>
            </div>
            </>
  )
}

export default CarScreen