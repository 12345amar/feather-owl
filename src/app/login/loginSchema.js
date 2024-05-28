import { z } from "zod";

export const LoginUserSchema = z.object({
  userName: z
    .string({
      required_error: "Please enter a valid username",
    })
    .trim()
    .min(3, { message: "Please enter the username correctly" }),
  password: z
    .string({
      required_error: "Please enter a valid password",
    })
    .min(8, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});
