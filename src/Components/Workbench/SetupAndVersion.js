import React, { Component } from "react";

export default class SetupAndVersion extends Component {
	render() {
		return (
			<div className="hero-unit">
        <h1>Connect</h1>

        {/* setup section  */}
        <div className="sidekick">
          <h1>Setup</h1>
          <p className='notready' id='connect_status'>Not connected</p>
          <span>Provider</span>
          <span><input type='text' id='provider_url' value='http://localhost:8545'/></span>
          <span>
            <button onclick="doConnect()">Connect</button>
          </span>
          <br/>
          <span>
            <button onclick="doGetNodeStatus()">Node Status</button>
          </span>
          <span id="get_peer_count" className="notready">...</span>
        </div>
        {/* version */}
        <div className="sidekick">
          <h1>Version</h1>
          <pre id='version_information'></pre>
        </div>
      </div>
    )
	}
}
