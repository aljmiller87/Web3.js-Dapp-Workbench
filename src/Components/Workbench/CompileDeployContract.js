import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class CompileDeployContract extends Component {
	constructor(props) {
		super();
		this.state = {
			abiDefinitionString: '[{"constant":false,"inputs":[],"name":"getNum","outputs":[{"name":"n","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"setNum","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"x","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"caller","type":"address"},{"indexed":true,"name":"oldNum","type":"bytes32"},{"indexed":true,"name":"newNum","type":"bytes32"}],"name":"NumberSetEvent","type":"event"}]',
			byteCode: '0x6060604052341561000c57fe5b604051602080610168833981016040528080519060200190919050505b806000819055505b505b610126806100426000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806367e0badb146044578063cd16ecbf146067575bfe5b3415604b57fe5b60516084565b6040518082815260200191505060405180910390f35b3415606e57fe5b60826004808035906020019091905050608f565b005b600060005490505b90565b60006000549050816000819055506000546001026000191681600102600019163373ffffffffffffffffffffffffffffffffffffffff167f108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce60405180905060405180910390a45b50505600a165627a7a72305820b86215323334042910c2707668d7cc3c3ec760d2f5962724042482293eba5f6b0029',
			deployContractAddress: undefined,
			deployContractError: undefined,
			deployContractHash: undefined,
			sendTransactionHash: {}
		}
		this.deployContract = this.deployContract.bind(this);
		this.deployContractSynchronous = this.deployContractSynchronous.bind(this);
	}

	deployContract() {
		console.log('function called')
		this.setState({
			deployContractAddress: undefined,
			deployContractError: undefined,
			deployContractHash: undefined
		})
		let that = this;
		let abiDefinitionString = this.state.abiDefinitionString;
		let byteCode = this.state.byteCode;

	    // let byteCode = $('textarea.byteCode').val();
	    // let abiDefinitionString = $('textarea.abi').val();
	    let abiDefinition = JSON.parse(abiDefinitionString);

	    // 1. Create the contract object
	    let  contract = web3.eth.contract(abiDefinition);

	    // Get the estimated gas
	    let   gas = this.estimatedGas.value;

	    // 2. Create the params for deployment - all other params are optional, uses default
	    let  params = {
	        from: web3.eth.accounts[0],
	        data: byteCode,
	        gas: gas
	    }

	    console.log('params', params);

	    // 3. This is where the contract gets deployed
	    // Callback method gets called *2* 
	    // First time : Result = Txn Hash
	    // Second time: Result = Contract Address
	    var constructor_param = 10;

	    contract.new(constructor_param,params,function(error,result){
	        if(error){
	            console.log(error.message); 
	            that.setState({ deployContractError:  error.message})
	            // $('.transaction-address').text(error.message + " (Checking Synchronously)");
	            
	            
	        } else {
	            console.log('RECV:',result)
	            if(result.address){
	            	console.log('result.address ', result.address);
	            	that.setState({ deployContractAddress:  result.contractAddress});
	            	that.setState({ deployContractHash:  result.transactionHash});
	                // $('.blockchain-address').text(result.address);
	                // $('.address-etherscan').html('<a href="https://rinkeby.etherscan.io/tx/' + result.address + '">Etherscan Link</a>');
	            } else {
	            	let transactionHash = result.transactionHash;
	            	that.setState({ deployContractHash:  transactionHash});
	            	let receipt =web3.eth.getTransactionReceipt(transactionHash, function(error, result){
		                if(error) {
		                	console.log('SENDTran Error=', error);
		                } else {
		                	console.log('SENDTran Hash=', result);
		                	if (result.contractAddress == null) {
		                		that.setState({ deployContractAddress:  'Contract Deploy transaction has not been mined yet.'});
		                		that.setState({ sendTransactionHash: result });
		                	} else {
		                		that.setState({ deployContractAddress: result.contractAddress });
		                		that.setState({ sendTransactionHash: result });
		                	}
		                	
		                }
		            });
	                // gets set in the first call
	                // $('.transaction-hash').html('<p>'+ result.transactionHash + '</p>');
	                // $('.transaction-etherscan').html('<a href="https://rinkeby.etherscan.io/tx/' + result.transactionHash + '">Etherscan Link</a>');
	            }
	        }
	    });
	}

	deployContractSynchronous()   {

	    let abiDefinitionString = $('textarea.abi').val();
	    let abiDefinition = JSON.parse(abiDefinitionString);

	    let byteCode = $('textarea.byteCode').val();

	    // 1. Create the contract object
	    var  contract = web3.eth.contract(abiDefinition);

	    // Get the estimated gas
	    let   gas = this.estimatedGas.value;

	    // 2. Create the params for deployment - all other params are optional, uses default
	    let  params = {
	        from: web3.eth.accounts[0],
	        data: byteCode,
	        gas: gas
	    }

	    var contractData = contract.new.getData(10,{'data':byteCode});
	    console.log('Contract Data=',contractData);
	    // call send transaction and then call getTransactionReceipt
	    params.data=contractData
	    var transactionHash= web3.eth.sendTransaction(params, function(error, result) {
	        if (error) {
	            console.log(error);
	        } else if (result) {
	            console.log('TxnHash=',result);
	            web3.eth.getTransactionReceipt(result, function(error, result){
	                if(error) {
	                    console.log('SENDTran Error=', error);
	                } else if(result) {
	                    console.log('SENDTran Hash=', result);
	                    return
	                }
	            });
	        }
	    })
	            

	    
	}

	render() {

		let deployContractCallbackTransactionHash = Object.keys(this.state.sendTransactionHash);
		let data = deployContractCallbackTransactionHash.map((item, key) => {
			// console.log(this.state.sendTransactionHash[item]);
			if (item != 'contractAddress') {
				return (
					<p key={key}><strong>{item}: </strong>{this.state.sendTransactionHash[item]}</p>
				)
			} else {
				return (
					<p key={key}><strong>{item}: </strong><input className="success-text" size="40" defaultValue={this.state.deployContractAddress}/></p>
				)
			}
				
				
		});

		return (
		  <section >
		    <h2>Compile &amp; Deploy Contracts</h2>
		    {/*contract compilation */}
		    <Equalizer>
			    <div className="col-xs-12 col-sm-6">
			      <h3>Compile</h3>
			      <span id="list_of_compilers" className="error-text">...</span>
			      <br/>
			      <button id="button_do_compile" onclick="doCompileSolidityContract()">Compile Code</button><br/>
			      <textarea id="sourcecode" cols="45" rows="10"> 
			      </textarea>
			    </div>
			    {/* compilation result */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Result</h3>
			      <span className='error-text' id='compilation_result'>...</span>
			      <br/><span>Bytecode</span>
			      <textarea cols="40" rows="3">{this.state.byteCode}</textarea>
			      {/* ABI Definition */}
			      <br/><span>ABI Definitions</span>
			      <textarea cols="40" rows="3">{this.state.abiDefinitionString}</textarea>
			    </div>
			</Equalizer>
			<Equalizer>
			    {/* deploy the contract */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Deploy</h3>
			      <p>Gas (Wei)
			        <input type="text" ref={(estimatedGas) => { this.estimatedGas = estimatedGas }} size="10" defaultValue="4700000" /></p>
			      <button onClick={this.deployContract}>Deploy Contract</button><br/>
			      <h4>Initial Transaction Send Details</h4>
			      <p className='error-text'>{this.state.deployContractError}</p>
			      <p>Transaction Hash</p>
			      <p>{this.state.deployContractHash}</p>
			    </div>
			    {/* deploy result */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Result</h3>
			      {data}
			      <br/>
			    </div>
			</Equalizer>
		  </section>
		)
	}
}