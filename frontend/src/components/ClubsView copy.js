import ClubsItem from './Clubs'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ClubCard from './ClubCard';
import styles from '../main.css';

function refreshPage() {
  window.location.reload();
} 

function ClubsView({clubList}){

  const [ClubList, setClubList] = useState([])
  const list = ClubList;

  useEffect(() => {

  }, [refreshPage]);

  

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}
    >
    
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Size</th>
          <th>Description</th>
          <th>Tags</th>
        </tr>
      </thead>
      
      <tbody>
        {clubList.map(clubList => (
          <tr key={clubList.name}>
            <td>{clubList.name}</td>
            <td>{clubList.email}</td>
            <td>{clubList.size}</td>
            <td>{clubList.description}</td>
            <td>
            {clubList.tags.map((str, indx) => {
            return <div class="tag">{str}</div>;
            })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default ClubsView
