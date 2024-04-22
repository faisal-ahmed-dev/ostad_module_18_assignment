import React, { useEffect, useState } from 'react';
import MasterLayout from '../layout/MasterLayout.jsx';
import Loader from '../../components/Loader.jsx';
import { FaPenToSquare ,FaCheck,FaPrescriptionBottle,FaXmark} from "react-icons/fa6";
import Table from 'react-bootstrap/Table';
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
import { Link } from 'react-router-dom';

const Brand = (props) => {
    let [brands,setBrand]=useState(['']);
    let [submit,setSubmit]=useState(false);
    useEffect(()=>{
        (async()=>{
         await callBrands()
        })()
    },[]);

    //====read Value=====
    const callBrands=async()=>{
        try{
            let res=await axios.get('/api/all-brands');
            setBrand(res.data['data']);

        }catch(error){
            return error.response.status;
        }
    }

    let count=1;

//====update status active or inactive===//
    const changeStatus=async(id)=>{
        // alert(id)
         try{
             setSubmit(true)
             let res=await axios.get(`/api/check-brand/${id}`);
             setSubmit(false)
             if(res.data['status']==='success'){
                Helper.SuccessToast(res.data['status']);
                await callBrands();
             }else{
                 Helper.ErrorToast("Error")
                 setSubmit(false)
             }
             
         }catch(error){
 
             return error.response.status;
         }
     }

    //  ====Delete Brands====//
     const deleteBrand=async(id)=>{
         try{
 
             setSubmit(true)
             let res=await axios.delete(`/api/delete-brand/${id}`);
             setSubmit(false)
             if(res.data['status']==='success'){
                Helper.SuccessToast(res.data['status']);
                await callBrands();
             }else{
                 Helper.ErrorToast("Error")
                 setSubmit(false)
             }
 
         }catch(error){
 
             return error.response.status;
         }
     }

     //===submit brands===//
     const submitForm=async(e)=>{
          e.preventDefault();
          try{
            let formData=new FormData(e.target);
            let name=formData.get('name');
            let image=formData.get('image');
            if(Helper.isEmptyValue(name)){
                Helper.ErrorToast("Brand Name field require");
            }else{
                setSubmit(true)
                //====to send image file
                // let res =await axios.post('api/create-brand',formData,{
                //     headers:{
                //         'Content-Type': 'multipart/form-data'  
                //     }
                // });
                let res =await axios.post('/api/create-brand',{
                    name:name,
                    image:image
                });
                setSubmit(false)
                window.location.reload();
                console.log('Response:', res.data);
            }
            
          }catch(error){
            return error.response.status
          }
     }

     // ====for Modal parts==
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <MasterLayout>
             <div className="card-header">
				<div className="pull-left">
					<h6 className="card-title mt-1">{props.title}</h6>
				</div>
				<div className="pull-right">
                    <Button className="btn btn-info" onClick={handleShow}>
                        Create Brands
                    </Button>
                </div>
			</div>

            {
                brands.length>0?(
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Brand Image</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                brands.map((brand,i)=>{
                                    return(
                                        <tr key={i.toString()}>
                                            <td>{count++}</td>
                                            <td>{brand['name']}</td>
                                            <td>
                                                <img style={{ 'width':"100px" }} src={brand['image']} alt={brand['name']}/>
                                            </td>
                                            <td>
                                                {
                                                    brand['status']==='active'?(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(brand['_id'])}} className='btn btn-info btn-sm'><FaCheck />
                                                        {
                                                            submit?(<ButtonSpinner/>):("Active")
                                                        }
                                                        </button>
                                                    ):(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(brand['_id'])}} className='btn btn-danger btn-sm'><FaXmark />InActive</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <Link className="btn btn-info" to={`/brand-update/${brand['_id']}`}><FaPenToSquare /></Link>
                                                <button onClick={async()=>{await deleteBrand(brand['_id'])}} className='btn btn-danger'>
                                                    {
                                                        submit?(<ButtonSpinner/>):(<FaPrescriptionBottle />)
                                                    }
                                                </button>
                                                
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
                    <Modal.Title>Brand Submit Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form noValidate onSubmit={submitForm}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Write Brand Name"
                                    name="name"
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Brand Image</Form.Label>
                                <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">**</InputGroup.Text>
                                    <Form.Control
                                        type="text"
                                        placeholder="Write image path url"
                                        name="image"
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
Brand.propTypes = {
    title: PropTypes.node // PropType for children elements
};
export default Brand;