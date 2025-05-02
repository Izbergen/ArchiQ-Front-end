import { useDI } from "@/general/hooks/useDI";
import { IAccountsService } from "@/pages/auth/_general/services/accounts";
import { AuthTypes } from "@/pages/auth/_general/authModule";
import { applyServiceMiddleware } from "@/general/utils/applyServiceMiddleware";
import {toasterMiddleware} from "./middlewares";
import { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import {PHONE_KEY} from "@/pages/auth/_general/constants.ts";

const COOLDOWN_SECONDS = 30;

export const useAuth = () => {
    const accountService = useDI<IAccountsService>(AuthTypes.AccountService);

    const service = applyServiceMiddleware(accountService, [toasterMiddleware]);

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


export const usePhoneNumber = (options?: { redirectOnMissing?: boolean }) => {
    const [phoneNumber, setPhoneNumberState] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedPhone = localStorage.getItem(PHONE_KEY);
        setPhoneNumberState(storedPhone);

        if (options?.redirectOnMissing && !storedPhone) {
            navigate("/auth");
        }
    }, []);

    const setPhoneNumber = (phone: string) => {
        localStorage.setItem(PHONE_KEY, phone);
        setPhoneNumberState(phone);
    };

    const clearPhoneNumber = () => {
        localStorage.removeItem(PHONE_KEY);
        setPhoneNumberState(null);
    };

    return {
        phoneNumber,
        setPhoneNumber,
        clearPhoneNumber,
    };
};

