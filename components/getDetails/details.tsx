import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import EachDetails from "./eachDetails";
import { RiCoreosLine } from "react-icons/ri";

interface Naming {
  category: string[];
  drive: string;
  id: string;
  summary: string;
  compare: string;
  year: string;
  title: string;
}

export default function Details({
  fileName,
  size,
  progress,
  data,
}: {
  fileName: string;
  size: number;
  progress: string;
  data: Naming | null;
}) {
  return (
    <>
      <div className="progressCard rounded-lg mb-2  md:w-full">
        {progress === "progress" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 2,
            }}
          >
            <CircularProgress />
          </Box>
        ) : progress === "success" ? (
          <div className="text-lime-400 text-2xl w-96 md:text-base md:w-full">
            <EachDetails
              fileName={fileName}
              size={size}
              progress={progress}
              data={data}
            />
          </div>
        ) : (
          <div className="text-red-500">File not Uploaded</div>
        )}
      </div>
    </>
  );
}