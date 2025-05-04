import {FC} from "react";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import {IPhoto} from "./../types.ts";

export interface ImageSliderProps {
    photos: IPhoto[];
    height?: string;
    overlayOpacity?: number;
}

const ImageSlider: FC<ImageSliderProps> = ({photos, height = "385px", overlayOpacity = 0.4,}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height={height}
            zIndex={0}
            overflow="hidden"
            _before={{
                content: `""`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bg: `rgba(0,0,0,${overlayOpacity})`,
                zIndex: 1,
            }}
        >
            <Slider {...settings}>
                {photos.map(({ id, photo_link }) => (
                    <Box key={id} height={height} width="100%" position="relative">
                        <Image
                            src={photo_link}
                            alt={`slide-${id}`}
                            objectFit="cover"
                            width="100%"
                            height={height}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default ImageSlider;
