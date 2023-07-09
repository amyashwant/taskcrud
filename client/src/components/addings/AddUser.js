import axios from "axios";
import React, { useEffect, useState } from "react";
import "./addUser.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [num, setNum] = useState(1);
  const [update, setUpdate] = useState([]);
  const [key, setKey] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      title: title,
      description: description,
      status: status,
      assignedUser: assignedUser,
      dueDate: dueDate,
    };
    const res = await axios.post(
      "http://localhost:5000/api/user/add-order",
      user
    );
    setNum((num) => num + 1);
  };

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:5000/api/user/${id}`);
    setNum((num) => num + 1);
  };

  const updateHandler = async (id) => {
    // e.preventDefault();
    navigate(`/edituser/${id}`);
  };

  useEffect(() => {
    const gettings = async () => {
      const res = await axios.get("http://localhost:5000/api/user/get-order");
      setUpdate(res.data);
    };
    gettings();
  }, [num]);

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
            Add Task
          </button>
        </form>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "brown" }}>title</h1>
          <h3 style={{}}>
            {update?.map((n) => (
              <div style={{ color: "brown" }} key={n._id}>
                {n.title}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "blue" }}>description</h1>
          <h3>
            {update?.map((n) => (
              <div style={{ color: "blue" }} key={n._id}>
                {n.description}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "blue" }}>status</h1>
          <h3>
            {update?.map((n) => (
              <div style={{ color: "blue" }} key={n._id}>
                {n.status}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "blue" }}>assignedUser</h1>
          <h3>
            {update?.map((n) => (
              <div style={{ color: "blue" }} key={n._id}>
                {n.assignedUser}
              </div>
            ))}
          </h3>
        </div>

        <div style={{ marginLeft: "30px", flex: "4" }}>
          <h1 style={{ color: "violet" }}>dueDate</h1>
          <h3 style={{ color: "violet" }}>
            {update?.map((n) => (
              <div style={{ display: "flex" }} key={n?._id}>
                <div
                  style={{
                    width: "120px",
                  }}
                >
                  {n.dueDate}
                </div>

                {/* for updating the task */}
                <button
                  className="updateButton"
                  style={{ marginLeft: "220px", marginTop: "2px" }}
                  onClick={() => updateHandler(n._id)}
                >
                  update
                </button>

                {/* for deleting the task */}
                <button
                  className="deleteButton"
                  style={{ marginLeft: "20px", marginTop: "2px" }}
                  onClick={() => deleteHandler(n._id)}
                >
                  delete
                </button>
              </div>
            ))}
          </h3>
        </div>
      </div>













      
    </>
  );
}

export default AddUser;
