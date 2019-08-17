import React, { Component } from 'react'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import howWorksPhone from '../../assets/img/how-works-cell.png'
import company from '../../assets/icons/company.png'
import phoneWithLogo from '../../assets/icons/cell-with-logo.png'
import womenPainter from '../../assets/icons/women-painter.jpg'
import penAndPaper from '../../assets/icons/pen-and-paper.jpg'
import doubts from '../../assets/img/doubts.jpg'
import './ComoFunciona.scss'

class ComoFunciona extends Component {
  render () {
    const { screenSize } = this.props
    return (
      <div className='how-works'>
        <div className='how-works__wrapper'>
          <div className='your-project'>
            <div className='your-project__wrapper'>
              <div className='your-project__content'>
                <div className='your-project__texts'>
                  <h1 className='your-project__title title has-text-danger'>Seu projeto fora do papel!</h1>
                  <p className='your-project__text has-text-grey-darker'>Conheça o Abebé Conecta, uma plataforma para apoiar iniciativas culturais, de diversidade e impacto social</p>
                </div>
                <img className='your-project__wireframe' src={howWorksPhone} alt='Quadro de uma tela de iPhone com primeira foto da Home' />
              </div>
              <AnchorLink offset='50' className='your-project__arrow--link' href='#signup'>
                <i className='your-project__arrow fas fa-2x fa-chevron-down' />
              </AnchorLink>
            </div>
          </div>
          <div id='signup' className='signup'>
            <div className='signup__wrapper'>
              <h2 className='signup__title title'>como funciona_</h2>
              <div className='signup__content'>
                <div className='signup__img-wrapper'>
                  <img className='signup__img' src={womenPainter} alt='Um emoji de uma mulher negra artista plástica' />
                  {screenSize > 768 && <span><i className='signup__arrow fas fa-2x fa-chevron-right' /></span>}
                  {screenSize < 768 && <span><i className='signup__arrow fas fa-2x fa-chevron-down' /></span>}
                  <img className='signup__img' src={phoneWithLogo} alt='Um celular com a logo da Conecta logo abaixo' />
                  {screenSize > 768 && <span><i className='signup__arrow fas fa-2x fa-chevron-right' /></span>}
                  {screenSize < 768 && <span><i className='signup__arrow fas fa-2x fa-chevron-down' /></span>}
                  <img className='signup__img' src={company} alt='Um emoji do que aparenta ser um prédio de uma empresa' />
                </div>
                <div className='signup__text'>Você cadastra seu projeto e nós encontramos uma empresa para apoiar sua ideia!</div>
              </div>
            </div>
          </div>
          <div className='steps'>
            <div className='steps__wrapper'>
              <h3 className='steps__title title'>passo-a-passo_</h3>
              <ol className='steps__list'>
                <li className='steps__list-item'>
                  <img className='steps__img' src={penAndPaper} alt='Um emoji de um caderno e uma caneta' />
                  <p className='steps__text'>
                    <span className='steps__text-num'>1. </span>Faça seu cadastro na aba{' '}
                    <Link to='/login' className='steps__text-link has-text-grey-darker'>
                                            Login
                    </Link>
                  </p>
                </li>
                <li className='steps__list-item'>
                  <img className='steps__img' src={womenPainter} alt='Um emoji de uma mulher negra artista plástica' />
                  <p className='steps__text'>
                    <span className='steps__text-num'>2. </span>
                    <Link to='/enviar-projeto' className='steps__text-link has-text-grey-darker'>
                                                Envie
                    </Link>
                    {' '}as informações do seu projeto
                  </p>
                </li>
                <li className='steps__list-item'>
                  <img className='steps__img' src={company} alt='Um emoji do que aparenta ser um prédio de uma empresa' />
                  <p className='steps__text'>
                    <span className='steps__text-num'>3. </span>Pronto! Assim que rolar o match com a empresa que irá apoiar seu projeto nós entraremos em contato
                  </p>
                </li>
              </ol>
            </div>
          </div>
          <div className='doubts'>
            <div className='doubts__wrapper'>
              <h4 className='doubts__title title'>dúvidas_</h4>
              <p className='doubts__text'>Confira nosso {' '}
                <Link className='has-text-grey-darker' to='/faq'>
                  <span className='doubts__inline-link'>'Perguntas Frenquentes'(FAQ)</span>
                </Link>
                {' '} ou escreve pra gente em <a className='doubts__inline-link has-text-grey-darker' href='mailto:conecta@coletivoabebe.com'>conecta@coletivoabebe.com</a>
              </p>
              <img className='doubts__img' src={doubts} alt='Quatro pessoas segurando pontos de interrogação' />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  screenSize: state.screen
})

export default connect(mapStateToProps)(ComoFunciona)
