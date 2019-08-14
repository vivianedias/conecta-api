import React from 'react';
import './CustomField.scss';

const CustomField = (
    {
        mainDivClasses = '', 
        label, 
        isEdit = false,
        project,
        controlClasses = '', 
        name = '',
        value,
        onChange,
        type, 
        placeholder, 
        maxLength = undefined,
        showLeftIcon = false, 
        leftIcon, 
        help = undefined,
        error = undefined
    }) => {

    return (
        <div className={`custom-field field ${mainDivClasses}`}>
            {!project && <label className="label">{label}</label>}
            {isEdit && (
                <React.Fragment>
                    <div className={`control ${controlClasses}`}>
                        <input 
                            name={name} 
                            value={value} 
                            onChange={onChange} 
                            className={`custom-field__input input ${error ? 'is-danger' : ''}`} 
                            type={type} 
                            placeholder={placeholder} 
                            maxLength={maxLength}
                        />
                        {showLeftIcon && (
                            <span className="icon is-left is-small">
                                <i className={`fas ${leftIcon}`}></i>
                            </span>
                        )}
                        {error && (
                            <span className="icon is-right is-small">
                                <i className={`fas ${error ? 'fa-exclamation-triangle' : ''}`}></i>
                            </span>
                        )}
                    </div>
                    {help && <p className="help">{help}</p>}
                    {typeof error !== 'undefined' && 
                    typeof error !== "object" && 
                        <p className="help is-danger">
                            {error}
                        </p>
                    } 
                </React.Fragment>
            )}
        </div>
    );
}

export default CustomField;