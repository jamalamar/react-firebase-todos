import React, { Component } from 'react';
import firebase from './firebaseConfig' //no need to call idex.js because thats the default search.
import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import './App.css';

class App extends Component {
  state = {
    text: '',
    todos: [],
    user: null,
    isAuthenticated: false
  }


  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    firebase.database().ref('todos')
    .push({ text: this.state.text })
    .then(() => {
      console.log("Todo Succesfully Written")
      this.setState({ text: "" })
    })
    .catch(error => {
      console.log("Something Went Wrong: ", error.message)
    })
  }
  
  handleRemove = todoId => {
    firebase.database().ref(`todos/${todoId}`)
    .remove()
    .then(() => console.log("Todo Deleted"))
    .catch(error => {
      console.log("Something Went Wrong: ", error.message)
    })
  }

  handleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then((response) => console.log("Sign in Succesful", response))
    .catch(error => {
      console.log("Something went Wrong: ", error.message)
    })
  }

  componentDidMount(){
    firebase.database().ref('todos')
    .on('value', snapshot => {
      const newStateArray = []
      snapshot.forEach(childSnapShot => {
        newStateArray.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        })
      })
      this.setState({ todos: newStateArray })
    })
    firebase.auth().onAuthStateChanged(user => (
      user ?
      this.setState({
        isAuthenticated: true,
        user: user.displayName
      })
      :
      this.setState({
        user: null,
        isAuthenticated: false
      })
    ))
  }

  handleLogout = () =>  {
    firebase.auth().signOut()
    .then(() => console.log("signout Succesful"))
    .catch(error => {
      console.log("Something Went Wrong: ", error.message)
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to React Fire Todos</h1>
    {
      this.state.isAuthenticated ?
        <Dashboard
        text={this.state.text}
        todos={this.state.todos}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleRemove={this.handleRemove}
        handleLogout={this.handleLogout}
        />
        : 
        <Login 
        handleLogin={this.handleLogin}
        />
    }
      </div>
    );
  }
}

export default App;
