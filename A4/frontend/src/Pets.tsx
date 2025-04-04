import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

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
  const [open, setOpen] = useState(false);
  const [newPet, setNewPet] = useState<Partial<Pet>>({});
  const [editPet, setEditPet] = useState<Partial<Pet> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/pets/') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    const petToEdit = data.find((pet) => pet.PetID === id);
    if (petToEdit) {
      setEditPet(petToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editPet) {
      fetch(`http://127.0.0.1:8081/backend/pets/${editPet.PetID}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPet),
      })
        .then((response) => response.json())
        .then((updatedPet) => {
          setData((prevData) =>
            prevData.map((pet) => (pet.PetID === updatedPet.PetID ? updatedPet : pet))
          );
          setOpen(false);
          setEditPet(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number, endpoint: string) => {
    fetch(`http://127.0.0.1:8081/backend/${endpoint}/${id}/`, { // Replace with your API endpoint
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.PetID !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/pets/', { // Replace with your API endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    })
      .then((response) => response.json())
      .then((createdPet) => {
        setData((prevData) => [...prevData, createdPet]);
        setOpen(false);
        setNewPet({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editPet) {
      setEditPet((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewPet((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <h1 className={classes.title}>Pets Table</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.button}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editPet ? 'Edit Pet' : 'Create New Pet'}</DialogTitle>
        <DialogContent>
          <TextField
            name="Name"
            label="Name"
            fullWidth
            margin="dense"
            value={editPet?.Name || newPet.Name || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Age"
            label="Age"
            type="number"
            fullWidth
            margin="dense"
            value={editPet?.Age || newPet.Age || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Street"
            label="Street"
            fullWidth
            margin="dense"
            value={editPet?.Street || newPet.Street || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="City"
            label="City"
            fullWidth
            margin="dense"
            value={editPet?.City || newPet.City || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="ZipCode"
            label="Zip Code"
            fullWidth
            margin="dense"
            value={editPet?.ZipCode || newPet.ZipCode || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="State"
            label="State"
            fullWidth
            margin="dense"
            value={editPet?.State || newPet.State || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="TypeofPet"
            label="Type of Pet"
            fullWidth
            margin="dense"
            value={editPet?.TypeofPet || newPet.TypeofPet || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editPet ? handleUpdate : handleCreate} color="primary">
            {editPet ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
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
                  <Button
                    onClick={() => handleEdit(item.PetID)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.PetID, 'pets')}
                    variant="contained"
                    color="secondary"
                    size="small"
                    style={{ marginLeft: '0.5rem' }}
                  >
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