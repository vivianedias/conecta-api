import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './ProjetoEnviado.scss';

class ProjetoEnviado extends Component {

    componentDidMount() {
        const { history } = this.props;
        if(history.location.search !== '?valid=true' || !this.props.projectForm.success) {
            history.push('/auth/enviar-projeto');
        }
    }

    render() {
        const { projectForm } = this.props;

        return (
            <div className="projeto-enviado">
                {projectForm && (
                    <div className="projeto-enviado__wrapper">
                        <div className="projeto-enviado__msg title">{projectForm.success}</div>
                        <div className="projeto-enviado__content">
                            <div className="projeto-enviado__single subtitle">
                                Para acessar a página do seu projeto clique 
                                <Link className="has-text-danger" to={`/projeto/${projectForm.handle}`}>{' '}aqui</Link>
                            </div>
                            <div className="projeto-enviado__dashboard subtitle">
                                Ou se desejar, acesse sua <Link className="has-text-danger" to='/dashboard'>dashboard</Link> 
                                {' '}que contém todos os seus projetos
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projectForm: state.project && state.project.projectRegistration
})

export default withRouter(connect(mapStateToProps)(ProjetoEnviado));