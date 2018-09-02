import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class SendTransaction extends Component {
	constructor(props) {
		super();
		this.state = {
			accounts: [],
			transactionError: false,
			transJSON: undefined
		};

		this.clearTransactionData = this.clearTransactionData.bind(this);
		this.createTransactionObjectJSON = this.createTransactionObjectJSON.bind(this);
		this.getAccounts = this.getAccounts.bind(this);
		this.sendTransaction = this.sendTransaction.bind(this);
		this.transactionObjectJSON = this.transactionObjectJSON.bind(this);
	}

	componentWillMount() {
		this.getAccounts();
	}

	getAccounts() {
	    const that = this;
	    that.setState({
	    	accounts: []
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
	        // You need to have at least 1 account to proceed
	        if(result.length == 0) {
	          if(that.state.nodeType.toLowerCase().includes('metamask')){
	              alert('Unlock MetaMask *and* click \'Get Accounts\'');
	          }
	          return;
	        } else {
	        	that.setState({accounts: result})
	        }

	      }
	        
	    });
	 }

	createTransactionObjectJSON() {
	    let transObject = {};
	    // get the from and to account 
	    transObject.from = this.sendFromAccount.value;
	    transObject.to = this.sendToAccount.value;
	    //Get the value in ether and convert to wie
	    let valueInEther = this.etherAmount.value;
	    let valueInWei = web3.toWei(valueInEther,'ether');
	    transObject.value = valueInWei;
	    // set the gas and gasPrice
	    if(this.gasAmount.value !== 'default')
	        transObject.gas = this.gasAmount.value;
	    if(this.gasPrice.value !== 'default')
	        transObject.gasPrice = this.gasPrice.value;
	    // set the data
	    if(this.transactionData.value !== 'default'){
	        // convert the ascii to hex
	        let data = this.transactionData.value;
	        transObject.data = web3.toHex(data);
	    }
	    // set the nonce
	    if(this.nonceValue.value !== 'default')
	        transObject.nonce = this.nonceValue.value;


	    return transObject;
	}

	transactionObjectJSON() {
	    let transObject = this.createTransactionObjectJSON();
	    let transJSON = JSON.stringify(transObject,undefined,2);
	    this.setState({transJSON: transJSON})
	    return transJSON;
	}

	clearTransactionData() {
		this.sendFromAccount.value = 'Select Account';
	    this.sendToAccount.value = 'Select Account';
	    this.etherAmount.value = .01;
	    this.gasAmount.value = 'default';
	    this.gasPrice.value = 'default';
	    this.transactionData.value = 'default';
	    this.nonceValue.value = 'default';
	}

	sendTransaction() {
		let that = this;
	    let transObject = this.createTransactionObjectJSON();
	    web3.eth.sendTransaction(transObject, function(error, result) {
	        if (error) {
	        	that.setState({transactionError: true})
	        	that.setState({transactionResult: error.message})
	            // $('.send-ethers .send-transaction-result').addClass('not-ready').removeClass('ready').html(error.message);
	        } else {
	        	let URL = `https://ropsten.etherscan.io/tx/${result}`;
	        	that.setState({transactionError: false})
	        	that.setState({transactionResult: result})
	        	that.setState({transactionURL: URL})
	        }
	    })
	}

	render() {
		let accountsList = this.state.accounts;
		let accounts = accountsList.map((account, key) => {
			return(
				<option key={key}>{account}</option>
			)
		})
		let transactionResultClass = (this.state.transactionError == true) ? 'success-text' : 'error-text';
		let transactionURL = this.state.transactionURL;

		return (
		  <section >
		    <h2>Send Ethers</h2>
		    <Equalizer>
			    <div className="col-xs-12 col-sm-6">
			      <h3>Transaction Object</h3>
			      <span>From</span>
			      <span><select ref={(sendFromAccount) => { this.sendFromAccount = sendFromAccount }}>
			      	<option>Select Account</option>
			      	{accounts}
			      </select></span>
			      <br/>
			      <span>To</span>

			      <select ref={(sendToAccount) => { this.sendToAccount = sendToAccount }}>
			      	<option>Select Account</option>
			      	{accounts}
			      </select>


			      <br/>
			      <span>Value (Ether)</span> <input ref={(etherAmount) => { this.etherAmount = etherAmount }} type="text" defaultValue="0.01" />
			      <br/>
			      <span>Gas</span><input ref={(gasAmount) => { this.gasAmount = gasAmount }} type="text" defaultValue="default" />
			      <br/>
			      <span>Gas Price (wei)</span><input ref={(gasPrice) => { this.gasPrice = gasPrice }} type="text" defaultValue="default" />
			      <br/>
			      <span>Data (ascii)</span><input ref={(transactionData) => { this.transactionData = transactionData }} type="text" defaultValue="default" />
			      <br/>
			      <span>Nonce</span><input ref={(nonceValue) => { this.nonceValue = nonceValue }} type="text" defaultValue="default" />
			      <br/>
			      <span><button onClick={this.transactionObjectJSON}>JSON &gt;&gt;</button></span>
			      <span><button onClick={this.clearTransactionData}>Reset</button></span>

			    </div>
			    {/* transaction object json */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>JSON</h3>
			      <pre id='send_transaction_object_json'>{this.state.transJSON}</pre>
			    </div>

			    {/* send  */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Send</h3>
			      <span><button onClick={this.sendTransaction}>Send Transaction</button></span>
			    </div>
			    {/* send transaction result */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Result</h3>
			      <p className={transactionResultClass}>{this.state.transactionResult}</p>
			      <a href={transactionURL}  target="_blank">{transactionURL}</a>
			    </div>
			  </Equalizer>
		  </section>
		)
	}
}