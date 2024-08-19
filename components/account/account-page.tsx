import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { AccountHolder } from "@/lib/data";
import { CardFooter } from "../ui/card";
import { SignOut } from "@/services/firebase/auth";
import { useRouter } from "next/navigation";

export default function AccountPage({
  image = "/images/avatar.png",
  name = "NA",
  email = "NA",
  totalFiles = "NA"
}: AccountHolder) {

  const router = useRouter();

  const refreshPage = () => {
    router.refresh()
  };

  const handleSignout = async() => {
    SignOut();
    refreshPage();
  };



  return (
    <Card
    className="bg-black text-white border-zinc-400 border-2 border-r-4"
      sx={{
        width: 300,
        borderRadius: 4,
        backgroundColor: "black",
        // border: "2px solid #ccc"
      }}
    >
      {name == "NA" ? (
        <>
          <Card sx={{backgroundColor: "black",}}>
          <div className="flex justify-center">
            <CardMedia
              sx={{
                height: 140,
                width: 440,
                borderRadius: "50%",
                marginTop: "3rem"
              }}
              image="/images/smiling_white.png"
            />
          </div>
            <CardContent>
              {/* <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography> */}
              <Typography variant="body2" color="text.secondary">
                Please Verify your account in Gmail
              </Typography>
              <Typography variant="body2" color="text.secondary">
                And refresh the page
              </Typography>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <CardMedia
              sx={{
                height: 140,
                width: 140,
                borderRadius: "50%",
                marginTop: "3rem"
              }}
              image={image}
            />
          </div>
          <CardContent>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ textAlign: "center", marginTop: "rem", fontWeight: 600 }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", marginTop: "rem", fontWeight: 300 }}
            >
              {email}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ textAlign: "center", marginTop: "rem", fontWeight: 600 }}
            >
              Total Files: {totalFiles}
            </Typography>
          </CardContent>
        </>
      )}
      <CardFooter>
        <Button className="w-full h-4 py-4 bg-slate-900 font-bold text-white border-4 " onClick={handleSignout}>
          Sign out
        </Button>
      </CardFooter>
    </Card>
  );
}
