import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImg, handleUploadErrors } from '../../actions/upload';
import { handleProject, handleErrors } from '../../actions/project';
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

		if(typeof file === 'undefined') return validateBeforeNext('img', file);

		handleErrors({ img: undefined });
		this.setState({ selectedFile: file });
	}

	onSubmit = (e) => {
		const { selectedFile } = this.state;
		
		e.preventDefault();

		const formData = new FormData();
		formData.append('projectImg', selectedFile);

		if (typeof selectedFile !== 'undefined') this.props.handleImgInput(formData)
	}

	render() {
		const { uploadErrors, projectErrors: { img }, uploadRes } = this.props;
		return (
			<div 
				className="custom-file"
				style={{ 
					justifyContent: `${uploadRes.img 
						? 'center' 
						: 'space-evenly'
					}`
				}}
			>
				<form 
					encType="multipart/form-data"
					onSubmit={this.onSubmit}
					className="custom-file__form"
				>
					<div className="field">
						<div 
							className="custom-file__file file is-danger has-name"
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
										<i className="fas fa-upload" />
									</span>
									<span className="file-label">
										Selecionar arquivo
									</span>
								</span>
								<span className="custom-file__name file-name">
									{this.state.name}
								</span>
							</label>
						</div>
					</div>
					<button 
						className={`custom-file__btn button ${uploadRes.isLoading && !uploadErrors && !img
							? 'is-loading' 
							: ''}`
						}
						type="submit"
						>
						Upload
					</button>
				</form>
				{img && !uploadErrors && !uploadRes.msg &&
					<p 
						className="help is-danger"
					>
						{this.props.projectErrors && img}
					</p>
				}
				{uploadErrors && 
					<p 
						className="help is-danger"
					>
						{uploadErrors}
					</p>
				}
				{uploadRes && 
					<p className="custom-file__success">{uploadRes.msg}</p>
				}
				{uploadRes && (
					<div className="custom-file__res">
						<img 
							src={`http://localhost:5000/${uploadRes.file}`}
							alt="Imagem selecionada como capa do projeto"
							style={uploadRes.file 
								? { display: 'initial' } 
								: { display: 'none' }
							}
							className="custom-file__img"
						/>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	projectErrors: state.errors && state.errors.project,
	uploadErrors: state.errors && state.errors.upload,
	uploadRes: state.upload
})

const mapDispatchToProps = dispatch => ({
	handleImgInput: (value) => {
		dispatch(uploadImg(value));
	},
	handleErrors: value => {
		dispatch(handleErrors(value));
	},
	handleUploadErrors: value => {
		dispatch(handleUploadErrors(value));
	},
	setProjectImg: value => {
		dispatch(handleProject(value));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomFile);