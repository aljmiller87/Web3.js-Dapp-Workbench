import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class Events extends Component {
	render() {
		return (
			<section >
        <h2>Contract Events</h2>
        <Equalizer>
          {/* Watch events from specific contract instance */}
          <div className="col-xs-12 col-sm-6">
            <h3>Watch Instance Events</h3>
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
          <div className="col-xs-12 col-sm-6">
            <span>Additional filters</span>
            <div className="textarea" id="additional_filter_event_values" cols="40" rows="5">
          		<p>&#123;</p>
            	<p>"fromBlock":"latest"</p>
          		<p>&#125;</p>
            </div>
            <span><button onclick="doContractEventWatchStart()">event.watch()</button></span>
            <span><button onclick="doContractEventWatchStop()">event.stopWatching()</button></span>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h3>Events/Logs (5 Latest)</h3>
            <span>Recieve Count:</span><span id="watch_contract_instance_event_count" className="error-text">Not Watching</span>
            <ol id="watch_contract_events_list">
              {/* This is where the events will be added */}
            </ol>
          </div>
          {/* contract event.get */}
          <div className="col-xs-12 col-sm-6">
            <h3>Contract Instance Logs</h3>
            <span><button onclick="doContractEventGet()">event.Get()</button></span>
          </div>
          <div className="col-xs-12 col-sm-6">
            <h3>Logs</h3>
            <span>Recieve Count:</span><span id="get_contract_instance_log_count" className="error-text">....</span>
            <ol id="get_contract_instance_logs_list">
            </ol>
          </div>
        </Equalizer>
      </section>
    )
  }
}