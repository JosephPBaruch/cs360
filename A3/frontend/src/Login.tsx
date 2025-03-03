import { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    maxWidth: '500px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#3f51b5', // Primary color
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    marginTop: '1rem',
  },
});

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch('https://joestack.org/backend/login/', {
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
          navigate("/home")
        }
      });
  };

  const onRegisterClick = () => {
    navigate("/register")
  }

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>Login</Typography>
      <form className={classes.form}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button onClick={onClick} type="submit" variant="contained" color="primary" className={classes.button}>
          Login
        </Button>
        <Button onClick={onRegisterClick} variant="outlined" color="secondary" className={classes.button}>
          Sign Up
        </Button>
      </form>
    </Container>
  );
}

export default Login;