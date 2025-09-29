import {z} from "zod";






export const signUpSchema =  z.object({
    email: z.email().max(64, 'Invalid Email'),
    username: z.string()
        .min(6, "Username must be at least 6 characters")
        .max(16, "Username cannot be more than 16 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password cannot be more than 24 characters")
        .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/^(?=.*[^a-zA-Z0-9])/, "Password must contain at least one special character")
})


export const signInSchema = z.object({
    email: z.email().max(64, 'Invalid Email'),
    username: z.string()
        .min(6, "Username must be at least 6 characters")
        .max(16, "Username cannot be more than 16 characters").optional(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(24, "Password cannot be more than 24 characters")
        .regex(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .regex(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .regex(/^(?=.*[^a-zA-Z0-9])/, "Password must contain at least one special character")
})


export const feedbackSchema = z.object({
    title:z.string().min(4,"title must be atleat 4 characters").max(30,"title cannot be more than 30 characters"),
    rating:z.string().max(1),
    other:z.string().max(500,"feedback too long").optional()
})
