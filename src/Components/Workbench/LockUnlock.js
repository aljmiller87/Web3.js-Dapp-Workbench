import React, { Component } from "react";

export default class LockUnlock extends Component {
	render() {
		return (
		  <div className="hero-unit">
		    <h1>UnLock &amp; Lock Accounts</h1>
		    {/* unlock the account */}
		    <div className="sidekick">
		      <h1>Unlock Account</h1>
		      <span>To</span>
		      <span><select id="select_to_unlock_account"></select></span>
		      <br/>
		      <span>Password</span><input id="unlock_account_password" type="text" value="password" />
		      <br/>
		      <span><button onclick="doUnlockAccount()">UnLock Account</button></span>
		      <span><button onclick="doLockAccount()">Lock Account</button></span>
		    </div>
		    <div className="sidekick">
		      <h1>Un/Lock Result</h1>
		      <p className="notready" id="lock_unlock_result">...</p>
		    </div>
		  </div>
		)
	}
}