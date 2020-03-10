import React from 'react';
import './App.css';
import axios from "axios";

class App extends React.Component {

  state = {
    users: [],
    userText: ""
  };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/NaomiPriest97/followers")
      .then(res => {
        console.log(res.data);
        this.setState({
        
          users: res.data
        });
      })
      .catch(err => console.log(err.message));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.setState.users) {
      console.log("new user array");
      if (this.state.userText === "NaomiTorres") {
        console.log(this.state.userText);
        axios
          .get(`https://api.github.com/users/NaomiPriest97/`)
          .then(res => {
            this.setState({
              users: res.data,
              userText: "naomi"
            });
          })
          .catch(err => console.log(err.message));
      }
    }
  }

  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
  };

  fetchUsers = e => {
    e.preventDefault();
    axios
      .get(`https://api.github.com/users/NaomiPriest97/followers/${this.state.userText}`)
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => console.log(err.message));
  };

  render() {
    return (
      <div className="App">
        <h1>Naomi Ruemmely-Torres</h1>
        <input value={this.state.userText} onChange={this.handleChanges} />

        <button onClick={this.fetchUsers}>Fetch Users</button>
        
        <div className="users">
          {this.state.users.map(user => {
            return (
            <div className="usercard">
              <h2>{user.login}</h2>
              <img src={user.avatar_url} key={user} alt={user}/>
              <p>{user.location}</p>
             
            </div>
            );
        })}

          
        </div>
      </div>
    );
  }
}

export default App;
