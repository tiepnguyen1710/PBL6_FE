import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Stack } from "@mui/material";

// Định nghĩa kiểu cho props
interface Props {
  children: ReactNode;
}

const Content: React.FC<Props> = ({ children }) => (
  <Stack sx={{ minHeight: "100vh" }}>
    <Header />
    <main style={{ flexGrow: 1 }}>{children}</main>
    <Footer />
  </Stack>
);

export default Content;
