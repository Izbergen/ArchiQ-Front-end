import { defineRecipe } from "@chakra-ui/react";
import {COLORS, FONTS} from "@/general/constants";

export const buttonRecipe = defineRecipe({
    base: {
        borderRadius: "15px",
        fontFamily: FONTS.StyreneALC.MEDIUM,
        py: '10px',
        transition: "background 0.3s ease-in-out",
        fontSize: 'xl'
    },
    variants: {
        variant: {
            solid: {
                bg: COLORS.primary,
                color: 'white',
                _hover: {
                    bg: COLORS.oceanBlue ,
                }

            },
            ghost: {
                bg: 'white',
                color: COLORS.primary,
                _hover: {
                    bg: COLORS.oceanBlue ,
                    color: 'white'
                }
            },
        },
    },
    defaultVariants: {
        variant: "solid",
    },
});
