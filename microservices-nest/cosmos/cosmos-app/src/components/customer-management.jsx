import { useEffect } from "react";


export default function CustomerManagement() {

    const [CustomerId, setCustomerId] = React.useState("");
    const [Name, setName] = React.useState("");
    const [Email, setEmail] = React.useState("");
    const [Address, setaddress] = React.useState("");

    const handleCustomerSubmit = async (e) => {
        e.preventDefault();
        console.log('Customer onboarding ');
        const cutomer = {
            id,
            name,
            email,
            address,
        }

    }

    useEffect(()=>{
        fetchCustomer();
    },[])

    const fetchCustomer = async () =>{
        try {
            const response  = await GetCustomers();
            console.log(response.data);
            setOrders(response.data)
        } catch (error) {
            console.error(error)
            alert(error.name)
        }
    }

    return (
        <>

            <p>Customer Onboarding</p>
            <form onSubmit={handleCustomerSubmit}>
                <label htmlFor="cus_id">CustomerId</label>
                <input type='text' id='id' name='id' value={id} onChange={(e) => setname(e.target.value)} required></input>
                <label htmlFor="name">Name</label>
                <input type='text' id='name' name='name' value={email} onChange={(e) => setName(e.target.value)} required></input>
                <label htmlFor="email">Email</label>
                <input type='text' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <label htmlFor="address">Address</label>
                <input type='text' id='address' name='address' value={address} onChange={(e) => setaddress(e.target.value)} required></input>

                <input type='submit' value='submit'></input>
            </form>

            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                        {/* <tr>
                            <td>customer.id</td>
                            <td>customer.name</td>
                            <td>customer.email</td>
                            <td>customer.address</td>
                            <td><button>Edit</button></td>
                            <td><button>View Item</button></td>
                        </tr> */}
                </table>
            </div>
        </>
    )
}
