import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }).then((response) => response.json())
        .then((data) => {
          if (data.access) {
            // Store the access token securely
            localStorage.setItem('access_token', data.access);
            console.log('User logged in!');
          }
        });
  };

  const onRegisterClick = () => {
    navigate("/register")
  }

  return (
    <Container>
      <Typography variant="h1">Login</Typography>
      <form>
        <div>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button onClick={onClick} type="submit" variant="contained" color="primary">
          Login
        </Button>
        <Button onClick={onRegisterClick} type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default Login;