import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import logo from '../logo.png'
import CharityBazaar from '../abis/CharityBazaar'
import Addressbar from './Addressbar'
import Itemlist from './Itemlist'
import UserInfo from './UserInfo'

class App extends Component{
  
  async componentDidMount(){
    await this.getWeb3Provider();
    await this.connectToBlockchain();
  }

  async getWeb3Provider(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async connectToBlockchain(){
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = CharityBazaar.networks[networkId];
    console.log(networkData);
    if(networkData) {
      const deployedCharityBazaar = new web3.eth.Contract(CharityBazaar.abi, networkData.address);
      this.setState({deployedCharityBazaar: deployedCharityBazaar});
      // get the number of total items on the blockchain; -1 because idCounter start from 1
      const totalNumber = await deployedCharityBazaar.methods.idCounter().call() -1 ;
      console.log(totalNumber);
      this.setState({totalNumber})
      // load items
      for (var i = 1;i<= totalNumber;i++) {
        const item = await deployedCharityBazaar.methods.itemList(i).call();
        this.setState({
          itemList:[...this.state.itemList, item]
        });
      }
      // load order
      const _order = await deployedCharityBazaar.methods.orderList(this.state.account).call();
      this.setState({order: _order});
      this.setState({loading: false});
      console.log(this.state.order);
    } else {
      window.alert('CharityBazaar contract is not found in your blockchain.')
    }
  }
  
  constructor(props){
    super(props);
    this.state = {
        account: '', // account[0]
        totalNumber: 0, // total number of items
        itemList: [], // items on sale
        loading: true,
        order: null
    };

    this.createItem = async (itemName, itemPrice) => {
      this.setState ({loading: true})
      const gasAmount = await this.state.deployedCharityBazaar.methods.createItem(itemName, itemPrice).estimateGas({from: this.state.account})
      this.state.deployedCharityBazaar.methods.createItem(itemName, itemPrice).send({from: this.state.account, gas: gasAmount})
      .once('receipt', async (receipt)=> {
        const totalNumber = await this.state.deployedCharityBazaar.methods.idCounter().call()-1;
        this.setState({totalNumber});
        this.setState({itemList: []});
        for (var i = 1;i<= totalNumber;i++) {
          const item = await this.state.deployedCharityBazaar.methods.itemList(i).call();
          this.setState({
            itemList:[...this.state.itemList, item]
          });
        }
        this.setState({loading: false});
      })
    }

    this.bidItem = async (itemId, bidPrice) => {
      this.setState ({loading: true})
      this.state.deployedCharityBazaar.methods.bidItem(itemId, bidPrice).send({from: this.state.account, value: bidPrice})
      .once('receipt', async (receipt)=> {
        const _order = await this.state.deployedCharityBazaar.methods.orderList(this.state.account).call();
        this.setState({order: _order});
        this.setState({loading: false});
      })
    }
  }

    render() {
      return (
        <div>
          <Addressbar account={this.state.account}/>
          <div className="container-fluid mt-5">
            <div className="row">
              <main>
                <img src={logo} alt="logo" />
                { this.state.loading
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Itemlist 
                  itemList={this.state.itemList}
                  createItem={this.createItem}
                  bidItem={this.bidItem}/>
                } 
                {
                  this.state.loading
                  ? null
                  : <UserInfo
                    order={this.state.order}
                    />
                }
              </main>
            </div>
          </div>
        </div>
      );
    }
}

export default App;
