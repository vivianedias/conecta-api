import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleProject, setEstimatedValue, handleErrors, registerProject } from '../../actions/project';
import utilsService from '../../services/utils';
import CustomField from '../../components/CustomField/CustomField';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextarea from '../../components/CustomTextarea/CustomTextarea';
import CustomMultiple from '../../components/CustomMultiple/CustomMultiple';
import CustomFile from '../../components/CustomFile/CustomFile';
import Tags from '../../components/Tags/Tags';
import './FormularioProjeto.scss';

class FormularioProjeto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 3,
        }
    }

    componentDidMount() {
        // Making sure Title and Category are at localStorage
        if(localStorage.projectRegistration) {
            // Dispatch any data stored at localStorage.projectRegistration
            const previousContent = JSON.parse(localStorage.projectRegistration);
            previousContent && this.props.handleInput(previousContent);
        } else {
            this.props.history.push('/auth/enviar-projeto');
        }
    }

    // Show errors and send input to store while typing
    handleChange = (e) => {    
        const { handleErrors, handleInput, handleEstimatedValue } = this.props;
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const validationErrors = utilsService.validate(inputValue, inputName);

        handleErrors({ [inputName]: validationErrors });
        inputName === 'estimatedValue' 
            ? handleEstimatedValue(inputValue) 
            : handleInput({ [inputName]: inputValue });
    }

    // Doesn't let user go to next step in case it didn't fill out all required fields
    nextStepValidation = () => {
        const { step } = this.state;
        const { 
            projectForm: { 
                description, objective, format, specialNeeds, location, estimatedValue, tags
            }, errors
        } = this.props;

        if(step === 0) {
            if(!description || !objective) {
                !description && this.validateBeforeNext('description');
                !objective && this.validateBeforeNext('objective');
            }
            (description && objective !== '') && this.nextStep();
        }

        if(step === 1) {
            // Transforming specialNeeds object into array
            typeof specialNeeds === 'object' && 
            this.props.handleInput({ 
                'specialNeeds': Object.values(specialNeeds) 
            });
            !format || format === '' 
                ? this.validateBeforeNext('format') 
                : this.nextStep();
        } 

        if(step === 2) {
            if((typeof tags !== 'undefined' && tags.length === 0) || !location || !estimatedValue ) {
                !location && this.validateBeforeNext('location');
                !estimatedValue && this.validateBeforeNext('estimatedValue');
                tags.length === 0 && this.validateBeforeNext('tags');
            }
            (tags.length > 0 && location && estimatedValue && errors.estimatedValue === undefined) && this.nextStep();
        }
    }

    // Show error messages in case user doesn't add input to required fields
    validateBeforeNext = (name) => {
        const { handleErrors, projectForm } = this.props;
        const validationErrors = utilsService.validate(projectForm[`${name}`]);
        handleErrors({ [name]: validationErrors });
    }

    // Go foward and backwards in the form
    nextStep = () => {
        this.setState(prevState => ({
            step: prevState.step + 1
        }))
    }
    previousStep = () => {
        this.setState(prevState => ({
            step: prevState.step - 1
        }))
    }

    // Get step name because of different css depending which the user is currently at
    stepName = () => {
        const { step } = this.state;

        let stepName;
        if(step === 0) stepName = 'zero';
        if(step === 1) stepName = 'one';
        if(step === 2) stepName = 'two';
        if(step === 3) stepName = 'three';
        if(step === 4) stepName = 'four';

        return stepName;
    }

    // Submit form
    onSubmit = (e) => {
        const { projectForm, sendForm } = this.props;
        e.preventDefault();

        !projectForm.handle && this.validateBeforeNext('handle');

        //img && handle
        typeof projectForm.handle && 
        projectForm.img !== 'undefined' && 
        sendForm(projectForm);
    }

    render() {
        const { errors } = this.props;
        const { step } = this.state;

        return (
            <div className="formulario-projeto">
                <div className="formulario-projeto__wrapper">
                    <form 
                        className="formulario-projeto__form" 
                        onSubmit={this.onSubmit}
                    >
                        <div className={`form__wrapper form__wrapper--step-${this.stepName()}`}>
                            {step === 0 && (
                                <React.Fragment>
                                    <CustomTextarea 
                                        label="Descrição"
                                        name="description"
                                        placeholder="Conta pra gente de maneira resumida o que é o seu projeto ou negócio"
                                        onChange={this.handleChange}
                                        error={errors && errors.description}
                                        isEdit={true}
                                    />
                                    <CustomTextarea 
                                        label="Objetivo"
                                        name="objective"
                                        placeholder="Qual problema o seu projeto ou negócio pretende resolver?"
                                        onChange={this.handleChange}
                                        error={errors && errors.objective}
                                        isEdit={true}
                                    />
                                </React.Fragment>
                            )}
                            {step === 1 && (
                                <React.Fragment>
                                    <CustomSelect 
                                        label="Formato do Projeto"
                                        selectWrapperClasses="form__select-location"
                                        error={errors && errors.format}
                                        name="format"
                                        onChange={this.handleChange}
                                        selectClasses="form__select-location"
                                        firstValue="Formato"
                                        options={['Exposição', 'Intervenção', 'Produção', 'Roda de Conversa', 'Oficina', 'Show']}
                                        isEdit={true}
                                    />
                                    <CustomMultiple
                                        label="Faça uma lista com itens que você precisa no seu projeto"
                                        isEdit={true}
                                    />
                                </React.Fragment>
                            )}
                            {/* TODO: Fazer integração com Google Maps */}
                            {/* TODO: Colocar máscara para dinheiro */}
                            {step === 2 && (
                                <React.Fragment>
                                    <CustomField 
                                        label="Local"
                                        controlClasses="has-icons-left has-icons-right"
                                        name="location"
                                        onChange={this.handleChange}
                                        type="text"
                                        placeholder="Onde seu projeto já foi ou será realizado?"
                                        showLeftIcon={true}
                                        leftIcon="fa-map-marker-alt"
                                        showRightIcon={true}
                                        error={errors && errors.location}
                                        isEdit={true}
                                    />
                                    <CustomField 
                                        label="Valor estimado"
                                        controlClasses="has-icons-left has-icons-right"
                                        name="estimatedValue"
                                        onChange={this.handleChange}
                                        type="text"
                                        placeholder="R$ 0,00"
                                        showLeftIcon={true}
                                        leftIcon="fa-dollar-sign"
                                        showRightIcon={true}
                                        error={errors && errors.estimatedValue}
                                        isEdit={true}
                                    />
                                    <Tags
                                        label="Tags"
                                        placeholder="Insira até cinco palavras-chave"
                                        error={errors && errors.tags}
                                        isEdit={true}
                                    />
                                </React.Fragment>
                            )}
                            {step === 3 && (
                                <React.Fragment>
                                    <CustomField
                                        label="Url"
                                        controlClasses="has-icons-left has-icons-right"
                                        name="handle"
                                        onChange={this.handleChange}
                                        type="text"
                                        placeholder="Escolha uma url para o seu projeto"
                                        showLeftIcon={true}
                                        leftIcon="fa-globe-americas"
                                        showRightIcon={true}
                                        error={errors && errors.handle}
                                        isEdit={true}
                                        help="Dica: Crie uma url que seja fácil de lembrar, esteja ligada ao nome do seu projeto e que não possua espaços nem caracteres especiais!"
                                    />
                                    <CustomFile 
                                        validateBeforeNext={this.validateBeforeNext}
                                    />
                                </React.Fragment>
                            )}
                        </div>
                        <div className="form__wrap-btns field is-grouped">
                            <div className="control">
                                {step < 3 && (
                                    <button 
                                        type="button"
                                        onClick={this.nextStepValidation}
                                        className="form__btn button is-danger is-rounded"
                                    >
                                        Próximo
                                    </button>
                                )}
                                {step === 3 && (
                                    <button 
                                        type="submit"
                                        className="form__btn button is-danger is-rounded"
                                    >
                                        Enviar
                                    </button>
                                )}
                            </div>
                            {step !== 0 && step <= 3 && (
                                <div className="control">
                                    <button 
                                        className="form__btn button is-text"
                                        type="button"
                                        onClick={this.previousStep}
                                    >
                                        Voltar
                                    </button>
                                </div>
                            )}
                        </div>
                        <progress 
                            className="progress is-small is-link" 
                            value={ (step / 4) * 100 } 
                            max="100"
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors && state.errors.project,
    projectForm: state.project && state.project.projectRegistration
});

const mapDispatchToProps = dispatch => ({
    handleInput: value => {
        dispatch(handleProject(value));
    },
    handleEstimatedValue: value => {
        dispatch(setEstimatedValue(value));
    },
    handleErrors: value => {
        dispatch(handleErrors(value));
    },
    sendForm: value => {
        dispatch(registerProject(value));
    }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormularioProjeto));