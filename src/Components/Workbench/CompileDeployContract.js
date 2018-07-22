import React, { Component } from "react";

export default class CompileDeployContract extends Component {
	render() {

		return (
		  <div className="hero-unit">
		    <h1>Compile &amp; Deploy Contracts</h1>
		    {/*contract compilation */}
		    <div className="sidekick">
		      <h1>Compile</h1>
		      <span id="list_of_compilers" className="notready">...</span>
		      <br/>
		      <button id="button_do_compile" onclick="doCompileSolidityContract()">Compile Code</button><br/>
		      <textarea id="sourcecode" cols="45" rows="10">
		      </textarea>
		    </div>
		    {/* compilation result */}
		    <div className="sidekick">
		      <h1>Result</h1>
		      <span className='notready' id='compilation_result'>...</span>
		      <br/><span>Bytecode</span>
		      <textarea id="compiled_bytecode" cols="40" rows="3"></textarea>
		      {/* ABI Definition */}
		      <br/><span>ABI Definitions</span>
		      <textarea id="compiled_abidefinition" cols="40" rows="3"></textarea>
		    </div>
		    {/* deploy the contract */}
		    <div className="sidekick">
		      <h1>Deploy</h1>
		      <p>Gas (Wei)
		        <input type="text" id="deployment_estimatedgas" size="10" value="4700000" /></p>
		      <button onclick="doDeployContract()">Deploy Contract</button><br/>
		    </div>
		    {/* deploy result */}
		    <div className="sidekick">
		      <h1>Result</h1>
		      <p>Transaction Hash</p>
		      <p id="contracttransactionhash" className="notready">...</p>
		      <a href="" id="contracttransactionhash_link" target="_blank"></a>
		      <p>Contract Address</p>
		      <input id="contractaddress" className="ready" size="40" value=""/>
		      <a href="" id="contractaddress_link" target="_blank"></a>
		      <br/>
		    </div>
		  </div>
		)
	}
}