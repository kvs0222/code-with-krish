import axios from "axios";

const baseUrl= "http://localhost:3000/order";

const createOrder = async (order)=>{
    return axios.post(baseUrl,order);
}

const GetOrder = async () =>{
    return axios.get(baseUrl);
}

export {createOrder,GetOrder};