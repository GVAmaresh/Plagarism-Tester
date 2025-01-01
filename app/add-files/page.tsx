"use client";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Details from "@/components/getDetails/details";
import { AddFolderAPI } from "@/lib/api";
import { monitorAuthState } from "@/services/firebase/auth";
import { User } from "@/services/firebase/firebaseConfig";
import Request_Sign from "@/components/account/request_sign";
import { useRouter } from "next/navigation";
import { addData} from "@/services/firebase/data";
import Alerts from "@/components/extra_component/alert";
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import Button from '@mui/material/Button';
import { GDRIVE_URL, Load_Drive, ML_URL } from "@/lib/helper";

interface FileInfo {
  name: string;
  size: number;
  progress: string;
}

interface Naming {
  category: string[];
  drive: string;
  id: string;
  summary: string;
  compare: string;
  year: string;
  title: string;
  timestamp: string;
}

interface ApiResult {
  success: boolean;
  data: Naming[];
}
interface AlertInterface {
  message?: string;
}

function AddFiles() {
  const [load, setLoad] = useState<FileInfo[] | null>(null);
  const [data, setData] = useState<ApiResult | null>(null);
  const [error, setError] = useState<AlertInterface[] | []>([
    
  ]);
  const [handleError, setHandleError] = useState<boolean>(true);
  const onhandleError = () => {
    setHandleError((prev) => !prev);
    console.log(error)
    setError(prev=>[...prev])
  };
  const [authState, setAuthState] = useState<{
    user: User | null;
    emailVerified: boolean;
  }>({ user: null, emailVerified: false });
  const router = useRouter();

  const handleChange = async (files: FileList | null) => {
    if (!files || files.length === 0) {
      console.log("No files selected.");
      return;
    }

    const filesArray = Array.from(files);
    const filesInfo = filesArray.map((file) => ({
      name: file.name,
      size: file.size,
      progress: "progress"
    }));

    setLoad(filesInfo);

    const formDataArray = filesArray.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return formData;
    });

    const dataList: Naming[] = [];
    setHandleError(true)
    try {
      for (const formData of formDataArray) {
        const response = await fetch(`${GDRIVE_URL}/save-docs`, {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          throw new Error("Failed to upload files");
        }
        const responseData = await response.json();
        if (responseData.data.extracted_text == "") {
          console.error(
            "There is no extracted text: ",
            responseData.data.file_id
          );
          setError((e) => [
            ...e,
            {
              message: `${Load_Drive(
                responseData.data.file_id
              )} is not supportive to extract text `
            }
          ]);
          continue;
        }

        const response_dl = await fetch(
          `${ML_URL}/summerized`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              text: responseData.data.extracted_text || "No abstract text"
            })
          }
        );
        if (!response_dl.ok) {
          throw new Error("Failed to get summary");
        }
        const response_DL_Data = await response_dl.json();

        const newData: Naming = {
          id: responseData.data.file_id || "",
          title: responseData.data.title || "",
          summary: response_DL_Data.data || "",
          drive: responseData.data.file_id || "",
          year: new Date().getFullYear().toString(),
          timestamp: new Date().toISOString(),
          category: responseData.data.category || [],
          compare: responseData.data.compare || ""
        };
        await addData(newData);

        dataList.push(newData);
      }

      const response: ApiResult = { data: dataList, success: true };

      if (response.success) {
        setLoad((prevState) => {
          if (prevState) {
            return prevState.map((file) => ({
              ...file,
              progress: "success"
            }));
          }
          return null;
        });
        setData(response);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error in handleUpload:", error);
    }
  };

  useEffect(() => {
    monitorAuthState().then(setAuthState).catch(console.error);
  }, []);

  useEffect(() => {
    if (authState.user) {
      router.refresh();
    }
  }, [authState, router]);

  return (
    <>
      {authState.user ? (
        <>
          <div
            className="text-slate-50 mt-6 flex justify-end items-start"
            onClick={onhandleError}
          >
            {/* {handleError!=null&&(handleError ? "Close Error" : "Open Error")} */}
           {handleError!=null&&(handleError ? <Button variant="contained" endIcon={<SubtitlesOffIcon/>}>
        Close Error
      </Button>:<Button variant="contained" endIcon={<SubtitlesIcon />}>Open Error</Button>)}
          </div>
          <div className="flex justify-center">
            <div className="mt-8 w-fit">
              {!load ? (
                <FileUploader
                  handleChange={handleChange}
                  name=""
                  types={["pdf"]}
                  multiple={true}
                  maxSize={5}
                />
              ) : (
                load.map((item) => (
                  <Details
                    key={item.name}
                    fileName={item.name}
                    size={item.size}
                    progress={item.progress}
                    data={
                      data?.data?.find((d) => d.title === item.name) || null
                    }
                  />
                ))
              )}
            </div>
            {handleError &&<Alerts data={error} />}
          </div>
        </>
      ) : (
        <Request_Sign />
      )}
    </>
  );
}

export default AddFiles;
