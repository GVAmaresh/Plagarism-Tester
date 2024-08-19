"use client";
import PathCard from "@/components/pathCards/pathCard";

import Image from "next/image";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ComparatorNav } from "@/lib/nav";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "@/services/firebase/firebaseConfig";
import { monitorAuthState } from "@/services/firebase/auth";
import Request_Sign from "@/components/account/request_sign";
import { useRouter } from 'next/navigation'
import { deleteAllData } from "@/services/firebase/data";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});
export default function Home() {
  const [authState, setAuthState] = useState<{
    user: User | null;
    emailVerified: boolean;
  }>({ user: null, emailVerified: false });

  const router = useRouter();

  const refreshPage = () => {
    router.refresh()
  };
  useEffect(()=>{
    refreshPage()
  },[authState])

  useEffect(() => {
    monitorAuthState().then(setAuthState).catch(console.error);
  }, []);
  return (
    <>
      {authState.user ? (
        <ThemeProvider theme={darkTheme}>
          <PathCard />
        </ThemeProvider>
      ) : (
        <div>
          <Request_Sign/>
        </div>
      )}
    </>
  );
}
