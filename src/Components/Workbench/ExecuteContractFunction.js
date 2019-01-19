import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class ExecuteContractFunction extends Component {
  constructor(props) {
    super();
    this.state = {
      abiDefinitionString: undefined,
      byteCode: undefined,
      contractCallResult: undefined,
      contractCallResultError: false,
      savedContract: {}
    }
    this.createContractInstance = this.createContractInstance.bind(this);
    this.contractFunctionCall = this.contractFunctionCall.bind(this);
    this.contractSendCall = this.contractSendCall.bind(this);
  }

  componentWillMount() {
    if (this.state.abiDefinitionString == undefined) {
      this.setState({
        abiDefinitionString: this.props.abi,
        byteCode: this.props.byteCode
      })
    }
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps ', prevProps);
    if(this.props.savedContract !== undefined) {  
      if(this.state.savedContract !== this.props.savedContract) {      
        console.log('new savedContract: ', this.props.savedContract);
        this.setState({savedContract: this.props.savedContract})
      }
    }
  }

  // utility method to create contract instance
  createContractInstance(addr) {
      let abiDefinitionString = this.state.abiDefinitionString;
      let abiDefinition = JSON.parse(abiDefinitionString);

      // 1. Create the contract object
      var  contract = web3.eth.contract(abiDefinition);
      var address = addr;
      if (!addr) {
          address = this.state.savedContract.savedAddress;
      }

      console.log('address', address);
      // if (!addr) {
      //     address = '0xc4fAa1Ed4A7519E9420A5a2E8A7A49AdE9b06467';
      // }
      
      var instance = contract.at(address);
      console.log('instance', instance);
      return instance

  }

  /**
   * This invokes the contract function
   * locally on the node with no state change propagation
   */
  contractFunctionCall()  {
      const that = this;
      // This leads to the invocation of the method locally
      let instance = this.createContractInstance();

      let funcName = this.contractFunctionSelected.value;

      if(funcName === 'setNum'){
          let parameterValue = this.setNumValue.value;
          console.log(parameterValue);

          // MetaMask does not allow synchronous call to 'call' for non-constant function
          // Change this to asynchronous :)
          let value = instance.setNum.call(parameterValue, function(error, result) {
              if(error) {
                  console.log("Call error: ", error);
              } else {
                  console.log("Call result: ", result)
              }
          });

      } else {

          instance.getNum.call({},web3.eth.defaultBlock, function(error,result){
              // setExecuteResultUI('Call',funcName,'',result,'',false);
              if(error) {
                  console.log("Call error: ", error);
                  this.setState({
                    contractCallResult : error.message,
                    contractCallResultError: true 
                  })                  
              } else {
                  console.log("Call result: ", result.toFixed(0) )
                  that.setState({
                    contractCallResult : result.toFixed(0),
                    contractCallResultError: false 
                  })                    
              }
          });

          
      }
  }

  /**
   * send Transaction costs Gas. State changes are recorded on the chain.
   */
  contractSendCall()   {
      // creating the cntract instance
      var instance = this.createContractInstance();
      // read the ui elements
      var estimatedGas = this.estimatedGas.value;
      var parameterValue = this.setNumValue.value;
      console.log(parameterValue);
      var funcName = this.contractFunctionSelected.value;
      //value NOT used as the contract function needs to be modified with "payable" modifier
      //var value = document.getElementById('invocation_send_value_in_ether').value;
      //value = web3.toWei(value,'ether');

      // Create the transaction object
      var    txnObject = {
          from: web3.eth.accounts[0],
          gas: estimatedGas
      }

      if(funcName === 'setNum'){
          // setNum with sendTransaction
          instance.setNum.sendTransaction(parameterValue,txnObject,function(error, result)  {

              console.log('RECVED>>',error,result);   
              if(error){
                  // setExecuteResultUI('Send Transaction:   ',funcName,'',error,'',true);
                  console.log('setNum error: ', error.message);
                  // $('.call-send-result').removeClass('ready').addClass('not-ready').text('Call error: ' + error.message);
              } else {
                  // setExecuteResultUI('Send Transaction:   ',funcName,parameterValue,result,result,false);
                  // $('.call-send-result').removeClass('ready').addClass('not-ready').text('Call result: ' + result);
                  console.log('setNum result', result);
              }
          });
      } else {
           // getNum with sendTransaction
          instance.getNum.sendTransaction(txnObject,function(error, result)  {

              console.log('RECVED>>',error,result);   
              if(error){
                  console.log('getNum error: ', error.message);
                  // $('.call-send-result').removeClass('ready').addClass('not-ready').text('Call error: ' + error.message);
              } else {
                  // $('#invoke_contracttransactionhash').removeClass('not-ready').addClass('ready').text('Send result: ' + result);
                  console.log('getNum result: ', result);
              }
          });
      }        
  }


  render() {    
    let statusText = '';
    let statusTextClass = '';
    let contractAddress = (this.state.savedContract !== undefined) ? this.state.savedContract.contractAddress : 'Enter Contract Address';
    let contractCallResult = (this.state.contractCallResult !== undefined) ? this.state.contractCallResult : '';
    let contractCallResultClass = (this.state.contractCallResultError == true) ? 'error-text' : 'success-text';

    this.props.savedAddress
    if (!this.state.abiDefinitionString && !this.state.byteCode) {
      statusText = 'No contract ABI defintion or byte code found';
      statusTextClass = 'error-text';
    } else {
      if (!this.state.abiDefinitionString) {
        statusText = 'No contract ABI defintion code found';
        statusTextClass = 'error-text';
      } else if (!this.state.byteCode) {
        statusText = 'No contract byte code found';
        statusTextClass = 'error-text';
      } else {
        statusText = 'Address &amp; ABIDefinition picked from deployed contract';
        statusTextClass = 'success-text';
      }
    }

    return (
      <section >
        <h2>Contract Invocations</h2>
        <Equalizer>
          <div className="col-xs-12 col-sm-6">
            <h3>Execute</h3>
            <p className={statusTextClass}>{statusText}</p>
            <p><label>Contract Address: </label><input type="text" defaultValue={contractAddress} value={contractAddress}/></p>
            <span>
            <select ref={(contractFunctionSelected) => { this.contractFunctionSelected = contractFunctionSelected }} >
              <option value="getNum">getNum()</option>
              <option value="setNum">setNum()</option>
            </select>
          </span>
            <br/>
            <span>Parameter for setNum()</span>
            <input ref={(setNumValue) => { this.setNumValue = setNumValue }} size="6" type="text" defaultValue="5" />
            <span>Estimated Gas</span>
            <input type="text" ref={(estimatedGas) => { this.estimatedGas = estimatedGas }} size="10" defaultValue="4700000" />
            <br/>
            <span>Value (Ether)</span> <input id="invocation_send_value_in_ether" type="text" defaultValue="0" disabled />
            <br/>
            <span><button onClick={this.contractFunctionCall}>Call</button></span>
            <span><button onClick={this.contractSendCall}>Send</button></span>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h3>Result</h3>
            <span>Details</span>
            <br/>
            <span id="invoke_details">...</span>
            <br/>
            <span>Return</span>
            <span className={contractCallResultClass}>{contractCallResult}</span>
            <br/>
            <span>Transaction Hash</span>
            <span id="invoke_contracttransactionhash" className="error-text">...</span>
            <a href="" id="invoke_contracttransactionhash_link" target="_blank"></a>
          </div>
        </Equalizer>
      </section>
    )
  }
}