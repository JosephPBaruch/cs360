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

interface Like {
  id: number;
  PetID: number;
  TypeofFood: string;
}

function Likes() {
  const classes = useStyles();
  const [data, setData] = useState<Like[]>([]);
  const [open, setOpen] = useState(false);
  const [newLike, setNewLike] = useState<Partial<Like>>({});
  const [editLike, setEditLike] = useState<Partial<Like> | null>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8081/backend/likes/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id: number) => {
    const likeToEdit = data.find((like) => like.id === id);
    if (likeToEdit) {
      setEditLike(likeToEdit);
      setOpen(true);
    }
  };

  const handleUpdate = () => {
    if (editLike) {
      fetch(`http://127.0.0.1:8081/backend/likes/${editLike.id}/update/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editLike),
      })
        .then((response) => response.json())
        .then((updatedLike) => {
          setData((prevData) =>
            prevData.map((like) => (like.id === updatedLike.id ? updatedLike : like))
          );
          setOpen(false);
          setEditLike(null);
        })
        .catch((error) => console.error('Error updating item:', error));
    }
  };

  const handleDelete = (id: number) => {
    fetch(`http://127.0.0.1:8081/backend/likes/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setData((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleCreate = () => {
    fetch('http://127.0.0.1:8081/backend/likes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLike),
    })
      .then((response) => response.json())
      .then((createdLike) => {
        setData((prevData) => [...prevData, createdLike]);
        setOpen(false);
        setNewLike({});
      })
      .catch((error) => console.error('Error creating item:', error));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editLike) {
      setEditLike((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewLike((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <>
      <h1 className={classes.title}>Likes Table</h1>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} className={classes.button}>
        Create
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editLike ? 'Edit Like' : 'Create New Like'}</DialogTitle>
        <DialogContent>
          <TextField
            name="PetID"
            label="Pet ID"
            type="number"
            fullWidth
            margin="dense"
            value={editLike?.PetID || newLike.PetID || ''}
            onChange={handleInputChange}
          />
          <TextField
            name="TypeofFood"
            label="Type of Food"
            fullWidth
            margin="dense"
            value={editLike?.TypeofFood || newLike.TypeofFood || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={editLike ? handleUpdate : handleCreate} color="primary">
            {editLike ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Pet ID</TableCell>
              <TableCell>Type of Food</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.PetID}</TableCell>
                <TableCell>{item.TypeofFood}</TableCell>
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

export default Likes;
