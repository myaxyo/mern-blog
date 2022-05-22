import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const authRequest = async (type = 'login') => {
    const res = await axios
      .post(`http://geekzone.uz/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (isSignUp) {
      authRequest('signup')
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'));
    } else {
      authRequest()
        .then((data) => localStorage.setItem('userId', data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate('/blogs'));
    }
  };
  const [isSignUp, setIsSingUp] = React.useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
          margin="auto"
          marginTop={5}
        >
          <Typography variant="h3" padding={3} textAlign="center">
            {!isSignUp ? 'Login' : 'SignUp'}
          </Typography>
          {isSignUp && (
            <TextField
              value={inputs.name}
              onChange={handleChange}
              placeholder="Name"
              margin="normal"
              name="name"
            />
          )}
          <TextField
            value={inputs.email}
            onChange={handleChange}
            placeholder="Email"
            type={'email'}
            margin="normal"
            name="email"
          />
          <TextField
            value={inputs.password}
            onChange={handleChange}
            placeholder="Password"
            type={'password'}
            margin="normal"
            name="password"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            {!isSignUp ? 'Login' : 'SignUp'}
          </Button>
          <Button
            onClick={() => setIsSingUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            {isSignUp ? 'Login' : 'SignUp'}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
