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
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"800px", "backgroundColor":"white", "marginTop":"15px"}}>
    <h1 styleName="max-width: 20rem;">HELLO AND WELCOME!</h1>
    <h6>FIND ALL RPI CLUBS AND ORGANIZATIONS HERE</h6>
    </div>
  );
}

export default Home;
