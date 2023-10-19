import Info from "./Info"
import PostFunc from "./PostComp"

export default function home(params) {
return(
    <div>
        <Info />
        <div className="w-11/12">
        <PostFunc />
        </div>
    </div>
)
}