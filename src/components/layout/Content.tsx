import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

// Định nghĩa kiểu cho props
interface Props {
  children: ReactNode;
}

const Content: React.FC<Props> = ({ children }) => (
  <div>
    <Header />
        <main>{children}</main>
    <Footer />
  </div>
);

export default Content;
