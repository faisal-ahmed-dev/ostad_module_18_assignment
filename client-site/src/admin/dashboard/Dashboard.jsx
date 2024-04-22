import React, { useEffect, useState } from 'react';
import MasterLayout from '../layout/MasterLayout.jsx';
import { FcPortraitMode,FcSoundRecordingCopyright,FcStumbleupon } from "react-icons/fc";
import axios from "axios"
import Loader from '../../components/Loader.jsx';
const Dashboard = () => {
    const [UserData,setUserData]=useState([]);
    const [brandData,setBrandData]=useState([]);
    useEffect(()=>{
        (async()=>{
            await countUser();
            await countBrand();
            
        })()
    },[]);
    const countUser=async()=>{
        try{
            let res=await axios.get('/api/user-all');
            setUserData(res.data['data'])
        }catch(err){
            return err.response.status
        }
    }

    const countBrand=async()=>{
        try{
            let brand=await axios.get('/api/all-brands');
            setBrandData(brand.data['data'])
        }catch(err){
            return err.response.status
        }
    }
    return (
        <MasterLayout>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><FcPortraitMode /> Total User ({UserData.length>0?(UserData.length):(0)})</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><FcStumbleupon /> Total Brands ({brandData.length>0?(brandData.length):(0)})</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"><FcSoundRecordingCopyright /> Total Product</h5>
                            </div>
                        </div>
                    </div>
                </div>
                
            
           
        </MasterLayout>
    );
};

export default Dashboard;