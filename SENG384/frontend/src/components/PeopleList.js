import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PeopleList() {
  const [people, setPeople] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const fetchPeople = async () => {
    const res = await axios.get(`${API_URL}/people`);
    setPeople(res.data);
  };

  useEffect(() => { fetchPeople(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete?')) {
      await axios.delete(`${API_URL}/people/${id}`);
      fetchPeople();
    }
  };

  const handleEdit = async (person) => {
    const newName = window.prompt("New name:", person.full_name);
    const newEmail = window.prompt("New email:", person.email);
    if (newName && newEmail) {
      try {
        await axios.put(`${API_URL}/people/${person.id}`, { full_name: newName, email: newEmail });
        fetchPeople();
      } catch (err) { alert("Update failed."); }
    }
  };

  return (
    <div>
      <h2>People</h2>
      <table border="1" cellPadding="10">
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr></thead>
        <tbody>
          {people.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.full_name}</td><td>{p.email}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}