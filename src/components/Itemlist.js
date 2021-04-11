import React, { Component } from 'react';

class Itemlist extends Component {
    handleBid = function(itemName){
        console.log(itemName);
    }
  
    render() {
    return (
      <div id="content">
        {/* bid item */}
        <h1>Bid item</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.itemIdBid.value
          const price = window.web3.utils.toWei(this.itemPriceBid.value.toString(), 'Ether')
          this.props.bidItem(id, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="itemIdBid"
              type="text"
              ref={(input) => { this.itemIdBid = input }}
              className="form-control"
              placeholder="Item ID to bid"
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
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col">Status</th>
          </tr> 
        </thead>
        <tbody id="itemList">
            {this.props.itemList.map((item, key)=>{
                return(
                    <tr key={key}>
                    <th scope="row">{item.itemId}</th>   
                    <td>{item.itemName.toString()}</td>
                    <td>{window.web3.utils.fromWei(item.price.toString(), 'ether')} ETH </td>
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
