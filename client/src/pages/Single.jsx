import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { Button } from "@mui/material";

const Single = () => {
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [post, setPost] = useState({});
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    try {
      await axios.put(`/posts/like/${postId}`, {
        is_like: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post?.userImg && <img src={post?.userImg} alt="" />}
          <div className="info">
            <span style={{ textTransform: "capitalize" }}>{post.username}</span>
            <p>posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
          {currentUser?.username && (
            <>
              <Button
                onClick={handleLike}
                variant={post.is_like === 1 ? "contained" : "outlined"}
              >
                Like
              </Button>
            </>
          )}
        </div>
        <h1>{post.title}</h1>
        <p>{getText(post.description)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
