import React from "react";
import Booking from "../Booking";
import Viewing from "../Viewing";
import { useParams, useNavigate } from "react-router-dom";
import formatNumber from "../../utils/formatNumber";
import PageLoader from "../PageLoader";
import { IProduct } from "../../models/products";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { fetchProductById } from "../../store/products/thunks/fetchProductById";
import Alert from "../Alert";
import { ALERT_TYPES } from "../../constants/alertTypes";
import ProductFavouriteButton from "./ProductFavouriteButton";
import PreviewButton from "../Buttons/PreviewButton";
import OrderButton from "../Buttons/OrderButton";
import BackButton from "../Buttons/BackButton";
import ImageWithLoader from "../ImageWithLoader";

import "./styles.scss";

const SingleProduct: React.FC = () => {
    
    const { id = "" } = useParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isBooking, setIsBooking] = React.useState<boolean>(false);
    const [isViewing, setIsViewing] = React.useState<boolean>(false);

    const [product, setProduct] = React.useState<IProduct | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        setIsLoading(true);
        setError(null);

        dispatch(fetchProductById(id)).unwrap()
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
        <section className="full-product">
            {error && <Alert type={ALERT_TYPES.ERROR} message={error} />}
            {!error && (
                <div className="full-product__body">
                    <div className="full-product__content">
                        {isBooking && <Booking />}
                        {isViewing && <Viewing />}
                        {!isBooking && !isViewing && (
                            <ImageWithLoader 
                                src={`/img/products/${product?.image}`}
                                imageClassName="full-product__img"
                                imageWrapperClassname="full-product__photo-wrapper"
                                alt='Product'
                                size={25}
                            />
                        )}
                    </div>

                    <div className="full-product__desc">
                        <div className="full-product__desc-sector">
                            ЖК {product?.complex_name}
                        </div>

                        <div className="full-product__desc-name">
                            <h5 className="full-product__desc-title">
                                {product?.title}, {product?.square} м2
                            </h5>
                            <div className="full-product__desc-art">
                                {product?.scu}
                            </div>
                            {product && <ProductFavouriteButton {...product} />}
                        </div>

                        <div className="full-product__desc-details">
                            <div className="params">
                                <div className="params__item">
                                    <div className="params__definition full-product__params-definition">
                                        Корпус
                                    </div>
                                    <div className="params__value full-product__params-value">
                                        {product?.building}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition full-product__params-definition">
                                        Этаж
                                    </div>
                                    <div className="params__value full-product__params-value">
                                        {product?.floor}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition full-product__params-definition">
                                        Номер
                                    </div>
                                    <div className="params__value full-product__params-value">
                                        {product?.flat_number}
                                    </div>
                                </div>
                                <div className="params__item">
                                    <div className="params__definition full-product__params-definition">
                                        Комнат
                                    </div>
                                    <div className="params__value full-product__params-value">
                                        {product?.rooms}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="full-product__details details">
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
                            <PreviewButton
                                text={'Обратно к просмотру'}
                                onClick={() => {
                                    setIsBooking(false);
                                    setIsViewing(false);
                                }}
                                className={'full-product__preview-btn'}
                                hasIcon={true}
                            >
                            </PreviewButton>
                        ) : (
                            <div className="full-product__actions">
                                <OrderButton 
                                    text={'Забронировать'} 
                                    className={'full-product__order-btn'} 
                                    onClick={() => setIsBooking(true)} 
                                />
                                <PreviewButton 
                                    text={'Записаться на просмотр'} 
                                    className={'full-product__preview-btn'} 
                                    onClick={() => setIsViewing(true)}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
            <BackButton 
                text={'← Вернуться к результатам поиска'}
                className='full-product__back-btn'
                onClick={() => navigate(-1)}
            />
        </section>
    );
};

export default SingleProduct;