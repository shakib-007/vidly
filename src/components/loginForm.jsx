import React from 'react';
import Joi from 'joi-browser';
import Input from './common/input';
import Form from './common/form';

class LoginForm extends Form {
    // username = React.createRef();

    // componentDidMount(){
    //     this.username.current.focus();
    // }
    state = {
        // account: {username: "", password:""},
        data: {username: "", password:""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };
/*
    validate = () =>{
        // const options = {abortEarly: false};
        // const result = Joi.validate(this.state.account, this.schema, options);
        // console.log(result);

        const options = {abortEarly: false};
        const { error } = Joi.validate(this.state.data, this.schema, options);

        if(!error) return null;
        
        const errors = {};
        for(let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
        // const errors = {};
        // const {account} = this.state;
        // if(account.username.trim() === '')
        //     errors.username = "Username is required!";
        // if(account.password.trim() === '')
        //     errors.password = "Password is required!";  
              
        // return Object.keys(errors).length === 0 ? null : errors;
    };

    
    validateProperty = ({name,value}) => {
        //pass input to validateproperty in input property are name and value now in parameter do this object destructing
        // if(name === 'username'){
        //     if(value.trim() === '') return "Username is required";
        // }
        // if(name === 'password'){
        //     if(value.trim() === '') return "Password is required";
        // }

        const obj = {[name] : value};
        const schema = {[name] : this.schema[name]};
        const { error } = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;

    };

    handleSubmit = (e)=>{
            e.preventDefault();

            const errors = this.validate();
        
            this.setState({ errors: errors || {} });

            if(errors) return;
            // const username = this.username.current.value;
            this.doSubmit();
    };

    handleChange = ({currentTarget: input})=>{
        //object destructing in parameter an event come suppose e, e have property currentTarget

        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name]= input.value;
        this.setState({data, errors});
    };*/

    doSubmit = () =>{
            //call server
            console.log("submitted");
    };

    render() { 
        const {data, errors} = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {/* <Input name="username" value={data.username} label="Username" onChange={this.handleChange} error={errors.username}/>
                    <Input name="password" value={data.password} label="Password" onChange={this.handleChange} error={errors.password}/> */}
                    
                    {/* <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input onChange={this.handleChange} name="username" value={account.username} id='username' type="text" className="form-control" />
                    </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input onChange={this.handleChange} name="password" value={account.password} id='password' type="text" className="form-control" />
                    </div> */}
                    {/* <button disabled={this.validate()} className="btn btn-primary m-2">Login</button> */}

                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password','password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}
 
export default LoginForm;