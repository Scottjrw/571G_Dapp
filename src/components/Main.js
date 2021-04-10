// import React, { Component } from 'react';

// class Main extends Component {
//   render() {
//     return (
//       <div id="content">
//         <h2>Item List</h2>
//         <table className="table">
//         <thead id="itemList">
//           <tr>
//             <th scope="col">#</th>
//             <th scope="col">Name</th>
//             <th scope="col">Price</th>
//             <th scope="col">Owner</th>
//             <th scope="col"></th>
//           </tr> 
//         </thead>
//         <tbody id="itemList">
//             {this.props.itemList.map((item, key)=>{
//                 return(
//                     <tr key={key}>
//                     <th scope="row">{item.itemId.toString()}</th>   
//                     <td>{item.itemName}</td> 
//                     <td>{window.web3.utils.fromWei(item.rice.toString(), 'Ether')} ETH </td>
//                     <td>{item.owner}</td>
//                     <td>
//                       {
//                         !item.isItemSold
//                           ?
//                           <button 
//                             id = {item.itemId}
//                             value = {item.itemPrice}
//                             onClick={async (event)=>{
//                               await this.props.buyItem(event.target.id, event.target.value);
//                             }}
//                           >
//                             Buy
//                           </button>
//                           : 
//                           null
//                         }
//                     </td>
//                   </tr>
//                 )
//             })}
//         </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default Main;
