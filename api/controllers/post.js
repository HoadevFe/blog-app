import { db } from "../db.js";
import jwt from "jsonwebtoken";
export const getPosts = (req, res) => {
  const uid = req.query.userId;
  let q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  if (req.query.cat && uid) q = q + ` and uid = ${uid}`;
  if (!req.query.cat && uid) q = q + ` where uid = ${uid}`;

  const filterBy = req.query.filterBy;
  if (filterBy === "isRead") {
    q = q + " and is_read = true;";
  }
  if (filterBy === "like") {
    q = q + " and is_like = true;";
  }
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};
export const getPost = (req, res) => {
  const isRead = req.query.isRead;
  let q =
    "SELECT p.id,`is_like`, `username`, `title`, `description`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? ";
  if (isRead) q = q + ` and is_read =${isRead}`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `description`,`img`,`cat`,`date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    });
  });
};
export const updatePosts = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`description`=?,`img`=?,`cat`=? WHERE `id` = ? AND `uid` = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
    });
  });
};

export const getTotalPost = (req, res) => {
  let q = "SELECT COUNT(id) as total FROM posts";
  const uid = req.query.userId;
  if (uid) q = q + ` WHERE uid = ${uid}`;
  const filterBy = req.query.filterBy;
  if (filterBy === "isRead") {
    q = q + " AND is_read = true;";
  }
  if (filterBy === "like") {
    q = q + " AND is_like = true;";
  }
  db.query(q, [], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data[0].total);
  });
};

export const isLike = (req, res) => {
  const postId = req.params.id;
  const q = "UPDATE posts SET `is_like`=? WHERE `id` = ?";
  const values = [req.body.is_like];
  db.query(q, [values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Like successfuly!");
  });
};

export const isRead = (req, res) => {
  const postId = req.params.id;
  const q = "UPDATE posts SET `is_read`=? WHERE `id` = ?";
  const values = [req.body.is_read];
  db.query(q, [values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Has Read");
  });
};
