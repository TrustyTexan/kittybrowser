import React, { Component, Children } from 'react';
import { drizzleConnect } from 'drizzle-react';
import Web3 from 'web3';

class Loading extends Component {
  static displayName = 'Loading';

  render() {
    const { drizzleStatus, children, web3Status } = this.props;

    if (window.web3 === undefined || web3Status === 'failed') {
      return (
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (drizzleStatus.initialized) {
      // Load the dapp.
      return Children.only(React.cloneElement(children));
    }

    return (
      // Display a loading indicator.
      <div className="loading">
        <h1>Loading dapp...</h1>
        <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    web3Status: state.web3.status,
    drizzleStatus: state.drizzleStatus
  }
};

export default drizzleConnect(Loading, mapStateToProps);
