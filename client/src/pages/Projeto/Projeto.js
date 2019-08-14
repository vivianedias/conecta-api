import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
  handleProject, 
  setEstimatedValue, 
  handleErrors, 
  updateProject, 
	getProject,
	handleProjectSuccess
} from '../../actions/project';
import utilsService from '../../services/utils';
import Tags from '../../components/Tags/Tags';
import CustomField from '../../components/CustomField/CustomField';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomTextarea from '../../components/CustomTextarea/CustomTextarea';
import './Projeto.scss';

class Projeto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdit: false
		}
  }

  componentDidMount() {
		const { match: { params }, handleSuccessMsg, getProject } = this.props;

		getProject(params.handle);
		handleSuccessMsg();
	}

	// Set previous values
	recordProjectValues = () => {
		const { project, handleInput, handleSuccessMsg } = this.props;
		const { isEdit } = this.state;

		// Change isEdit status
		this.setState({ isEdit: !isEdit });

		// Remove success msg from redux and localStorage
		handleSuccessMsg();

		return Object.keys(project).map(inputs => { 
			switch(inputs){
				case 'objective':
				case 'location':
				case 'description':
				case 'tags':
				case 'category':
				case 'format':
					return handleInput({ [inputs]: project[inputs] });
				default:
					return undefined;
			};
		});
	};

	
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

	sendUpdatedProject = () => {
		const { 
			projectForm,
			updateProject, 
			match: { params }, 
		} = this.props;

		updateProject(projectForm, params.handle);

		// Check if all fields are filled
		if(projectForm.description && projectForm.objective && projectForm.category && projectForm.estimatedValue && projectForm.location && 
		projectForm.tags.length !== 0 && projectForm.format) 
		return this.setState({ isEdit: !this.state.isEdit });
	}

	// Update values after refresh
	componentDidUpdate(prevProps) {
		const { 
			projectForm: { success }, 
			match: { params }, 
			getProject 
		} = this.props;
		if (success !== prevProps.projectForm.success) {
			getProject(params.handle);
		}
	}

  render() {
    const { 
      project, 
			errors,
			projectForm,
			user: { isAuthenticated, user },
			projectImg
		} = this.props;

    const { isEdit } = this.state;
		const isProjectOwner = isAuthenticated && user.name === project.userName;

		return (
      <div className="project">
				{project && projectImg && (
					<React.Fragment>
						<div className="project__wrapper">
							<div className="project__main-content">
								<img 
									className="main-content__img" 
									src={`http://localhost:5000/uploads/${projectImg[project._id]}`} 
									alt="" 
								/>
								<div className="main-content__text">
									<div>
										<h1 
											className="project__name title is-2"
										>
											{project.name}
										</h1>
										<p 
											className="project__author has-text-danger">
											{`Por: ${project.userName}`}
										</p>
									</div>
									{/* <h2 className="project__label title">Descrição</h2> */}
									{!isEdit && 
											<div 
												className="project__description is-size-5"
											>
												{project.description}
											</div>
									}
									<CustomTextarea 
										label="Descrição"
										name="description"
										placeholder="Conta pra gente de maneira resumida o que é o seu projeto ou negócio"
										onChange={this.handleChange}
										error={errors && errors.description}
										isEdit={isEdit}
										project={true}
										value={projectForm.description}
									/>
								</div>
							</div>
							<div className="project__other-content">
								<div 
									className={`other-content__wrapper 
									${isEdit 
											? 'other-content__wrapper--isEdit' 
											: ''
									}`}
								>
									<h3 
											className="project__label title is-size-5"
									>
											Objetivo
									</h3>
									<CustomTextarea 
										label="Objetivo"
										name="objective"
										placeholder="Qual problema o seu projeto ou negócio pretende resolver?"
										onChange={this.handleChange}
										error={errors && errors.objective}
										isEdit={isEdit}
										project={true}
										value={projectForm.objective}
									/>
									{!isEdit && 
											<div 
												className="project__objective"
											>
												{project.objective}
											</div>
									}
								</div>
								<div 
									className={`other-content__wrapper 
									${isEdit 
											? 'other-content__wrapper--isEdit' 
											: ''
									}`}
								>
									<h4 
										className="project__label title is-size-5"
									>
										Categoria
									</h4>
									<CustomSelect 
										label="Categoria"
										selectWrapperClasses="custom-select__send-project--wrapper"
										error={errors && errors.category}
										name="category"
										onChange={this.handleChange}
										selectClasses="custom-select__send-project--select"
										firstValue="Categoria"
										options={[1, 2, 3, 4]}
										value={projectForm.category}
										isEdit={isEdit}
										project={true}
									/>
									{!isEdit && 
										<div className="project__category">
											{project.category}
										</div>
									}
								</div>
								<div 
									className={`other-content__wrapper 
									${isEdit 
											? 'other-content__wrapper--isEdit' 
											: ''
									}`}
								>
									<h5 
										className="project__label title is-size-5"
									>
										Valor
									</h5>
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
										isEdit={isEdit}
										project={true}
									/>
									{!isEdit && 
										<div className="project__value">  
											{project.estimatedValue}
										</div>
									}
								</div>
								<div 
									className={`other-content__wrapper 
									${isEdit 
											? 'other-content__wrapper--isEdit' 
											: ''
									}`}
								>
									<h6 
										className="project__label title is-size-5">
											Local
									</h6>
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
										isEdit={isEdit}
										project={true}
										value={projectForm.location}
									/>
									{!isEdit && 
										<div className="project__location">
											{project.location}
										</div>
									}
								</div>
								<div className={`other-content__wrapper 
									${isEdit 
										? 'other-content__wrapper--isEdit' 
										: ''
									}`
								}>
									<h7 
										className="project__label title is-size-5"
									>
										Tags
									</h7>
									<Tags 
										isEdit={isEdit} 
										projectTags={projectForm.tags 
											? projectForm.tags 
											: project.tags
										}
										project={true}
										placeholder="Insira até cinco palavras-chave"
									/>
								</div>
								<div className={`other-content__wrapper 
									${isEdit 
										? 'other-content__wrapper--isEdit' 
										: ''
									}`
								}>
									<h7 
										className="project__label title is-size-5"
									>
										Formato
									</h7>
									<CustomSelect 
										label="Formato do Projeto"
										selectWrapperClasses="form__select-location"
										error={errors && errors.format}
										name="format"
										onChange={this.handleChange}
										selectClasses="form__select-location"
										firstValue="Formato"
										options={['exposição', 'intervenção', 'produção', 'roda de conversa', 'oficina', 'show']}
										isEdit={isEdit}
										project={true}
										value={projectForm.format}
									/>
									{!isEdit && 
										<div className="project__format">
											{project.format}
										</div>
									}
								</div>
							</div>
						</div>
						<div className="project__status">
							{projectForm.success && 
								<p
									className="project__success"
								>
									{projectForm.success}
								</p>
							}
							{isEdit && isProjectOwner &&
								<button 
									onClick={() => this.sendUpdatedProject()} 
									className="project__btn-edit button is-rounded"
								>
									Salvar
								</button>
							}
							{!isEdit && isProjectOwner &&
								<button 
									onClick={() => this.recordProjectValues()} 
									className="project__btn-edit button is-rounded"
								>
									Editar
								</button>
							}
						</div>
					</React.Fragment>
				)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProject: handle => {
    dispatch(getProject(handle));
  },
  handleInput: value => {
    dispatch(handleProject(value));
  },
  handleEstimatedValue: value => {
    dispatch(setEstimatedValue(value));
  },
  handleErrors: value => {
    dispatch(handleErrors(value));
  },
  updateProject: (value, handle) => {
    dispatch(updateProject(value, handle));
	},
	handleSuccessMsg: value => {
		dispatch(handleProjectSuccess(value));
	}
});

const mapStateToProps = state => ({
  project: state.project && state.project.project,
  projectForm: state.project && state.project.projectRegistration,
  errors: state.errors && state.errors.project,
	user: state.auth,
	projectImg: state.project && state.project.images	
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Projeto));