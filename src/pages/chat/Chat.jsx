import "./chat.css";
import Sidebar from "../../components/sidebar/Sidebar";
import React from "react";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import openSocket from "socket.io-client";
import avatar from "../../image/avatar.jpg";
import axios from "axios";
import { api } from "../../api/api";

const socket = openSocket(api, {
  withCredentials: true,
});
const paperClip = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 448 512"
  >
    <path d="M364.2 83.8c-24.4-24.4-64-24.4-88.4 0l-184 184c-42.1 42.1-42.1 110.3 0 152.4s110.3 42.1 152.4 0l152-152c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-152 152c-64 64-167.6 64-231.6 0s-64-167.6 0-231.6l184-184c46.3-46.3 121.3-46.3 167.6 0s46.3 121.3 0 167.6l-176 176c-28.6 28.6-75 28.6-103.6 0s-28.6-75 0-103.6l144-144c10.9-10.9 28.7-10.9 39.6 0s10.9 28.7 0 39.6l-144 144c-6.7 6.7-6.7 17.7 0 24.4s17.7 6.7 24.4 0l176-176c24.4-24.4 24.4-64 0-88.4z" />
  </svg>
);

const faceSmile = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
  >
    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM164.1 325.5C182 346.2 212.6 368 256 368s74-21.8 91.9-42.5c5.8-6.7 15.9-7.4 22.6-1.6s7.4 15.9 1.6 22.6C349.8 372.1 311.1 400 256 400s-93.8-27.9-116.1-53.5c-5.8-6.7-5.1-16.8 1.6-22.6s16.8-5.1 22.6 1.6zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
  </svg>
);

const send = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="16"
    width="16"
    viewBox="0 0 512 512"
  >
    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
  </svg>
);
// tao chat
const customerChat = (chat) => {
  return (
    <div className="customer">
      <img className="avatar" src={avatar} />
      <div>Customer: {chat}</div>
    </div>
  );
};

const adminChat = (chat) => {
  return (
    <div className="admin">
      <p></p>
      <div>{chat}</div>
    </div>
  );
};

const createChat = (type, chat) => {
  if (type === "customer") return customerChat(chat);
  else if (type === "admin") return adminChat(chat);
};

const Chat = () => {
  const [active, setActive] = useState(null);
  const [mess, setMess] = useState("");
  const [content, setContent] = useState([]);
  const { data, loading, error, reFetch } = useFetch(api + "/chats/admin");

  let chatId = localStorage.getItem("chatUser");
  const showChat = (id) => {
    localStorage.setItem("chatUser", id);
  };

  const deleteChat = () => {
    localStorage.removeItem("chatUser");
  };
  const addChat = (chat) => {
    setContent((prev) => [...prev, chat]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const newChat = {
      chatId: chatId,
      mess: mess,
    };

    try {
      await axios.post(`${api}/chats/admin`, newChat, {
        withCredentials: true,
      });
      setMess("");
    } catch (err) {
      console.log(err);
    }
  };
  const getChat = async (chatId) => {
    await axios.get(`${api}/chats/adminChat?chatSession=${chatId}`, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    socket.on("chatsAdmin", (data) => {
      //create chat
      if (data.action === "create") {
        reFetch();
      }
      //get chat
      else if (data.action === "get") {
        chatId = data.chat._id;
        setContent(data.chat.content);
      }
      // add chat
      else if (data.action === "add") {
        console.log(chatId);
        console.log(data.chatId);
        if (data.chatId === chatId) addChat(data.mess);
      }
      // add chat
      else if (data.action === "delete") {
        reFetch();
        setContent([]);
        deleteChat();
        setActive(null);
      }
    });
  }, [socket]);
  return (
    <div className="chatRoom">
      <Sidebar />
      <div className="chatContainer">
        <div className="chatUser">
          {data?.map((chat, index) => {
            return (
              <div
                key={index}
                className={
                  active === index ? "chatItem chatactive" : "chatItem"
                }
                onClick={() => {
                  setActive(index);
                  showChat(chat._id);
                  getChat(chat._id);
                }}
              >
                <img className="avatar" src={avatar} />
                <p>{chat.idUser}</p>
              </div>
            );
          })}
        </div>
        <div className="chatContent">
          <div className="contentArea">
            {content?.map((chat, index) => {
              if (chat.messType === "admin")
                return (
                  <React.Fragment key={index}>
                    {createChat("admin", chat.mess)}
                  </React.Fragment>
                );
              else
                return (
                  <React.Fragment key={index}>
                    {createChat("customer", chat.mess)}
                  </React.Fragment>
                );
            })}
          </div>
          {content.length > 0 && (
            <form className="sendChat" onSubmit={handleSend}>
              <textarea
                placeholder="Enter Message!"
                onChange={(e) => setMess(e.target.value)}
                value={mess}
                required={true}
              ></textarea>

              <button className="btn">{paperClip}</button>
              <button className="btn">{faceSmile}</button>
              <button className="btn" type="submit">
                {send}
              </button>
            </form>
          )}
          {content.length === 0 && "No chat"}
        </div>
      </div>
    </div>
  );
};

export default Chat;
