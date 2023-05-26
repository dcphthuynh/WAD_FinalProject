import React, { useContext, useEffect, useState } from "react";
import Edit from "../Images/edit.png";
import Delete from "../Images/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../Components/Menu";
import { Navbar } from "../Components/Navbar";
import moment from "moment";
import AuthContext from "../Context/authContext";
import axios from "axios";

export const Single = () => {
  const state = useLocation().state;

  const url = "http://localhost:8800/api";

  const [post, setPost] = useState({});

  const location = useLocation();

  const navigate = useNavigate();

  const postID = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/posts/${postID}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postID]);

  console.log(currentUser);

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/posts/${postID}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="singleWrapper">
        <div className="content">
          <img src={`../Upload/${post?.img}`} alt="" />
          <div className="user">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post?.username && (
              <div className="edit">
                <Link to={`/write?edit=1`} state={post}>
                  <img src={Edit} alt="" />
                </Link>
                <Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </Link>
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <h3 className="contentTag">#{post.cat}</h3>
          <p>{getText(post.desc)}</p>
        </div>
        <Menu cat={post.cat}></Menu>
      </div>
    </div>
  );
};
