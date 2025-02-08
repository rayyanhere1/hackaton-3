import './globals.css';

export const metadata = {
  title: 'Nike Store',
  description: 'Your go-to store for Nike products',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;