import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Banner from "./Banner";

const UserList = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    document.title = 'Cilist';
    getUsers();
  }, []);

  useEffect(() => {
    
  });


  const getUsers = async () => {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL+`/users/`);
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(process.env.REACT_APP_BACKEND_URL+`/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
      <Banner title="PROD 333 Users List" />
        <Link to={`add`} className="button is-info">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Jenis Kelamin</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>
                  <Link
                    to={`edit/${user.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
