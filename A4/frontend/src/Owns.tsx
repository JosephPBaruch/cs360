import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Own {
  PetID: number;
  Year: number;
  OID: number;
  PetAgeatOwnership: number;
  PricePaid: number;
}

function Owns() {
  const [owns, setOwns] = useState<Own[]>([]);
  const [open, setOpen] = useState(false);
  const [newOwn, setNewOwn] = useState<Partial<Own>>({});
  const [editOwn, setEditOwn] = useState<Partial<Own> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/owns/')
      .then((response) => response.json())
      .then((data) => setOwns(data))
      .catch((error) => console.error('Error fetching owns:', error));
  }, []);

  const handleEdit = (id: number) => {
    const ownToEdit = owns.find((own) => own.PetID === id);
    if (ownToEdit) {
      setEditOwn(ownToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editOwn) {
      fetch(`http://127.0.0.1:8081/backend/owns/${editOwn.PetID}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editOwn),
      })
        .then((response) => response.json())
        .then((updatedOwn) => {
          setOwns((prevOwns) =>
            prevOwns.map((own) => (own.PetID === updatedOwn.PetID ? updatedOwn : own))
          );
          setOpen(false);
          setEditOwn(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/owns/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setOwns((prevOwns) => prevOwns.filter((item) => item.PetID !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/owns/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOwn),
    })
      .then((response) => response.json())
      .then((createdOwn) => {
        setOwns((prevOwns) => [...prevOwns, createdOwn]);
        setOpen(false);
        setNewOwn({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editOwn) {
      setEditOwn((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewOwn((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div>
      <h2>Owns</h2>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editOwn ? 'Edit Own' : 'Create New Own'}</DialogTitle>
        <DialogContent>
          <TextField
            name="PetID"
            label="Pet ID"
            type="number"
            fullWidth
            margin="dense"
            value={editOwn?.PetID || newOwn.PetID || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Year"
            label="Year"
            type="number"
            fullWidth
            margin="dense"
            value={editOwn?.Year || newOwn.Year || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="OID"
            label="Owner ID"
            type="number"
            fullWidth
            margin="dense"
            value={editOwn?.OID || newOwn.OID || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="PetAgeatOwnership"
            label="Pet Age at Ownership"
            type="number"
            fullWidth
            margin="dense"
            value={editOwn?.PetAgeatOwnership || newOwn.PetAgeatOwnership || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="PricePaid"
            label="Price Paid"
            type="number"
            fullWidth
            margin="dense"
            value={editOwn?.PricePaid || newOwn.PricePaid || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editOwn ? handleUpdate : handleCreate} color="primary">
            {editOwn ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pet ID</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Owner ID</TableCell>
              <TableCell>Pet Age at Ownership</TableCell>
              <TableCell>Price Paid</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owns.map((own) => (
              <TableRow key={own.PetID}>
                <TableCell>{own.PetID}</TableCell>
                <TableCell>{own.Year}</TableCell>
                <TableCell>{own.OID}</TableCell>
                <TableCell>{own.PetAgeatOwnership}</TableCell>
                <TableCell>{own.PricePaid}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(own.PetID)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(own.PetID)}
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
    </div>
  );
}

export default Owns;
