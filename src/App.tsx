import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Spinner, ThemeProvider } from 'react-bootstrap';
import Web3 from 'web3';
import Footer from './components/Footer';
import NavigationBar from './components/NavigationBar';
import Main from './pages/Main';
import LoadSpinner from './components/LoadSpinner';
import { FormikValues } from 'formik';

// import Marketplace from 'abis/Marketplace';
const Marketplace = require('./abis/Marketplace.json');

export enum applicationStatus {
  applied = 0,
  approved = 1,
  denied = 2,
  purchased = 3,
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
  marketplace: any;
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
      marketplace: {},
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

    // set current user account into state
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // load the marketplace into state
    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];
    // check user is on the correct eth network otherwise alert
    if (networkData) {
      const abi = Marketplace.abi;
      // https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html
      const marketplace = web3.eth.Contract(abi, networkData.address);
      // get permit count to perform loop - no .length in Solidity
      const permitCount = await marketplace.methods.permitCount().call();
      // loop through array of permits in marketplace, add into state
      for (let i = 1; i < permitCount; i++) {
        const permit = await marketplace.methods.permits(i).call();
        this.setState({ permits: [...this.state.permits, permit] });
      }
      console.log(this.state.permits);
      this.setState({
        marketplace,
        permitCount: permitCount.toString(),
        marketplaceAddress: networkData.address,
        loading: false,
      });
    } else {
      window.alert('Marketplace is not deployed to detected network');
    }
  }

  createPermit(data: FormikValues) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .createPermit(data.propertyAddress, data.document, data.licenceNumber, 0)
      .send({ from: this.state.account })
      .on('transactionHash', function () {
        console.log('Hash');
      })
      .on('receipt', function () {
        console.log('Receipt');
      })
      .on('confirmation', function () {
        console.log('Confirmed');
      })
      .on('error', async function () {
        console.log('Error');
      });
  }

  // createPermit(data: FormikValues) {
  //   this.setState({ loading: true });
  //   this.state.marketplace.methods
  //     .createPermit(data.propertyAddress, data.document, data.licenceNumber, 0)
  //     .send({ from: this.state.account })
  //     .once('receipt', (receipt: any) => {
  //       this.setState({ loading: false });
  //     });
  // }

  updatePermit(id: number, status: applicationStatus) {
    this.setState({ loading: true });
    this.state.marketplace.methods
      .updatePermit(id, status)
      .send({ from: this.state.account })
      .once('receipt', (receipt: any) => {
        this.setState({ loading: false });
      });
  }

  runCallBack(data: any, requestType: string) {
    switch (requestType) {
      case 'create':
        this.createPermit(data);
        break;
      case 'update':
        this.updatePermit(data.id, data.status);
        break;

      default:
        break;
    }
  }

  render() {
    return (
      <div>
        <NavigationBar account={this.state.account} />
        <Container>
          {this.state.loading ? (
            <LoadSpinner />
          ) : (
            <Main
              cb={(data: any, requestType: string) =>
                this.runCallBack(data, requestType)
              }
              userAddress={this.state.account}
              marketplaceAddress={this.state.marketplaceAddress}
              permits={this.state.permits}
            />
          )}
        </Container>
        <Footer />
      </div>
    );
  }
}
