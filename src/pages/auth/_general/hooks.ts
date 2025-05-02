import { useDI } from "@/general/hooks/useDI";
import { IAccountsService } from "@/pages/auth/_general/services/accounts";
import { AuthTypes } from "@/pages/auth/_general/authModule";
import { applyServiceMiddleware } from "@/general/utils/applyServiceMiddleware";
import {phoneMiddleware, toasterMiddleware} from "./middlewares";
import { useCallback, useEffect, useRef, useState } from "react";

const COOLDOWN_SECONDS = 30;

export const useAuth = () => {
    const accountService = useDI<IAccountsService>(AuthTypes.AccountService);

    const service = applyServiceMiddleware(accountService, [phoneMiddleware, toasterMiddleware]);

    const [isCooldown, setIsCooldown] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startCooldown = () => {
        setIsCooldown(true);
        setSecondsLeft(COOLDOWN_SECONDS);
    };

    const clearCooldown = () => {
        setIsCooldown(false);
        setSecondsLeft(0);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const tick = useCallback(() => {
        setSecondsLeft((prev) => {
            if (prev <= 1) {
                clearCooldown();
                return 0;
            }
            return prev - 1;
        });
    }, []);

    useEffect(() => {
        if (isCooldown && secondsLeft > 0) {
            timerRef.current = setInterval(tick, 1000);
            return () => clearInterval(timerRef.current as NodeJS.Timeout);
        }
    }, [isCooldown, tick]);

    const sendOTP = useCallback(
        async (props: Parameters<IAccountsService["sendOTP"]>[0]) => {
            if (isCooldown) return { success: false, message: "Подождите перед повторной отправкой" };

            const result = await service.sendOTP(props);
            if (result.success) {
                startCooldown();
            }
            return result;
        },
        [isCooldown, service]
    );

    const checkPhone = useCallback(service.checkPhone, [service]);
    const verifyOTP = useCallback(service.verifyOTP, [service]);
    const login = useCallback(service.login, [service]);
    const register = useCallback(service.register, [service]);
    return {
        sendOTP,
        checkPhone,
        verifyOTP,
        register,
        login,
        isCooldown,
        secondsLeft
    };
};
