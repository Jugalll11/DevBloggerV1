import Image from 'next/image'
import './Chat.css'
export default function Header({ name }) {

    return (
        <div className="header ">
            <h3 className='mx-3'> {name.name} </h3>
        </div>
    )
}