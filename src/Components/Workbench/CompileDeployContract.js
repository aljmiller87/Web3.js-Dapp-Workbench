import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class CompileDeployContract extends Component {
	constructor(props) {
		super();
		this.state = {
			abiDefinitionString: undefined,
			byteCode: undefined,
			deployContractAddress: undefined,
			deployContractError: undefined,
			deployContractHash: undefined,
			sendTransactionHash: {}
		}
		this.deployContract = this.deployContract.bind(this);
		this.deployContractSynchronous = this.deployContractSynchronous.bind(this);
		this.updateContainerState = this.updateContainerState.bind(this);
	}

	componentWillMount() {
		this.setState({
			abiDefinitionString: this.props.abi,
			byteCode: this.props.byteCode
		})
	}

	updateContainerState(data) {	
		console.log('updateContainerState called');
		this.props.update(data);
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
		if (data.length > 0) {
			data.push(<button key={data.length+1} onClick={() => { this.updateContainerState(this.state.sendTransactionHash) }}>Save Contract Address</button>);
		}		

		

		return (
		  <section >
		    <h2>Compile &amp; Deploy Contracts</h2>
		    {/*contract compilation */}
		    <Equalizer>
			    <div className="col-xs-12 col-sm-6">
			      <h3>Compile</h3>
			      <span id="list_of_compilers" className="error-text">...</span>
			      <br/>
			  {/* Need onClick to run compiling for below button*/}
			      <button id="button_do_compile" >Compile Code</button><br/>
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