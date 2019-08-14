import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser, handleErrors, registerUser } from '../../actions/user-form';
import { withRouter } from 'react-router-dom';
import utilsService from '../../services/utils';
import CustomField from '../../components/CustomField/CustomField';
import states from '../../services/states.json';
import cities from '../../services/cities.json';
import './Cadastro.scss';

class Cadastro extends Component {

    constructor() {
        super();
        this.state = {
            openInput: false,
        }
    }

    componentDidMount() {
        const { auth: { isAuthenticated }, history } = this.props;
        if(isAuthenticated) {
            history.push('/dashboard');
        }
    }

    arrayOfYears = () => {
        const currentYear = (new Date()).getFullYear();
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
        const years = range(currentYear, currentYear - 110, -1); 
        return years
    }

    dispatchInput = (name, value) => {
        const { handleInputs, userForm } = this.props;
        const stateName = states
            .filter(state => state['id'].toString() === value)
            .map(stateName => stateName.name);

        switch(name) {
            case 'state':
                return handleInputs({
                    state: {
                        state_id: value,
                        state_name: stateName.toString()
                    }
                });
            case 'day':
            case 'month':
            case 'year':
                return handleInputs({
                    birthday: {
                        ...userForm.birthday,
                        [name]: value
                    } 
                })
            default:
                return handleInputs({
                    [name]: value
                })
        }
    }

    validate = (value, name) => {
        const { userForm } = this.props;
        switch(name) {
            case 'email':
                return utilsService.validateEmail(value);
            case 'password':
                return utilsService.validatePassword(value);
            case 'confirmedPassword':
                return utilsService.validateConfirmedPassword(userForm.password, value);
            case 'socialNumber':
                return utilsService.validateOnlyNumbers(value);
            default:
                return utilsService.required(value, name);
        }
    }

    maxLengthCheck = (value, maxLength) => {
        if (value.length > maxLength) {
            return value.slice(0, maxLength)
        }
        return value;
    }

    handleChange = (e) => {    
        const { handleErrors } = this.props;
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const checkInput = inputName === 'socialNumber' 
            ? this.maxLengthCheck(inputValue, e.target.maxLength) 
            : inputValue;

        const validationErrors = this.validate(checkInput, inputName);
        handleErrors({ [inputName]: validationErrors });

        this.dispatchInput(inputName, checkInput);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { handleRegister } = this.props;

        handleRegister()
    }

