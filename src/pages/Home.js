import React from 'react'
import './styles.css'
import imagem1 from '../components/files/imagem1.jpeg'
import imagem2 from '../components/files/imagem2.jpg'
import imagem3 from '../components/files/imagem3.webp'
import imagem4 from '../components/files/imagem4.webp'
import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';

export default function Home(){
    return (
        <Form>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagem1}
                        alt="First slide"
                        width="500"
                        height="400"
                    />
                    <Carousel.Caption>
                        <h1>Tonificação dos Músculos</h1>
                        <p>
                            A tonificação muscular consiste em deixar os músculos do corpo mais fortes, 
                            rígidos e livres da flacidez causada pelo acúmulo de gordura. 
                            Sendo assim, além melhorar a resistência muscular, o fortalecimento dos músculos 
                            auxilia na manutenção dos ossos.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagem2}
                        alt="Second slide"
                        width="500"
                        height="400"
                    />

                    <Carousel.Caption>
                        <h1>Qualidade da vida Fitness</h1>
                        <p>
                            Ter uma vida fit tem a ver com o cuidado do corpo pela prática de exercícios físicos 
                            e com o que uma pessoa fitness come, assim como abandonar maus hábitos, 
                            dormir uma boa quantidade de sono por dia e ingerir uma quantidade razoável de água 
                            diariamente, de acordo com seu peso.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagem3}
                        alt="Third slide"
                        width="500"
                        height="400"
                    />

                    <Carousel.Caption>
                        <h1>Atividade física e seus benefícios</h1>
                        <p>
                            Os principais efeitos são: Fortalece o sistema imunológico, Diminui a pressão arterial e 
                            melhora a circulação sanguínea, Controla a glicemia e complicações da diabetes, Evita a 
                            perda óssea, Emagrece e ajuda a controlar o peso, Melhora a insônia, Promove o bem-estar 
                            físico e mental, Melhora o humor.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={imagem4}
                        alt="Fourth slide"
                        width="500"
                        height="400"
                    />

                    <Carousel.Caption>
                        <h1>Limpeza e Manutenção periódica dos equipamentos</h1>
                        <p>
                            As sujeiras, os detritos e os materiais estranhos constituem causas de defeitos, 
                            desqualificações, operações em vazio, paradas desnecessárias e perda de material. 
                            Manter seu equipamento limpo garante, além de um processo enxuto, qualidade e durabilidade 
                            de suas peças e do próprio equipamento.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Form>
    )
}
