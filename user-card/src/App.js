import React from 'react';
import './App.css';
import axios from "axios";


function searchingFor(userText){
  return function(x){
    return x.login.toLowerCase().includes(userText.toLowerCase()) || !userText;
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
      userText: ''
    };
    this.handleChanges = this.handleChanges.bind(this);
  }
  
  handleChanges = e => {
    this.setState({
      userText: e.target.value
    });
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

  

 
  render() {
     const {users, userText} = this.state;
    return (
     
      <div className="App">
        
          <h1>Naomi Ruemmely-Torres</h1>
          <input placeholder="Search for followers" value={userText} onChange={this.handleChanges} />

          
          
          <div className="users">
            {users.filter(searchingFor(userText)).map((user, index) => {
              return (
              <div key={index} className="usercard">
                <h2>{user.login}</h2>
                <img src={user.avatar_url} key={user} alt={user}/>
                <p>Followers - {user.followers_url.length}</p>
                <p>Following - {user.following_url.length}</p>
              </div>
              );
            })}
          </div>
      </div>   
     
    );
  }
}

export default App;
