import axios from "axios";
import React, { useEffect, useState } from "react";
import "./updates.css";
import { useParams, useNavigate } from "react-router-dom";

function Updates() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [num, setNum] = useState(1);
  // const [update, setUpdate] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    const user = {
      title: title,
      description: description,
      status: status,
      assignedUser: assignedUser,
      dueDate: dueDate,
    };

    const res = await axios.put(`http://localhost:5000/api/user/${id}`, user);
    // setNum((num) => num + 1);
    navigate("/adduser");
  };

  useEffect(() => {
    const gettings = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/user/get-order/${id}`
      );
      // console.log(res.data)
      // setUpdate(res.data);
    };
    gettings();
  }, []);

  return (
    <>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder=" Title"
            required
            className="loginInput"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <input
            placeholder="description"
            required
            className="loginInput"
            type="text"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            placeholder="status"
            required
            type="text"
            className="loginInput"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          />
          <input
            placeholder="assignedUser"
            required
            type="text"
            className="loginInput"
            onChange={(e) => {
              setAssignedUser(e.target.value);
            }}
          />
          <input
            placeholder="dueDate"
            required
            type="number"
            className="loginInput"
            onChange={(e) => {
              setDueDate(e.target.value);
            }}
          />

          <button className="loginButton" type="submit">
            edit Task
          </button>
        </form>
        {/* <form className="loginBox" onSubmit={handleClick}>
          <input
            placeholder="Edit Book Title"
            required
            className="loginInput"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Edit Book author"
            required
            className="loginInput"
            type="text"
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <input
            placeholder="Edit Number of Pages"
            required
            type="number"
            className="loginInput"
            minLength="6"
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />

          <button className="loginButton" type="submit">
            Edit Books
          </button>
        </form> */}
      </div>
    </>
  );
}

export default Updates;
