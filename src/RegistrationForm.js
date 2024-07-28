import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    passportPhoto: null,
    pravaPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('first_name', formData.firstName);
    data.append('last_name', formData.lastName);
    data.append('phone_number', formData.phoneNumber);
    data.append('passport_photo', formData.passportPhoto);
    data.append('prava_photo', formData.pravaPhoto);

    try {
      await axios.post('http://127.0.0.1:8000/users/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User registered successfully');
    } catch (error) {
      console.error('There was an error registering the user!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <label>Passport Photo:</label>
        <input type="file" name="passportPhoto" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Prava Photo:</label>
        <input type="file" name="pravaPhoto" onChange={handleFileChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
