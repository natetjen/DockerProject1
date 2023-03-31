import React, { useState, useEffect, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios';

function One({name, setName}) {
  return (
    <>
    <div> Input your name</div>
    <input type='text' value={name}
    onChange={((e) => {
      setName(e.target.value)
    })}/>
    <br/>
    <Link to="/two">Next</Link>
  </>
  )
}

function Two({age, setAge}) {
  return (
    <>
    <div> Input your age</div>
    <input type='number' value={age}
    onChange={((e) => {
      setAge(e.target.value)
    })}/>
    <br/>
    <Link to="/">Back</Link>
    <br/>
    <Link to="/three">Next</Link>
  </>
  )
}

function Three({age, name, setStorage}) {
  return (
    <div>this is Summary
      <li>name: {name}</li>
      <li>age: {age}</li>
      <br/>
      <Link to="/two">Back</Link>
      <button onClick={() => {
        let body = {
          name: name,
          age: age
        }
        axios.post('/submit', body)
          .then((data)=>setStorage(data.data))
          .catch(()=>console.log('fail'))
      }}>Submit</button>
    </div>
  )
}

function List ({each}) {
  return(
    <li>
      <text>{each.name + ' ' + each.age}</text>
    </li>
  )
}



function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(null)
  const [storage, setStorage] = useState([])

  useEffect(() => {
    axios.get('/everything')
      .then((data) => setStorage(data.data))
      .catch(() => console.log('useEffect err'))
  }, [])

  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">One</Link>
          </li>
          <li>
            <Link to="/two">Two</Link>
          </li>
          <li>
            <Link to="/three">Three</Link>
          </li>
        </ul>
        <text>test</text>
      </nav> */}
      {storage.map((data) => {
        return (<List each={data}/>)
      })}
      <Routes>
        <Route path="/" element={<One name={name} setName={setName}/>} />
        <Route path="/two" element={<Two age={age} setAge={setAge}/>} />
        <Route path="/three" element={<Three name={name} age={age} setStorage={setStorage}/>} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
