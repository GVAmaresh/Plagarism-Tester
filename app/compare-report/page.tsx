"use client";
import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Details from "@/components/getDetails/details";
import { AddFileAPI } from "@/lib/api";
import { User } from "@/services/firebase/firebaseConfig";
import { monitorAuthState } from "@/services/firebase/auth";
import Request_Sign from "@/components/account/request_sign";
import { useRouter } from "next/navigation";
import {  getDataFirebase } from "@/services/firebase/data";

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
  year: string;
  title: string;
  compare: string;
}

function AddFileCompare() {
  const [load, setLoad] = useState<FileInfo[] | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [newData, setNewData] = useState<Naming[] | []>([]);

  const handleChange = async (files: File[]) => {
    if (!files || files.length === 0) {
      console.log("No files selected.");
      return;
    }

    const filesInfo = Array.from(files).map((file) => ({
      name: file.name,
      size: file.size,
      progress: "progress"
    }));

    setLoad(filesInfo);

    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await fetch(`http://127.0.0.1:5000/api/get-abstract`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error("Failed to upload files");
      }
      const data = await response.json();
      console.log(data.data.extracted_text);
      if (!data.data.extracted_text) {
        setSummary("None");
        setNewData([]);
        return;
      }

      const response_summary = await fetch(
        `http://127.0.0.1:4000/api/summerized`,
        {
          method: "POST",
          body: JSON.stringify({
            text: data.data.extracted_text
          }),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response_summary.ok) {
        throw new Error("Failed to get summary");
      }
      const summary_data = await response_summary.json();
      const other_summaries = await getDataFirebase();
      const result = [];
      const compare_summary = summary_data.data;
      if (compare_summary === "None") {
        setSummary("None");
        setNewData([]);
        return;
      }
        setSummary(compare_summary);

        for (const i of other_summaries) {
          const response_dl = await fetch(`http://127.0.0.1:4000/api/compare`, {
            method: "POST",
            body: JSON.stringify({
              summary: compare_summary,
              text: i.summary
            }),
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (!response_dl.ok) {
            throw new Error("Failed to get summary comparison");
          }
          const res_data = await response_dl.json();
          result.push({
            category: [],
            drive: i.drive || "",
            id: i.id || "",
            summary: i.summary || "",
            title: i.title || "",
            year: i.year || "",
            compare: res_data.value
          });
        }
        setNewData(result);
        if (!data.success) {
          setLoad((prevState) => {
            if (prevState instanceof Array) {
              const updatedFiles = [...prevState];
              updatedFiles[0].progress = "error";
              return updatedFiles;
            }
            return null;
          });
        } else {
          setLoad((prevState) => {
            if (prevState instanceof Array) {
              setNewData(data.data);
              setSummary(summary_data.data);
              const updatedFiles = [...prevState];
              updatedFiles[0].progress = "success";
              return updatedFiles;
            }
            return null;
          });
        }
      
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const [authState, setAuthState] = useState<{
    user: User | null;
    emailVerified: boolean;
  }>({ user: null, emailVerified: false });

  useEffect(() => {
    monitorAuthState().then(setAuthState).catch(console.error);
  }, []);

  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  useEffect(() => {
    refreshPage();
  }, [authState]);

  return (
    <>
      {authState.user ? (
        <div className="flex justify-center">
          <div className="mt-8">
            {!load ? (
              <FileUploader
                handleChange={handleChange}
                name=""
                types={["pdf"]}
                multiple={true}
                maxSize={5}
              />
            ) : summary === "None" ? (
              <div className="text-white text-2xl pt-32 font-bold">
                The given PDF is not supported
              </div>
            ) : (
              newData.length >= 1 && (
                <div className="">
                  <div className="ml-4 p-6 md:ml-28 md:mr-20 mb-10 border-2 rounded-tl-3xl rounded-br-3xl">
                    <div className="flex flex-row gap-4">
                      <div className="text-white text-2xl">Summary: </div>
                      <div className="text-white text-xl font-bold">{summary}</div>
                    </div>
                  </div>
                  <div className="">
                    {newData.map((item) => (
                      <Details
                        key={item.id}
                        fileName=""
                        size={0}
                        progress="success"
                        data={item}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div>
          <Request_Sign />
        </div>
      )}
    </>
  );
}

export default AddFileCompare;
