import React, { Component } from "react";

export default class About extends Component {
	render() {
		return (
	    <div className="item about">
	      <img className="workbench"/>
	      <p className="text">
	        Web3 Workbench Application developed in section "Developing DAPPs with Web3"
	      </p>
	      <ul>
	        <li>To connect with geth or TestRPC provide URL and hit connect</li>
	        <li>To connect with MetaMask - enable MetaMask and reload</li>
	      </ul>

	    </div>
	  );
	}	  
}