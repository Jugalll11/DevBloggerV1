"use client"

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";



export default function Settings({ session }) {
    const [details, setDetails] = useState({});
    console.log(session.user.id)
    const handleFetch = async () => {
        const obj = await axios.post('http://localhost:4452/api/user/getUser', {
            id: session.user.id
        })
        setDetails(obj.data);
    }

    useEffect(() => {
        handleFetch();
    }, [])

    const handleInputChange = (key, value) => {
        setDetails({
            ...details,
            [key]: value,
        });
    };


    const handleUpdate = async()=>{
        const res = await axios.post('http://localhost:4452/api/user/updateUser',details);
        
    }



    return (
        <div className="grid grid-col-3">
            <div className="m-1 my-10">
                <h1>
                    Username
                </h1>
                <Input defaultValue={details.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    type="text" />
            </div>
            <div className="m-1 my-10">
                <h1 className="mx-2 text-lg">
                    Name
                </h1>
                <Input defaultValue={details.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div className=" m-1 my-10">
                <h1 className="mx-2 text-lg">
                    Bio
                </h1>
                <Input defaultValue={details.Bio} onChange={(e) => handleInputChange('Bio', e.target.value)} />
            </div>
            <Button onClick={(e) => handleUpdate(e)}>
                Update Profile
            </Button>
        </div>
    )
}