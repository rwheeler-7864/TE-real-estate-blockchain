import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Web3 from 'web3';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import Main from './pages/Main';

// import Marketplace from 'abis/Marketplace';
const Marketplace = require('./abis/Marketplace.json');

enum applicationStatus {
  applied,
  approved,
  denied,
  purchased,
}

interface Permit {
  id: number;
  owner: string;
  propertyAddress: string;
  document: string;
  licenceNumber: string;
  status: applicationStatus;
}

interface Props {}

interface State {
  account: string;
  loading: boolean;
  permitCount: number;
  permits: Permit[];
  marketplaceAddress: string;
}

// ignoring types - TODO fix this later
declare let window: any;

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      account: '',
      loading: true,
      permitCount: 0,
      permits: [],
      marketplaceAddress: '',
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. Please setup Metamask');
    }
  }

  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    if (networkData) {
      const abi = Marketplace.abi;
      const marketplace = web3.eth.Contract(abi, networkData.address);
      this.setState({ marketplaceAddress: networkData.address });
      console.log(marketplace);
    } else {
      window.alert('Marketplace is not deployed to detected network');
    }
  }

  render() {
    return (
      <div>
        <NavigationBar account={this.state.account} />
        <Container>
          <Main
            userAddress={this.state.account}
            marketplaceAddress={this.state.marketplaceAddress}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}
