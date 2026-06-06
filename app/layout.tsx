import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zero Studio.X",
  description: "Manual payment tracking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{display:'flex',justifyContent:'flex-end',gap:'16px',padding:'12px 24px',borderBottom:'1px solid #1A1A1A',background:'#0A0A0A'}}>
          <a href="/payment" style={{fontFamily:'monospace',fontSize:'11px',color:'#555',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Payment</a>
          <a href="/admin" style={{fontFamily:'monospace',fontSize:'11px',color:'#555',textDecoration:'none',letterSpacing:'0.1em',textTransform:'uppercase'}}>Admin</a>
        </nav>
        {children}
      </body>
    </html>
  );
}