import { Providers } from "../redux/providers";
import UserAuth from "./auth/UserAuth";
import { Inter } from "next/font/google";
import "./globals.css";
import { getBaseUrl } from "@/utils/constants";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Feather Owl",
  description: "Feather Owl is a platform to manage your files easily.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Feather Owl</title>
       
        <link
          rel="stylesheet"
          href={`${getBaseUrl()}assets/vendors/ti-icons/css/themify-icons.css`}
        />
        <link
          rel="stylesheet"
          href={`${getBaseUrl()}assets/vendors/css/vendor.bundle.base.css`}
        />
        <link
          rel="stylesheet"
          href={`${getBaseUrl()}assets/vendors/font-awesome/css/font-awesome.min.css`}
        />
       
        <link rel="stylesheet" href={`${getBaseUrl()}assets/css/style.css`} />
        <link rel="shortcut icon" href={`${getBaseUrl()}assets/images/favicon.png`} />
      </head>
      <body className={inter.className}>
        <Providers>
          <UserAuth />
          {children}
        </Providers>
      </body>
    </html>
  );
}
