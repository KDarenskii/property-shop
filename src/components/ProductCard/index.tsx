import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../models/products";
import formatNumber from "../../utils/formatNumber";
import FavouriteLike from "../FavouriteLike";

import "./styles.scss";

const ProductCard: React.FC<IProduct> = (product) => {

    const {
        complex_name,
        image,
        price_total,
        square,
        rooms,
        floor,
        floors_total,
        scu,
    } = product;

    return (
        <article className="card">
            <Link to={`/product/${product.id}`} className="card__body">
                <div className="card__header">
                    <h5 className="card__title">ЖК {complex_name}</h5>
                    <FavouriteLike {...product} />
                </div>
                <div className="card__img-wrapper">
                    <img
                        className="card__img"
                        src={`img/products/${image}`}
                        alt="План квартиры"
                    />
                </div>
                <div className="card__desc">
                    <div className="card__price">
                        <div className="card__price-total">
                            {formatNumber(Number(price_total))} ₽
                        </div>
                        <div className="card__price-per-meter">
                            {formatNumber(Number(square))} ₽/м2
                        </div>
                    </div>

                    <div className="card__params params">
                        <div className="params__item">
                            <div className="params__definition">Комнат</div>
                            <div className="params__value">{rooms}</div>
                        </div>
                        <div className="params__item">
                            <div className="params__definition">Площадь</div>
                            <div className="params__value">{square}</div>
                        </div>
                    </div>
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
