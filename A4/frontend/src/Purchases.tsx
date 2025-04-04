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

interface Purchase {
  id: number;
  Month: number;
  Year: number;
  Quantity: number;
  OID: number;
  FoodID: number;
  PetID: number;
}

function Purchases() {
  const classes = useStyles();
  const [data, setData] = useState<Purchase[]>([]);
  const [open, setOpen] = useState(false);
  const [newPurchase, setNewPurchase] = useState<Partial<Purchase>>({});
  const [editPurchase, setEditPurchase] = useState<Partial<Purchase> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/purchases/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    const purchaseToEdit = data.find((purchase) => purchase.id === id);
    if (purchaseToEdit) {
      setEditPurchase(purchaseToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editPurchase) {
      fetch(`http://127.0.0.1:8081/backend/purchases/${editPurchase.id}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editPurchase),
      })
        .then((response) => response.json())
        .then((updatedPurchase) => {
          setData((prevData) =>
            prevData.map((purchase) => (purchase.id === updatedPurchase.id ? updatedPurchase : purchase))
          );
          setOpen(false);
          setEditPurchase(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/purchases/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/purchases/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPurchase),
    })
      .then((response) => response.json())
      .then((createdPurchase) => {
        setData((prevData) => [...prevData, createdPurchase]);
        setOpen(false);
        setNewPurchase({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editPurchase) {
      setEditPurchase((prev) => ({ ...prev, [name]: name === 'Month' || name === 'Year' || name === 'Quantity' || name === 'OID' || name === 'FoodID' || name === 'PetID' ? parseInt(value) : value }));
    } else {
      setNewPurchase((prev) => ({ ...prev, [name]: name === 'Month' || name === 'Year' || name === 'Quantity' || name === 'OID' || name === 'FoodID' || name === 'PetID' ? parseInt(value) : value }));
    }
  };

  return (
    <>
      <h1 className={classes.title}>Purchases Table</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.button}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editPurchase ? 'Edit Purchase' : 'Create New Purchase'}</DialogTitle>
        <DialogContent>
          <TextField
            name="Month"
            label="Month"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.Month || newPurchase.Month || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Year"
            label="Year"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.Year || newPurchase.Year || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Quantity"
            label="Quantity"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.Quantity || newPurchase.Quantity || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="OID"
            label="Owner ID"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.OID || newPurchase.OID || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="FoodID"
            label="Food ID"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.FoodID || newPurchase.FoodID || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="PetID"
            label="Pet ID"
            type="number"
            fullWidth
            margin="dense"
            value={editPurchase?.PetID || newPurchase.PetID || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editPurchase ? handleUpdate : handleCreate} color="primary">
            {editPurchase ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Food ID</TableCell>
              <TableCell>Pet ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.Month}</TableCell>
                <TableCell>{item.Year}</TableCell>
                <TableCell>{item.Quantity}</TableCell>
                <TableCell>{item.OID}</TableCell>
                <TableCell>{item.FoodID}</TableCell>
                <TableCell>{item.PetID}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item.id)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.id)}
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

export default Purchases;
