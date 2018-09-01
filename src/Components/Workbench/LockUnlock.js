import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class LockUnlock extends Component {
	constructor(props) {
		super();
		this.state = {
			accounts: {},
			selectedAccount: undefined,
			accountResponse: {}
		}
		this.doGetAccounts = this.doGetAccounts.bind(this);
		this.setSelectedAccount = this.setSelectedAccount.bind(this);
		this.unlockAccount = this.unlockAccount.bind(this);
		this.lockAccount = this.lockAccount.bind(this);
	}

	componentWillMount() {
		this.doGetAccounts();
	}

	doGetAccounts() {
	    const that = this;
	    that.setState({
	    	accounts: {}
	    });
	    // This is the synch call for getting the accounts
	    let accounts = web3.eth.accounts;
	  
	    // Asynchronous call to get the accounts
	    // result = [Array of accounts]
	    // MetaMask returns 1 account in the array - that is the currently selected account
	    web3.eth.getAccounts(function (error, result) {
	      if (error) {
	          console.log('accounts_count', error, true);
	      } else {
	        accounts = result;
	        // You need to have at least 1 account to proceed
	        if(result.length == 0) {
	          if(that.state.nodeType.toLowerCase().includes('metamask')){
	              alert('Unlock MetaMask *and* click \'Get Accounts\'');
	          }
	          return;
	        }
	        let accountsWithStatus = {};
	        accounts.map(address => {
	        	return accountsWithStatus[address] = 'Locked';
	        })
	        that.setState({accounts: accountsWithStatus})

	      }
	        
	    });
	}

	setSelectedAccount(event) {
		console.log('ref ', this.password.value);
		this.setState({selectedAccount: event.target.value});	
	}

	unlockAccount() {
		this.setState({accountResponse: {}});
		let that = this;
		var account = this.state.selectedAccount;
		var password = this.password.value;

		web3.personal.unlockAccount(account, password, function(error, result) {
			if(error) {

				that.setState({ accountResponse: {error: error.message} });
			} else if (result) {
				let prevStateAccounts = (that.state.accounts);
				console.log('prevStateAccounts before', prevStateAccounts);
				prevStateAccounts[account] = 'Unlocked';
				console.log('prevStateAccounts after', prevStateAccounts)
				that.setState({ prevStateAccounts })
	            that.setState({ accountResponse: {success: "Account is unlocked" } });
			}

		})
	}

	lockAccount() {
	   	this.setState({accountResponse: {}});
		var account = this.state.selectedAccount;
		var password = this.password.value;

	    web3.personal.lockAccount(account);
	    let prevStateAccounts = (this.state.accounts);
	    prevStateAccounts[account] = 'Locked';
	    this.setState({ prevStateAccounts })
	    this.setState({ accountResponse: {success: "Account is locked" } });
	}

	render() {
		let accountAddresses = Object.keys(this.state.accounts)
		let AccountList = accountAddresses.map((address, index) => {
			return (
				<option key={index}>{address}</option>
			)
		})
		let accountLockStatus = accountAddresses.map((address, index) => {
			return (
				<tr key={index}><td>{address}</td><td>{this.state.accounts[address]}</td></tr>
			)
		})
		let unlockOrLockResponse;
		let unlockOrLockResponseClass;

		if(this.state.accountResponse) {
			unlockOrLockResponse = (this.state.accountResponse.success) ? this.state.accountResponse.success : this.state.accountResponse.error;
			unlockOrLockResponseClass = (this.state.accountResponse.success) ? 'success-text' : 'error-text';
		}
			
		return (
		  <section >
		    <h2>UnLock &amp; Lock Accounts</h2>
		    <Equalizer>
		    {/* unlock the account */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Unlock Account</h3>
			      <span>To</span>
			      <span><select onChange={this.setSelectedAccount}>
			      	<option>Select Account</option>
			      	{ AccountList }
			      </select></span>
			      <br/>
			      <span>Password</span><input defaultValue="password" ref={(password) => { this.password = password }} />
			      <br/>
			      <span><button onClick={this.unlockAccount}>UnLock Account</button></span>
			      <span><button onClick={this.lockAccount}>Lock Account</button></span>
			      <p className={unlockOrLockResponseClass}>{unlockOrLockResponse}</p>
			    </div>
			    <div className="col-xs-12 col-sm-6">
			      <h3>Un/Lock Result</h3>
			      <table>
			      	<tbody>
			      		<tr>
			      			<th>Address</th>
			      			<th>Lock Status</th>
			      		</tr>
			      		{ accountLockStatus }
			      	</tbody>
			      </table>
			    </div>
			</Equalizer>
		  </section>
		)
	}
}