import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  state = {
    user: "",
    name: "", 
    password: "",
    signupName: "",
    signupPassword: "", 
    signupEmail: "",
  }

  componentDidMount() {
    const cookie = this.getCookie('token')
    if(cookie){
      this.setState({user: cookie})
    }
  }
  onChange = (evt) => {
    this.setState({[evt.target.name] : evt.target.value})
  }
  login = () => {
    let username = this.state.name
    let password = this.state.password
    if(username && password){
      axios.post('http://127.0.0.1:8000/api/v1/rest-auth/login/', {username, password})
      .then(res => {
        console.log('yay!', res.data)
        document.cookie = `token=${res.data.key}`
        this.setState({user: res.data})
      })
      .catch(err => console.log('oh no', err))
    }
  }

  signup = () => {
    let name = this.state.signupName
    let password = this.state.signupPassword
    let email = this.state.signupEmail
    if (name && email && password){
      axios.post('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {username: name, password1: password, password2: password, email: email})
      .then(response => {
        console.log('response', response.data)
      })
      .catch(err => console.log('registartion error!', err))
    }
  }

  delete_cookie = (name) => {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  logout = () => {
    axios.post('http://127.0.0.1:8000/api/v1/rest-auth/logout/')
    .then(res => {
      console.log('yay', res.data)
      this.delete_cookie('token')
      this.setState({user: "", name: "", "password": ""})
    })
    .catch(err => console.log('oh no', err))
  }

 getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim()
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


  seeBlogs = () => {
    const cookie = this.getCookie('token')
    axios.get('http://127.0.0.1:8000/api/v1/1/', { headers: { Authorization: `Token  ${cookie}` }})
    .then(res => console.log('yay!!!', res.data))
    .catch(err => console.log('boo', err))
  }
  render() {
    return (
      <div className="App">
        { !this.state.user && 
        <div>
          <form>
            <legend> login </legend>
            <label>name </label><input onChange={this.onChange} name="name"/>
            <label>password </label><input onChange={this.onChange} name="password" />
            <button type="button" onClick={this.login}> login </button>
          </form>
          <form>
            <legend> sign up </legend>
            <label>name </label><input onChange={this.onChange} name="signupName"/>
            <label>password </label><input onChange={this.onChange} name="signupPassword" />
            <label>email </label><input onChange={this.onChange} name="signupEmail" />
            <button type="button" onClick={this.signup}> sign up </button>
          </form>
        </div>
        }
        {
          this.state.user &&
          <div>
          <button onClick={this.seeBlogs}>see blogs?</button>
          <button onClick={this.logout}>log out</button>
          </div>
        }
      </div>
    );
  }
}

export default App;
