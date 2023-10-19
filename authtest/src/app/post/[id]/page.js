import { headers } from "next/headers";
import axios from "axios";
import './page.css'
import Link from "next/link";
import Interactive from "./interactive";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Comment from "@/Components/Comment/Comment";

async function home() {


    const headersList = headers();
    const pathname = headersList.get("x-invoke-path") || "";
    const url = pathname.substring(6);
    const postData = await axios.post('http://localhost:4452/api/post/getPost', {
        id: url
    });

    const comments = (await axios.post('http://localhost:4452/api/post/fetchComments', {
        postID: url
    })).data
    const author = '/Profile/' + postData.data.author;

    const session = await getServerSession(options);

    return (
        <div>
            <div className="flex justify-center">
                <div className="tweet-wrap flex flex-start">

                    <div class="tweet-header ">
                        <div class="tweet-header-info">
                            <h6 className="text-6xl font-bold my-2 py-1">
                                {postData.data.title}
                            </h6>
                            <Link href={author}> Author: {postData.data.author} </Link>
                            <p>{postData.data.content}</p>

                        </div>

                    </div>
                </div>
            </div>
            <Interactive postID={postData.data._id} userID={session.user.id} />
            <div className="overflow-y-auto commentSection">
            {
                comments.map(async(comment,index)=>{
                    const name = (await axios.post('http://localhost:4452/api/user/getUser',{
                        id:comment.author
                    })).data.username
                    return(
                        <Comment  user={name} content={comment.content}/>
                    )
                })
            }
            </div>
            
        </div>
    )
}

export default home;