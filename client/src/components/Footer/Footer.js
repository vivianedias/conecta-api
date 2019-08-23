import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logoAbebe from '../../assets/img/logo-abebe.png'
import logoVaiTec from '../../assets/img/logo-vaitec.png'
import './Footer.scss'

class Footer extends Component {
  render () {
    return (
      <div className='footer'>
        <div className='footer__wrapper'>
          <div className='footer__content'>
            <div className='footer__navigation'>
              <img className='navigation__img--abebe' src={logoAbebe} alt='Logo Abebé Conecta' />
              <ul className='navigation__list'>
                <Link className='navigation__list-link' to='/projetos'>
                  <li className='navigation__list-item has-text-black-ter'>projetos</li>
                </Link>
                <Link className='navigation__list-link' to='/cadastrar-projeto'>
                  <li className='navigation__list-item has-text-black-ter'>enviar</li>
                </Link>
                <Link className='navigation__list-link' to='/login'>
                  <li className='navigation__list-item has-text-black-ter'>login</li>
                </Link>
                <Link className='navigation__list-link' to='/como-funciona'>
                  <li className='navigation__list-item has-text-black-ter'>como funciona</li>
                </Link>
                <Link className='navigation__list-link' to='/faq'>
                  <li className='navigation__list-item has-text-black-ter'>perguntas frequentes</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className='footer__img-wrapper'>
            <img className='footer__img--vaitec' src={logoVaiTec} alt='Logo do projeto Negócio Acelerado da Prefeitura de São Paulo' />
          </div>
        </div>
        <div className='navigation__stamp-wrapper'>
          <p className='navigation__stamp has-text-black-ter'>2019 - Produzido por Abebé Negócios de Impacto</p>
        </div>
      </div>
    )
  }
}

export default Footer
