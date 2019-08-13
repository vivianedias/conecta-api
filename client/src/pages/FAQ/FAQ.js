import React, { Component } from 'react';
import Footer from '../../components/Footer/Footer';
import BoxExpand from '../../components/BoxExpand/BoxExpand';
import './FAQ.scss';

class FAQ extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHidden: {
                1: true, 2: true, 3: true, 4: true, 5: true, 
                6: true, 7: true, 8: true, 9: true, 10: true, 11: true
            }
        }
    }

    handleClick = (id) => {
        const { isHidden } = this.state;
        this.setState(prevState => ({
            isHidden: { ...prevState.isHidden, [id]: !isHidden[id] }
        }));
    }

    render() {
        const { isHidden } = this.state;

        return (
            <div className="faq">
                <div className="faq__wrapper">
                    <h1 className="faq__title title is-2 has-text-danger">Tem alguma dúvida?</h1>
                    <h2 className="faq__subject title">conecta_</h2>
                        <div className="faq__box-wrapper">
                            <BoxExpand 
                                title="O que é o conecta"
                                content="O Conecta foi criado com o objetivo de dar visibilidade para projetos socio-culturais e de impacto criados na periferia."
                                isHidden={isHidden[1]}
                                id={1}
                                onClick={() => this.handleClick(1)}
                            />
                            <BoxExpand 
                                title="Como funciona?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[2]}
                                id={2}
                                onClick={() => this.handleClick(2)}
                            />
                        </div>
                    <h3 className="faq__subject title">enviar projetos_</h3>
                        <div className="faq__box-wrapper">
                            <BoxExpand 
                                title="Quais projetos podem estar na plataforma?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[3]}
                                id={3}
                                onClick={() => this.handleClick(3)}
                            />
                            <BoxExpand 
                                title="Meu projeto vai receber algum investimento?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[4]}
                                id={4}
                                onClick={() => this.handleClick(4)}
                            />
                            <BoxExpand 
                                title="Posso enviar mais de um projeto?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[5]}
                                id={5}
                                onClick={() => this.handleClick(5)}
                            />
                            <BoxExpand 
                                title="Quanto tempo posso deixar meu projeto?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[6]}
                                id={6}
                                onClick={() => this.handleClick(6)}
                            />
                            <BoxExpand 
                                title="Meu projeto vai receber um investimento e agora?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[7]}
                                id={7}
                                onClick={() => this.handleClick(7)}
                            />
                        </div>
                    <h4 className="faq__subject title">empresas_</h4>
                        <div className="faq__box-wrapper">
                            <BoxExpand 
                                title="Como apoiar os projetos do Conecta?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[8]}
                                id={8}
                                onClick={() => this.handleClick(8)}
                            />
                            <BoxExpand 
                                title="Que tipo de empresa pode contribuir?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[9]}
                                id={9}
                                onClick={() => this.handleClick(9)}
                            />
                            <BoxExpand 
                                title="Quais benefícios para as empresas apoiadoras?"
                                content="Para as empresas é possível obter, através da lei de incetivo à cultura, abatimento fiscal do valor total investido nos projetos."
                                isHidden={isHidden[10]}
                                id={10}
                                onClick={() => this.handleClick(10)}
                            />
                            <BoxExpand 
                                title="É possível escolher quais projetos apoiar?"
                                content="Ainda sem conteúdo"
                                isHidden={isHidden[11]}
                                id={11}
                                onClick={() => this.handleClick(11)}
                            />
                        </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default FAQ;