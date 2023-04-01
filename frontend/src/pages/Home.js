import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';
import GreekLifeView from '../components/GreekLifeView';
import Bgimg from './HD.png';
import SearchBar from '../components/SearchBar';
import ClubList from '../components/Clubs';


function Home() {

  const [clubList, setClubList] = useState([])
  const [greekLifeList, setgreekLifeList] = useState([])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState('');
  const [listed, setListed] = useState([]);
  const [error, setError] = useState(null);

  // Read all clubss
  useEffect(() => {
    axios.get('http://localhost:8000/api/clubsorgs')
      .then(res => {
        setClubList(res.data)
      })
  })

  const fetchData = async() => {
    try {
      setListed(ClubList);
      setError(null);
    } catch(err){
      setError(err.message);
      setListed(null);
    } finally{
      setLoading(false);
    }
  }

  // Search Function
  const updateKey = (keyword) => {
    const filtered = listed.filter(listed => {
      return `${listed.name.toLowerCase()}`.includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setClubList(filtered);
  }
  
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
        <SearchBar keyword={keyword} onChange={updateKey} />
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
          <ClubsView clubList={clubList} />
          <GreekLifeView key={greekLifeList} greekLifeList={greekLifeList} />
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
