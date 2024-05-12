import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import "./Auth.css";
import { signup } from "../../services/auth.api";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      if(response) navigate("/");
      else console.error("Signup failed:", response);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="wrapper signUp">
      <div className="form">
        <Typography variant="h5">Create An Account</Typography>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
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
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required  
            />
          </div>
          <div>
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required  
            />
          </div>
          <Button variant="contained" type="submit">Submit</Button>
          <Typography variant="h6" align="center" className="or">
            OR
          </Typography>
        </form>
        <Typography>
          Have an account? <Link to="/">Login</Link>
        </Typography>
      </div>
    </div>
  );
}
