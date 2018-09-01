import React, { Component } from "react";
import Equalizer from 'react-equalizer';

export default class FilterOptionsWatch extends Component {
	render() {
		return (
			<section >
		    	<h2>Events &amp; Logs : Filter, Watch, Get</h2>
		    	<Equalizer>
				    {/* Filter options fields */}
				    <div className="col-xs-12 col-sm-6">
				      <h3>Filter</h3>
				      <span>From Block</span><input id="from_block_filter" type="text" value="latest" />
				      <br/>
				      <span>To Block</span><input id="to_block_filter" type="text" value="" />
				      <br/>
				      <span>Contract Addresses (newline separated)</span>
				      <div className="textarea" id="addresses_filter" cols="40" rows="3" value=""></div>
				      <br/>

				      <span>Topics</span>
				      <pre>[0=event sig,1=addr,2 &amp; 3=32byteHex]</pre>
				      {/* The default for the 
				       NumberSetEvent(address indexed caller, bytes32 indexed oldNum, bytes32 indexed newNum)
				       [0]=Signature of the event
				       [1]=Address of the caller
				       [2]=null but can be set to Old number as 32 byte string
				       [3]=New number as 32 byte string
				    */}
				      	<div className="textarea" id="topics_filter" cols="40" rows="5" value="">
					      <p>0x108fd0bf2253f6baf35f111ba80fb5369c2e004b88e36ac8486fcee0c87e61ce</p>
					      <p>null</p>
					      <p>null</p>
					      <p>0x0000000000000000000000000000000000000000000000000000000000000005</p>
					    </div>
				      	<span><button onclick="generateFilterOptions()">Options &gt;&gt;</button></span>
				  	</div>
					  {/* Options object */}
					<div className="col-xs-12 col-sm-6">
					    <h3>Options</h3>
					    <pre id='options_filter'></pre>
					</div>
					  {/* Add a watch */}
					  
					<div className="col-xs-12 col-sm-6">
					    <h3>Watch</h3>
					    <span><button onClick="doFilterWatchStart()">Watch()</button></span>
					      <span><button onClick="doFilterStopWatching()">stopWatching()</button></span>
					</div>
				    <div className="col-xs-12 col-sm-6">
					      <h3>Events (5 Latest)</h3>
					      <span>Applied</span><input type="text" size="40" id="applied_watch_filter" className="success-text" disabled />
					      <span>Recieve Count:</span><span id="watch_event_count" className="error-text">Not Watching</span>
					      <ol id="watch_events_list">
					        {/* This is where the events will be added */}
					      </ol>
				    </div>

					    {/* filter.get */}
				    <div className="col-xs-12 col-sm-6">
					      <h3>Get Logs</h3>
					      <span><button onclick="doFilterGetLogs()">Get()</button></span>
				    </div>
				    <div className="col-xs-12 col-sm-6">
					      <h3>Logs</h3>
					      <span>Applied</span><input type="text" size="40" id="applied_log_filter" className="success-text" disabled />
					      <span>Recieve Count:</span><span id="get_log_count" className="error-text">....</span>
					      <ol id="get_logs_list">
					        {/* This is where the events will be added */}
					      </ol>
				    </div>
				</Equalizer>
			  </section>
		)
	}
}