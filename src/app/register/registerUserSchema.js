import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .trim()
      .min(3, { message: "Please enter the username correctly" }),
    first_name: z
      .string({
        required_error: "Please enter a valid firstname",
      })
      .trim()
      .min(3, { message: "Please enter the firstname correctly" }),
    last_name: z
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
    password1: z
      .string({
        required_error: "Please enter a valid password",
      })
      .min(4, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    password2: z.string({
      required_error: "Please enter a valid password confirmation",
    }),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });
