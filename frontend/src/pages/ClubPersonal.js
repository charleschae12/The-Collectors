import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClubPersonal() {
  const [club, setClub] = useState({});
  const [events, setEvents] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/clubs/${name}`);
        setClub(response.data);
        const response2 = await axios.get(`http://localhost:8000/api/events/${name}?clubName=${name}`);
        setEvents(response2.data);
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
      <p>Events:</p>
      {events.map((event) => (
        <p>{event.name}</p>
      ))}
    </div>
  );
}

export default ClubPersonal;
