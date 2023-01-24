import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/products";
import formatNumber from "../../utils/formatNumber";
import ProductsLikeButton from "../Products/ProductsLikeButton";

import "./styles.scss";

const ProductPanel: React.FC<IProduct> = (product) => {

    const { id, complex_name, building, price_total, square, rooms, floor, price_sq_m, scu } = product;

    return (
        <Link to={`/product/${id}`} className="panel">
            <div className="panel__artikul">{scu}</div>
            <div className="panel__name">
                <div>ЖК {complex_name}</div>
            </div>
            <div className="panel__block">{building}</div>
            <div className="panel__floor">{floor}</div>
            <div className="panel__rooms">{rooms}</div>
            <div className="panel__sq">{formatNumber(Number(square))} м2</div>
            <div className="panel__price-per-m">
                {formatNumber(Number(price_sq_m))} ₽
            </div>
            <div className="panel__price">
                {formatNumber(Number(price_total))} ₽
            </div>
            <div className="panel__favourite">
            <ProductsLikeButton {...product} />
            </div>
        </Link>
    );
};

export default ProductPanel;
