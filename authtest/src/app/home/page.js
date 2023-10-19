import Post from "@/Components/Post/Post"
import './page.css'
import axios from "axios"



export default async function home() {


    
    var postData;
    const post = await axios.get('http://localhost:4452/api/post/getFeed');
    if (post) {
        postData = post.data; 
    }

    return (
        <>
            <div className="overflow-y-auto wall">
                {
                    postData.map((item, index) => {
                        return (
                            <Post Link={item._id} Title={item.title} Author={item.author} Content={item.content} comments={item.comments} />
                        )
                    })
                }
            </div>
        </>
    )
}