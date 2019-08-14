import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getUserProjects } from '../../actions/project';
import Card from '../../components/Card/Card';
import plus from '../../assets/icons/plus-symbol.png';
import './Dashboard.scss';

class Dashboard extends Component {

    componentDidMount() {
        this.props.getUserProjects();
    }

    render() {
        const { projects, projectImg } = this.props;
        return (
            <div className="dashboard">
                <div className="dashboard__wrapper">
                    <h1 className="dashboard__title title is-2 has-text-danger">Meus projetos_</h1>
                    <div className="dashboard__projects">
                        <Link className="dashboard__add-project" to="/auth/enviar-projeto">
                            <div className="add-project__card">
                                <img className="add-project__plus" src={plus} alt="Símbolo de soma que ao ser clicado te redireciona para página de enviar projetos"/>
                            </div>
                        </Link>
                        {projects && projectImg && (
                            <Card projects={projects} projectImg={projectImg}/>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getUserProjects: () => {
        dispatch(getUserProjects())
    }
});

const mapStateToProps = state => ({
    projects: state.project.userProjects,
	projectImg: state.project && state.project.images
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));