import React from "react";
import formatNumber from "../../../utils/formatNumber";
import { useSearchParams } from "react-router-dom";
import NumericInput from "../../FormElements/NumericInput";
import { useDebounceFn } from "ahooks";

import "./styles.scss";

type PricesProps = {
    priceMin: string;
    priceMax: string;
};

const MAX_PRICE_VALUE = 1000000000;

const MIN_PRICE_QUERY = "price_total_gte";
const MAX_PRICE_QUERY = "price_total_lte";

const Prices: React.FC<PricesProps> = ({ priceMax, priceMin }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const minInitialValue = searchParams.get(MIN_PRICE_QUERY)
        ? formatNumber(Number(searchParams.get(MIN_PRICE_QUERY)))
        : "";
    const maxInitialValue = searchParams.get(MAX_PRICE_QUERY)
        ? formatNumber(Number(searchParams.get(MAX_PRICE_QUERY)))
        : "";

    const [minValue, setMinValue] = React.useState(minInitialValue);
    const [maxValue, setMaxValue] = React.useState(maxInitialValue);

    React.useEffect(() => {
        if (!searchParams.get(MIN_PRICE_QUERY)) setMinValue("");
        if (!searchParams.get(MAX_PRICE_QUERY)) setMaxValue("");
    }, [searchParams]);

    const handleMinPriceChange = (value: string) => {
        setMinValue(value);
        const rawValue = value.replaceAll(" ", "");

        if (rawValue === "") searchParams.delete(MIN_PRICE_QUERY);
        else if (Number(rawValue) < Number(priceMin)) searchParams.set(MIN_PRICE_QUERY, priceMin);
        else if (Number(rawValue) > Number(priceMax)) searchParams.set(MIN_PRICE_QUERY, priceMax);
        else searchParams.set(MIN_PRICE_QUERY, rawValue);

        searchParams.delete("_limit");
        searchParams.delete("_page");

        setSearchParams(searchParams);
    };
    const { run: debounceMinPrice } = useDebounceFn(handleMinPriceChange, { wait: 300 });

    const handleMaxPriceChange = (value: string) => {
        setMaxValue(value);
        const rawValue = value.replaceAll(" ", "");

        if (rawValue === "") searchParams.delete(MAX_PRICE_QUERY);
        else if (Number(rawValue) < Number(priceMin)) searchParams.set(MAX_PRICE_QUERY, priceMin);
        else if (Number(rawValue) > Number(priceMax)) searchParams.set(MAX_PRICE_QUERY, priceMax);
        else searchParams.set(MAX_PRICE_QUERY, rawValue);

        searchParams.delete("_limit");
        searchParams.delete("_page");

        setSearchParams(searchParams);
    };
    const { run: debounceMaxPrice } = useDebounceFn(handleMaxPriceChange, { wait: 300 });

    const handleMinValueBlur = (value: string) => {
        const rawValue = value.replaceAll(" ", "");
        if (rawValue === "") return;
        if (Number(rawValue) < Number(priceMin)) setMinValue(formatNumber(Number(priceMin)));
        if (Number(rawValue) > Number(priceMax)) setMinValue(formatNumber(Number(priceMin)));
    };

    const handleMaxValueBlur = (value: string) => {
        const rawValue = value.replaceAll(" ", "");
        if (rawValue === "") return;
        if (Number(rawValue) < Number(priceMin)) setMaxValue(formatNumber(Number(priceMax)));
        if (Number(rawValue) > Number(priceMax)) setMaxValue(formatNumber(Number(priceMax)));
    };

    return (
        <div className="price">
            <div className="price__label label">Стоимость:</div>
            <div className="price__wrapper">
                <div className="price__range">
                    <div className="price__range-text">от</div>
                    <NumericInput
                        className="price__input input control"
                        type="text"
                        placeholder={formatNumber(Number(priceMin))}
                        thousandSeparator={" "}
                        decimalScale={0}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        value={minValue}
                        onChange={(event) => debounceMinPrice(event.target.value)}
                        onBlur={(event) => handleMinValueBlur(event.target.value)}
                        isAllowed={(values) => (values.floatValue ? values.floatValue < MAX_PRICE_VALUE : true)}
                    />
                    <div className="price__range-text">₽</div>
                </div>
                <div className="price__range">
                    <div className="price__range-text">до</div>
                    <NumericInput
                        className="price__input input control"
                        type="text"
                        placeholder={formatNumber(Number(priceMax))}
                        thousandSeparator={" "}
                        decimalScale={0}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        value={maxValue}
                        onChange={(event) => debounceMaxPrice(event.target.value)}
                        onBlur={(event) => handleMaxValueBlur(event.target.value)}
                        isAllowed={(values) => (values.floatValue ? values.floatValue < MAX_PRICE_VALUE : true)}
                    />
                    <div className="price__range-text">₽</div>
                </div>
            </div>
        </div>
    );
};

export default Prices;
