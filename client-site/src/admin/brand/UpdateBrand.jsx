import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams,Link } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import PropTypes from 'prop-types';
import { FaAngleLeft } from "react-icons/fa6";
import ButtonSpinner from '../../components/ButtonSpinner';
const UpdateBrand = () => {
    let navigate=useNavigate();
    const {id}=useParams();
    const [editData,setEditData]=useState(null);
    let [submit,setSubmit]=useState(false);
    useEffect(()=>{
        (async()=>{
           await callEditData(id);
        })()
    },[]);

    const callEditData=async(id)=>{
        try{
            let res =await axios.get(`/api/single-brand/${id}`);
            setEditData(res.data['data'][0])
        }catch(error){
            return error.response.status
        }
    }

    //===update brand===//

    const UpdateData=async(e)=>{
         e.preventDefault();
         try{
            let formData=new FormData(e.target);
            let name=formData.get("name");
            let image=formData.get("image");
            setSubmit(true)
            await axios.post(`/api/update-brand/${id}`,{
                name:name,
                image:image,
            });
            setSubmit(false)
            navigate("/brand-lists");
            window.location.reload();
         }catch(error){
            return error.response.status
         }

    }

    return (
            <MasterLayout>
                <div className="card">
                    <div className="card-header">
                        <div className="pull-left">
                            <h6 className="card-title mt-1">Bran Update page</h6>
                        </div>
                        <div className="pull-right">
                            <Link className="btn btn-outline-info" to={`/brand-lists`}><FaAngleLeft /> Back</Link>
                        </div>
                    </div>
                    
                    <div className="card-body">
                        <form onSubmit={UpdateData}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Brand Name</label>
                                    <input defaultValue={editData!==null?(editData['name']):("")} className="form-control form-control-sm" name="name" type="text" placeholder="brand product"/>
                                </div>
                                <div className="col-md-6">
                                    <label>Image Url</label>
                                    <input defaultValue={editData!==null?(editData['image']):("")} className="form-control form-control-sm" name="image" type="text" placeholder="image url"/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-sm mt-3 btn-success">
                            {
                                submit?(<ButtonSpinner/>):("Update")
                            }
                            </button>
                        </form>
                    </div>
                </div>
            </MasterLayout>
    );
};
UpdateBrand.propTypes = {
    title: PropTypes.node // PropType for children elements
};
export default UpdateBrand;