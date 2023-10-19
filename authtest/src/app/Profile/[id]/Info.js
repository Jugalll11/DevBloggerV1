import { Button } from "@/Components/ui/button";
import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Image from "next/image"
import Link from "next/link";

export default async function Info(params) {
    const session = await getServerSession(options);

    if (session) {
        const headersList = headers();
        const pathname = headersList.get("x-invoke-path") || "";
        const username = pathname.substring(9);
        const userObj = (await axios.post('http://localhost:4452/api/user/getUser', { id: session.user.id })).data
        const ProfileObj = (await axios.post('http://localhost:4452/api/user/getProfile', { username: username })).data
        console.log(ProfileObj)
        return (
            <div>
                <div className="flex mx-2 my-5">
                    <div className="flex justify-between items-center w-11/12">
                        <div className=" flex text-xl">
                            <Image src={session.user.pfp} width={100} height={100} />
                            <div className="mx-5">
                                <h1 className="font-bold my-2">{ProfileObj.name}</h1>
                                <span className="italic my-2">@{ProfileObj.username}</span>
                            </div>
                        </div>
                        {
                            userObj._id === ProfileObj._id ? <Link href={'/Settings'}>
                            <Button>Edit Profile</Button>
                        </Link> : <></>
                        }
                        
                    </div>
                </div>
                <p className="text-lg mx-4">{ProfileObj.Bio}</p>
            </div>
        )
    }
}