import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import CompProjetos from '../../components/Projetos/Projetos'
import Footer from '../../components/Footer/Footer'
import projectSearch from '../../assets/img/project-search.jpg'
import './Projetos.scss'

class Projetos extends Component {
  render () {
    return (
      <div className='projetos-page'>
        <img className='projetos-page__img' src={projectSearch} alt='' />
        <CompProjetos history={this.props.history} />
        <Footer />
      </div>
    )
  }
}

export default withRouter(Projetos)
