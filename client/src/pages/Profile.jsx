import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Button, Card, CardContent, Divider, Typography } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const [quantityPosts, setquantityPosts] = useState([]);
  const [editUserName, seteditUserName] = useState({
    username: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get(`/posts/total`, {
          params: { userId: currentUser?.id },
        });
        setquantityPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchApi();
  }, [currentUser?.id]);

  const idUser = currentUser.id;
  const handleChange = (e) => {
    seteditUserName((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/auth/username/${idUser}`, editUserName);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="home">
      <div className="posts">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 20, textAlign: "center" }}
              color="black"
              gutterBottom
            >
              Profile
            </Typography>
            <Typography
              sx={{ fontSize: 20, textTransform: "capitalize" }}
              color="text.secondary"
              gutterBottom
            >
              User Name: {currentUser.username}
            </Typography>
            <div>
              <input
                style={{ padding: "6px", marginRight: "16px" }}
                type="text"
                onChange={handleChange}
                name="username"
                placeholder="Edit user name"
              />
              <Button
                style={{ marginRight: "16px" }}
                variant="contained"
                onClick={handleClick}
              >
                Save
              </Button>
              {error && (
                <span style={{ marginRight: "16px", color: "red" }}>
                  {error}
                </span>
              )}
            </div>
            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
            <Typography
              sx={{ fontSize: 20, textTransform: "capitalize" }}
              color="text.secondary"
              gutterBottom
            >
              Quantity Posts: {quantityPosts}
            </Typography>
            <Divider style={{ marginTop: "16px", marginBottom: "16px" }} />
            <Link className="link" to="/newpassword">
              <Button variant="contained">Change Password</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
