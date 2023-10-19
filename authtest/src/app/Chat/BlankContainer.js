import Image from 'next/image'
import Wave from '../../../public/waving.gif'

export default function BlankContainer(params) {
    return(<div className="bg-slate-600 flex flex-col justify-center items-center ">
        <Image src={Wave} />
        Click on a Chat Head to Start Chatting
    </div>)
}