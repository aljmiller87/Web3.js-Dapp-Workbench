import React, { Component } from "react";

export default class Events extends Component {
	render() {
		return (
			<div className="hero-unit">
        <h1>Contract Events</h1>
        {/* Watch events from specific contract instance */}
        <div className="sidekick">
          <h1>Watch Instance Events</h1>
          <span>Contract Instance Address</span>
          <pre>abiDefinition picked from "compile" section</pre>
          <span><input id="contract_instance_address" type="text" size="40" value="" placeholder="Copy&amp;Paste Contract Address here." /></span>
          <br/>
          <span>Indexed return values (JSON)</span>
          <div className="textarea" id="indexed_event_values" cols="40" rows="5">
		        <p>&#123;</p>
		        <p>  "newNum":"0x0000000000000000000000000000000000000000000000000000000000000005"</p>
		        <p>&#125;</p>
		      </div>
        </div>
        <div className="sidekick">
          <span>Additional filters</span>
          <div className="textarea" id="additional_filter_event_values" cols="40" rows="5">
        		<p>&#123;</p>
          	<p>"fromBlock":"latest"</p>
        		<p>&#125;</p>
          </div>
          <span><button onclick="doContractEventWatchStart()">event.watch()</button></span>
          <span><button onclick="doContractEventWatchStop()">event.stopWatching()</button></span>
        </div>
        <div className="sidekick">
          <h1>Events/Logs (5 Latest)</h1>
          <span>Recieve Count:</span><span id="watch_contract_instance_event_count" className="notready">Not Watching</span>
          <ol id="watch_contract_events_list">
            {/* This is where the events will be added */}
          </ol>
        </div>
        {/* contract event.get */}
        <div className="sidekick">
          <h1>Contract Instance Logs</h1>
          <span><button onclick="doContractEventGet()">event.Get()</button></span>
        </div>
        <div className="sidekick">
          <h1>Logs</h1>
          <span>Recieve Count:</span><span id="get_contract_instance_log_count" className="notready">....</span>
          <ol id="get_contract_instance_logs_list">
          </ol>
        </div>
      </div>
    )
  }
}