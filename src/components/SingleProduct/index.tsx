import React from "react";
import Booking from "../Booking";
import Viewing from "../Viewing";
import { useParams, useNavigate } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";
import PageLoader from "../PageLoader";
import { IProduct } from "../../models/products";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProductById } from "../../store/products/thunks/fetchProductById";
import FavoriteButton from "../FavouriteButton";
import Alert from "../Alert";
import { ALERT_TYPES } from "../../constants/alertTypes";

import "./styles.scss";

const SingleProduct: React.FC = () => {
    const navigate = useNavigate();
    const { id = "" } = useParams();

    const [isBooking, setIsBooking] = React.useState<boolean>(false);
    const [isViewing, setIsViewing] = React.useState<boolean>(false);

    const [product, setProduct] = React.useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setIsLoading(true);
        setError(null);

        dispatch(fetchProductById(id))
            .unwrap()
            .then((data) => {
                setProduct(data);
                setError(null);
            })
            .catch((error) => {
                setProduct(null);
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }, [dispatch, id]);

    if (isLoading) return <PageLoader />;

    return (
        <section className="single-product">
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {!error && (
                <div className="single-product__body">
                    <div className="single-product__content">
                        {isBooking && <Booking />}
                        {isViewing && <Viewing />}
                        {!isBooking && !isViewing && (
                            <div className="single-product__photo-wrapper">
                                <img
                                    className="single-product__img"
                                    src={`/img/products/${product?.image}`}
                                    alt="Product"
                                />
                            </div>
                        )}
                    </div>

                    <div className="single-product__desc">
                        <div className="single-product__desc-sector">
                            ЖК {product?.complex_name}
                        </div>

                        <div className="single-product__desc-name">
                            <h5 className="single-product__desc-title">
                                {product?.title}, {product?.square} м2
                            </h5>
                            <div className="single-product__desc-art">
                                {product?.scu}
                            </div>
                            {product && <FavoriteButton {...product} />}
                        </div>

                        <div className="single-product__desc-details">
                            <div className="params">
                                <div className="params__item">
                                    <div className="params__definition single-product__params-definition">
                                        Корпус
                                    </div>
                                    <div className="params__value single-product__params-value">
                                        {product?.building}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition single-product__params-definition">
                                        Этаж
                                    </div>
                                    <div className="params__value single-product__params-value">
                                        {product?.floor}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition single-product__params-definition">
                                        Номер
                                    </div>
                                    <div className="params__value single-product__params-value">
                                        {product?.flat_number}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition single-product__params-definition">
                                        Комнат
                                    </div>
                                    <div className="params__value single-product__params-value">
                                        {product?.rooms}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="single-product__details details">
                            <div className="details__row">
                                <div className="details__name">Стоимость</div>
                                <div className="details__value details__value--price">
                                    {formatNumber(Number(product?.price_total))}{" "}
                                    ₽
                                </div>
                            </div>
                            <div className="details__row">
                                <div className="details__name">Цена за м2</div>
                                <div className="details__value">
                                    {formatNumber(Number(product?.price_sq_m))}{" "}
                                    ₽/м2
                                </div>
                            </div>
                            <div className="details__row">
                                <div className="details__name">Площадь</div>
                                <div className="details__value">
                                    {product?.square} м2
                                </div>
                            </div>
                        </div>

                        {isBooking || isViewing ? (
                            <button
                                onClick={() => {
                                    setIsBooking(false);
                                    setIsViewing(false);
                                }}
                                className="button-preview button-preview--back single-product__preview-btn"
                            >
                                Обратно к просмотру
                                <img
                                    className="buttom-preview__img"
                                    src="/img/icons/return-icon.png"
                                    alt="back"
                                />
                            </button>
                        ) : (
                            <div className="single-product__actions">
                                <button
                                    onClick={() => setIsBooking(true)}
                                    className="button-order single-product__order-btn"
                                >
                                    Забронировать
                                </button>
                                <button
                                    onClick={() => setIsViewing(true)}
                                    className="button-preview single-product__preview-btn"
                                >
                                    Записаться на просмотр
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <button
                onClick={() => navigate(-1)}
                className="button-back single-product__back-btn"
            >
                ← Вернуться к результатам поиска
            </button>
        </section>
    );
};

export default SingleProduct;
