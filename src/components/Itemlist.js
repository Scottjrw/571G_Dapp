import React, { Component } from 'react';

class Itemlist extends Component {
    handleBid = function(itemName){
        console.log(itemName);
    }
  
    render() {
    return (
      <div id="content">
        {/* create item */}
        <h1>Sell item</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.itemName.value
          const price = window.web3.utils.toWei(this.itemPrice.value.toString(), 'Ether')
          this.props.createItem(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="itemName"
              type="text"
              ref={(input) => { this.itemName = input }}
              className="form-control"
              placeholder="Item Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="itemPrice"
              type="text"
              ref={(input) => { this.itemPrice = input }}
              className="form-control"
              placeholder="item Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Item</button>
        </form>

        {/* bid item */}
        <h1>Bid item</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.itemNameBid.value
          const price = window.web3.utils.toWei(this.itemPriceBid.value.toString(), 'Ether')
          this.props.bidItem(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="itemNameBid"
              type="text"
              ref={(input) => { this.itemNameBid = input }}
              className="form-control"
              placeholder="Item Name to bid"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="itemPriceBid"
              type="text"
              ref={(input) => { this.itemPriceBid = input }}
              className="form-control"
              placeholder="item Price to bid"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Bid!</button>
        </form>

        {/* list of existing items */}
        <h2>Item List</h2>
        <table className="table">
        <thead id="itemList">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr> 
        </thead>
        <tbody id="itemList">
            {this.props.itemList.map((item, key)=>{
                return(
                    <tr key={key}>
                    <th scope="row">{item.itemName.toString()}</th>   
                    <td>{window.web3.utils.fromWei(item.price.toString(), 'wei')} ETH </td>
                    <td>{item.owner}</td>
                    <td>
                      {
                        !item.isItemSold
                        ?
                        "Available"   
                        : 
                        "Sold"
                        }
                    </td>
                  </tr>
                )
            })}
        </tbody>
        </table>
      </div>
      
    );
  }
}

export default Itemlist;
