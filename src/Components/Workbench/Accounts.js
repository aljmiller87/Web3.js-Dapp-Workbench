import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class Accounts extends Component {
	constructor(props) {
		super();
		this.state = {
			accounts: {}
		}

		this.doGetAccounts = this.doGetAccounts.bind(this);
	    this.doGetBalance = this.doGetBalance.bind(this);
	    this.getAccountsandBalances = this.getAccountsandBalances.bind(this);

	}

	componentWillMount() {
		this.doGetAccounts();
	}

	doGetAccounts() {
	    const that = this;
	    that.setState({
	    	accounts: {},
	    	coinbase: undefined,
	    	defaultAccount: undefined
	    });
	    // This is the synch call for getting the accounts
	    var accounts = web3.eth.accounts;
	  
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

	        let coinbase = web3.eth.coinbase;
	        if(coinbase) {
	        	that.setState({ coinbase: coinbase })
	        }
	        let defaultAccount = web3.eth.defaultAccount;
	        if(!defaultAccount){
	          web3.eth.defaultAccount =  result[0];
	          defaultAccount =result[0];
	          that.setState({ defaultAccount: defaultAccount })
	        } else {
	        	that.setState({ defaultAccount: defaultAccount })
	        }

	        that.getAccountsandBalances(accounts);
	      }
	        
	    });
	 }

	doGetBalance(account) {
	    const that = this;
	    return new Promise(function(resolve, reject){
	        let balance = web3.eth.getBalance(account,web3.eth.defaultBlock, function(error, result){
	            if (error) {
	                reject('error');
	            } else {
	                let balance = web3.fromWei(result,'ether').toFixed(4);
	                resolve(balance);
	            }
	        })
	    })
	    .then(function(result) {
	        let accountDetails = [account, result];
	        return (accountDetails);
	    })
	    .catch(function(error) {
	        console.log('error: ', error);
	    }) 
	}

	getAccountsandBalances(accounts) {
	    const that = this;

	    let balancePromises = accounts.map(account => this.doGetBalance(account));

	    Promise.all(balancePromises)
	      .then(accounts => {
	        const accountObj = {};
	        accounts.map(account => {
	        	let address = account[0];
	        	let balance = account[1];
	        	accountObj[address]= balance;
	        })
	        return accountObj;
	      })
	      .then(response => {
	      	that.setState({ accounts: response })
	      })
	}

	render() {

		let defaultAccount = (this.state.defaultAccount) ? this.state.defaultAccount : '...';
		let defaultAccountClass = (this.state.defaultAccount) ? 'success-text' : 'error-text';
		let coinbase = (this.state.coinbase) ? this.state.coinbase : '...';
		let coinbaseClass = (this.state.coinbase) ? 'success-text' : 'error-text';
		let countClass = (Object.keys(this.state.accounts)).length > 0 ? 'success-text' : 'error-text';

		let addressKeys = Object.keys(this.state.accounts);
		let accounts = addressKeys.map((account, key) => {
			return (
				<tr key={key}><td>{account}</td><td>{this.state.accounts[account]}</td></tr>
			)
		})
		return (
			<section>
			    <h2>Accounts</h2>
			    {/* accounts list */}
			    <Equalizer>
				    <div className="col-xs-12 col-sm-6">
				      <h3>Primary Accounts</h3>
				      <p>Count</p><span className={countClass}>{(Object.keys(this.state.accounts)).length}</span>
				      <p>Coinbase</p><span className={coinbaseClass} >{coinbase}</span>
				      <p>Default A/C</p><span className={defaultAccountClass} >{defaultAccount}</span>
				      <span><button onClick={this.doGetAccounts}>Get Accounts</button></span>
				    </div>
				    {/* account balances */}
				    <div className="col-xs-12 col-sm-6">
				      <h3>Addresses and Balances</h3>
				        {/* This is where the accounts balances will be added */}
				        <table>
						<tbody>
							<tr>
							  <th>Address</th>
							  <th>Balance</th>
							</tr>
							{accounts}
						  </tbody>
					  	</table>
				    </div>
				</Equalizer>
			</section>
		)
	}
}