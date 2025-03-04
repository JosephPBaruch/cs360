import { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, AppBar, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    maxWidth: '800px',
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
    marginBottom: '2rem',
  },
  button: {
    marginTop: '1rem',
  },
  table: {
    marginTop: '2rem',
  },
  appBar: {
    marginBottom: '2rem',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Home() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://joestack.org/backend/users/')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const createUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fetch('https://joestack.org/backend/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, firstName, lastName, email, password }),
    }).then(response => response.json())
      .then(newUser => setUsers([...users, newUser]));
  };

  const deleteUser = (id: number) => {
    fetch(`https://joestack.org/backend/users/${id}/`, {
      method: 'DELETE',
    }).then(() => {
      setUsers(users.filter(user => user.id !== id));
    });
  };

  const logout = () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      fetch('https://joestack.org/backend/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      }).then(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      });
    }
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6">User Management</Typography>
          <Button color="inherit" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Typography variant="h4" className={classes.title}>User Management</Typography>
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
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Button onClick={createUser} type="submit" variant="contained" color="primary" className={classes.button}>
            Create User
          </Button>
        </form>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteUser(user.id)} color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}

export default Home;