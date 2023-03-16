import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';


function Home() {

  const [clubList, setClubList] = useState([{}])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState(false)
  const [email, setEmail] = useState('')

  // Read all clubss
  useEffect(() => {
    axios.get('http://localhost:8000/api/club')
      .then(res => {
        setClubList(res.data)
      })
  })

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"400px", "backgroundColor":"white", "marginTop":"15px"}}>
    <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">Task Manager</h1>
    <h6 className="card text-white bg-primary mb-3">FASTAPI - React - MongoDB</h6>
    <div className="card-body">
      <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
      <div>
        <ClubsView clubList={clubList} />
      </div>
    </div>
    <h6 className="card text-dark bg-warning py-1 mb-0"> Copyright 2021, All rights reserved &copy;</h6>
    </div>
  );
}

export default Home;
