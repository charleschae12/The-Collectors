import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';
import GreekLifeView from '../components/GreekLifeView';
import Bgimg from './Main_page.png';
import SearchBar from '../components/SearchBar';

function ClubCard({
  clubname,
  headerColor = "#fff",
  headerBg = "#4285F4",
  headerStyle = {},
  shadow = true,
  style = {},
  ...props
}) {
  return (
    <div
      className="card-business"
      style={{
        background: "#fff",
        width: "42vw",
        borderRadius: "5px",
        margin: "5px",
        boxShadow: shadow !== false ? "#9E9E9E 0px 0px 10px" : "",
        ...style
      }}
      {...props}
    >
      <div
        style={{
          background: headerBg,
          height: "35px",
          paddingTop: "5px",
          paddingBottom: "5px",
          position: "relative",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
          ...headerStyle
        }}
      >
        {/*https://pbs.twimg.com/profile_images/1215572708336865280/_8lVTX2z_400x400.jpg*/}
        <h1
          style={{
            fontSize: "16pt",
            margin: 0,
            marginLeft: 80,
            color: headerColor,
            textAlign: 'left',
          }}
        >
          {clubname.name}
        </h1>
      </div>
      <table className="table table-striped table-hover" style={{
        fontSize: '12pt',
        listStyle: 'none',
        lineHeight: '15pt',
        marginLeft: '80px',
        marginTop: '5px',
        textAlign: 'left',
        width: '87%',
      }}>
        <tr style={{
          paddingTop: "5px",
        }}>
          <th style={{
            width: '80pt',
          }}> Memebers: </th>
          <td style={{
            width: '40pt',
          }}> {clubname.size} </td>
          <td rowspan = "2" style={{
            borderLeft: "1px solid #aaaaaa",
            paddingLeft: "10px"
          }}> {clubname.description} </td>
        </tr>
        <tr style={{
          paddingBottom: "5px",
        }}>
          <th> Activated: </th>
          <td style={
            clubname.status ? {color: 'green'} : {color: 'red'}
          }> ● </td>
        </tr>
        <tr style={{
          borderTop: "1px solid #aaaaaa",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}>
          <th> Contact: </th>
          <td colSpan="2"> {clubname.email && clubname.email}</td>
        </tr>
        <tr style={{
          borderTop: "1px solid #aaaaaa",
          paddingTop: "5px",
          paddingBottom: "15px",
        }}>
          <th> tags: </th>
          <td colSpan="2"> {clubname.tags && clubname.tags.length > 0 && (
            <li style={{
              padding: 0,
              margin: 0,
            }}>
              {clubname.tags.map((text) => (
                <span style={{marginRight: 5}}> #{text} </span>
              ))}
            </li>
          )}
          </td>
        </tr>
      </table>
    </div>
  );
}

function refreshPage() {
  window.location.reload();
} 

function Home() {

  const [clubList, setClubList] = useState([])
  const [greekLifeList, setgreekLifeList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [filtered, setFiltered] = useState([])

  // search function
  const updateKey = (searchWord) => {
    setKeyword(searchWord)
  }

  // Read all clubss
  useEffect(() => {
    axios.get('http://localhost:8000/api/clubsorgs')
      .then(res => {
        setClubList(res.data)
      })
  },[refreshPage]);

  useEffect(() => {
    if (keyword === null || keyword === ''){
      setFiltered(clubList)
    }else{
      const filteredData = clubList.filter((club) => `${club.name.toLowerCase()} ${club.description.toLowerCase()} ${club.tags.toLowerCase}`.includes(keyword.toLowerCase()))
      setFiltered(filteredData)
    }
  }, [keyword, updateKey]);

  
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
        paddingTop: '2vh',
        justifyContent: 'center',
        alignContent: 'center',
      }}>
        <SearchBar onChange={(e) => updateKey(e)} />
        <div style={{
          height: '10px',
        }} />
        <div style={{
          padding: '20px',
          backgroundColor: '#ffffffa0',
          borderRadius: '10px',
          width: '100%',
          height: '67vh',
          alignContent: 'top',
          overflowY: 'auto',
        }}>
          {filtered.map(it => (
          <ul style={{
            margin: 20,
            listStyle: "none",
          }}>
            <ClubCard clubname={it} />
          </ul>
          ))}
          <style>
          {`
          @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
          .card-business * {
            font-family:  'Quicksand',sans-serif;
          }
          `}
          </style>
          <GreekLifeView key={greekLifeList} greekLifeList={greekLifeList} />
        </div>
      </div>
    </div>
  </div>
  );
}

export default Home;
