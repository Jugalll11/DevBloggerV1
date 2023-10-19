'use client'
import styled from "styled-components";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

export default function Input({handleMessage}) {
    const [msg, setMsg] = useState("");
    const handleSubmit = (e)=>{
      e.preventDefault();
      if(msg.length>0){
        handleMessage(msg);
        setMsg('')
      }
    }
    return (
        <Container>
            <div className="input-container">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <input
                        type="text"
                        placeholder="Enter Your Message"
                        value={msg}
                        onChange={(e) => {
                            setMsg(e.target.value);
                        }}
                    />
                    <button type="submit" className="submit">
                        <IoMdSend  className="text-white text-xl mx-10"/>
                    </button>
                </form>
            </div>
        </Container>)
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  background-color: #080408;
  padding: 0.2rem;
  padding-bottom: 0.3rem;
  .button-containr {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    .emoji {
      margin-left: 2.5rem;
      position: relative;
      svg {
        font-size: 2.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emotepicker{
        position: absolute;
        top: -470px;
        left: -10px;
      }
    }
  }

  .input-container {
    display: flex;
    flex-direction: row;
    width: inherit;
    width: 73vw;

    form {
      display: flex;
      flex-direction: row;
      width: inherit;
    }

    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2 rem;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9186f3;
      }
      &:focus {
        outline: none;
      }
      button {
        padding: 0.3rem 2rem;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #9186f3;
        border: none;
        s svg {
          font-size: 2rem;
          color: white;
        }
      }
    }
  }
`;