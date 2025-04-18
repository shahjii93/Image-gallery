"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import "./globals.scss";
import QueryProvider from "@/providers/QueryProvider";
export default function RootLayout({ children }) {
  return (
    <QueryProvider>
      <html lang="en">
        <body>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
