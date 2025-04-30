import {
    createSystem,
    defaultConfig,
    defineConfig
} from "@chakra-ui/react"

import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
    StyreneALCBold: {
            description: "The body text style - used in heading",
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    StyreneALCRegular: {
        description: "The body text style - used in text",
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    StyreneALCMedium: {
        description: "The body text style - used in subheader",
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    InterBold: {
        description: "The body text style - used in login",
        value: {
            fontFamily: "InterBold",
        }
    },
    InterRegular: {
        description: "The body text style - used in login",
        value: {
            fontFamily: "InterRegular",
        }
    }

})
const config = defineConfig({
    theme: {
        textStyles,
        tokens: {
            colors: {
            },
        },

    },
})

export const defaultSystem = createSystem(defaultConfig, config)