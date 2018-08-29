import React, { Component } from "react";

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
	    console.log("called doGetAccounts");
	    const that = this;
	    // This is the synch call for getting the accounts
	    var accounts = web3.eth.accounts;
	    console.log('sync accounts', accounts);
	  
	    // Asynchronous call to get the accounts
	    // result = [Array of accounts]
	    // MetaMask returns 1 account in the array - that is the currently selected account
	    web3.eth.getAccounts(function (error, result) {
	      if (error) {
	          console.log('accounts_count', error, true);
	      } else {
	        accounts = result;
	        console.log('accounts_count', result.length, false);
	        // You need to have at least 1 account to proceed
	        if(result.length == 0) {
	          if(that.state.nodeType.toLowerCase().includes('metamask')){
	              alert('Unlock MetaMask *and* click \'Get Accounts\'');
	          }
	          return;
	        }

	        // var coinbase = web3.eth.coinbase;
	        // trim it so as to fit in the window/UI
	        // if(coinbase) coinbase = coinbase.substring(0,25)+'...'
	        // setData('coinbase', coinbase, false);
	        // set the default accounts
	        var defaultAccount = web3.eth.defaultAccount;
	        if(!defaultAccount){
	          web3.eth.defaultAccount =  result[0];
	          defaultAccount = '[Undef]' + result[0];
	        }

	        defaultAccount = defaultAccount.substring(0,25)+'...';
	        console.log('defaultAccount', defaultAccount, false);
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
	        console.log('balance', result);
	        let accountDetails = [account, result];
	        // that.setState({ accounts: [...that.state.accounts, accountDetails] })
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
	        console.log('promise all responses: ', accounts);
	        const accountObj = {};
	        accounts.map(account => {
	        	let address = account[0];
	        	let balance = account[1];
	        	accountObj[address]= balance;
	        })
	        return accountObj;
	      })
	      .then(response => {
	      	console.log('response should be accountObj', response);
	      	that.setState({ accounts: response })
	      })
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