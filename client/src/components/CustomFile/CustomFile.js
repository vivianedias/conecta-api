import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleErrors, handleProject } from '../../actions/project';
import { uploadImg } from '../../actions/upload';
import './CustomFile.scss';

class CustomFile extends Component { 

	constructor(props) {
		super(props);
		this.state = {
			name: 'Nome do arquivo',
			selectedFile: undefined
		}
	}

	componentDidUpdate(prevProps) {
		const { uploadRes, setProjectImg } = this.props;
		if(uploadRes !== prevProps.uploadRes) {
			setProjectImg({ img: uploadRes.id });
		}
	}

	handleChange = (e) => {
		const { validateBeforeNext, handleErrors } = this.props;
		e.preventDefault();

		const fileName = e.target.files.length > 0 
			? e.target.files[0].name 
			: 'Nome do arquivo';
		const file = e.target.files[0]

		this.setState({ 
			name: fileName,
		})

		if(typeof file === 'undefined') return validateBeforeNext('file', file);

		handleErrors({ file: '' });
		this.setState({ selectedFile: file })
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { selectedFile } = this.state;
		const formData = new FormData()
		formData.append('projectImg', selectedFile)
		typeof selectedFile !== 'undefined' 
			? this.props.handleImgInput(formData)
			: this.props.validateBeforeNext('file', undefined);
	}

	render() {
		const { errors, uploadRes } = this.props;
		return (
			<div className="custom-file">
				<form 
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
				>
					<div className="field">
						<div 
							className="custom-file__file file is-danger has-name is-boxed"
						>
							<label className="file-label">
								<input 
									className="file-input" 
									type="file" 
									name="projectImg"
									onChange={this.handleChange}
								/>
								<span className="file-cta">
									<span className="file-icon">
										<i className="fas fa-cloud-upload-alt" />
									</span>
									<span className="file-label">
										Selecionar arquivo
									</span>
								</span>
								<span className="custom-file__name file-name">
									{this.state.name}
								</span>
							</label>
							{errors.file && <p className="help is-danger">{errors.file}</p>}
						</div>
					</div>
					<button className="button" type="submit">
						Enviar
					</button>
				</form>
				{uploadRes && (
					<React.Fragment>
						<p>{uploadRes.msg}</p>
						<img 
							src={`/public/${uploadRes.img}`}
							alt="Imagem selecionada como capa do projeto"
						/>
					</React.Fragment>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	errors: state.errors && state.errors.project,
	uploadRes: state.upload
})

const mapDispatchToProps = dispatch => ({
	handleImgInput: (value) => {
		dispatch(uploadImg(value));
	},
	handleErrors: value => {
		dispatch(handleErrors(value));
	},
	setProjectImg: value => {
		dispatch(handleProject(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomFile);