import React, { Component } from 'react';
import './AdminContent.css';
import Button from 'react-bootstrap/Button'

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
                <Button type="submit" className="btn btn-primary">Add Item</Button>
                </form>

                {/* confirm order */}
                <Button 
                    variant="success"
                    onClick={async (event)=>{
                        await this.props.confirm();
                    }}>Confirm Orders</Button>

                <hr id="admin-seperate"/>
            </div>

        );
    }
}

export default AdminContent;