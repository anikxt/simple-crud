import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const addEmployee = async () => {
    try {
      await Axios.post('https://simple-crud-production.up.railway.app/create', {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      });

      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const getEmployees = () => {
    Axios.get('https://simple-crud-production.up.railway.app/employees').then(
      (response) => {
        setEmployeeList(response.data);
      }
    );
  };

  const updateEmployeeWage = async (id) => {
    try {
      await Axios.put('https://simple-crud-production.up.railway.app/update', {
        wage: newWage,
        id: id,
      });

      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteEmployee = (id) => {
    Axios.delete(
      `https://simple-crud-production.up.railway.app/delete/${id}`
    ).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label htmlFor="">Name: </label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
        <label htmlFor="">Age: </label>
        <input type="number" onChange={(event) => setAge(event.target.value)} />
        <label htmlFor="">Country: </label>
        <input
          type="text"
          onChange={(event) => setCountry(event.target.value)}
        />
        <label htmlFor="">Position: </label>
        <input
          type="text"
          onChange={(event) => setPosition(event.target.value)}
        />
        <label htmlFor="">Wage (year): </label>
        <input
          type="number"
          onChange={(event) => setWage(event.target.value)}
        />
        <button onClick={addEmployee}>Add Employee</button>
        <div className="employees">
          -----------------------------------------------------------------------------------------
          <button onClick={getEmployees}>Show Employees</button>
          {employeeList.map((val, key) => {
            console.log(val, 'VAL');
            return (
              <div className="employee">
                <div>
                  <h3>Name: {val.name}</h3>
                  <h3>Age: {val.age}</h3>
                  <h3>Country: {val.country}</h3>
                  <h3>Position: {val.position}</h3>
                  <h3>Wage: {val.wage}</h3>
                </div>
                <div>
                  <div>Update Wage Here!</div>
                  <input
                    type="text"
                    placeholder="2000..."
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateEmployeeWage(val.id);
                    }}
                  >
                    {' '}
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete it!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
