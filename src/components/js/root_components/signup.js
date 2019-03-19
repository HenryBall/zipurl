// npm imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// style imports
import '../../css/root_components/login.css'

// require dotenv package for managing env variables
require('dotenv').config();

// api and server variables
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HOSTED_URL : process.env.REACT_APP_LOCAL_URL;
const server = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_HOSTED_SERVER : process.env.REACT_APP_LOCAL_SERVER;

// sign up component
class SignUp extends Component {

	constructor(props) {
		super(props);
		this.state = {
    	username: '',
    	email: '',
    	password: '',
    	passwordd: ''
  	};
  	this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
    console.log("we're in " + process.env.NODE_ENV + " mode in the sign up component");
  }

	validateEmail(email) {
		// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  	var re = /\S+@\S+\.\S+/;
  	return re.test(email);
	}

  handleSignUp() {
  	console.log(this.state)
  	if (this.state.username === '') {
  		// throw error
  		console.log('invalid username')
  	} else {
  		if (this.validateEmail(this.state.email)) {
  			console.log('valid email')
  			if (this.state.password === this.state.passwordd) {
  				// good to go
  				console.log('valid password')
  				axios.post(apiUrl + server + '/sign_up', {
      			username: this.state.username,
      			email: this.state.email,
      			password: this.state.password,
            links: [],
    			}).then( res => {
            const user = res.data.user;
            if (user) {
              localStorage.setItem('curUser', JSON.stringify(res.data.user));
              this.props.handleLogin();
            } else {
              console.log('unable to log in');
            }
    			})
    			.catch( err => {
      			console.log(err);
    			});
  			} else {
  				// throw error
  				console.log('invalid password')
  			}
  		} else {
  			// throw error
  			console.log('invalid email')
  		}
  	}
  }

  handleInputChange(event) {
  	const target = event.target;
  	const value = target.value;
  	const name = target.name;
  	this.setState({
      [name]: value
    });
  }

	render() {
		return (
			<div id='login-container'>
				<div id='login-box'>
					<div id='signin-title' className='yellow-color'>ZIP</div>
					<div id='signin-subtitle' className='dark-grey-color'>SIGN UP & GET STARTED</div>
					<input
						className='signin-input'
						placeholder='username'
						name='username'
						value={this.state.username}
						onChange={this.handleInputChange}
					/>
					<input
						className='signin-input'
						placeholder='email'
						name='email'
						value={this.state.email}
						onChange={this.handleInputChange}
					/>
					<input
						className='signin-input'
						placeholder='password'
						type="password"
						name='password'
						value={this.state.password}
						onChange={this.handleInputChange}
					/>
					<input
						className='signin-input'
						placeholder='confirm password'
						name='passwordd'
						type="password"
						value={this.state.passwordd}
						onChange={this.handleInputChange}
					/>
        	<button 
        		id='signin-btn'
            className='yellow-color-back'
        		onClick={() => this.handleSignUp()}>
        		sign up
        	</button>
        	<div id='signin-footer' className='dark-grey-color'>Already have an account?
        		<Link 
        			to='/login'
        			className='react-link yellow-color'> Sign In
        		</Link>
        	</div>
				</div>
			</div>
		);
	}
}

export default SignUp;