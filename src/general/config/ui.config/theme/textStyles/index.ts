import {defineTextStyles} from "@chakra-ui/react";
import {FONTS} from "@/general/constants";


export const coreTextStyles = defineTextStyles({
    StyreneALCBold: {
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    StyreneALCRegular: {
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    StyreneALCMedium: {
        value: {
            fontFamily: "StyreneALC-Bold",
        },
    },
    InterBold: {
        value: {
            fontFamily: "InterBold",
        }
    },
    InterRegular: {
        value: {
            fontFamily: "InterRegular",
        }
    },
    authTitle: {
        value: {
            fontFamily: FONTS.StyreneALC.BOLD,
            fontSize: '4xl'
        }
    },
    authSubTitle: {
        value: {
            fontFamily: FONTS.StyreneALC.REGULAR,
            fontSize: "xl"
        }
    },
    authFieldError: {
        value: {
            fontFamily: FONTS.StyreneALC.BOLD,
            fontSize: 'sm'
        }
    },
    authField: {
        value: {
            fontSize: "sm",
            lineHeight: "20px",
            letterSpacing: "0%",
        }
    },
    authFieldLabel: {
        value: {
            fontFamily: FONTS.StyreneALC.MEDIUM,
            fontSize: 'md',
            lineHeight: '100%',
            letterSpacing: '0%',
        }
    }


})