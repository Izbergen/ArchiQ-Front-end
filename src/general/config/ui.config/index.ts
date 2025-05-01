import {
    createSystem,
    defaultConfig,
    defineConfig, SystemConfig
} from "@chakra-ui/react"

import {textStyles} from "./theme/textStyles";
import {buttonRecipe} from "./theme/recipes/buttons";

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