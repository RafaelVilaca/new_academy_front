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
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
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
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
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
                        <h3>Fourth slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Form>
    )
}
