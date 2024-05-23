import { z } from "zod";

export const SignUpUserSchema = z
  .object({
    userName: z
      .string({
        required_error: "Password is required",
      })
      .trim()
      .min(3, { message: "Please enter the username correctly" }),
    firstName: z
      .string({
        required_error: "Please enter a valid firstname",
      })
      .trim()
      .min(3, { message: "Please enter the firstname correctly" }),
    lastName: z
      .string({
        required_error: "Please enter a valid lastname",
      })
      .trim()
      .min(3, { message: "Please enter the lastname correctly" }),
    email: z
      .string({
        required_error: "Please enter a valid email address",
      })
      .trim()
      .email({
        required_error: "Please enter a valid email address",
      }),
    password: z
      .string({
        required_error: "Please enter a valid password",
      })
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string({
      required_error: "Please enter a valid password confirmation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
