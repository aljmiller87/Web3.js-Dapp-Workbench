import React, { Component } from "react";
import { Line, Circle } from 'rc-progress';
import Equalizer from 'react-equalizer';


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
    if(this.props.state.autoRetrieveFlag) {
      this.doGetNodeStatus();
      this.getMiningStatus();
      this.getSyncingStatus();
      this.setWeb3Version();
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
        that.setState({syncingStatus: error});
      } else {
        that.setState({syncingStatus: result});
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
          that.setState({syncingStatus: sync});
        // re-gain app operation
        } else {
          // false received
            // run your app init function...
            console.log(error);
            that.setState({syncing: false});

        }
      } else {
        console.log("SYNCHING ERROR: ", error);
        that.setState({syncing: {error: error}});

      }
    });
  }


  render() {
    // console.log('SetupAndVersion this.props', this.props);
    let connectStatus = this.state.connectedToEthereum = true ? 'Connected To Ethereum' : 'Not Connected';
    let connectStatusClass = this.state.connectedToEthereum = true ? 'success-text' : 'error-text';
    let getPeerCount = this.state.peerCount == undefined ? 'No peers' : this.state.peerCount;
    let getPeerCountClass = this.state.peerCount == undefined ? 'error-text' : 'success-text';
    let nodeVersion = this.state.nodeType == undefined ? 'Not connected' : this.state.nodeType;
    let nodeVersionClass = this.state.nodeType == undefined ? 'error-text' : 'success-text';
    let miningStatus = this.state.miningStatus == false ? 'Not Mining' : 'Mining';
    let syncingStatus = this.state.syncingStatus == undefined ? 'Not Syncing' : 'Syncing';
    let line = '';
    let currentBlock = 1;
    let highestBlock = 100;
    if (this.props.state.syncingStatus !== undefined) {
      currentBlock = this.props.state.syncingStatus.currentBlock;
      highestBlock = this.props.state.syncingStatus.highestBlock;
      line =  <Line percent={(currentBlock)/highestBlock*100} strokeWidth="4" strokeColor="#42ebf4" />;
    }

    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

		return (
			<section>
        <h2>Connect</h2>
        <Equalizer>
          {/* setup section  */}
          <div className="col-xs-12 col-sm-6">
            <h3>Setup</h3>
            <p className={connectStatusClass} id='connect_status'>{connectStatus}</p>
            <span>Provider</span>
            <span><input type='text' id='provider_url' defaultValue='http://localhost:8545'/></span>
            <span>
              <button onClick={this.props.reConnect}>Connect</button>
            </span>
          {/* version */}
            <h3>Version</h3>
            <p className={nodeVersionClass} id='version_information'>{this.state.nodeType}</p>
          </div>          
          <div className="col-xs-12 col-sm-6">
            <h3>Status</h3>
            <h3>Peers</h3>
            <p>
              <button onClick={this.props.getNodeStatus}>Node Status</button>
            </p>
            <p id="get_peer_count" className={getPeerCountClass}>Peers: {this.state.peerCount}</p>
            <h3>Mining</h3>
            <p>Mining Status: {miningStatus}</p>
            <h3>Syncing</h3>
            <p>Status: {syncingStatus}</p>
            <p>Current Block: {numberWithCommas(currentBlock)}</p>
            <p>Highest Block: {numberWithCommas(highestBlock)}</p>
            <p>Syncing Status: {syncingStatus} {(currentBlock/highestBlock*100).toFixed(2)} %</p>
            {line}
          </div>
        </Equalizer>
      </section>
    )
  }
}
