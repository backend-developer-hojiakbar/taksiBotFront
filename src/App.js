import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const getCSRFToken = () => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 'csrftoken'.length + 1) === 'csrftoken=') {
        cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

function App() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    passport_photo: null,
    prava_photo: null
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('phone_number', formData.phone_number);
    data.append('passport_photo', formData.passport_photo);
    data.append('prava_photo', formData.prava_photo);

    try {
      const response = await axios.post('https://taksibot.pythonanywhere.com/users/create-profile/', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Admins will check you. Please re-enter the bot after 5 minutes.');
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting the form:', error.response ? error.response.data : error.message);
      setMessage('There was an error submitting the form. Please try again later.');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Welcome to the Telegram Web App</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="label">First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <label className="label">Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <label className="label">Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <label className="label">Passport Photo:</label>
            <input
              type="file"
              name="passport_photo"
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <div className="mb-4">
            <label className="label">Driver's License Photo:</label>
            <input
              type="file"
              name="prava_photo"
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <button
            type="submit"
            className="button"
          >
            Submit
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default App;
