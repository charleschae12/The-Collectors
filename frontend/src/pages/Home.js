import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';
import Bgimg from './HD.png'


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
    <div style={{
      backgroundImage: `url(${Bgimg})`,
      backgroundRepeat: 'repeat',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      textAlign: 'center',
  }}>
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{
      width: "50vw",
      paddingTop: "100px",
      justifyContent: 'center',
      }}>
      <h1 styleName="max-width: 20rem;">HELLO AND WELCOME!</h1>
      <h6>FIND ALL RPI CLUBS AND ORGANIZATIONS HERE</h6>
      <div style={{
        paddingTop: '5vh',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <input
          type = 'text'
          placeholder = 'Type something to search!'
          style={{
            padding: '10px',
            backgroundColor: '#ffffffe0',
            borderRadius: '25px',
            width: '40vw',
            border: 'none',
            height: '60px',
            textAlign: 'left',
        }}/>
        <div style={{
          height: '10px',
        }} />
        <div style={{
          padding: '10px',
          backgroundColor: '#ffffffa0',
          borderRadius: '25px',
          width: '50vw',
          height: '65vh',
        }}>

        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
