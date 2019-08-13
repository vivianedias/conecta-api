import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleRecoveryErrors, handleRecoveryMsg, sendRecoveryEmail } from '../../actions/auth';
import CustomField from '../../components/CustomField/CustomField';
import './EsqueciSenha.scss';

class EsqueciSenha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        }
    }

    componentDidMount() {
        this.props.handleErrors({});
    }

    handleChange = (e) => {    
        const inputValue = e.target.value;
        this.setState({ email: inputValue });
    }

    onSubmit = (e) => {
        const { sendForm, handleErrors, recoveryStatus } = this.props;
        e.preventDefault();

        // isLoading is true
        recoveryStatus(true);

        handleErrors({ recovery: '' });

        sendForm({ email: this.state.email });
    }

    render() {
        const { error, recovery } = this.props;
        return (
            <div className="forgot-password">
                <form 
                    className="forgot-password__wrapper" 
                    onSubmit={this.onSubmit}
                >
                    <h1 
                        className="forgot-password__title title has-text-danger"
                    >
                        recuperar minha senha
                    </h1>
                    <div className="forgot-password__fields">
                        <CustomField 
                            label="Insira seu e-mail cadastrado na conecta"
                            controlClasses="has-icons-left has-icons-right"
                            name="recovery"
                            type="text"
                            placeholder="e-mail"
                            onChange={this.handleChange}
                            showLeftIcon={true}
                            leftIcon="fa-envelope"
                            showRightIcon={true}
                            error={error !== '' && error}
                            isEdit={true}
                        />
                    </div>
                    {recovery && recovery.msg &&
                        <div 
                            className="forgot-password__msg"
                        >
                            {recovery.msg}
                        </div>
                    }
                    <div className="forgot-password__btn-wrapper control">
                        <button 
                            type="submit" 
                            className={`forgot-password__btn button is-rounded
                            ${recovery.isLoading ? ' is-loading' : ''}`}
                        >
                            recuperar
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
    sendForm: (value) => {
        dispatch(sendRecoveryEmail(value));
    },
    recoveryStatus: (isLoading, value) => {
        dispatch(handleRecoveryMsg(isLoading, value));
    }
});

const mapStateToProps = state => ({
    error: state.errors && state.errors.recovery,
    recovery: state.auth && state.auth.recovery,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EsqueciSenha));