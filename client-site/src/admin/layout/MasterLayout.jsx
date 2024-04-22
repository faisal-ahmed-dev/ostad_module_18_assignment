import React from 'react';
import NavLayout from '/src/admin/layout/NavLayout.jsx';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';
import Helper from '../../helper/Helper';
const MasterLayout = (props) => {
    return (
        <div>
            <div className="container">
                <NavLayout/>
                <section className="main">
                    <div className="main-top">
                        <p>Explore the {Helper.companyName}!</p>
                    </div>
                    <div className="main-body">
                        {props.children}
                    </div>
                </section>
            </div>
            <Toaster/>
        </div>
    );
};
MasterLayout.propTypes = {
    children: PropTypes.node // PropType for children elements
};
export default MasterLayout;