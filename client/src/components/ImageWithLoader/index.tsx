import React from 'react';
import cn from 'classnames';
import BeatLoader from "react-spinners/BeatLoader";
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';

import './styles.scss';

interface ImageWithLoaderProps extends LoaderSizeMarginProps {
    src: string;
    alt: string;
    imageClassName?: string;
    imageWrapperClassname?: string;
}

const ImageWithLoader: React.FC<ImageWithLoaderProps> = ({ src, alt, imageClassName, imageWrapperClassname, ...rest }) => {

    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    return (
        <div className='image-with-loader'>
            <div className={cn('image-with-loader__wrapper', imageWrapperClassname)}>
                <img 
                    onLoad={() => setIsImageLoaded(true)}
                    className={cn('image-with-loader__img', { 'image-with-loader__img--loaded': isImageLoaded }, imageClassName)} 
                    src={src}
                    alt={alt}
                />
            </div>
            {!isImageLoaded && (
                <BeatLoader
                    color='#007bff'
                    className='image-with-loader__loader'
                    {...rest}
                />
            )}
        </div>
    )
}

export default ImageWithLoader