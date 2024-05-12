import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.api";
import { TextField, Button, Typography } from "@mui/material";
import "./Auth.css";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: formData.email,
        password: formData.password,
      };
      const response = await login(userData);
      if (response.status === 200) {
        // Successful login
        toast.success(response.data.message);
        navigate("/todo");
      } else {
        // Error occurred during login
        toast.error(response.data.message || "Login failed");
        console.error("Login failed", response.data);
      }
    } catch (error) {
      // Network error or other unexpected error
      toast.error("Login failed");
      console.error("Login failed", error);
    }
  };

  return (
    <div className="wrapper signIn">
      <div className="form">
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </div>
          <div>
            <TextField
              label="Password"
              variant="outlined"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </div>
          <Button variant="contained" type="submit">Submit</Button>
        </form>
        <Typography>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Typography>
      </div>
    </div>
  );
}
