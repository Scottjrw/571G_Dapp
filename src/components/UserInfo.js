import React, { Component } from 'react';

class UserInfo extends Component {

    render(){
        return(
            <div id="content">
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
                    <td>{this.props.order.hasConfirmed?"confirmed":"pending"}</td>
                    </tr>
                </tbody>
                </table>
            </div>

        );
    }
}

export default UserInfo;