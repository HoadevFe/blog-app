import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PostsUser = () => {
  const { currentUser } = useContext(AuthContext);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`/posts/`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, []);

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <Fragment key={post.id}>
            {currentUser?.id === post.uid ? (
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
            ) : (
              <></>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default PostsUser;
