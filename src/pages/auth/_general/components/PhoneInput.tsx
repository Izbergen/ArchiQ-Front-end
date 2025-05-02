import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { Input, InputProps } from "@chakra-ui/react";
import { withMask } from "use-mask-input";
import { FONTS } from "@/general/constants";

export const PhoneInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            withMask("+7 999-999-99-99")(inputRef.current);
        }
    }, []);

    useImperativeHandle(ref, () => inputRef.current!);

    return (
        <Input
            ref={inputRef}
            w="100%"
            placeholder="+7 776-148-70-88"
            border="none"
            outline="none"
            fontFamily={FONTS.StyreneALC.REGULAR}
            fontSize="2xl"
            {...props}
        />
    );
});

PhoneInput.displayName = "PhoneInput";
