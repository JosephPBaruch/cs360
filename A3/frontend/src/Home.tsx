import { Container, Typography } from '@mui/material';
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
  subtitle: {
    textAlign: 'center',
    color: '#f50057', // Secondary color
  },
});

function Home() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.title}>Home</Typography>
      <Typography variant="h6" className={classes.subtitle}>You're signed in!</Typography>
    </Container>
  );
}

export default Home;