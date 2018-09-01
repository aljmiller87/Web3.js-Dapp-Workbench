import React, { Component } from "react";

export default class About extends Component {
	render() {
		return (
			<section>
				<h2>About</h2>
			    <div className="col-xs-12">
				    <img className="workbench"/>
				    <p>Web3.js Dapp Workbench</p>
				    <ul>
				        <li>To connect with geth provide URL and hit connect</li>
				        <li>To connect with MetaMask - enable MetaMask and reload</li>
				    </ul>
			    </div>
			</section>
	  	);
	}	  
}