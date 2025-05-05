import { IconButton } from '@chakra-ui/react';
import React from 'react';

interface CarouselArrowButtonProps {
  ariaLabel: string;
  children: React.ReactElement;
  onClick: () => void;
  position: 'left' | 'right';
  top: string | number;
}

const CarouselArrowButton: React.FC<CarouselArrowButtonProps> = ({
  ariaLabel,
  children,
  onClick,
  position,
  top,
}) => (
  <IconButton
    aria-label={ariaLabel}
    colorScheme="messenger"
    borderRadius="full"
    borderWidth="5px"
    backgroundColor="#52A0FF"
    width="48px"
    height="48px"
    borderColor="white"
    position="absolute"
    {...(position === 'left' ? { left: '-24px' } : { right: '-24px' })}
    top={top}
    transform="translate(0%, -50%)"
    zIndex={100}
    _hover={{ bg: '#31619C' }}
    onClick={onClick}
  >
    {children}
  </IconButton>
);

export default CarouselArrowButton; 