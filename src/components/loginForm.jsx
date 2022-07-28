import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
    // username = React.createRef();

    // componentDidMount(){
    //     this.username.current.focus();
    // }
    state = {
        account: {username: "", password:""},
        errors: {}
    };

    validate = () =>{
        const errors = {};
        const {account} = this.state;
        if(account.username.trim() === '')
            errors.username = "Username is required!";
        if(account.password.trim() === '')
            errors.password = "Password is required!";  
              
        return Object.keys(errors).length === 0 ? null : errors;
    };

    handleSubmit = (e)=>{
        e.preventDefault();

        const errors = this.validate();
    
        this.setState({ errors: errors || {} });

        if(errors) return;
        // const username = this.username.current.value;
        console.log("submitted");
    };

    handleChange = ({currentTarget: input})=>{
        //object destructing in parameter an event come suppose e, e have property currentTarget
        const account = {...this.state.account};
        account[input.name]= input.value;
        this.setState({account});
    };

    render() { 
        const {account, errors} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input name="username" value={account.username} label="Username" onChange={this.handleChange} error={errors.username}/>
                    <Input name="password" value={account.password} label="Password" onChange={this.handleChange} error={errors.password}/>
                    {/* <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} name="username" value={account.username} id='username' type="text" className="form-control" />
                    </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} name="password" value={account.password} id='password' type="text" className="form-control" />
                    </div> */}
                    <button className="btn btn-primary m-2">Login</button>
                </form>
            </div>
        );
    }
}
 
export default LoginForm;