import Post from "@/Components/Post/Post";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import './post.css'
export default async function PostFunc(params) {
    const posts = (await axios.get('http://localhost:4452/api/post/getFeed')).data;

    
    return (
        <div className="">
            <div className="my-5 flex justify-around mx-auto">
                <Button className="w-32">Posts</Button>
                <Button className="w-32">Comments</Button>
            </div>
            <div className="flex height">
            <div className="overflow-y-auto scrollbarr w-11/12">
            {
                    posts.map((item, index) => {
                        return (
                            <Post Link={item._id} Title={item.title} Author={item.author} Content={item.content} comments={item.comments} />
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}