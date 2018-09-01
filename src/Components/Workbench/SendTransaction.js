import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class SendTransaction extends Component {
	render() {
		return (
		  <section >
		    <h2>Send Ethers</h2>
		    <Equalizer>
			    <div className="col-xs-12 col-sm-6">
			      <h3>Transaction Object</h3>
			      <span>From</span>
			      <span><select id="send_from_account"></select></span>
			      <br/>
			      <span>To</span>

			      <input list="send_to_account" id="send_to_account_value" />
			      <datalist id="send_to_account">
			        <option value="Chrome"/>
			        <option value="Firefox"/>
			        <option value="Internet Explorer"/>
			        <option value="Opera"/>
			        <option value="Safari"/>
			        <option value="Microsoft Edge"/>
			      </datalist>


			      <br/>
			      <span>Value (Ether)</span> <input id="send_value_in_ether" type="text" value="0.01" />
			      <br/>
			      <span>Gas</span><input id="send_gas" type="text" value="default" />
			      <br/>
			      <span>Gas Price (wei)</span><input id="send_gas_price" type="text" value="default" />
			      <br/>
			      <span>Data (ascii)</span><input id="send_data" type="text" value="default" />
			      <br/>
			      <span>Nonce</span><input id="send_nonce" type="text" value="default" />
			      <br/>
			      <span><button onclick="generateTransactionJSON()">JSON &gt;&gt;</button></span>
			      <span><button onclick="resetTransactionObjectParameters()">Reset</button></span>

			    </div>
			    {/* transaction object json */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>JSON</h3>
			      <pre id='send_transaction_object_json'></pre>
			    </div>

			    {/* send  */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Send</h3>
			      <span><button onclick="doSendTransaction()">Send Transaction</button></span>
			    </div>
			    {/* send transaction result */}
			    <div className="col-xs-12 col-sm-6">
			      <h3>Result</h3>
			      <p className="error-text" id="send_transaction_error_or_result">...</p>
			      <a href="" id="etherscan_io_tx_link" target="_blank">...</a>
			    </div>
			  </Equalizer>
		  </section>
		)
	}
}