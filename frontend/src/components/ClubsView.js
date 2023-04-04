import ClubsItem from './Clubs'
import React, {useState, useEffect} from 'react';
import axios from 'axios';

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

function ClubsView(){

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('name');
  const [clubList, setClubList] = useState([])
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  function refreshPage() {
    window.location.reload();
  } 

  // Read all clubs
  useEffect(() => {
    axios.get('http://localhost:8000/api/clubs')
      .then(res => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter(club => club.tags.includes(selectedTag)));
        } else {
          setFilteredData(res.data);
        }
        const sortedData = filteredData.sort((a, b) => {
          if (sortMethod === 'nameAsc') {
            if (sortOrder === 'asc') {
              return a.name.localeCompare(b.name);
            } else {
              return b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'nameDesc') {
              if (sortOrder === 'asc') {
                return b.name.localeCompare(a.name);
              } else {
                return a.name.localeCompare(b.name);
            }
          } else if (sortMethod === 'sizeAsc') {
            if (sortOrder === 'asc') {
              return a.size - b.size || a.name.localeCompare(b.name);
            } else {
              return b.size - a.size || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'sizeDesc') {
            if (sortOrder === 'asc') {
              return b.size - a.size || a.name.localeCompare(b.name);
            } else {
              return a.size - b.size || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'Active') {
            if (sortOrder === 'asc') {
              return 1 || a.name.localeCompare(b.name);
            } else {
              return -1 || b.name.localeCompare(a.name);
            }
          } else if (sortMethod === 'Inactive') {
            if (sortOrder === 'asc') {
              return -1 || a.name.localeCompare(b.name);
            } else {
              return 1 || b.name.localeCompare(a.name);
            }
          } else {
            return a.name.localeCompare(b.name);  
          }
        });
        const uniqueItems = [];
        const tags = res.data.flatMap((obj) => obj.tags);
        tags.map((tag) => {
          if (uniqueItems.indexOf(tag) === -1) {
            uniqueItems.push(tag);
          }
        });
        setTagList(uniqueItems);
        setClubList(sortedData);
      })
      .catch(error => console.log(error));
  }, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

  
  const list = clubList;

  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
      }}
    >
      <li style={{
        listStyle: "none",
        alignContent: "center",
        height: '100%',
        width: '100%',
      }}>
        {list.map(it => (
          <ul style={{
            margin: 20,
            listStyle: "none",
          }}>
            <ClubCard clubname={it} />
          </ul>
        ))}
      </li>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
        .card-business * {
          font-family:  'Quicksand',sans-serif;
        }
     `}
      </style>
    </div>
  );
}

export default ClubsView
