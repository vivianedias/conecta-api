import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { handleErrors, handleLogin, authUser } from '../../actions/auth';
import CustomField from '../../components/CustomField/CustomField';
import dividor from '../../assets/icons/ou-linha.jpg';
import './Login.scss';

class Login extends Component {

    componentDidMount() {
        const { auth: { isAuthenticated }, history } = this.props;

        if(isAuthenticated) {
            history.push('/dashboard');
        }

        // Set default location
        if(history.location.search !== '') {
            const query = history.location.search.replace(/^\?+/g, '');
            localStorage.setItem('defaultLocation', query);
        }
    }

    handleChange = (e) => {    
        const { handleInput } = this.props;
        const inputName = e.target.name;
        const inputValue = e.target.value;

        handleInput({ [inputName]: inputValue });
    }

    onSubmit = (e) => {
        const { sendForm, auth: { user } } = this.props;
        e.preventDefault();
        sendForm(user, localStorage.defaultLocation)
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="login">
                <form className="login__wrapper" onSubmit={this.onSubmit}>
                    <h1 className="login__title title has-text-danger">entre na conecta_</h1>
                    <div className="login__fields">
                        <CustomField 
                            label="E-mail"
                            controlClasses="has-icons-left has-icons-right"
                            name="email"
                            type="text"
                            placeholder="e-mail"
                            onChange={this.handleChange}
                            showLeftIcon={true}
                            leftIcon="fa-envelope"
                            showRightIcon={true}
                            error={errors && errors.email}
                            isEdit={true}
                        />
                        <CustomField 
                            label="Senha"
                            controlClasses="has-icons-left has-icons-right"
                            mainDivClasses="login__password"
                            name="password"
                            type="password"
                            placeholder="senha"
                            onChange={this.handleChange}
                            showLeftIcon={true}
                            leftIcon="fa-lock"
                            showRightIcon={true}
                            error={errors && errors.password}
                            isEdit={true}
                        />
                        <Link 
                            to="/esqueci-senha" 
                            className="login__forgot-password has-text-link"
                        >
                            esqueceu sua senha?
                        </Link>
                    </div>
                    <div className="field is-grouped">
                        <div className="control login__grouped-btns">
                            <button 
                                type="submit" 
                                className="login__btn button is-danger is-rounded"
                            >
                                login
                            </button>         
                            <img className="login__img-dividor" src={dividor} alt="Divisor de botões" />
                            <Link
                                to={{
                                    pathname: "/cadastro",
                                    search: `?${localStorage.defaultLocation}`,
                                }}
                                className="login__btn login__btn-signup button is-rounded"
                            >
                                cadastre-se
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    handleErrors: value => {
        dispatch(handleErrors(value))
    },
    handleInput: (value) => {
        dispatch(handleLogin(value))
    },
    sendForm: (value, query) => {
        dispatch(authUser(value, query))
    }
});

const mapStateToProps = state => ({
    errors: state.errors && state.errors.login,
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));