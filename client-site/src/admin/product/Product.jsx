import React,{useEffect, useState} from 'react';
import MasterLayout from '../layout/MasterLayout';
import Table from 'react-bootstrap/Table';
import Loader from './../../components/Loader.jsx';
import { FaPenToSquare ,FaCheck,FaPrescriptionBottle,FaXmark} from "react-icons/fa6";
import axios from "axios"
import Helper from '../../helper/Helper.jsx';
import ButtonSpinner from '../../components/ButtonSpinner.jsx';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Product = () => {
    const [getProducts,setProducts]=useState([]);
    let [submit,setSubmit]=useState(false);
    let count=1;

    useEffect(()=>{
        (async()=>{
          await callProduct();
          await callBrands()
        })()
    },[])

    // ====Get Product=====//
    const callProduct=async()=>{
        try{
            let res=await axios.get('/api/all-products');
            setProducts(res.data['data']);
        }catch(error){
            return error.response.status  
        }

    }

    //=====status change====//
    const changeStatus=async(id)=>{
        try{
           let res=await axios.get(`/api/check-product/${id}`);
           if(res.data['status']==='success'){
               Helper.SuccessToast(res.data['message'])
               await callProduct();
           }else{
               Helper.ErrorToast("Status not changed")
               await callProduct();
           }
        }catch(error){
            return error.response.status
        }
    }

      // ====for Modal parts==
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

      //====Delete Products====//
      const deleteProduct=async(id)=>{
        try{
            let res=await axios.delete(`/api/delete-product/${id}`);
                Helper.SuccessToast(res.data['message']);
                await callProduct();
        }catch(error){
                return error.response.status
        }
       }
    //===product Submit===//
   
    const submitForm=async(e)=>{
         e.preventDefault();
         try{
            let formData=new FormData(e.target);
            let product_name=formData.get('product_name');
            let brand_id=formData.get('brand_id');
            let product_price=formData.get("product_price");
            let product_detail=formData.get("product_detail");
            let discount_type=formData.get("discount_type");
            let discount=formData.get("discount");
            let product_image=formData.get("product_image");
            //alert(product_image)
            if(Helper.isEmptyValue(product_name)){
                Helper.ErrorToast("Product Name Required")
            }else if(Helper.isEmptyValue(product_price)){
                Helper.ErrorToast("Product price Required")
            }else if(Helper.isEmptyValue(product_image)){
                Helper.ErrorToast("Product price Required")
            }else{
                setSubmit(true)
                let res=await axios.post('/api/create-product',{
                    product_name:product_name,
                    brand_id:brand_id,
                    product_detail:product_detail,
                    product_price:product_price,
                    discount_type:discount_type,
                    discount:discount,
                    product_image:product_image
                });
                setSubmit(false);
                Helper.SuccessToast("Product Inserted");
                window.location.reload();
                console.log(res)
            }
            

         }catch(error){
            if (error.response) {
                const errorResponse = error.response.data;
                Helper.ErrorToast(errorResponse.error)
            } else {
                // If there's a network error or other issues
                console.error('Error:', error.message);
            }
         }
    }

    //====get brands Api====//
    let [brands,setBrand]=useState(['']);
    const callBrands=async()=>{
        try{
            let res=await axios.get('/api/all-brands');
            setBrand(res.data['data']);

        }catch(error){
            return error.response.status;
        }
    }

    const [discountType,setDiscountType]=useState([''])

    const discountChange=(e)=>{
        let value=e.target.value;
        if(value==='percentage'){
            setDiscountType(value)
        }else if(value==='flat'){
            setDiscountType(value)
        }else{
            setDiscountType("")
        }
        
    }

    return (
        <MasterLayout>
            <div className="card-header">
				<div className="pull-left">
					<h6 className="card-title mt-1">Product Lists</h6>
				</div>
				<div className="pull-right">
                    <Button className="btn btn-info" onClick={handleShow}>
                        Create Product
                    </Button>
                </div>
			</div>

            {
                getProducts.length>0?(
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Brand Name</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>D-Total</th>
                                <th>Picture</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getProducts.map((product,i)=>{
                                    return(
                                        <tr key={i.toString()}>
                                            <td>{count++}</td>
                                            <td>{product['product_name']}</td>
                                            <td>{product['brandName']}</td>
                                            <td>{`Tk.${product['product_price']}`}</td>
                                            <td>
                                                {
                                                    
                                                   (()=>{
                                                    if(product['discount']){
                                                        if(product['discount_type']==='percentage'){
                                                            return(`${product['discount']}%`)
                                                        }else{
                                                            return(`Tk.${product['discount']}`)
                                                        }
                                                    }else{
                                                     return("No Discount")
                                                    }

                                                   })()
                                                }
                                            </td>
                                            <td>
                                                {
                                                   product['discount'] && `Tk.${product['total']}`
                                                }
                                            </td>
                                            <td>
                                                <img width={30} src={product['product_image']} alt={product['product_name']}/>
                                            </td>
                                            
                                            <td>
                                                {
                                                    product['status']==='active'?(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(product['_id'])}} className='btn btn-info btn-sm'><FaCheck />
                                                        {
                                                            submit?(<ButtonSpinner/>):("Active")
                                                        }
                                                        </button>
                                                    ):(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(product['_id'])}} className='btn btn-danger btn-sm'><FaXmark />InActive</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                            <Link className="btn btn-info" to={`/update-product/${product['_id']}`}><FaPenToSquare /></Link>
                                                <button onClick={async()=>{await deleteProduct(product['_id'])}} className='btn btn-danger'>{
                                                            submit?(<ButtonSpinner/>):(<FaPrescriptionBottle />)
                                                        }</button>
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                   
                ):(<Loader/>)
            }

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form noValidate encType="multipart/form-data" onSubmit={submitForm}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Write Full Name"
                                name="product_name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Product Price</Form.Label>
                            <InputGroup hasValidation>
                            
                            <Form.Control
                                required
                                type="number"
                                placeholder="Write product price"
                                aria-describedby="inputGroupPrepend"
                                name="product_price"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomproductname">
                            <Form.Label>Product Details</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                <Form.Control
                                as="textarea"
                                name='product_detail'
                                placeholder="Product details"
                                style={{ height: '100px' }}
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomproductname">
                            <Form.Label>Brand Name</Form.Label>
                            <Form.Select aria-label="Default select example" name="brand_id">
                                <option>Select Brand</option>
                                {
                                    brands.length>0 && brands.map((brand,i)=>{
                                        return(<option key={i.toString()} value={brand['brand_id']}>{brand['name']}</option>
                                        )
                                    })
                                }
                                
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomproductname">
                            <Form.Label>Discount Type</Form.Label>
                            <Form.Select aria-label="Default select example" name="discount_type" onChange={discountChange}>
                                <option>Select Discount Type</option>
                                <option value="percentage">Percentage</option>
                                <option value="flat">Flat</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomproductname">
                            <Form.Label>Discount ({discountType})</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                   
                                    type={(()=>{
                                        if(discountType !=''){
                                            
                                            if(discountType==='percentage'){
                                                return("text")
                                            }else{
                                                return("number")
                                            }
                                        }else{
                                            return("hidden")
                                        }
                                    })()}
                                    placeholder="write discount"
                                   
                                    name="discount"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustomproductname">
                            <Form.Label>Product Image Url</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="text"
                                    placeholder="Product details"
                                    name="product_image"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    
                    <Button type="submit" disabled={submit}>
                        {
                            submit?(<ButtonSpinner/>):("Submit")
                        }
                    </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
            
        </MasterLayout>
    );
};

export default Product;