    render() {
        const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        const { userForm, errors } = this.props;
        const { openInput } = this.state;

        return (
            <div className="cadastro">
                <div className="cadastro__wrapper">
                    <h1 className="cadastro__title title">cadastro_</h1>
                    <form className="cadastro__form" onSubmit={this.onSubmit}>
                        <CustomField 
                            label="Nome"
                            controlClasses="has-icons-left has-icons-right"
                            name="name"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Nome"
                            showLeftIcon={true}
                            leftIcon="fa-user"
                            showRightIcon={true}
                            error={errors && errors.name}
                            isEdit={true}
                        />
                        <CustomField
                            label="E-mail"
                            controlClasses="has-icons-left has-icons-right"
                            name="email"
                            onChange={this.handleChange}
                            type="email"
                            placeholder="Endereço de email"
                            showLeftIcon={true}
                            leftIcon="fa-envelope"
                            showRightIcon={true}
                            error={errors && errors.email}
                            isEdit={true}
                        />
                        <CustomField 
                            label="Senha"
                            controlClasses="has-icons-left has-icons-right"
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Criar uma senha"
                            showLeftIcon={true}
                            leftIcon="fa-lock"
                            showRightIcon={true}
                            error={errors && errors.password}
                            isEdit={true}
                        />
                        <CustomField 
                            label="Confirme sua senha"
                            controlClasses="has-icons-right"
                            name="confirmedPassword"
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Confirme sua senha"
                            showRightIcon={true}
                            error={errors && errors.confirmedPassword}
                            isEdit={true}
                        />
                        {/*TODO: Arrumar validação para data de nascimento e estado */}
                        <div className="cadastro__form-birthday field">
                            <label className="label">Data de nascimento</label>
                            <div className="form__birthday-wrapper">
                                <div className="control form__birthday-control">
                                    <div className="select">
                                        <select 
                                            name="day"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Dia</option>
                                            {days.map(day => {
                                                return (
                                                    <option>{day}</option>  
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="control form__birthday-control">
                                    <div className="select">
                                        <select 
                                            name="month"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Mês</option>
                                            {months.map(month => {
                                                return (
                                                    <option>{month}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="control form__birthday-control">
                                    <div className="select">
                                        <select 
                                            name="year"
                                            onChange={this.handleChange}
                                        >
                                            <option value="">Ano</option>
                                            {this.arrayOfYears().map(year => {
                                                return (
                                                    <option>{year}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div> 
                            {errors && (errors.day || errors.month || errors.year || errors.birthday) && <p className="help is-danger">{(errors.day || errors.month || errors.year || errors.birthday)}</p>}
                        </div>
                        <div className="cadastro__form-sideBySide cadastro__form-sideBySide--id">
                            <CustomField 
                                mainDivClasses="form__gender"
                                label="Gênero"
                                controlClasses="has-icons-right"
                                name="gender"
                                onChange={this.handleChange}
                                type="text"
                                showRightIcon={true}
                                error={errors && errors.gender}
                                isEdit={true}
                            />
                            <div className="cadastro__form-color field">
                                <label className="label">Etnia</label>
                                <div className="form__color-wrapper">
                                    <div 
                                        className="control form__color-control"
                                    >
                                        <div 
                                            className={`form__select-wrapper select 
                                            ${errors && typeof errors.color !== 'undefined' 
                                                ? 'is-focused is-danger' 
                                                : ''}`}
                                        >
                                            <select 
                                                name="color"
                                                onChange={this.handleChange}
                                                className="form__select"
                                            >
                                                <option value="">Etnia</option>
                                                <option>Amarela</option>
                                                <option>Branca</option>
                                                <option>Indígena</option>
                                                <option>Parda</option>
                                                <option>Preta</option>      
                                                <option>
                                                    Prefiro não declarar
                                                </option>                     
                                            </select>
                                        </div>
                                        {errors && errors.color && 
                                            <p 
                                                className="help is-danger"
                                            >
                                                {errors.color}
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cadastro__form-sideBySide">
                            <div className="cadastro__form-state field">
                                <label className="label">Estado</label>
                                <div className="form__state-wrapper">
                                    <div 
                                        className="control form__state-control"
                                    >
                                        <div 
                                            className={`form__select-wrapper select 
                                            ${errors && typeof errors.state !== 'undefined' 
                                                ? 'is-focused is-danger' 
                                                : ''}`}
                                        >
                                            <select 
                                                name="state"
                                                className="form__select"
                                                onChange={this.handleChange}
                                            >
                                                <option value="">
                                                    Estado
                                                </option>     
                                                {states.map(item => {
                                                    return (
                                                        <option value={item.id}>{item.name}</option>
                                                    )
                                                })}                                  
                                            </select>
                                        </div>
                                        {errors && errors.state && 
                                            <p className="help is-danger">
                                                {errors.state}
                                            </p>
                                        }                                    
                                    </div>
                                </div>
                            </div>
                            <div className="cadastro__form-city field">
                                <label className="label">Cidade</label>
                                <div className="form__city-wrapper">
                                    <div className="control form__city-control">
                                        <div 
                                            className={`form__select-wrapper select 
                                            ${errors && 
                                            typeof errors.city !== 'undefined' 
                                                ? 'is-focused is-danger' 
                                                : ''}`}
                                        >
                                            <select 
                                                name="city"
                                                onChange={this.handleChange}
                                                className="form__select form__city-select"
                                            >
                                                <option value="">
                                                    Cidade
                                                </option>     
                                                {userForm.state && cities
                                                    .filter(city => city['state_id'].toString() === userForm.state.state_id)
                                                    .map(filteredCities => {
                                                        return (
                                                            <option>{filteredCities.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    {errors && errors.city && 
                                        <p className="help is-danger">
                                            {errors.city}
                                        </p>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <CustomField 
                            label="Área de Atuação"
                            controlClasses="has-icons-left has-icons-right"
                            name="currentField"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="Qual sua área de atuação?"
                            showLeftIcon={true}
                            leftIcon="fa-briefcase"
                            showRightIcon={true}
                            error={errors && errors.currentField}
                            isEdit={true}
                        />
                        <div className="cadastro__form-social field">
                            <label className="label">Tem MEI ou CNPJ?</label>
                            <div className="form__social-wrapper control">
                                <label className="radio">
                                    <input 
                                        type="radio" 
                                        name="socialNumber"
                                        onClick={() => this.setState({ openInput: true })}
                                        onChange={this.handleChange}
                                        value=""
                                        maxLength={14}
                                    /> 
                                    {' '} Sim
                                </label>
                                <label className="radio">
                                    <input 
                                        type="radio" 
                                        name="socialNumber" 
                                        value="não"
                                        onClick={() => this.setState({ openInput: false }) }
                                        onChange={this.handleChange}
                                        maxLength={14}
                                    /> 
                                    {' '} Não
                                </label>
                            {openInput && (
                                <CustomField 
                                    controlClasses="has-icons-right"
                                    name="socialNumber"
                                    onChange={this.handleChange}
                                    type="text"
                                    placeholder="Por favor, informe seu CNPJ ou MEI"
                                    maxLength={14}
                                    showRightIcon={true}
                                    error={errors && errors.socialNumber}
                                    isEdit={true}
                                />
                            )}
                            </div>
                            {!openInput && errors && errors.socialNumber && 
                                <p className="help is-danger">
                                    {errors.socialNumber}
                                </p>
                            }
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <button 
                                    type="submit" 
                                    className="button is-danger"
                                >
                                    Cadastrar
                                </button>
                            </div>
                            <div className="control">
                                <button className="button is-text">Cancelar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userForm: state.userForm,
    errors: state.errors && state.errors.user,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    handleInputs: value => {
		dispatch(setUser(value));
    },
    handleErrors: value => {
        dispatch(handleErrors(value))
    },
    handleRegister: (history) => {
        dispatch(registerUser(history))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cadastro));