import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClubPersonal() {
  const [club, setClub] = useState({});
  const { name } = useParams();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/clubs/${name}`);
        setClub(response.data);
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, [name]);

  return (
    <div className="container" style={{
      marginTop: '90px',
    }}>
      <h2>{club.name}</h2>
      <p>Members: {club.size}</p>
      <p>Description: {club.description}</p>
      <p>Email: {club.email}</p>
      <p>Active: {club.status ? 'Yes' : 'No'}</p>
      <p>Tags: {club.tags && club.tags.join(', ')}</p>
    </div>
  );
}

export default ClubPersonal;
