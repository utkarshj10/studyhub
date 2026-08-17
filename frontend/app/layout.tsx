import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyHub — Study smarter",
  description: "A focused study planner for students.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
