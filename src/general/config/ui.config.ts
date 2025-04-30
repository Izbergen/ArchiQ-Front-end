import {
    createSystem,
    defaultConfig,
    defineConfig, SystemConfig
} from "@chakra-ui/react"

import { defineTextStyles } from "@chakra-ui/react"

export const textStyles = defineTextStyles({
    StyreneALCBold: {
        description: "The body text style - used in heading",
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    }
})
const config: SystemConfig = defineConfig({
    theme: {
        textStyles,
        tokens: {
            colors: {
            },
        },
    },
})

export const defaultSystem = createSystem(defaultConfig, config)