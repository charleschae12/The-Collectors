import React, { useState, useEffect } from 'react';
import '../App.css';
import Bgimg from './Main_page.png';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

function Profile() {
  const [user, setUser] = useState({});
  const [major, setMajor] = useState('');
  const [graduateYear, setGraduateYear] = useState('');
  const [discord, setDiscord] = useState('');
  const [rcsid, setRcsid] = useState('');

  const { authData } = useAuth();
  const email = authData.data.user;

  useEffect(() => {
    async function fetchUserProfile() {
      const response = await axios.get(`http://localhost:8000/api/profile/${email}`);
      setRcsid(response.data.rcsid);
      setUser(response.data);
      setMajor(response.data.major);
      setGraduateYear(response.data.graduate_year);
      setDiscord(response.data.discord);
    }
    fetchUserProfile();
  }, [email]);

  async function handleSubmit() {
    await axios.put(`http://localhost:8000/api/profile/${email}/?major=${major}&graduate_year=${graduateYear}&discord=${discord}`).then((res) => console.log(res.data));
    alert("Profile updated!");
  };

  return (
    <div style={{
      backgroundImage: `url(${Bgimg})`,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      textAlign: 'center',
    }}>
      <div className="App justify-content-center align-items-center mx-auto" style={{
        width: '500px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '140px 5px 5px 5px',
      }}>
        <div style={{
          display: 'flex',
          backgroundColor: '#202060',
          height: '80px',
          color: 'white',
          fontSize: '45px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
        }}>
          Profile
        </div>
        <p>RCSID: {rcsid}</p>
        <p>Email: {email}</p>
        <div style={{
          height: '250px',
          padding: '10px 0px 0px 0px',
        }}>
          <div style={{
            display: 'flex',
            backgroundColor: '#ffffff90',
            height: '180px',
            width: '100%',
            borderRadius: '10px',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '10px',
          }}>
            <div>
              <label>Major:&nbsp;</label>
              <input type='text' onChange={(e) => setMajor(e.target.value)} placeholder={major} />
            </div>
            <div>
              <label>Graduate Year:&nbsp;</label>
              <input type='text' onChange={(e) => setGraduateYear(e.target.value)} placeholder={graduateYear} />
            </div>
            <div>
              <label>Discord:&nbsp;</label>
              <input type='text' onChange={(e) => setDiscord(e.target.value)} placeholder={discord}/>
            </div>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: '10px',
          }}>
            <button onClick={handleSubmit} style={{
              backgroundColor: 'cyan',
              width: '100px',
              height: '50px',
              borderRadius: '15px',
              fontSize: '20px',
            }}>
              Save
            </button>
            <HomeLink to="/" style={{
              width: '100px',
              justifyContent: 'center',
            }}>
            Home
            </HomeLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

export const HomeLink = styled(Link)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  
  &.active {
    color: #000000;
  };
`;
