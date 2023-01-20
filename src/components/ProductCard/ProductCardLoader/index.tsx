import React from "react";
import ContentLoader from "react-content-loader";

import './styles.scss';

const ProductCardLoader: React.FC = () => (
    <ContentLoader
        speed={2}
        width={360}
        height={444}
        viewBox="0 0 360 444"
        backgroundColor="#e6dbdb"
        foregroundColor="#ecebeb"
        className="card-loader"
    >
        <rect x="30" y="31" rx="6" ry="6" width="155" height="21" />
        <circle cx="316" cy="43" r="18" />
        <rect x="30" y="81" rx="10" ry="10" width="310" height="220" />
        <rect x="30" y="318" rx="5" ry="5" width="142" height="24" />
        <rect x="30" y="350" rx="3" ry="3" width="142" height="14" />
        <rect x="234" y="313" rx="10" ry="10" width="46" height="51" />
        <rect x="295" y="311" rx="10" ry="10" width="46" height="51" />
        <rect x="30" y="377" rx="3" ry="3" width="310" height="1" />
        <rect x="30" y="390" rx="10" ry="10" width="52" height="21" />
        <rect x="251" y="389" rx="10" ry="10" width="87" height="21" />
    </ContentLoader>
);

export default ProductCardLoader;
