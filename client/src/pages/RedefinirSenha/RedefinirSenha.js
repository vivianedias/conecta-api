import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
    handleRecoveryErrors, 
    handleRecoveryMsg, 
    sendNewPassword 
} from '../../actions/auth';
import CustomField from '../../components/CustomField/CustomField';
import './RedefinirSenha.scss';

class RedefinirSenha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmedPassword: '',
            token: '',
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.setState({ token: params.token })
    }

    handleChange = (e) => {    
        const inputValue = e.target.value;
        const inputName = e.target.name;
        this.setState(prevState => ({ 
            ...prevState,
            [inputName]: inputValue 
        }));
    }

    onSubmit = (e) => {
        const { sendForm, handleErrors, recoveryStatus } = this.props;
        e.preventDefault();

        // isLoading is true
        recoveryStatus(true);

        handleErrors({ recovery: '' });

        sendForm({ 
            password: this.state.password, 
            confirmedPassword: this.state.confirmedPassword 
        }, 
            this.state.token
        );
    }

    render() {
        const { error, recovery } = this.props;

        return (
            <div className="reset-password">
                <form 
                    className="reset-password__wrapper" 
                    onSubmit={this.onSubmit}
                >
                    <h1 
                        className="reset-password__title title has-text-danger"
                    >
                        redefinir minha senha
                    </h1>
                    <div className="reset-password__fields">
                        <CustomField 
                            label="Nova senha"
                            controlClasses="has-icons-left has-icons-right"
                            name="password"
                            type="text"
                            placeholder="Crie uma senha com no mínimo 6 caracteres"
                            onChange={this.handleChange}
                            showLeftIcon={true}
                            leftIcon="fa-lock"
                            showRightIcon={true}
                            error={error !== '' && error}
                            isEdit={true}
                        />
                        <CustomField 
                            label="Confirme sua nova senha"
                            controlClasses="has-icons-left has-icons-right"
                            name="confirmedPassword"
                            type="password"
                            placeholder="Confirme sua senha"
                            onChange={this.handleChange}
                            showRightIcon={true}
                            error={error !== '' && error}
                            isEdit={true}
                        />
                    </div>
                    {recovery && recovery.msg &&
                        <div 
                            className="reset-password__msg"
                        >
                            {recovery.msg}
                        </div>
                    }
                    <div className="reset-password__btn-wrapper control">
                        <button 
                            type="submit" 
                            className={`reset-password__btn button is-rounded
                            ${recovery.isLoading === true ? 'is-loading' : ''}`}
                        >
                            salvar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    handleErrors: value => {
        dispatch(handleRecoveryErrors(value));
    },
    sendForm: (value, token) => {
        dispatch(sendNewPassword(value, token));
    },
    recoveryStatus: (isLoading, value) => {
        dispatch(handleRecoveryMsg(isLoading, value));
    }
});

const mapStateToProps = state => ({
    error: state.errors && state.errors.resetPassword,
    recovery: state.auth && state.auth.recovery,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RedefinirSenha));