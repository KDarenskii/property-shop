import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/products";
import formatNumber from "../../utils/formatNumber";
import ImageWithLoader from "../ImageWithLoader";
import ProductParams from "../ProductParams";
import ProductParamsItem from "../ProductParams/ProductParamsItem";
import ProductsFavButton from "../Products/ProductsFavButton";

import "./styles.scss";

type ProductCardProps = IProduct;

const ProductCard: React.FC<ProductCardProps> = (product) => {
    const { complex_name, image, price_total, square, rooms, floor, floors_total, scu } = product;

    return (
        <article className="card">
            <Link to={`/property-shop/product/${product.id}`} className="card__body">
                <div className="card__header">
                    <h5 className="card__title">ЖК {complex_name}</h5>
                    <ProductsFavButton product={product} visualType="icon" />
                </div>
                <ImageWithLoader
                    src={`/property-shop/img/products/${image}`}
                    imageClassName="card__img"
                    imageWrapperClassname="card__img-wrapper"
                    alt="План квартиры"
                />
                <div className="card__desc">
                    <div className="card__price">
                        <div className="card__price-total">{formatNumber(Number(price_total))} ₽</div>
                        <div className="card__price-per-meter">{formatNumber(Number(square))} ₽/м2</div>
                    </div>
                    <ProductParams className="card__params">
                        <ProductParamsItem definition="Комнат" value={rooms} />
                        <ProductParamsItem definition="Площадь" value={square} />
                    </ProductParams>
                </div>
                <div className="card__footer">
                    <div className="card__art">{scu}</div>
                    <div className="card__floor">
                        Этаж {floor} из {floors_total}
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default ProductCard;