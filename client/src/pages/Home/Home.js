import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Projetos from '../../components/Projetos/Projetos';
import Footer from '../../components/Footer/Footer';
import penAndPaperImg from '../../assets/icons/pen-and-paper.jpg';
import womenPainterImg from '../../assets/icons/women-painter.jpg';
import modalHeader from '../../assets/img/header.jpg';
import modalHeaderMobile from '../../assets/img/headerSmall.jpg';
import './Home.scss';

class Home extends Component { 

    render() {
        const penAndPaper = {
            img: penAndPaperImg,
            text: 'Quer tirar seu projeto do papel e ainda receber uma grana por isso?',
            id: 1,
            context: 'papel e caneta'
        }
        const womenPainter = {
            img: womenPainterImg,
            text: 'Conheça o Abebé Conecta, uma plataforma para apoiar iniciativas culturais, de diversidade e Impacto social',
            id: 2,
            context: 'uma mulher pintora'
        }
        const saibaMaisContent = [penAndPaper, womenPainter];

        const { screenSize } = this.props;

        return (
            <div className="home">
                <img className="home__img-header" src={screenSize > 992 ? modalHeader : modalHeaderMobile} alt="Foto de quatro mulheres negras" />
                <Projetos history={this.props.history} />
                <div className="home__saiba-mais">
                    <div className="saiba-mais__wrapper">
                        {saibaMaisContent.map(content => {
                            return (
                                <div key={content.id} className="saiba-mais__content">
                                    <img 
                                        className={`saiba-mais__img saiba-mais__${content.id === 1 ? 'first' : 'second'}`} 
                                        src={content.img} 
                                        alt={`Emoji de ${content.context}`} 
                                    />
                                    <div 
                                        className={`saiba-mais__text saiba-mais__${content.id === 1 ? 'second' : 'first'} ${screenSize < 992 ? 'is-4' : ''} title`}
                                    >
                                        {content.text}
                                    </div>
                                </div>
                            )
                        })}
                        <div className="saiba-mais__btn-wrapper">
                            <Link className="saiba-mais__btn button is-danger is-rounded" to="/como-funciona">
                                Saiba Mais
                            </Link>
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

export default connect(mapStateToProps)(Home);