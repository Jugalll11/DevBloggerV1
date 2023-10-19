import { getServerSession } from "next-auth";
import Settings from "./Setting";
import { options } from "../api/auth/[...nextauth]/options";


export default async function home(params) {
    const session = await getServerSession(options);
    return(
        <div>
            <Settings session={session}/>
        </div>
    )
}