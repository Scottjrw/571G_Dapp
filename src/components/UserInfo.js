import React, { Component } from 'react';

class UserInfo extends Component {

    render(){
        return(
            <div id="content">
                {/* display credit */}
                <h2>Your Credit: {this.props.credit.creditRest}</h2>
                <p>make donation can earn you extra credit<br/>cancel order deducts your credit</p>
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const amount = window.web3.utils.toWei(this.donateValue.value.toString(), 'Ether')
                    this.props.donate(amount)}}>
                    <div>
                        <input
                            id="donateValue"
                            type="text"
                            ref={(input) => { this.donateValue = input }}
                            className="form-control"
                            placeholder="value to donate"
                            required />
                        <button type="submit" className="btn btn-primary">Donate</button>
                    </div>
                </form>

                {/* display / cancel order */}
                <h2>Your Order</h2>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Item Id</th>
                    <th scope="col">Bid Price</th>
                    <th scope="col">Confirmation status</th>
                    </tr> 
                </thead>
                <tbody>
                    <tr>
                    <td>{this.props.order.itemID}</td>
                    <td>{window.web3.utils.fromWei(this.props.order.price.toString(), 'ether')} ETH </td>
                    <td id="orderStatus">{this.props.order.hasConfirmed?"confirmed"
                        :this.props.order.isValidOrder?"pending":"canceled"}</td>
                    </tr>
                </tbody>
                </table>
                <button 
                    onClick={async (event)=>{
                        if(this.props.order.isValidOrder && !this.props.order.hasConfirmed){
                            await this.props.cancelOrder();
                        }else{
                            alert("order already confirmed or canceled");
                        }
                    }}>Cancel Order</button>
            </div>

        );
    }
}

export default UserInfo;