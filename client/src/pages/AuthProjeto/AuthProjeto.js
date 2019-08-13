import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import utilsService from '../../services/utils';
import { handleErrors, handleProject, handleProjectAuth } from '../../actions/project';
import CustomField from '../../components/CustomField/CustomField';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import compilado from '../../assets/img/enviar.png';
import './AuthProjeto.scss';

class AuthProjeto extends Component { 

    validate = (value) => {
        return utilsService.required(value);
    }

    handleChange = (e) => {    
        const { handleErrors, handleInput } = this.props;
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const validationErrors = this.validate(inputValue);
        handleErrors({ [inputName]: validationErrors });

        // Save input values to redux
        handleInput({ [inputName]: inputValue });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { sendForm, projectForm, handleErrors } = this.props;
        if(projectForm && projectForm.name && projectForm.category) {
            // Send input values to localStorage then redirect
            sendForm(projectForm);
        }
        !projectForm.name && handleErrors({ name: 'Campo obrigatório' });
        !projectForm.category && handleErrors({ category: 'Campo obrigatório' });
    }

    render() {
        const { errors } = this.props;
        return(
            <div className="enviar-projeto">
                <div className="enviar-projeto__first-section">
                    <h1 className="enviar-projeto__title title is-2">Tire o seu projeto do papel</h1>
                    <img src={compilado} alt="Compilado de imagens capa dos projetos" />
                    <AnchorLink className="" href="#second-section">
                        <button className="enviar-projeto__btn button is-danger is-rounded">Vamos lá!</button>
                    </AnchorLink>
                </div>
                <div className="enviar-projeto__second-section" id="second-section">
                    <div className="second-section__wrapper">
                        <h2 className="second-section__title title is-3">Conte mais sobre seu projeto</h2>
                        <div className="second-section__form">
                            <CustomField 
                                label="Nome do projeto"
                                controlClasses="has-icons-right"
                                name="name"
                                onChange={this.handleChange}
                                type="text"
                                showRightIcon={true}
                                error={errors && errors.name}
                                isEdit={true}
                            />
                            <CustomSelect 
                                label="Categoria"
                                selectWrapperClasses="custom-select__send-project--wrapper"
                                error={errors && errors.category}
                                name="category"
                                onChange={this.handleChange}
                                selectClasses="custom-select__send-project--select"
                                firstValue="Categoria"
                                options={[1, 2, 3, 4]}
                                isEdit={true}
                            />
                        </div>
                        <button 
                            onClick={this.onSubmit} 
                            className="second-section__btn button is-danger is-rounded"
                        >
                            Começar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors && state.errors.project,
    projectForm: state.project && state.project.projectRegistration
})

const mapDispatchToProps = dispatch => ({
    handleErrors: value => {
        dispatch(handleErrors(value))
    },
    handleInput: (value) => {
        dispatch(handleProject(value))
    },
    sendForm: value => {
        dispatch(handleProjectAuth(value))
    }
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthProjeto));