

const baseUrl= "http://localhost:3000/customers";

const createCustomer = async (customers)=>{
    return axios.post(baseUrl,customers);
}

const GetCustomers = async () =>{
    return axios.get(baseUrl);
}


export {createCustomer,GetCustomers};