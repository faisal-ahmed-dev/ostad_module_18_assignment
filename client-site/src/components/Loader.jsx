import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
const Loader = () => {
    return (
        <div className="row d-flex justify-content-center">
            <Spinner animation="border" variant="success"/>
        </div>
    );
};

export default Loader;