import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {
  state = {
    user: "",
    name: "", 
    password: "",
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
          <label>name </label><input onChange={this.onChange} name="name"/>
          <label>password </label><input onChange={this.onChange} name="password" />
          <button onClick={this.login}> login </button>
        </div>
        }
        {
          this.state.user &&
          <button onClick={this.seeBlogs}>see blogs?</button>
        }
      </div>
    );
  }
}

export default App;
