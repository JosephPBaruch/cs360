import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

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

interface Pet {
  PetID: number;
  Name: string;
  Age: number;
  Street: string;
  City: string;
  ZipCode: string;
  State: string;
  TypeofPet: string;
}

function Display() {
  const classes = useStyles();
  const [data, setData] = useState<Pet[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/pets/') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    // Logic to edit an item
    console.log('Edit item with id:', id);
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/pets/${id}`, { // Replace with your API endpoint
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.PetID !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  return (
    <>
      <h1 className={classes.title}>Pets Table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Type of Pet</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.PetID}>
                <TableCell>{item.PetID}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Age}</TableCell>
                <TableCell>{item.Street}</TableCell>
                <TableCell>{item.City}</TableCell>
                <TableCell>{item.ZipCode}</TableCell>
                <TableCell>{item.State}</TableCell>
                <TableCell>{item.TypeofPet}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(item.PetID)} variant="contained" color="primary" size="small">
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.PetID)} variant="contained" color="secondary" size="small" style={{ marginLeft: '0.5rem' }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Display;