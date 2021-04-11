import React, { Component } from 'react';

class AdminContent extends Component {

    render(){
        return(
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

                {/* confirm order */}
                <button 
                    onClick={async (event)=>{
                        await this.props.confirm();
                    }}>Confirm Order</button>
            </div>

        );
    }
}

export default AdminContent;