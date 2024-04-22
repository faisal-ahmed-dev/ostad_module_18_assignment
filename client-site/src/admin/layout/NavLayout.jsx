import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import Helper from '../../helper/Helper';
import { FcBarChart ,FcBusinessman,FcMindMap,FcSoundRecordingCopyright,FcUnlock,FcAddressBook } from "react-icons/fc";

const NavLayout = () => {
    return (
        
        <nav>
            <div className="navbar">
                <div className="logo">
                    <img src={Helper.companyLogo} alt="logo"/>
                    <h6>{Helper.companyName}</h6>
                </div>
                <ul>
                    <li>
                        <NavLink to="/dashboard" className="active nav-item"><FcBarChart className="icons"/> Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user-lists" className="active"><FcBusinessman className="icons"/> User Lists</NavLink>
                    </li>
                    <li>
                        <NavLink to="/brand-lists" className="active"><FcMindMap/> Brand List</NavLink>
                    </li>

                    <li>
                        <NavLink to="/product-lists" className="active"><FcSoundRecordingCopyright/> Product List</NavLink>
                    </li>
                    <li>
                        <NavLink target='_blank' to="http://localhost:5173/"  className="active"><FcAddressBook /> Website</NavLink>
                    </li>

                    <li>
                        <NavLink  className="active"><FcUnlock /> Logout</NavLink>
                    </li>
                
                </ul>
            </div>
        </nav>
    );
};

export default NavLayout;
