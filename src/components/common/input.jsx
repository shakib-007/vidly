import React from 'react';

const Input = ({ type, name, label, value, onChange, error }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input onChange={onChange} name={name} value={value} id={name} type={type} className="form-control" />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;