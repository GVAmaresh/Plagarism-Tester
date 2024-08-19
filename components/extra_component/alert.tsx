import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AlertTitle from "@mui/material/AlertTitle";

interface AlertInterface {
  message?: string;
}

interface AlertsProps {
  data: AlertInterface[];
}

// export default function Alerts({ data }: AlertsProps) {
//   const [open, setOpen] = React.useState(true);

//   return (
//     <div className="absolute w-1/2">
//     <Box sx={{ width: "100%" }} >
//       {data.map((e, index) => (
//         <Collapse key={index} in={open}>
//           <Alert
//             severity="error"
//             action={
//               <IconButton
//                 aria-label="close"
//                 color="inherit"
//                 size="small"
//                 onClick={() => {
//                   setOpen(false);
//                 }}
//               >
//                 <CloseIcon fontSize="inherit" />
//               </IconButton>
//             }
//             sx={{ mb: 2 }}
//           >
//             <AlertTitle>Error</AlertTitle>
//             {e.message || "Unknown error occurred"}
//           </Alert>
//         </Collapse>
//       ))}
//       {!open && (
//         <Button
//           disabled={open}
//           variant="outlined"
//           onClick={() => {
//             setOpen(true);
//           }}
//         >
//           Re-open
//         </Button>
//       )}
//     </Box>
//     </div>
//   );
// }

import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

interface AlertInterface {
  message?: string;
}

interface AlertsProps {
  data: AlertInterface[];
}

interface SnackbarHandlerProps {
    message?: string;
  }
  
  let displayedMessages = new Set<string>();
  
  function SnackbarHandler({ message }: SnackbarHandlerProps) {
    const { enqueueSnackbar } = useSnackbar();
  
    React.useEffect(() => {
      if (message && !displayedMessages.has(message)) {
        enqueueSnackbar(message, {
          variant: "error",
          autoHideDuration: null,
        });
        displayedMessages.add(message); 
      }
    }, [message, enqueueSnackbar]);
  
    return null;
  }

export default function Alerts({ data }: AlertsProps) {
    displayedMessages = new Set<string>()

  return (
    <SnackbarProvider maxSnack={100}>
      {data.map((e, index) => (
        <SnackbarHandler key={index} message={e.message} />
      ))}
    </SnackbarProvider>
  );
}
