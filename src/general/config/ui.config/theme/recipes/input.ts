import { defineRecipe } from "@chakra-ui/react";

export const inputRecipe = defineRecipe({
    className: "chakra-input",
    base: {
        width: "100%",
        minWidth: "0",
        outline: "none",
        position: "relative",
        appearance: "none",
        textAlign: "start",
        borderRadius: "l2",
        _disabled: {
            layerStyle: "disabled",
        },
        height: "var(--input-height)",
        minW: "var(--input-height)",
        "--focus-color": "colors.colorPalette.focusRing",
        "--error-color": "colors.border.error",
        _invalid: {
            focusRingColor: "var(--error-color)",
            borderColor: "var(--error-color)",
        },
    },

    variants: {
        size: {
            "2xs": {
                textStyle: "xs",
                px: "2",
                "--input-height": "sizes.7",
            },
            xs: {
                textStyle: "xs",
                px: "2",
                "--input-height": "sizes.8",
            },
            sm: {
                textStyle: "sm",
                px: "2.5",
                "--input-height": "sizes.9",
            },
            md: {
                textStyle: "sm",
                px: "3",
                "--input-height": "sizes.10",
            },
            lg: {
                textStyle: "md",
                px: "4",
                "--input-height": "sizes.11",
            },
            xl: {
                textStyle: "md",
                px: "4.5",
                "--input-height": "sizes.12",
            },
            "2xl": {
                textStyle: "lg",
                px: "5",
                "--input-height": "sizes.16",
            },
        },

        variant: {
            outline: {
                bg: "transparent",
                borderWidth: "1px",
                borderColor: "border",
                focusVisibleRing: "inside",
                focusRingColor: "var(--focus-color)",
            },
            subtle: {
                borderWidth: "1px",
                borderColor: "transparent",
                bg: "bg.muted",
                focusVisibleRing: "inside",
                focusRingColor: "var(--focus-color)",
            },
            flushed: {
                bg: "transparent",
                border: 'none',
                borderRadius: "0",
                px: "0",

            },
        },
    },

    defaultVariants: {
        size: "md",
        variant: "flushed",
    },
})