import React from "react";


export default function Demonstracao(props) {
    return (
        <div className="mb-3">
        <div className="mb-3">
          <label>Serial Number: {props.numero}:</label>
          <input
            onChange={(e) => props.handleCrianca(e.target.value)}
            className="form-control"
            type="text"
            placeholder="XYZ359048607KLG890584"
          />
        </div>
        <div className="mb-3">
                <label className="me-3">Manteinance State:  </label>
            <select>
                <option>choose an option...</option>
                <option>Perfect</option>
                <option>Good to go</option>
                <option>working, but require manteinance</option>
                <option>Unusable</option>
            </select>
        <br /><br />
            <label>Comments: </label>
            <input className="form-control" type="text" placeholder="Any comments about the machine" />
            </div>
        <div className="row g-3 align-items-center mb-3">
          <label className="col-auto">Original Site: </label>
          <select
            className="col-auto"
            onChange={(e) => {
              props.handleTurma(e.target.value);
            }}>
            <option value="false">A list of available sites would go here...</option>
            <option value="Early Toddler">Hilton</option>
            <option value="Toddler">Country Club</option>
            <option value="Nursery">Maple Bear</option>
            <option value="JK">IKEA</option>
            <option value="SK">Sprouts</option>
          </select>
        </div>
        <div>
        <label>Initial Cost: </label>
            <input className="form-control" type="number" placeholder="2000.00" />
            </div>
        </div>
    )
}