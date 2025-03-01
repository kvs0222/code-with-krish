import React, { useEffect } from "react";
import {createOrder,GetOrder} from "../services/order-service";


export default function OrderManagement() {

    const [CustomerId, setCustomerId] = React.useState("");
    const [ProductId, setProductId] = React.useState("");
    const [Price, setPrice] = React.useState("");
    const [Qty, setqty] = React.useState("");
    const [orders,setOrders]= React.useState([]);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        console.log("Order Submit")
        const order = {
            CustomerId,
            items: [
                {
                    ProductId,
                    Price,
                    quantity: Qty
                }
            ]
        }

       const response = await createOrder(order);
       console.log(response.data);
    }

    useEffect(()=> {
        fetchOrders();
    },[])

    const fetchOrders = async () =>{
        try {
            const response  = await GetOrder();
            console.log(response.data);
            setOrders(response.data)
        } catch (error) {
            console.error(error)
            alert(error.name)
        }
    }

    return (
        <>

            <p>Create Order</p>
            <form onSubmit={handleOrderSubmit}>
                <label htmlFor="cus_id">CustomerId</label>
                <input type='text' id='cus_id' name='cust_id' value={CustomerId} onChange={(e) => setCustomerId(e.target.value)} required></input>
                <label htmlFor="prod_id">ProductId</label>
                <input type='text' id='prod_id' name='prod_id' value={ProductId} onChange={(e) => setProductId(e.target.value)} required></input>
                <label htmlFor="price">Price</label>
                <input type='text' id='price' name='price' value={Price} onChange={(e) => setPrice(e.target.value)} required></input>
                <label htmlFor="qty">Qty</label>
                <input type='text' id='qty' name='qty' value={Qty} onChange={(e) => setqty(e.target.value)} required></input>

                <input type='submit' value='submit'></input>
            </form>

            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>customer ID</th>
                        <th>Order Date</th>
                        <th>ID</th>
                    </tr>
                    {
                        orders && orders.map(item =>
                           <tr>
                            <td>{item.id}</td>
                            <td>{item.CustomerId}</td>
                            <td>{item.createdAt.split}</td>
                            <td><button>Edit</button></td>
                            <td><button>View Item</button></td>
                           </tr> 
                            )
                    }
                </table>
            </div>
        </>
    )
}