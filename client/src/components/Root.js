import React from 'react'

import configureStore from '../store'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { Router, Switch } from 'react-router-dom'
import history from '../history'

import jwtDecode from 'jwt-decode'
import setAuthToken from '../services/setAuthToken'
import { handleAuth, logoutUser } from '../actions/auth'

import PrivateRoute from './PrivateRoute/PrivateRoute'
import Header from './Header/Header'
import Projetos from '../pages/Projetos/Projetos'
import Home from '../pages/Home/Home'
import ComoFunciona from '../pages/ComoFunciona/ComoFunciona'
import FAQ from '../pages/FAQ/FAQ'
import CadastroUsuário from '../pages/Cadastro/Cadastro'
import Login from '../pages/Login/Login'
import Dashboard from '../pages/Dashboard/Dashboard'
import AuthEnviarProjeto from '../pages/AuthProjeto/AuthProjeto'
import FormularioProjeto from '../pages/FormularioProjeto/FormularioProjeto'
import Projeto from '../pages/Projeto/Projeto'
import ProjetoEnviado from '../pages/ProjetoEnviado/ProjetoEnviado'
import EsqueciSenha from '../pages/EsqueciSenha/EsqueciSenha'
import RedefinirSenha from '../pages/RedefinirSenha/RedefinirSenha'

const store = configureStore()

if (localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken)
  // Set user and auth
  store.dispatch(handleAuth(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    // Clear current profile
    // Redirect to login
    store.dispatch(logoutUser())
  }
}

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <div className='app'>
        <Header />
        <div className='app-body'>
          <Route path='/' exact component={Home} />
          <Route path='/projetos' component={Projetos} />
          <Route
            path='/auth/enviar-projeto'
            component={AuthEnviarProjeto}
          />
          <Route path='/login' component={Login} />
          <Route path='/cadastro' component={CadastroUsuário} />
          <Route path='/como-funciona' component={ComoFunciona} />
          <Route path='/faq' component={FAQ} />
          <Route path='/projeto/:handle' component={Projeto} />
          <Route path='/projeto-enviado' component={ProjetoEnviado} />
          <Route path='/esqueci-senha' component={EsqueciSenha} />
          <Route path='/reset/:token' component={RedefinirSenha} />
          <Switch>
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute
              path='/enviar-projeto'
              component={FormularioProjeto}
            />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
)

// Root.propTypes = {
//     store: PropTypes.object.isRequired,
// }

export default Root
