import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App container my-5">
      <div className="container">
        <input
          className="form-control my-2"
          placeholder="Enter Name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          className="form-control my-2"
          type="number"
          placeholder="Enter Age"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
      </div>

      <button className="btn btn-success" onClick={createUser}>
        {" "}
        Create User
      </button>

      <table>
        <tbody>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th>Age</th>
            </tr>
          </thead>
        </tbody>
      </table>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <table class="table table-hover">
              <tbody>
                <tr>
                  <td>{user.name}</td>
                  <td> {user.age}</td>
                  <td>
                    {" "}
                    <button className="btn btn-primary mx-2"
                      onClick={() => {
                        updateUser(user.id, user.age);
                      }}
                    >
                      {" "}
                      Increase Age
                    </button>
                    <button className="btn btn-danger mx-2"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      {" "}
                      Delete User
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
