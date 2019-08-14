import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleTags, filterTags, handleErrors } from '../../actions/project';
import utilsService from '../../services/utils';
import CustomField from '../CustomField/CustomField';
import history from '../../history';
import './Tags.scss';

class Tags extends Component { 

	constructor(props) {
		super(props);
		this.state = {
				tagInput: ''
		}
	}

	componentDidMount() {
		const { projectForm, removeTag } = this.props;
		// Erase values that could be stored from edit project page
		if(history.location.pathname === '/enviar-projeto') {
			if(projectForm && projectForm.tags && projectForm.tags.length > 0) {
				projectForm.tags.map(tag => {
					return removeTag(tag);
				})
			}
		}
	}

	handleChange = (e) => {
		const inputValue = e.target.value;

		this.setState({
			tagInput: inputValue
		});

		const validationErrors = utilsService.validate(inputValue, 'tags');
		this.props.handleErrors({ tags: validationErrors });
	}

	handleClick = () => {
		const { projectTags, handleInput, projectForm } = this.props;

		const tags = projectTags ? projectTags : projectForm && projectForm.tags;

		if(this.state.tagInput !== '' && 
			typeof tags !== 'undefined' && tags.length < 5) {
			handleInput(this.state.tagInput);
		}

		this.setState({
			tagInput: ''
		})
	}

	render() {
		const { 
				placeholder = '', 
				projectTags,
				error, 
				isEdit, 
				project,
				projectForm
		} = this.props;

		const tags = projectTags ? projectTags : projectForm.tags;

		return (
			<div className="tags__comp">
				{isEdit && (
					<div className="tags__input">
							<CustomField
								mainDivClasses="tags__input-field"
								label="Tags"
								controlClasses="has-icons-left has-icons-right"
								name="tag__input"
								onChange={this.handleChange}
								value={this.state.tagInput}
								type="text"
								placeholder={placeholder}
								showLeftIcon={true}
								leftIcon="fa-hashtag"
								showRightIcon={true}
								help="Dica: Insira palavras-chave que estejam relacionadas com o seu projeto, assim fica mais fácil dele aparecer na busca!"
								error={error}
								isEdit={isEdit}
								project={project}
							/>
							<span onClick={this.handleClick}>
								<i 
									className="tags__input-icon fas fa-2x fa-chevron-circle-right"
									style={project ? { position: 'unset' } : {}}
								/>
							</span>
					</div>
				)}
				<div className="tags__wrapper">
					{tags && tags.length > 0 && tags.map((tag, i) => {
						return (
							<div 
									key={i} 
									className={`tags 
									${tags ? 'has-addons' : ''}`}
							>
								<span className="tag is-danger">{tag}</span>
								{tags && isEdit && (
									<button 
											type="button" 
											onClick={() => this.props.removeTag(tag)} 
											className="tag is-delete"
									/>
								)}
							</div>
						)
					})} 
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projectForm: state.project && state.project.projectRegistration
});

const mapDispatchToProps = dispatch => ({
	handleInput: value => {
			dispatch(handleTags(value));
	},
	removeTag: value => {
			dispatch(filterTags(value));
	},
	handleErrors: value => {
			dispatch(handleErrors(value));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(Tags);