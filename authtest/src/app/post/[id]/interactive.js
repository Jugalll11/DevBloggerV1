"use client"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import axios from "axios"
import { useState } from "react"


export default function InteractiveComment({postID, userID, content}) {

    const handleComment = async()=>{
        const res = await axios.post('http://localhost:4452/api/post/addComment',{
            author:userID,
            post:postID,
            content:comment
        })
        setComment('')
    }

    const [comment, setComment] = useState('')
    return(
        <div className="flex-row">
                {/* <div className="flex justfy-center w-11/12 mx-5 my-10">
                <Button>
                    Like
                </Button>
                </div> */}
                
               <div className="flex flex-row mt-5">
               <Input placeholder="Add a Comment Here" 
               value={comment} onChange={(e) => {
                        setComment(e.target.value);
                    }} className="h-10 mx-5 w-10/12"/>
                <Button onClick={() => handleComment()}>Send Comment</Button>
                </div> 
            </div>
        
    )
}