import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Helper from '../helper/Helper';
import axios from 'axios';
import Loader from '../components/Loader';

const HomePage = () => {
    let [products,setProduct]=useState(['']);
    useEffect(()=>{
        (async()=>{
           await callProduct()
        })()
    },[]);

    let callProduct=async()=>{
         try{
            let res=await axios.get('/api/products');
            console.log(res)
            setProduct(res.data['data'])
        }catch(error){
            return error.response.status
        }
    }
    return (
        <>
            <Nav variant="pills" activeKey="1" className="p-3">
                <Nav.Item>
                    <Nav.Link eventKey="1" href="#/home">
                        <img src={Helper.companyLogo} alt=""/>
                        {Helper.companyName}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="2" title="Item">
                        Home
                    </Nav.Link>
                </Nav.Item>
            </Nav>

             <Container className="py-5">
                <Row xs={3} md={3} className="g-4">
                    {
                        (()=>{
                            if(products==='' || products===null){
                                return(<Loader/>)
                            }else{
                               return( products.map((product,k)=>{
                                return(
                                    <Col key={k.toString()} md={4}>
                                        <Card>
                                            <Card.Img variant="top" src={product['product_image']} style={{ height:"500px",width:"100%" }}/>
                                                <Card.Body>
                                                    <p className='text-center'>Brand: <strong style={{ color:"brown" }}>{product['brandName']?(product['brandName']):("")}</strong></p>
                                                    <Card.Title className='fw-bold'>{product['product_name']}</Card.Title>
                                                    {
                                                        product['discount']?(<h6 className='my-2'>Price:Tk.{product['total']} <del style={{ color:"red",textDecorationLine: "line-through" }}>Tk.{product['product_price']}</del></h6>):(<h6 className="my-2">Tk.{product['product_price']}</h6>)
                                                    }
                                                    
                                                    <Card.Text>
                                                        {product['product_detail']}
                                                    </Card.Text>
                                                    
                                                </Card.Body>
                                                <button type="button" className="btn btn-outline-primary btn-sm">Add To Cart</button>
                                        </Card>
                                    </Col>
                                )
                            }))
                            }
                        })()
                    }
                </Row>
            </Container>
           
        </>
    );
};

export default HomePage;