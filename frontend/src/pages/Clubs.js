import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ClubsContainer = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

const ClubItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
`;

const ClubName = styled.div`
  font-weight: bold;
`;

const ClubDescription = styled.div`
  font-size: 14px;
`;

function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/clubs')
      .then(response => {
        setClubs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <ClubsContainer>
      {clubs.map(club => (
        <ClubItem key={club.id}>
          <ClubName>{club.name}</ClubName>
          <ClubDescription>{club.description}</ClubDescription>
        </ClubItem>
      ))}
    </ClubsContainer>
  );
}

export default Clubs;
