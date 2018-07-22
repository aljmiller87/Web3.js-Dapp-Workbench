import React, { Component } from "react";

export default class About extends Component {
	render() {
		return (
			<div className="hero-unit">
		    <h1>Accounts</h1>
		    {/* accounts list */}
		    <div className="sidekick">
		      <h1>Accounts</h1>
		      <span>Count</span><span className='notready' id='accounts_count'>...</span>
		      <span>Coinbase</span><span className='notready' id='coinbase'>...</span>
		      <span>Default A/c</span><span className='notready' id='defaultAccount'>...</span>
		      <ol id="accounts_list">
		        {/* This is where the accounts will be added */}
		      </ol>
		      <span><button onclick="doGetAccounts()">Get Accounts</button></span>
		    </div>
		    {/* account balances */}
		    <div className="sidekick">
		      <h1>Balances</h1>
		      <ol id="account_balances_list">
		        {/* This is where the accounts balances will be added */}
		      </ol>
		    </div>
		  </div>
		 )
	}
}