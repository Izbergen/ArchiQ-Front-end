import {
    createSystem,
    defaultConfig,
    defineConfig, SystemConfig
} from "@chakra-ui/react"

import { defineTextStyles } from "@chakra-ui/react"
import {buttonRecipe} from "./theme/recipes/buttons.ts";

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
        recipes: {
            Button: buttonRecipe,
        },
        textStyles,
        tokens: {
            colors: {
            },
        },
    },
})

export const defaultSystem = createSystem(defaultConfig, config)