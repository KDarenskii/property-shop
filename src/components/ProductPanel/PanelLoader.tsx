import React from "react";
import ContentLoader from "react-content-loader";

const PanelLoader: React.FC = () => (
    <div style={{marginBottom: 10}}>
        <ContentLoader
            speed={2}
            width={1170}
            height={73}
            viewBox="0 0 1170 73"
            backgroundColor="#e6dbdb"
            foregroundColor="#ecebeb"
        >
            <rect x="0" y="0" rx="8" ry="8" width="1170" height="73" />
        </ContentLoader>
    </div>
);

export default PanelLoader;
