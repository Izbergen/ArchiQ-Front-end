'use client'

import React from 'react'
import {Box, useBreakpointValue} from '@chakra-ui/react'
import { LuChevronRight , LuChevronLeft } from "react-icons/lu";
import Slider, {Settings} from 'react-slick'

import CarouselArrowButton from './CarouselArrowButton.tsx';

interface CarouselProps {
  height?: string | number;
  width?: string | number;
  children: React.ReactNode;
}

export default function Carousel({
  height = '720px',
  width = 'full',
  children,
}: CarouselProps) {
  const [slider, setSlider] = React.useState<Slider | null>(null)

  const top = useBreakpointValue({ base: '90%', md: '50%' })

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: useBreakpointValue({ base: false, md: true }),
    fade: true,
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={height} width={width}>
      <Box position="relative" width={width} height={height}>
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <CarouselArrowButton
          ariaLabel="left-arrow"
          position="left"
          top={top ?? 0}
          onClick={() => slider?.slickPrev()}
        >
          <LuChevronLeft width={100} />
        </CarouselArrowButton>
        <CarouselArrowButton
          ariaLabel="right-arrow"
          position="right"
          top={top ?? 0}
          onClick={() => slider?.slickNext()}
        >
          <LuChevronRight width={10} />
        </CarouselArrowButton>
        <Box borderRadius={'25px'} width={width} height={height} overflow={'hidden'}>
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {
              children
            }
          </Slider>
        </Box>
      </Box>
    </Box>
  )
}