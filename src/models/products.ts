export interface IProduct {
    id: string;
    scu: string;
    title: string;
    complex_name: string;
    square: string;
    price_sq_m: string;
    price_total: string;
    building: string;
    floor: string;
    floors_total: string;
    rooms: string;
    flat_number: string;
    image: string;
}

export interface IProductsInfo {
    priceMin: string;
    priceMax: string;
    squareMin: string;
    squareMax: string;
    complexNames: string[];
    roomValues: string[];
}