import React, { useEffect, useState } from "react";
export default function AddForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    setFirstName(props.editData ? props.editData.firstName:'');
    setLastName(props.editData ? props.editData.lastName:'');
    setDob(props.editData ?props.editData.dob:'');
  }, [props.editFlag]);

  let jsonData = JSON.parse(localStorage.getItem("userDetails"))
    ? JSON.parse(localStorage.getItem("userDetails"))
    : [];

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
  }
  function handleDob(e) {
    setDob(e.target.value);
  }
  function handleSave() {
    if (firstName.length > 0 && lastName.length > 0 && dob.length > 0) {
      let body = {
        id: jsonData.length + 1,
        firstName: firstName,
        lastName: lastName,
        dob: dob,
      };
      jsonData.push(body);
      localStorage.setItem("userDetails", JSON.stringify(jsonData));
      setFirstName("");
      setLastName("");
      setDob("");
      props.getTableData();
    } else {
      alert("Invalid input");
    }
  }
  function handleEdit(){
      jsonData[props.editData.id-1].firstName = firstName
      jsonData[props.editData.id-1].lastName = lastName
      jsonData[props.editData.id-1].dob = dob
      localStorage.setItem("userDetails", JSON.stringify(jsonData));
      setFirstName("");
      setLastName("");
      setDob("");
      props.getTableData();
  }
  let todayDate = new Date();
  const getMonth = todayDate.getMonth()+1
  let formattedDate = todayDate.getFullYear()+'-'+'0'+JSON.parse(getMonth)+'-'+todayDate.getDate();
  return (
    <div
      className="modal fade"
      id="formModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="formModalLabel"
      aria-hidden="true"
      backdrop="static"
    >
      <div className="modal-dialog" role="document" data-backdrop="static">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="formModalLabel">
              Modal title
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={props.editFlagHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-outline mb-4">
              <label className="form-label" for="firstName">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                id="firstName"
                className="form-control form-control-lg"
                onChange={handleFirstName}
                placeholder="First Name"
              />
            </div>

            <div className="form-outline mb-3">
              <label className="form-label" for="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleLastName}
                className="form-control form-control-lg"
                placeholder="Last Name"
              />
            </div>
            <div className="form-outline mb-3">
              <label className="form-label" for="dob">
                Birth Date
              </label>
              <input
                type="date"
                className="dob-field"
                value={dob}
                onChange={handleDob}
                max={formattedDate}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-success save-btn"
              data-dismiss="modal"
              onClick={props.editFlag?handleEdit:handleSave}
            >
              {props.editFlag?'Save':'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
