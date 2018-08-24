import React, { Component } from "react";

export default class Accounts extends Component {
	constructor(props) {
		super();
		this.state = {
			accounts: undefined
		}
	}

	componentDidUpdate() {
		console.log('Account componentDidUpdate called. Props: ', this.props);
		

	}

	render() {

		console.log('Accounts props', this.props);
		// console.log('ATTENTION: due to props change, need to change this component to stateful and use componentDidUpdate() per https://reactjs.org/docs/react-component.html');
		// console.log('Accounts props.accounts[0][0]', this.props.accounts[0][0]);
		let accounts = [];
		let balances = [];
		for (let i = 0; i < this.props.accounts; i++) {
			console.log("testing 123!!!");
			// console.log('this.props.accounts[i][0]', this.props.accounts[i][0])
			let account = (
				<tr>
					<td>{i + 1}</td>
					<td>{ this.props.accounts[i][0] }</td>
				</tr>
			);
			console.log('account in for loop', account);
			accounts.push(account);
			let balance = (
				<tr>
					<td>{i + 1}</td>
					<td>{ this.props.accounts[i][1] }</td>
				</tr>
			);
			balances.push(balance);
		}
		return (
			<div className="hero-unit">
		    <h1>Accounts</h1>
		    {/* accounts list */}
		    <div className="sidekick">
		      <h1>Accounts</h1>
		      <p>Count</p><span className='notready' id='accounts_count'>...</span>
		      <table>
				<tbody>
					<tr>
						<th>Account #</th>
						<th>Address</th>
					</tr>
					{accounts}
				</tbody>
			  </table>
		      <p>Coinbase</p><span className='notready' id='coinbase'>...</span>
		      <p>Default A/C</p><span className='notready' id='defaultAccount'>...</span>
		      <ol id="accounts_list">
		        {/* This is where the accounts will be added */}
		      </ol>
		      <span><button onclick="doGetAccounts()">Get Accounts</button></span>
		    </div>
		    {/* account balances */}
		    <div className="sidekick">
		      <h1>Balances</h1>
		        {/* This is where the accounts balances will be added */}
		        <table>
				<tbody>
					<tr>
					  <th>Account #</th>
					  <th>Balance</th>
					</tr>
					{balances}
				  </tbody>
			  	</table>
		    </div>
		  </div>
		)
	}
}