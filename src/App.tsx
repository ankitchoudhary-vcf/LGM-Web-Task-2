import axios from 'axios';
import React, { useState } from 'react';
import './App.css';


interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}
interface Data {
  page: number
  per_page: number
  total_pages: number
  data: User[]
  support: {
    url: string,
    text: string
  }
}

function Navbar(props: any): JSX.Element {

  const getData = async () => {
    var results = await axios.get("https://reqres.in/api/users?page=1");
    props.setData(results.data);
    props.setLoading(false);
  }

  return (
    <div className="navbar">
      <div className="navbar-logo">LetsGrowMore</div>
      <button className="navbar-button" onClick={() => {
        props.setLoading(true)
        setTimeout(getData, 5000)
      }}>
        Get Users
      </button>
    </div>
  )
}

function Users(props: any): JSX.Element {
  return (
    <div className="users">
      {
        props.data ? (
          props.data?.data.map((user: User) => {
            return (
              <div className="user" key={user.id}>
                <div className="user-profile">
                  <img src={user.avatar} alt="Profile" />
                </div>
                <div className="user-about">
                  <h4 className="text"><i className="fas fa-user-tie"></i>{`${user.first_name} ${user.last_name}`}</h4>
                  <h4 className="text"><i className="fas fa-envelope"></i>{user.email}</h4>
                </div>
              </div>
            )
          })
        ) : (
          props.loading ? (
            <img className="loader" src="https://media.giphy.com/media/feN0YJbVs0fwA/giphy.gif" alt="loading..." />
          ) : (
            <h1 className="message">Please Click on Get Users Button</h1>
          )
        )
      }
    </div>
  )
}

function App(): JSX.Element {

  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  return (
      <main className="main">
        <Navbar setData={setData} setLoading={setLoading} />
        <Users data={data} loading={loading} />
        <div className="circle">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </div>
      </main>
  );
}

export default App;
