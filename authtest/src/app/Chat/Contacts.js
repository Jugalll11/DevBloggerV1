'use client'
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import styled from "styled-components";
export default function Contacts({ changeChat, contacts}) {
  const session = useSession();
  const [currentSelectedChat, setSelectedChat] = useState(undefined);
  const changeSelectedChat = (index, contact) => {
    setSelectedChat(index);
    changeChat(contact);
  };


  const newContacts = contacts.filter((contact)=>{
    if(session.status == 'authenticated'){
    return contact.email!==session.data.user.email
    }
  })
  return (
    <Container>
      <div className="contacts">
        {newContacts.map((contact, index) => {
          return (
            <div
              className={`contact ${index === currentSelectedChat ? "selectedChat" : ""
                }`}
              key={index}
              onClick={() => {
                changeSelectedChat(index, contact);
              }}
            >

              <div className="username">
                <h3> {contact.name} </h3>
              </div>
            </div>
          );
        })}
      </div>

    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 87% 13%;
  overflow: hidden;
  background-color: #7765e0;

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    justify-content: flex-start;
    overflow: auto;
    gap: 1rem;
    ::-webkit-scrollbar {
      width: 2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      width: 80vw;
      background-color: #ffffff30;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selectedChat {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: aqua;
    border-radius: 1%;
    display: flex;
    align-items: center;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-right: 1.5rem;
      height: 2rem;
      .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border-radius : 50%;
        background-color: #9a86f3;
        color: antiquewhite;
        :hover{
          color: antiquewhite;
          background-color: #0000002c;
        }
      }
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;