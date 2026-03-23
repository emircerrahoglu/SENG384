import { useState } from 'react';
import axios from 'axios';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({ full_name: '', email: '' });
  const [message, setMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email) return setMessage('All fields required.');
    try {
      await axios.post(`${API_URL}/people`, formData);
      setMessage('Success: Person registered!');
      setFormData({ full_name: '', email: '' });
    } catch (error) {
      setMessage(error.response?.status === 409 ? 'Email exists.' : 'Failed to register.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {message && <p><b>{message}</b></p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} /><br/><br/>
        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /><br/><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}