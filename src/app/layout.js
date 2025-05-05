import "./globals.css";
import Layout from "@/components/Layout/Layout";





export const metadata = {
  title: "Tiho Task",
  description: "Next Task",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-[1500px] m-auto ">
        <Layout>
        {children}
        </Layout>
        
      </body>
    </html>
  );
}
