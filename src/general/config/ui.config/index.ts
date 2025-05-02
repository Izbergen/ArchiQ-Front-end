import {
    createSystem,
    defaultConfig,
    defineConfig, SystemConfig
} from "@chakra-ui/react"

import {coreTextStyles} from "./theme/textStyles";
import {buttonRecipe} from "./theme/recipes/buttons";

const config: SystemConfig = defineConfig({
    theme: {
        recipes: {
            Button: buttonRecipe,
        },
        textStyles: coreTextStyles,
        tokens: {
            colors: {
            },
        },

    },
})

export const defaultSystem = createSystem(defaultConfig, config)