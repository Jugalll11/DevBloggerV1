
import Chat from "./Chat";
import axios from "axios";

async function home() {
    const contacts = await axios.post('http://localhost:4452/api/user/getAllUsers')
    
    return (<>
        <Chat contacts={contacts.data}/>
    </>)
}

export default home;