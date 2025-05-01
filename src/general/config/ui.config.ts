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
            fontFamily: "StyreneALC-Regular",
        },
    },
    StyreneALCMedium: {
        description: "The body text style - used in subheader",
        value: {
            fontFamily: "StyreneALC-Medium",
        },
    },
    InterBold: {
        description: "The body text style - used in login",
        value: {
            fontFamily: "IntefrBold",
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
               blue:{
                   primary:{value: "#519FFF"},
                   secondary:{value: "#006FFD"},
               },
            },
        },


    },
})

export const defaultSystem = createSystem(defaultConfig, config)