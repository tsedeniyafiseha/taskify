import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskify - Get Anything Done",
  description: "Post any task. Pick the best person. Get it done. Join thousands of people getting things done every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
