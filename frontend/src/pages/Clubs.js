import '../App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubsView from '../components/ClubsView';

/**
 * This page will show the list of clubs by table, and support various ways of sorting, filtering.
 */
function Clubs() {

  const [sortOrder, setSortOrder] = useState('asc');
  const [sortMethod, setSortMethod] = useState('name');
  const [clubList, setClubList] = useState([])
  const [selectedTag, setSelectedTag] = useState('');
  const [tagList, setTagList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Refreshing the page
  function refreshPage() {
    window.location.reload();
  } 

  // Read all clubs, filter it, then sort it.
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

  // When sorting method has changed
  const handleSortMethodChange = (e) => {
    setSortMethod(e.target.value);
  }

  // When sorting order (ascending or descending) has changed
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  }

  // When tag filter has changed
  const handleTagFilter = (tag) => {
    setSelectedTag(tag);
  }

  // When tag is set as 'default' or 'none'
  const clearTagFilter = () => {
    setSelectedTag('');
  }

  return (
  <div className="container-fluid" style={{paddingTop: "80px"}}>
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
            <option value="">All</option> {/** get all tags from existing clubs, then show it on the dropdown menu */}
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
                Name
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
                Number of Members
                {sortMethod === "sizeAsc" && sortOrder === "asc" && (
                  <i className="fas fa-caret-up ml-2"></i>
                )}
                {sortMethod === "sizeAsc" && sortOrder === "desc" && (
                  <i className="fas fa-caret-down ml-2"></i>
                )}
              </button>
            </th>
            <th>Description</th>
            <th>Email</th>
            <th>
              <button
                type="button"
                className="btn btn-link"
                onClick={() =>
                  setSortMethod(sortMethod === "Active" ? "Inactive" : "Active")
                }
              >
                Active
                {sortMethod === "Active" && sortOrder === "asc" && (
                  <i className="fas fa-caret-up ml-2"></i>
                )}
                {sortMethod === "Active" && sortOrder === "desc" && (
                  <i className="fas fa-caret-down ml-2"></i>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {clubList.map((club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.size}</td>
              <td>{club.description}</td>
              <td>{club.email}</td>
              <td>{club.status ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default Clubs;