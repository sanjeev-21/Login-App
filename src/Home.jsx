import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddForm from "./form";
import { useNavigate } from "react-router-dom";

export default function HomeComponent() {
    let navigate = useNavigate();
  const [tableData, setTableData] = useState();
  const [editData, setEditData] = useState();
  const [editFlag, setEditFlag] = useState(false);
  useEffect(() => {
    getTableData();
  }, []);
  function handleLogout() {
    localStorage.removeItem("loginInfo");
    localStorage.removeItem("userDetails");
    navigate('/');
  }
  function getTableData() {
    let data = JSON.parse(localStorage.getItem("userDetails"))
      ? JSON.parse(localStorage.getItem("userDetails"))
      : "";
    setTableData(data);
    setEditFlag(false);
  }
  const editUser = (data) => {
    setEditFlag(true);
    setEditData(data);
  };
  function editFlagHandler() {
    setEditFlag(false);
  }
  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="row">
      <div className="home-header row">
        <div className="col-sm-6 col-md-6 col-lg-6">
          <p className="header-text">Home</p>
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6">
          <Link to="/">
            <button
              className="btn btn-primary logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <button className="add-btn" data-toggle="modal" data-target="#formModal">
        Add Item
      </button>

      {tableData ? 
      <>
      <table className="table" style={{ marginLeft: "17px" }}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age (in Years)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((data, i) => {
              return (
                <tr>
                  <th scope="row">{data.id}</th>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{getAge(data.dob)}</td>
                  <td>
                    <a
                      data-toggle="modal"
                      data-target="#formModal"
                      onClick={() => editUser(data)}
                      style={{cursor:"pointer"}}                      
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <p style={{float:'right', marginRight:'6%'}}>Total of {tableData.length} records</p>
      </>:
        <div>
            <h1 className="welcome-txt">Welcome to USer Management!</h1>
            <h4 className="welcome-sub-txt">Please click on Add Item button to Add User</h4>
        </div>
      }

      <AddForm
        getTableData={getTableData}
        editData={editFlag && editData}
        editFlag={editFlag}
        editFlagHandler={editFlagHandler}
      />
    </div>
  );
}
