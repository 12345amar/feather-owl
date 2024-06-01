import { z } from "zod";

export const userProfileSchema = z.object({
  // username: z
  //   .string({
  //     required_error: "Username is required",
  //   })
  //   .trim()
  //   .min(3, { message: "Please enter the username correctly" }),
  // email: z
  //   .string({
  //     required_error: "Please enter a valid email address",
  //   })
  //   .trim()
  //   .email({
  //     required_error: "Please enter a valid email address",
  //   }),
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .min(2, { message: "Please enter the title correctly" }),
  birthDate: z
    .string({
      required_error: "Birth date is required",
    })
    .trim()
    .min(3, { message: "Please enter the birth date correctly" }),
  cellPhoneNbr: z
    .string({
      required_error: "Phone number is required",
    })
    .trim()
    .min(10, { message: "Please enter the phone number correctly" }),
  address: z
    .string({
      required_error: "Address is required",
    })
    .trim()
    .min(3, { message: "Please enter the address correctly" }),
  city: z
    .string({
      required_error: "City is required",
    })
    .trim()
    .min(3, { message: "Please enter the city correctly" }),
  zipCode: z
    .string({
      required_error: "Zip code is required",
    })
    .trim()
    .min(3, { message: "Please enter the zip code correctly" }),
  country: z
    .string({
      required_error: "Country is required",
    })
    .trim()
    .min(3, { message: "Please enter the country correctly" }),
  preferredLanguage: z
    .string({
      required_error: "Preferred language is required",
    })
    .trim()
    .min(3, { message: "Please enter the preferred language correctly" }),
});
