import {z} from "zod";

export const checkPhoneSchema = z.object({
    phoneNumber: z.string({
        required_error: 'Нужно ввести номер'
    }).refine(
        (val) => /^\+7\d{10}$/.test(val.replace(/[^+\d]/g, '')),
        { message: 'Номер должен начинаться с +7 и содержать 10 цифр' }
    )
});
export type checkPhoneInterface = z.infer<typeof checkPhoneSchema>

export const otpSchema = z.object({
    pin: z
        .array(z.string().min(1), { required_error: "Нужно ввести пин код" })
        .length(6, { message: "Пин должен состоять из 6 цифр" }),
})


export type otpInterface = z.infer<typeof otpSchema>



export const loginSchema = z.object({
    password: z.string({ required_error: "Нужно ввести пароль" }).min(1),
});

export type loginInterface = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        firstName: z.string().nonempty({ message: "Нужно ввести имя" }),
        lastName: z.string().nonempty({ message: "Нужно ввести фамилию" }),

        password: z
            .string()
            .min(8, { message: "Пароль должен быть не менее 8 символов" })
            .regex(/(?=.*[a-z])/, { message: "Должна быть хотя бы одна строчная буква" })
            .regex(/(?=.*[A-Z])/, { message: "Должна быть хотя бы одна заглавная буква" })
            .regex(/(?=.*\d)/,     { message: "Должна быть хотя бы одна цифра" })
            .regex(/(?=.*[!@#$%^&*])/, { message: "Должен быть хотя бы один специальный символ" }),

        confirmPassword: z.string().min(1, { message: "Нужно подтвердить пароль" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Пароли должны совпадать",
        path: ["confirmPassword"],
    });

export type registerInterface = z.infer<typeof registerSchema>;