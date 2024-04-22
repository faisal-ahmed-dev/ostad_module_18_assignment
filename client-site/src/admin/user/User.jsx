import React, { useEffect, useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
const User = (props) => {
    const [getUsers,setUsers]=useState([]);
    let [submit,setSubmit]=useState(false);
    const [refresh,setRefresh]=useState([0]);
    let navigate=useNavigate();
    useEffect(()=>{
        (async()=>{
            await callUser();
        })()
    },[])
    const callUser=async()=>{
        try{
            
            let res=await axios.get('/api/user-all');
            setUsers(res.data['data'])
        }catch(err){
            return err.response.status;
        }
        
    }
    let count=1;
    const changeStatus=async(id)=>{
       // alert(id)
        try{
            setSubmit(true)
            let res=await axios.get(`/api/check-user/${id}`);
            setSubmit(false)
            if(res.data['status']==='success'){
               Helper.SuccessToast(res.data['status']);
               await callUser();
            }else{
                Helper.ErrorToast("Error")
                setSubmit(false)
            }
            
        }catch(error){

            return error.response.status;
        }
    }
    const deleteUser=async(id)=>{
        try{

            setSubmit(true)
            let res=await axios.delete(`/api/delete-user/${id}`);
            setSubmit(false)
            if(res.data['status']==='success'){
               Helper.SuccessToast(res.data['status']);
               await callUser();
            }else{
                Helper.ErrorToast("Error")
                setSubmit(false)
            }

        }catch(error){

            return error.response.status;
        }
    }
    // ====for Modal parts==
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // =====Form submit====//
    const submitForm=async(e)=>{
        e.preventDefault();
        
        let formData=new FormData(e.target);
        //console.log('Form Data:', formData);
        //let name=formData.get('name');
        let email=formData.get('email');
        let phone=formData.get('phone');
        let password=formData.get('password');
        //let role=formData.get('role');
        //let image=formData.get('image');
        //alert(image)
        if(Helper.isEmptyValue(email)){
            Helper.ErrorToast("email field require");
        }else if(Helper.isEmptyValue(password)){
            Helper.ErrorToast("password field require");
        }else if(Helper.isEmptyValue(phone)){
            Helper.ErrorToast("Phone field require");
        }else{
            setSubmit(true)
            const response = await axios.post("/api/user-create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set Content-Type header
                }
            });
             setSubmit(false);
             window.location.reload();
             console.log('Response:', response.data);

            // navigate("/user-lists");
             setRefresh(refresh+1)

        }
        

    }
    return (
        <MasterLayout>
            <div className="card-header">
				<div className="pull-left">
					<h6 className="card-title mt-1">{props.title}</h6>
				</div>
				<div className="pull-right">
                    <Button className="btn btn-info" onClick={handleShow}>
                        Create User
                    </Button>
                </div>
			</div>

            {
                getUsers.length>0?(
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Picture</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getUsers.map((user,i)=>{
                                    return(
                                        <tr key={i.toString()}>
                                            <td>{count++}</td>
                                            <td>{user['name']}</td>
                                            <td>{user['email']}</td>
                                            <td>{user['phone']}</td>
                                            <td>
                                                <img src="/src/uploads/Screenshot_17.png" alt=''/>
                                            </td>
                                            <td>{user['role']}</td>
                                            <td>
                                                {
                                                    user['status']==='active'?(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(user['_id'])}} className='btn btn-info btn-sm'><FaCheck />
                                                        {
                                                            submit?(<ButtonSpinner/>):("Active")
                                                        }
                                                        </button>
                                                    ):(
                                                        <button disabled={submit} onClick={async()=>{await changeStatus(user['_id'])}} className='btn btn-danger btn-sm'><FaXmark />InActive</button>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <button className='btn btn-info'><FaPenToSquare /> </button>
                                                <button onClick={async()=>{await deleteUser(user['_id'])}} className='btn btn-danger'>{
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
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Write Full Name"
                                name="name"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Email</Form.Label>
                            <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Write email"
                                aria-describedby="inputGroupPrepend"
                                name="email"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Phone Number</Form.Label>
                            <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                                <Form.Control
                                type="number"
                                placeholder="Write phone number"
                                name="phone"
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">&</InputGroup.Text>
                                <Form.Control
                                type="password"
                                placeholder="Write password"
                                name="password"
                                required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose a username.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Role</Form.Label>
                            <Form.Select aria-label="Default select example" name="role">
                                <option>Select Role</option>
                                <option value="admin">admin</option>
                                <option value="editor">Editor</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Profile Image</Form.Label>
                            <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">**</InputGroup.Text>
                                <Form.Control
                                    type="file"
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
User.propTypes = {
    title: PropTypes.node // PropType for children elements
};
export default User;