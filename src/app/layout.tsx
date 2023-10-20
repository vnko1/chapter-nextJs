import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "/src/styles/index.scss";

import { Providers } from "./_components";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Chapter",
};

function RootLayout({ auth }: { auth: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{auth}</Providers>
      </body>
    </html>
  );
}
export default RootLayout;

// export default wrapper.withRedux(RootLayout);
