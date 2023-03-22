import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';


function GreekLife() {

  const [clubList, setClubList] = useState([{}])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [size, setSize] = useState(0)
  const [status, setStatus] = useState(false)
  const [email, setEmail] = useState('')

  // Read all clubs
  useEffect(() => {
    axios.get('http://localhost:8000/api/club')
      .then(res => {
        setClubList(res.data)
      })
  })
  
  // Post a club
  const addClubsHandler = () => {
    axios.post('http://localhost:8000/api/club', { 'name': name, 'description': desc, 'size': size, 'status': status, 'email': email })
    .then(res => console.log(res))
  }

  return (
    <div className="App list-group-item justify-content-center align-items-center mx-auto" style={{"width":"800px", "backgroundColor":"white", "marginTop":"15px"}}>
    <h1 className="card text-white bg-primary mb-1" styleName="max-width: 20rem;">GREEK LIFE ORGANIZATIONS do not use yet</h1>
    <div className="card-body">
    <h5 className="card text-white bg-dark mb-3">Add a Greek Life Organization</h5>
      <span className="card-text">
        <input type="text" className="mb-2 form-control nameIn" onChange={event => setName(event.target.value)} placeholder='Name'/>
        <input type="text" className="mb-2 form-control desIn" onChange={event => setDesc(event.target.value)} placeholder='Description'/>
        <input type="number" className="mb-2 form-control sizeIn" onChange={event => setSize(event.target.value)} placeholder='0'/>
        <label> Active: <input type="checkbox" onChange={event => setStatus(event.target.checked)}/></label>
        <input type="text" className="mb-2 form-control emailIn" onChange={event => setEmail(event.target.value)} placeholder='Email'/>
        <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px', "font-weight":"bold"}} onClick={addClubsHandler}>Add Organization</button>
      </span>

      <h5 className="card text-white bg-dark mb-3">Greek Life Organizations:</h5>
      <div>
        <ClubsView clubList={clubList} />
      </div>
    </div>
    </div>
  );
}

export default GreekLife;
