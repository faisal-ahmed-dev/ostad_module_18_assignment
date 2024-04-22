import React from 'react';
import MasterLayout from '../admin/layout/MasterLayout.jsx';

const NotFoundPage = () => {
    return (
        <MasterLayout>
            <div className="container-fluid text-center">
                <div className="row">
                    <div className='col'>
                          <h2>404 page</h2>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

export default NotFoundPage;