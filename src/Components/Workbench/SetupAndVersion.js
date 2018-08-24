import React, { Component } from "react";
import { Line, Circle } from 'rc-progress';


export default class SetupAndVersion extends Component {
  constructor(props) {
    super();
    this.state = {
      peerCount: undefined,
      miningStatus: undefined,
      nodeType: undefined,
      syncing: undefined,
      syncingStatus: undefined

    }
    this.setWeb3Version = this.setWeb3Version.bind(this);
    this.doGetNodeStatus = this.doGetNodeStatus.bind(this);
    this.getMiningStatus = this.getMiningStatus.bind(this);
    this.getSyncingStatus = this.getSyncingStatus.bind(this);

  }

  componentWillMount() {
    console.log(this.props);
    if(this.state.autoRetrieveFlag) {
      this.doGetAccounts();
      this.doGetNodeStatus();
      this.getMiningStatus();
      this.getSyncingStatus();
    }

  }

  setWeb3Version() {
    let that = this;
    return new Promise(function(resolve, reject) {
      let version = web3.version.getNode(function(error, result){
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
    .then(function(result) {      
      console.log('web3 version: ', result);      
      that.setState({ nodeType: result });
    })
    .catch(function(error) {
      console.log(error);
    });
        
  }

  doGetNodeStatus() {
    let that = this;
    console.log("called doGetNodeStatus");
    // Asynch version
    web3.net.getListening(function(error, result){
      if(error) {
        console.log('getListening error: ', error);         
      } else {
        // Since connected lets get the count
        web3.net.getPeerCount(function(error, result) {
        if(error){
            // no peers
            console.log('peer count error: ', error);
        } else {console.log('peercount result: ', result);
          that.setState({ peerCount: result });
        }
      });
      }
    });

  }
  getMiningStatus() {
    let that = this;
    console.log("called getMiningStatus");
    // Asynch
    web3.eth.getMining(function(error, result) {
      if(error) {
        console.log('miningStatus: ', error);
        that.setState({miningStatus: error});
      } else {
        console.log('miningStatus: ', result);
        that.setState({miningStatus: result});
      }
    })
  }
  getSyncingStatus() {
    console.log("called getSyncingStatus");
    let that = this;
    // Asynch
    web3.eth.getSyncing(function(error, result) {
      if(error) {
        console.log("syncing error: ", error);
        // that.setState({syncingStatus: error});
      } else {
        console.log("syncing result: ", result);
        // that.setState({syncingStatus: result});
      }
    });
    web3.eth.isSyncing(function(error, sync){
      if(!error) {
         // sync = boolean OR object
        if(sync === true) {
          // stop all app activity
          // received `true`, so it stops all filters, but not the web3.eth.syncing polling
          web3.reset(true);
          that.setState({syncing: true});
        // show sync info
        } else if(sync) {
          // object received
          let syncDetails = {
            currentBlock: sync.currentBlock,
            highestBlock: sync.highestBlock,
            startingBlock: sync.startingBlock
          }
          that.setState({syncingStatus: syncDetails});
        // re-gain app operation
        } else {
          // false received
            // run your app init function...
            console.log(error);
            that.setState({syncing: false});

        }
      } else {
        console.log("SYNCHING: ERROR");
        console.log(error);
        that.setState({syncing: {error: error}});

      }
    });
  }


  render() {
    // console.log('SetupAndVersion props', props);
    let connectStatus = props.state.connectedToEthereum = true ? 'Connected To Ethereum' : 'Not Connected';
    let connectStatusClass = props.state.connectedToEthereum = true ? 'ready' : 'notready';
    let getPeerCount = props.state.peerCount == undefined ? 'No peers' : props.state.peerCount;
    let getPeerCountClass = props.state.peerCount == undefined ? 'notready' : 'ready';
    let nodeVersion = props.state.nodeType == undefined ? 'Not connected' : props.state.nodeType;
    let nodeVersionClass = props.state.nodeType == undefined ? 'notready' : 'ready';
    let miningStatus = props.state.miningStatus == false ? 'Not Mining' : 'Mining';
    let syncingStatus = props.state.syncingStatus == undefined ? 'Not Syncing' : 'Syncing';
    let line = '';
    let currentBlock = 1;
    let highestBlock = 100;
    if (props.state.syncingStatus !== undefined) {
      currentBlock = props.state.syncingStatus.currentBlock;
      highestBlock = props.state.syncingStatus.highestBlock;
      line =  <Line percent={(currentBlock)/highestBlock*100} strokeWidth="4" strokeColor="#42ebf4" />;
    }

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

		return (
			<div className="hero-unit">
        <h1>Connect</h1>

        {/* setup section  */}
        <div className="sidekick">
          <h1>Setup</h1>
          <p className={connectStatusClass} id='connect_status'>{connectStatus}</p>
          <span>Provider</span>
          <span><input type='text' id='provider_url' defaultValue='http://localhost:8545'/></span>
          <span>
            <button onClick={props.reConnect}>Connect</button>
          </span>
        </div>
        {/* version */}
        <div className="sidekick">
          <h1>Version</h1>
          <p className={nodeVersionClass} id='version_information'>{props.state.nodeType}</p>
        </div>
        <div className="sidekick">
          <h1>Status</h1>
          <h3>Peers</h3>
          <p>
            <button onClick={props.getNodeStatus}>Node Status</button>
          </p>
          <p id="get_peer_count" className={getPeerCountClass}>Peers: {props.state.peerCount}</p>
          <h3>Mining</h3>
          <p>Mining Status: {miningStatus}</p>
          <h3>Syncing</h3>
          <p>Status: {syncingStatus}</p>
          <p>Current Block: {numberWithCommas(currentBlock)}</p>
          <p>Highest Block: {numberWithCommas(highestBlock)}</p>
          <p>Syncing Status: {syncingStatus} {(currentBlock/highestBlock*100).toFixed(2)} %</p>
          {line}
        </div>
      </div>
    )
  }
}
