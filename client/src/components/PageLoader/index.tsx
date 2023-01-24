import React from "react";

import './styles.scss';

const PageLoader: React.FC = () => {
    return (
        <div className="page-loader">
            <div className="container">
                <div className="page-loader__body">
                    <div className="page-loader__cube-wrapper">
                        <div className="page-loader__cube"></div>
                        <div className="page-loader__cube"></div>
                        <div className="page-loader__cube"></div>
                        <div className="page-loader__cube"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageLoader;
