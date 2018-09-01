import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class CompileDeployContract extends Component {
	render() {

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
			      <textarea cols="40" rows="3"></textarea>
			      {/* ABI Definition */}
			      <br/><span>ABI Definitions</span>
			      <textarea cols="40" rows="3"></textarea>
			    </div>
			    {/* deploy the contract */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Deploy</h3>
			      <p>Gas (Wei)
			        <input type="text" id="deployment_estimatedgas" size="10" value="4700000" /></p>
			      <button onclick="doDeployContract()">Deploy Contract</button><br/>
			    </div>
			    {/* deploy result */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Result</h3>
			      <p>Transaction Hash</p>
			      <p id="contracttransactionhash" className="error-text">...</p>
			      <a href="" id="contracttransactionhash_link" target="_blank"></a>
			      <p>Contract Address</p>
			      <input id="contractaddress" className="success-text" size="40" value=""/>
			      <a href="" id="contractaddress_link" target="_blank"></a>
			      <br/>
			    </div>
			</Equalizer>
		  </section>
		)
	}
}