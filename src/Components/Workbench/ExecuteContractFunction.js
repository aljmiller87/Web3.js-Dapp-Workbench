import React, { Component } from "react";

export default class ExecuteContractFunction extends Component {
  render() {
    return (
      <div className="hero-unit">
        <h1>Contract Invocations</h1>
        <div className="sidekick">
          <h1>Execute</h1>
          <p className="ready">Address &amp; ABIDefinition picked from deployed contract</p>
          <span>
          <select id="contract_select_function">
            <option value="getNum">getNum()</option>
            <option value="setNum">setNum()</option>
          </select>
        </span>
          <br/>
          <span>Parameter for setNum()</span>
          <input id="setnum_parameter" size="6" type="text" value="5" />
          <span>Estimated Gas</span>
          <input type="text" id="contract_execute_estimatedgas" size="10" value="4700000" />
          <br/>
          <span>Value (Ether)</span> <input id="invocation_send_value_in_ether" type="text" value="0" disabled />
          <br/>
          <span><button onclick="doContractFunctionCall()">Call</button></span>
          <span><button onclick="doContractSendCall()">Send</button></span>
        </div>
        <div className="sidekick">
          <h1>Result</h1>
          <span>Details</span>
          <br/>
          <span id="invoke_details">...</span>
          <br/>
          <span>Return</span>
          <span id="invoke_return_value">...</span>
          <br/>
          <span>Transaction Hash</span>
          <span id="invoke_contracttransactionhash" className="notready">...</span>
          <a href="" id="invoke_contracttransactionhash_link" target="_blank"></a>
        </div>
      </div>
    )
  }
}