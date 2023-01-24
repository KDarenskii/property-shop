import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import formatNumber from "../../../utils/formatNumber";
import NumericInput from "../../FormElements/NumericInput";

import './styles.scss';

type SquareProps = {
    squareMin: string;
    squareMax: string;
}

const MAX_SQUARE_VALUE: number = 1000;

const MIN_SQUARE_QUERY = 'square_gte';
const MAX_SQUARE_QUERY = 'square_lte';

const Square: React.FC<SquareProps> = ({squareMin, squareMax}) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const minInitialValue = searchParams.get(MIN_SQUARE_QUERY) 
        ? formatNumber(Number(searchParams.get(MIN_SQUARE_QUERY))) 
        : '';
    const maxInitialValue = searchParams.get(MAX_SQUARE_QUERY) 
        ? formatNumber(Number(searchParams.get(MAX_SQUARE_QUERY))) 
        : '';

    const [minValue, setMinValue] = React.useState(minInitialValue);
    const [maxValue, setMaxValue] = React.useState(maxInitialValue);

    React.useEffect(() => {
        if (!searchParams.get(MIN_SQUARE_QUERY)) setMinValue('');
        if (!searchParams.get(MAX_SQUARE_QUERY)) setMaxValue('');
    }, [searchParams])

    const hangleMinValueChange = (value: string) => {

        setMinValue(value);
        const rawValue = value.replaceAll(' ', '');

        if (rawValue === '') searchParams.delete(MIN_SQUARE_QUERY);
        else if (Number(rawValue) < Number(squareMin)) searchParams.set(MIN_SQUARE_QUERY, squareMin);
        else if (Number(rawValue) > Number(squareMax)) searchParams.set(MIN_SQUARE_QUERY, squareMax);
        else searchParams.set(MIN_SQUARE_QUERY, rawValue);

        searchParams.delete('_limit');
        searchParams.delete('_page');

        setSearchParams(searchParams);
    }
    const debouncedMinValue = useDebouncedCallback(hangleMinValueChange, 300);
    
    const hangleMaxValueChange = (value: string) => {

        setMaxValue(value);
        const rawValue = value.replaceAll(' ', '');

        if (rawValue === '') searchParams.delete(MAX_SQUARE_QUERY);
        else if (Number(rawValue) > Number(squareMax)) searchParams.set(MAX_SQUARE_QUERY, squareMax);
        else if (Number(rawValue) < Number(squareMin)) searchParams.set(MAX_SQUARE_QUERY, squareMin);
        else searchParams.set(MAX_SQUARE_QUERY, rawValue);

        searchParams.delete('_limit');
        searchParams.delete('_page');

        setSearchParams(searchParams);
    }
    const debouncedMaxValue = useDebouncedCallback(hangleMaxValueChange, 300);

    const handleMinValueBlur = (value: string) => {
        const rawValue = value.replaceAll(' ', '');
        if (rawValue === '') return;
        if (Number(rawValue) < Number(squareMin)) setMinValue(squareMin);
        if (Number(rawValue) > Number(squareMax)) setMinValue(squareMin);
    }

    const handleMaxValueBlur = (value: string) => {
        const rawValue = value.replaceAll(' ', '');
        if (rawValue === '') return;
        if (Number(rawValue) < Number(squareMin)) setMaxValue(squareMax);
        if (Number(rawValue) > Number(squareMax)) setMaxValue(squareMax);
    }

    return (
        <div className="square">
            <div className="square__label label">Площадь:</div>
            <div className="square__wrapper">
                <label className="square__range">
                    <div className="square__range-text">от</div>
                    <NumericInput 
                        name="sqmin"
                        className="square__input"
                        placeholder={formatNumber(Number(squareMin))}
                        thousandSeparator={' '}
                        decimalScale={0}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        value={minValue}
                        onChange={(event) => debouncedMinValue(event.target.value)}
                        onBlur={(event) => handleMinValueBlur(event.target.value)}
                        isAllowed={(values) => values.floatValue ? values.floatValue < MAX_SQUARE_VALUE : true}
                    />
                    <div className="square__range-text">м2</div>
                </label>
                <label className="square__range">
                    <div className="square__range-text">до</div>
                    <NumericInput
                        name="sqmax"
                        className="square__input"
                        placeholder={formatNumber(Number(squareMax))}
                        thousandSeparator={' '}
                        decimalScale={0}
                        allowLeadingZeros={false}
                        allowNegative={false}
                        value={maxValue}
                        onChange={(event) => debouncedMaxValue(event.target.value)}
                        onBlur={(event) => handleMaxValueBlur(event.target.value)}
                        isAllowed={(values) => values.floatValue ? values.floatValue < MAX_SQUARE_VALUE : true}
                    />
                    <div className="square__range-text">м2</div>
                </label>
            </div>
        </div>
    );
};

export default Square;