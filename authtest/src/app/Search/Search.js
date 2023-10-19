'use client'
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import User from "@/Components/User/user";
import Post from "@/Components/Post/Post"
import { useState } from "react";
import axios from "axios";
import './search.css'

export default function Search(params) {
    const [queryType, changeQueryType] = useState("Post");
    const queryTypeText = "Searching " + queryType;
    const [query, changeQuery] = useState("");
    const [UserResult, setUserResults] = useState([]);
    const [PostResult, setPostResults] = useState([]);

    async function handleQuery(params) {
        const queryTy = queryType
        console.log("Inside the function")
        const result = await axios.post('http://localhost:4452/api/post/searchPost', {
            query: query,
            queryType: queryType
        })

        if (queryTy == "Post") {
            console.log(PostResult)
            setUserResults([])
            setPostResults(result.data)
        }
        if (queryTy == "User") {
            setPostResults([])
            setUserResults(result.data)
            console.log(UserResult)
        }

    }

    const bio = 'Developer, Engineer, Looking forward to working in making Fast and reliable products in an agile Manner'

    return (
        <div className="flex flex-col">
            <div className="my-4 flex">
                <Input
                    className="mx-4"
                    id="Search"
                    placeholder={queryTypeText}
                    onChange={(e) => {
                        changeQuery(e.target.value);
                    }}

                />
                <Button className="w-52" onClick={() => handleQuery()}>
                    Search {queryType}
                </Button>

            </div>
            <div className="flex justify-evenly" >
                <Button className={`mx-1 w-96 ${queryType == "Post" ? "bg-slate-800" : "bg-slate-800/[0.5]"}`} onClick={(e) => {
                    changeQueryType("Post")
                }}>
                    Posts
                </Button >
                <Button className={`mx-1 w-96 ${queryType == "User" ? "bg-slate-800" : "bg-slate-800/[0.5]"}`} onClick={(e) => {
                    changeQueryType("User")
                }}>
                    Users
                </Button>
            </div>
            <div className="flex heig">
                <div className=" my-2 w-11/12 justify-center overflow-y-auto">
                    {
                        PostResult.map((item, index) => {
                            return (
                                <Post Link={item._id} Title={item.title} Author={item.author} Content={item.content} comments={item.comments} />
                            )
                        })
                    }
                    {
                        UserResult.map((item, index) => {
                            return (
                                <User Link={item.username} Name={item.name} Username={item.username} Bio={bio} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}