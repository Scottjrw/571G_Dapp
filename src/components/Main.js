import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div id="content">
        <h2>Add Item</h2>
        <form onSubmit = 
          {async (event) => {
            event.preventDefault();
            const itemName = this.itemName.value
            const sellingPrice = window.web3.utils.toWei(this.sellingPrice.value.toString(), 'Ether')
            await this.props.createItem(itemName, sellingPrice)}
          }>
        <div className="form-group mr-sm-2">
            <input 
            id="itemName"
            type="text"
            ref={(input)=>{this.itemName=input}}
            className="form-control"
            placeholder="Item Name"
            required/>
        </div>
        <div>
            <input 
            id="sellingPrice"
            type="text"
            ref={(input)=>{this.sellingPrice=input}}
            className="form-control"
            placeholder="Selling Price"
            required/>
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>
        </form>
      </div>
    );
  }
}

export default Main;
