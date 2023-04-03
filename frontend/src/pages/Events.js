import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventsView from '../components/EventsView';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-timezone";

function Events() {

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('name');
  const [eventList, setEventList] = useState([])
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [name, setName] = useState('')
  const [clubName, setClubName] = useState('')
  const [desc, setDesc] = useState('')
  const [date, setDate] = useState('')

  function refreshPage() {
    window.location.reload();
  } 

  // Read all clubs
  useEffect(() => {
    axios.get('http://localhost:8000/api/events')
      .then(res => {
        if (selectedTag !== '') {
          setFilteredData(res.data.filter(event => event.tags.includes(selectedTag)));
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
        setEventList(sortedData);
      })
      .catch(error => console.log(error));
  }, [sortOrder, sortMethod, selectedTag, filteredData, refreshPage]);

  const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value);
  }

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  }

  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  }

  const clearTagFilter = () => {
    setSelectedTag('');
  }

  return (
  <div className="container-fluid">
    <div className="row mt-3 mb-3">
      <div className="col-md-2">
        <div className="form-group">
          <label htmlFor="tag-select">Filter by Tag:</label>
          <select
            className="form-control"
            id="tag-select"
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
          >
            <option value="">All</option>
            {tagList.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                className="btn btn-link"
                onClick={() =>
                  setSortMethod(sortMethod === "nameAsc" ? "nameDesc" : "nameAsc")
                }
              >
                Name of Club
                {sortMethod === "nameAsc" && sortOrder === "asc" && (
                  <i className="fas fa-caret-up ml-2"></i>
                )}
                {sortMethod === "nameAsc" && sortOrder === "desc" && (
                  <i className="fas fa-caret-down ml-2"></i>
                )}
              </button>
            </th>
            <th>
              <button
                type="button"
                className="btn btn-link"
                onClick={() =>
                  setSortMethod(sortMethod === "sizeAsc" ? "sizeDesc" : "sizeAsc")
                }
              >
                Name of Event
                {sortMethod === "nameAsc" && sortOrder === "asc" && (
                  <i className="fas fa-caret-up ml-2"></i>
                )}
                {sortMethod === "nameAsc" && sortOrder === "desc" && (
                  <i className="fas fa-caret-down ml-2"></i>
                )}
              </button>
            </th>
            <th>Description</th>
            <th>time</th>
          </tr>
        </thead>
        <tbody>
          {eventList.map((event) => (
            <tr key={event.id}>
              <td>{event.clubName}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default Events;