import { useQuery } from "@tanstack/react-query";
import { fetchAllPracticeHistory } from "../api/practice-history";
import { useEffect, useState } from "react";
import { PracticeHistory } from "../types/PracticeHistory";
import { groupPracticeByTest } from "../utils/helper";
import CustomBackdrop from "../../../components/UI/CustomBackdrop";
import PracticeHistoryTable from "./PracticeHistoryTable";
import { Box } from "@mui/material";

const PracticeHistoryTab = () => {
  const [PracticeHistoryData, setPracticeHistoryData] = useState<
    {
      id: string;
      name: string;
      value: PracticeHistory[];
    }[]
  >();
  const { isPending, data: PracticeHistory } = useQuery({
    queryKey: ["PracticeHistory"],
    queryFn: () => fetchAllPracticeHistory(),
  });

  useEffect(() => {
    if (PracticeHistory) {
      const PracticeHistoryConverted = groupPracticeByTest(PracticeHistory);
      setPracticeHistoryData(PracticeHistoryConverted);
    }
  }, [PracticeHistory]);
  console.log(PracticeHistoryData);
  return (
    <>
      {isPending ? (
        <CustomBackdrop open />
      ) : (
        <>
          {PracticeHistoryData?.map(
            (PracticeHistoryItem, PracticeHistoryTableIndex) => {
              return (
                <Box key={PracticeHistoryTableIndex}>
                  <PracticeHistoryTable practiceHistory={PracticeHistoryItem} />
                </Box>
              );
            },
          )}
        </>
      )}
    </>
  );
};

export default PracticeHistoryTab;
