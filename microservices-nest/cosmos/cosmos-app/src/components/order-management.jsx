import React from "react";
import createOrder from "../services/order-service";


export default function OrderManagement() {

    const [CustomerId, setCustomerId] = React.useState("");
    const [ProductId, setProductId] = React.useState("");
    const [Price, setPrice] = React.useState("");
    const [Qty, setqty] = React.useState("");

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
        </>
    )
}