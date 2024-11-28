import { Box, Container } from "@mui/material";
import DetailContent from "./DetailContent";
import InforUserBox from "../InforUserBox";
import Content from "../../../../components/layout/Content";

const Detail = () => {
  return (
    <Content>
      <Container>
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            marginTop: 3,
            marginBottom: 6,
          }}
        >
          <Box
            sx={{
              width: "75%",
              padding: 3,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
            }}
          >
            <DetailContent />
          </Box>
          <Box
            sx={{
              width: "calc(25% - 30px)",
              padding: "30px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              height: "fit-content",
            }}
          >
            <InforUserBox />
          </Box>
        </Box>
      </Container>
    </Content>
  );
};

export default Detail;
