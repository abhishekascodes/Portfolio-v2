import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Abhishek A S — Tech Innovator & Systems Developer",
    description: "Portfolio of Abhishek A S. Tech innovator, systems developer, and co-founder from Kerala, India.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
