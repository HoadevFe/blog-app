import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { MenuItem, Select } from "@mui/material";

const PostsUser = () => {
  const { currentUser } = useContext(AuthContext);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [posts, setPosts] = useState([]);
  const [params, setParams] = useState();
  const [total, setTotal] = useState();

  const filterBy = (value) => {
    if (value === "isRead") {
      setParams({ filterBy: "isRead" });
    }
    if (value === "Like") {
      setParams({ filterBy: "like" });
    }
  };

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get("/posts", {
          params: { ...params, userId: currentUser?.id },
        });
        setPosts(res.data);
        const result = await axios.get(`/posts/total`, {
          params: { ...params, userId: currentUser?.id },
        });
        setTotal(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [params, currentUser?.id]);

  return (
    <div className="home">
      <div style={{ marginTop: "16px" }}>
        <Select onChange={(value) => filterBy(value.target.value)}>
          <MenuItem value={"isRead"}>Has Read</MenuItem>
          <MenuItem value={"Like"}>Like</MenuItem>
        </Select>
        <span style={{ marginLeft: "16px" }}>Quantity : {total}</span>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Fragment key={post.id}>
            <div className="post">
              <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.description)}</p>
                <p className="sub_desc">...</p>
                <Link to={`/post/${post.id}`}>
                  <button>Update</button>
                </Link>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default PostsUser;
