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
    color: '#3f51b5',
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

interface Food {
  FoodID: number;
  Name: string;
  Brand: string;
  TypeofFood: string;
  Price: number;
  ItemWeight: number;
  ClassofFood: string;
}

function Foods() {
  const classes = useStyles();
  const [data, setData] = useState<Food[]>([]);
  const [open, setOpen] = useState(false);
  const [newFood, setNewFood] = useState<Partial<Food>>({});
  const [editFood, setEditFood] = useState<Partial<Food> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/foods/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    const foodToEdit = data.find((food) => food.FoodID === id);
    if (foodToEdit) {
      setEditFood(foodToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editFood) {
      fetch(`http://127.0.0.1:8081/backend/foods/${editFood.FoodID}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFood),
      })
        .then((response) => response.json())
        .then((updatedFood) => {
          setData((prevData) =>
            prevData.map((food) => (food.FoodID === updatedFood.FoodID ? updatedFood : food))
          );
          setOpen(false);
          setEditFood(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/foods/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.FoodID !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/foods/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFood),
    })
      .then((response) => response.json())
      .then((createdFood) => {
        setData((prevData) => [...prevData, createdFood]);
        setOpen(false);
        setNewFood({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editFood) {
      setEditFood((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewFood((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <h1 className={classes.title}>Foods Table</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.button}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editFood ? 'Edit Food' : 'Create New Food'}</DialogTitle>
        <DialogContent>
          <TextField
            name="Name"
            label="Name"
            type="text"
            fullWidth
            margin="dense"
            value={editFood?.Name || newFood.Name || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Brand"
            label="Brand"
            type="text"
            fullWidth
            margin="dense"
            value={editFood?.Brand || newFood.Brand || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="TypeofFood"
            label="Type of Food"
            type="text"
            fullWidth
            margin="dense"
            value={editFood?.TypeofFood || newFood.TypeofFood || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Price"
            label="Price"
            type="number"
            fullWidth
            margin="dense"
            value={editFood?.Price || newFood.Price || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="ItemWeight"
            label="Item Weight"
            type="number"
            fullWidth
            margin="dense"
            value={editFood?.ItemWeight || newFood.ItemWeight || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="ClassofFood"
            label="Class of Food"
            type="text"
            fullWidth
            margin="dense"
            value={editFood?.ClassofFood || newFood.ClassofFood || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editFood ? handleUpdate : handleCreate} color="primary">
            {editFood ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Food ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Type of Food</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Item Weight</TableCell>
              <TableCell>Class of Food</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.FoodID}>
                <TableCell>{item.FoodID}</TableCell>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Brand}</TableCell>
                <TableCell>{item.TypeofFood}</TableCell>
                <TableCell>{item.Price}</TableCell>
                <TableCell>{item.ItemWeight}</TableCell>
                <TableCell>{item.ClassofFood}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item.FoodID)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.FoodID)}
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

export default Foods;
