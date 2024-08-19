"use client"
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ComparatorNav } from "@/lib/nav";
import { Grid } from "@mui/material";

import PathCardTemplate from "./pathCardTemplate";

export default function PathCard() {
  return (
    
      <div className="container mt-20 ">
        <Grid
          sx={{ flexGrow: 1 }}
          container
          spacing={2}
          justifyContent="center"
          marginTop={2}
        >
          <Grid item xs={10}>
            <Grid container justifyContent="center" spacing={1}>
              {ComparatorNav.map((item, index) => (
                <Grid key={index} item xs={9} sm={6} md={6} lg={3}>
                  <PathCardTemplate
                    icon={item.icon}
                    cardName={item.cardName}
                    description={item.description}
                    link={item.link}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
  );
}
