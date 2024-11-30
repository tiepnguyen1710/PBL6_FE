import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, Stack, Typography } from "@mui/material";

interface TestDate {
  date: Date;
  tags: string[];
  fulltest: boolean;
}

function createData(
  dateTest: TestDate,
  result: string,
  time: number,
  action: string,
) {
  return { dateTest, result, time, action };
}

const HeadRowStyle = {
  fontWeight: "bold",
  fontSize: 18,
  width: "25%",
  whiteSpace: "normal",
  wordWrap: "break-word",
};

const RowStyle = {
  fontSize: 16,
  wordWrap: "break-word",
};

const chipStyle = {
  backgroundColor: "#ff6f00",
  color: "white",
  marginBottom: "5px",
};

const toHHMMSS = (secs: number) => {
  //const sec_num = parseInt(secs, 10);
  const sec_num = secs;
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

const rows = [
  createData(
    {
      date: new Date(2024, 11, 1),
      tags: ["part1", "part2", "part3", "part4", "part5"],
      fulltest: false,
    },
    "12/18",
    5000,
    "Detail",
  ),
  createData(
    {
      date: new Date(2024, 11, 1),
      tags: [],
      fulltest: true,
    },
    "120/200",
    5000,
    "Detail",
  ),
];

export default function ResultTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ ...HeadRowStyle }}>Date</TableCell>
            <TableCell sx={{ ...HeadRowStyle }}>Result</TableCell>
            <TableCell sx={{ ...HeadRowStyle }}>Time</TableCell>
            <TableCell sx={{ ...HeadRowStyle }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="column" spacing={0.5}>
                  <Typography>
                    {row.dateTest.date.toLocaleDateString()}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={0.25}
                    sx={{ flexWrap: "wrap" }}
                  >
                    {row.dateTest.fulltest ? (
                      <Chip
                        label="fulltest"
                        sx={{ ...chipStyle, backgroundColor: "success.main" }}
                      />
                    ) : (
                      <>
                        <Box sx={{ mb: 1 }}>
                          <Chip label="practice" sx={{ ...chipStyle }} />
                        </Box>

                        {row.dateTest.tags.map((tag) => {
                          return <Chip label={tag} sx={{ ...chipStyle }} />;
                        })}
                      </>
                    )}
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell sx={{ ...RowStyle }}>{row.result}</TableCell>
              <TableCell sx={{ ...RowStyle }}>{toHHMMSS(row.time)}</TableCell>
              <TableCell sx={{ ...RowStyle }}>
                <span style={{ color: "#0071F9", cursor: "pointer" }}>
                  {row.action}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
