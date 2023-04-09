import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const ChangePassword = () => {
  const { currentUser } = useContext(AuthContext);
  const [changePassword, setchangePassword] = useState({
    password: "",
    newPassword: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setchangePassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(changePassword);

  const idUser = currentUser.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/auth/password/${idUser}`, changePassword);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1>Change PassWord</h1>
      <form action="">
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="new password"
          name="newPassword"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>Save</button>
        {error && <p>{error}</p>}
        <span>
          <Link className="link" to="/">
            <Button variant="text">Back</Button>
          </Link>
        </span>
      </form>
    </div>
  );
};

export default ChangePassword;
