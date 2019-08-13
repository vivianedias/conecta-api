import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProjects } from '../../actions/project';
import Card from '../Card/Card';
import './Projetos.scss';

class Projetos extends Component { 

    constructor(props) {
        super(props);
        this.state = {
            cardSlice: 4,
            filteredProjects: []
        }
        this.searchInput = React.createRef();
    }

    componentDidMount() {
        this.props.getProjects();
    }

    handleCardSlice = () => {
        const { projects } = this.props;
        const { cardSlice } = this.state;
        const projectsLength = projects.length;
        const addToQueue = projectsLength - cardSlice < 4 ? projectsLength - cardSlice : 4;
        if(projects.length !== this.state.cardSlice) {
            this.setState(prevState => ({
                cardSlice: prevState.cardSlice + addToQueue
            }))
        } else {
            this.setState({ cardSlice: 4 })
        }
    }

    handleClick = () => {
        const { history } = this.props;

        history.location.pathname === '/projetos' 
        ? this.handleCardSlice()
        : history.push('/projetos')
    }

    handleChange = () => {
        const { projects } = this.props;
        const inputValue = this.searchInput.current.value;
        const filteredProjects = projects.filter(item => (item.tags && item.tags.includes(inputValue)) || 
        (item.name && item.name.includes(inputValue)) || (item.category && item.category.includes(inputValue)) || 
        (item.handle && item.handle.includes(inputValue)) || (item.description && item.description.includes(inputValue)) ||
        (item.objective && item.objective.includes(inputValue)) || (item.format && item.format.includes(inputValue)) ||
        (item.location && item.location.includes(inputValue)));
        return this.setState({ filteredProjects }) 
    }

    render () {

        const { history, projects } = this.props;
        const { filteredProjects } = this.state;
        const isHome = history.location.pathname === '/projetos' ? false : true;

        return (
            <div className="projetos-comp">
                <div className="projetos-comp__wrapper">
                    <h1 className="projetos-comp__h1 title is-1">Projetos_</h1>
                    <div className="projetos-comp__content">
                        {!isHome && (
                            <div className="projetos-comp__search">
                                <div className="projetos-comp__field field">
                                    <div className="control has-icons-left">
                                        <input 
                                            className="search__input input" 
                                            type="text"
                                            ref={this.searchInput}
                                            onChange={this.handleChange}
                                            placeholder="Buscar projetos..."
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {projects && (
                            <Card 
                                projects={filteredProjects.length > 0 ? filteredProjects : projects.slice(0, `${this.state.cardSlice}`)}
                                author={true}
                            />
                        )}
                    </div>
                    {projects && projects.length >= 5 && (
                        <button
                            type="button"
                            onClick={this.handleClick}
                            className="projetos-comp__btn-more button is-link is-rounded"
                        >
                            {projects && projects.length === this.state.cardSlice ? 'Ver menos' : 'Ver mais'}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.project && state.project.allProjects,
})

const mapDispatchToProps = dispatch => ({
    getProjects: () => {
		dispatch(getAllProjects());
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Projetos);