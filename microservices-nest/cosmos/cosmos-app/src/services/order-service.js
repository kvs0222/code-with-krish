import Axios  from "axios";

const baseUrl= "http://localhost:3000/order";

const createOrder = async (order)=>{
    return Axios.post(baseUrl,order);
}

export default createOrder;