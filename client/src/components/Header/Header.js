import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setScreenSize } from '../../actions/screen';
import { logoutUser } from '../../actions/auth';
import _ from 'lodash';
import './Header.scss';
import Logo from '../../assets/img/logo-conecta-azul.png';

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isActive: false,
			isBurguerOpen: false,
		}
	}

	componentDidMount() {
		window.addEventListener('resize', _.throttle(this.setWindowWidth, 500), false);
		this.props.dispatchScreenSize(document.documentElement.clientWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.setWindowWidth, false);
	}

	setWindowWidth = () => {
		this.props.dispatchScreenSize(document.documentElement.clientWidth);		
	}

	handleClick = (e) => {
		e.preventDefault();
		this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }));
	}

	render () {
		const { auth: { isAuthenticated, user }, logoutUser, history } = this.props;
		const { isActive } = this.state;

		return (
			<div className="app-header">
				<nav className="navbar" role="navigation" aria-label="main navigation">
					<div className="navbar-brand">
						<Link className="navbar-item" to="/">
							<img src={Logo} alt="Logo Conecta" />
						</Link>
						<a 
							role="button" 
							className={`navbar-burger burger ${this.state.isBurguerOpen ? 'is-active' : ''}`}
							aria-label="menu" 
							aria-expanded="false" 
							data-target="navbarBasicExample"
							href="/"
							onClick={this.handleClick}
						>
							{/* TODO: navbar mobile! */}
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
							<span aria-hidden="true"></span>
						</a>
					</div>
		
					<div id="navbarBasicExample" className={`navbar-menu ${this.state.isBurguerOpen ? 'is-active' : ''}`}>
						<div className={`${isAuthenticated ? 'navbar-end' : 'navbar-start'}`}>
							<div className="app-header__item">
								<NavLink 
									className="app-header__link navbar-item is-link has-text-black-ter" 
									activeClassName="app-header__link--active" 
									to="/projetos"
									onClick={() => this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }))}
								>
									projetos
								</NavLink>
							</div>
							<div className="app-header__item">
								<NavLink 
									className="app-header__link navbar-item is-link has-text-black-ter" 
									activeClassName="app-header__link--active" 
									to="/auth/enviar-projeto"
									onClick={() => this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }))}
								>
									enviar
								</NavLink>
							</div>
							<div className="app-header__item">
								<NavLink 
									className="app-header__link navbar-item is-link has-text-black-ter" 
									activeClassName="app-header__link--active"  
									to="/como-funciona"
									onClick={() => this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }))}
								>
									como funciona
								</NavLink>
							</div>
							{isAuthenticated && (
								<div 
									onClick={() => this.setState({ isActive: !isActive })}
									className={`dropdown ${isActive ? 'is-active' : ''}`}
								>
									<div className="app-header__item-user dropdown-trigger">
										<button 
											className="app-header__user navbar-item is-link has-text-black-ter" 
											aria-haspopup="true" 
											aria-controls="dropdown-menu3"
										>
											<span className="app-header__user-name">{user.name.slice(0, 1)}</span>
										</button>
									</div>
									<div className="dropdown-menu" id="dropdown-menu3" role="menu">
										<div className="dropdown-content">
											<Link 
												className="dropdown-item"
												to='/dashboard' 
												
											>
												Dashboard
											</Link>
											<hr className="dropdown-divider" />
											<button 
												className="dropdown-item"
												onClick={() => logoutUser(history)} 
											>
												Sair
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
						{!isAuthenticated && (
							<div className="navbar-end">
								<div className="navbar-item">
									<div className="app-header__btn-wrapper buttons">
										<NavLink 
											onClick={() => this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }))} 
											className="app-header__btn-signup button" 
											to="/cadastro"
										>
											inscreva-se
										</NavLink>
										<NavLink 
											className="app-header__btn-login button is-light" 
											to="/login"
											onClick={() => this.setState(prevState => ({ isBurguerOpen: !prevState.isBurguerOpen }))}
										>
											entrar
										</NavLink>
									</div>
								</div>	
							</div>														
						)}
					</div>
				</nav>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	dispatchScreenSize: value => {
		dispatch(setScreenSize(value));
	},
	logoutUser: (history) => {
		dispatch(logoutUser(history));
	}
})

const mapStateToProps = state => ({
	auth: state.auth
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
