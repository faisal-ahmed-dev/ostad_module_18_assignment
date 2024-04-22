import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate,useParams,Link } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import PropTypes from 'prop-types';
import { FaAngleLeft } from "react-icons/fa6";
import ButtonSpinner from '../../components/ButtonSpinner';

const ProductUpdate = () => {
    let navigate=useNavigate();
    const {id}=useParams();
    const [editData,setEditData]=useState(null);
    let [submit,setSubmit]=useState(false);
    useEffect(()=>{
        (async()=>{
           await callEditData(id);
           await callBrands();
        })()
    },[]);

    const callEditData=async(id)=>{
        try{
            let res =await axios.get(`/api/single-product/${id}`);
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
            let product_name=formData.get('product_name');
            //alert(product_name)
            let brand_id=formData.get('brand_id');
            let product_price=formData.get("product_price");
            let product_detail=formData.get("product_detail");
            //alert(product_detail)
            let discount_type=formData.get("discount_type");
            let discount=formData.get("discount");
            let product_image=formData.get("product_image");
            setSubmit(true)
            await axios.post(`/api/update-product/${id}`,{
                product_name:product_name,
                brand_id:brand_id,
                product_detail:product_detail,
                product_price:product_price,
                discount_type:discount_type,
                discount:discount,
                product_image:product_image
            });
            setSubmit(false)
            navigate("/product-lists");
            window.location.reload();
         }catch(error){
            return error.response.status
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

     const [discountType,setDiscountType]=useState(['']);

    const discountChange=(e)=>{
        let value=e.target.value;
        if(value==='percentage'){
            setDiscountType(value)
        }else if(value==='flat'){
            setDiscountType(value);
        }else{
            setDiscountType("");
        }
        
    }
    return (
        <div>
            <MasterLayout>
            <div className="card">
                    <div className="card-header">
                        <div className="pull-left">
                            <h6 className="card-title mt-1">Product Update page</h6>
                        </div>
                        <div className="pull-right">
                            <Link className="btn btn-outline-info" to={`/product-lists`}><FaAngleLeft /> Back</Link>
                        </div>
                    </div>
                    
                    <div className="card-body">
                        <form onSubmit={UpdateData}>
                            <div className="row">
                                <div className="col-md-6 my-3">
                                    <label>Product Name</label>
                                    <input defaultValue={editData!==null?(editData['product_name']):("")} className="form-control form-control-sm" name="product_name" type="text" placeholder="product Name"/>
                                </div>
                                <div className="col-md-6 my-3">
                                    <label>Product Price</label>
                                    <input defaultValue={editData!==null?(editData['product_price']):("")} className="form-control form-control-sm" name="product_price" type="text" placeholder="product Name"/>
                                </div>
                                

                                <div className="col-md-6 my-3">
                                    <label>Product Discount Type</label>
                                    <select className="form-control form-control-sm" name="discount_type" onChange={discountChange}>
                                        <option>Select Discount Type</option>
                                        <option value="percentage" selected={
                                            (()=>{
                                                if(editData !==null && editData['discount_type']==='percentage'){
                                                     return("selected")
                                                }else{
                                                    return("")
                                                }
                                            })()
                                        }>Percentage</option>
                                        <option value="flat" selected={
                                            (()=>{
                                                if(editData !==null && editData['discount_type']==='flat'){
                                                     return("selected")
                                                }else{
                                                    return("")
                                                }
                                            })()
                                        }>Flat</option>
                                    </select>
                                </div>
                               
                                <div className="col-md-6 my-3">
                                    <label>Discount {discountType ==''?(editData !==null && editData['discount_type']):(discountType)} </label>
                                    <input defaultValue={editData!==null?(editData['discount']):("")} className="form-control form-control-sm" name="discount" type="text" placeholder="product discount"/>
                                </div>
                                <div className="col-md-6 my-3">
                                    <label>Product Brands</label>
                                    <select className="form-control form-control-sm" name="brand_id">
                                        <option>Select Brands</option>
                                        {
                                            brands.length>0 && brands.map((brand,i)=>{
                                                return(<option key={i.toString()} value={brand['brand_id']} selected={editData!==null?(editData['brand_id']===brand['brand_id']):("")}>{brand['name']}</option>
                                                )
                                            })
                                        }
                                       
                                    </select>
                                </div>
                                <div className="col-md-6 my-3">
                                    <label>Product Image</label>
                                    <input defaultValue={editData!==null?(editData['product_image']):("")} className="form-control form-control-sm" name="product_image" type="text" placeholder="product image"/>
                                </div>
                                <div className="col-md-6 my-3 my-3">
                                    <label>Product Detail</label>
                                    <textarea rows={5} cols={30} defaultValue={editData!==null?(editData['product_detail']):("")} className="form-control form-control-sm" name="product_detail" type="text" placeholder="product Name"></textarea>
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
        </div>
    );
};

export default ProductUpdate;