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

interface Owner {
  OID: number;
  LastName: string;
  Street: string;
  City: string;
  ZipCode: string;
  State: string;
  Age: number;
  AnnualIncome: number;
}

function Owners() {
  const classes = useStyles();
  const [data, setData] = useState<Owner[]>([]);
  const [open, setOpen] = useState(false);
  const [newOwner, setNewOwner] = useState<Partial<Owner>>({});
  const [editOwner, setEditOwner] = useState<Partial<Owner> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/owners/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    const ownerToEdit = data.find((owner) => owner.OID === id);
    if (ownerToEdit) {
      setEditOwner(ownerToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editOwner) {
      fetch(`http://127.0.0.1:8081/backend/owners/${editOwner.OID}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editOwner),
      })
        .then((response) => response.json())
        .then((updatedOwner) => {
          setData((prevData) =>
            prevData.map((owner) => (owner.OID === updatedOwner.OID ? updatedOwner : owner))
          );
          setOpen(false);
          setEditOwner(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/owners/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.OID !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/owners/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOwner),
    })
      .then((response) => response.json())
      .then((createdOwner) => {
        setData((prevData) => [...prevData, createdOwner]);
        setOpen(false);
        setNewOwner({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editOwner) {
      setEditOwner((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewOwner((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <h1 className={classes.title}>Owners Table</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.button}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editOwner ? 'Edit Owner' : 'Create New Owner'}</DialogTitle>
        <DialogContent>
          <TextField
            name="LastName"
            label="Last Name"
            fullWidth
            margin="dense"
            value={editOwner?.LastName || newOwner.LastName || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Street"
            label="Street"
            fullWidth
            margin="dense"
            value={editOwner?.Street || newOwner.Street || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="City"
            label="City"
            fullWidth
            margin="dense"
            value={editOwner?.City || newOwner.City || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="ZipCode"
            label="Zip Code"
            fullWidth
            margin="dense"
            value={editOwner?.ZipCode || newOwner.ZipCode || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="State"
            label="State"
            fullWidth
            margin="dense"
            value={editOwner?.State || newOwner.State || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="Age"
            label="Age"
            type="number"
            fullWidth
            margin="dense"
            value={editOwner?.Age || newOwner.Age || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="AnnualIncome"
            label="Annual Income"
            type="number"
            fullWidth
            margin="dense"
            value={editOwner?.AnnualIncome || newOwner.AnnualIncome || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editOwner ? handleUpdate : handleCreate} color="primary">
            {editOwner ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>OID</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Street</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Zip Code</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Annual Income</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.OID}>
                <TableCell>{item.OID}</TableCell>
                <TableCell>{item.LastName}</TableCell>
                <TableCell>{item.Street}</TableCell>
                <TableCell>{item.City}</TableCell>
                <TableCell>{item.ZipCode}</TableCell>
                <TableCell>{item.State}</TableCell>
                <TableCell>{item.Age}</TableCell>
                <TableCell>{item.AnnualIncome}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(item.OID)}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.OID)}
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

export default Owners;
