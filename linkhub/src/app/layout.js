import Navbar from "@/components/ui/Navbar";
import "./globals.css"; // Import global styles

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}