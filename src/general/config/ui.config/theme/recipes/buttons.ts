import { defineRecipe } from "@chakra-ui/react";

export const buttonRecipe = defineRecipe({
    base: {
        borderRadius: "10px",
    },
    variants: {
        variant: {
            solidRounded: {
                bg: "teal.500",
                color: "white",
                borderRadius: "full",
                _hover: { bg: "teal.600" },
            },
            ghostBordered: {
                bg: "transparent",
                border: "2px solid",
                borderColor: "blue.500",
                _hover: { bg: "blue.50" },
            },
        },
    },
    defaultVariants: {
        variant: "solidRounded",
    },
});
