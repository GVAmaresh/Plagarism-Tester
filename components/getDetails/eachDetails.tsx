import * as React from "react";
import Accordion from "@mui/material/Accordion";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { MdOutlineDelete } from "react-icons/md";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/material/styles";
import { DeleteFileAPI, GetFileAPI } from "@/lib/api";
import Link from "next/link";
import BasicTable from "./basicTable";
import { Load_Drive } from "@/lib/helper";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
const listItemStyle = {
  "&:hover": {
    backgroundColor: "transparent",
    width: "50%"
  }
};

interface Naming {
  category: string[];
  drive: string;
  id: string;
  summary: string;
  year: string;
  compare: string;
  title: string;
}

export default function EachDetails({
  data,
  fileName,
  size,
  progress
}: {
  fileName: string;
  size: number;
  progress: string;
  data: Naming | null;
}) {
  const [reload, setReload] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  const generate = (
    dataItem: Naming | null,
    fileName: string,
    size: number,
    progress: string
  ) => {
    if (!dataItem) return null;
    return (
      <div className=" bg-black">
        <ListItem key={dataItem.id}>
          <ListItemButton role={undefined} dense>
            <Accordion
              sx={{ width: "100%" }}
              className="bg-slate-800 text-white"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                }}
              >
                <div className="summary-container pb-2 pt-2">
                  <div className="font-bold">{dataItem.title || "No Name"}</div>
                  <div className="font-thin text-sm">
                    {(dataItem.compare != "" &&
                      `Compare: ${Math.floor(parseFloat(dataItem.compare) * 1000)/1000}`) ||
                      ""}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <BasicTable
                  rows={[
                    // { name: 'Category', imf: dataItem.category},
                    { name: "Title", imf: dataItem.title },
                    { name: "Drive", imf: Load_Drive(dataItem.drive) },
                    { name: "Summary", imf: dataItem.summary },
                    { name: "Year", imf: dataItem.year }
                  ]}
                />
              </AccordionDetails>
            </Accordion>
          </ListItemButton>
        </ListItem>
      </div>
    );
  };

  return (
    <Demo
      onClick={(event) => {
        event.stopPropagation();
      }}
      className="bg-black"
    >
      <List dense={false}>{generate(data, fileName, size, progress)}</List>
    </Demo>
  );
}
