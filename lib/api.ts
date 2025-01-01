
"use server";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid"; 
import { handleFile_Drive } from "./api_component";

export const AddFolderAPI = async (files: FormData[]) => {
  const dataList: any[] = [];

  try {
    for (const formData of files) {
      const data = await handleFile_Drive(formData);
      dataList.push(data);
    }

    return { data: dataList, status: true };
  } catch (error) {
    console.error("Error uploading files:", error);
    return { data: [], status: false };
  }
};

  export const AddFileAPI = async (files: File) => {
    const formData = new FormData();
    formData.append("file", files);
  
    try {
      const response = await fetch(`${URL}/compare`, {
        method: "POST",
        body: formData,
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });
      if (!response.ok) {
        throw new Error("Failed to upload files");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw error;
    }
  };



const encryptToken = (token: string) => {
  const encryptedToken = CryptoJS.AES.encrypt(
    token,
    "SO_MY_NEW_KEY"
  ).toString();
  return encryptedToken;
};




const decryptToken = (encryptedToken: string) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, "SO_MY_NEW_KEY");
  const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};

export const CheckLoginAPI = async () => {
  try {
    let cookie = cookies().get("token");
    let token = cookie ? decryptToken(cookie.value) : uuidv4();
    const response = await fetch(`${URL}/isLogin`, {
      method: "POST",
      body: JSON.stringify({ name: token }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to Login");
    }
    const data = await response.json();
    token = encryptToken(token);
    cookies().set("token", token);
    return data;
  } catch (error) {
    console.error("Error Logging in:", error);
    throw error;
  }
};



export const GetFileAPI = async () => {
  try {
    const response = await fetch(`${URL}/getReports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to GET Summary");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Getting Summary : ", error);
    throw error;
  }
};

export const DeleteFileAPI = async (ids: string[]) => {
  try {
    const response = await fetch(`${URL}/delete-report`, {
      method: "POST",
      body: JSON.stringify({ _id: ids }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete summary");
    }

    const data = await response.json();
    console.log("Deleted successfully");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error deleting summary: ", error);
    throw error;
  }
};

export const CheckExpired = async () => {
  try {
    const response = await fetch(`${URL}/Check-Expired`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to Check Expired Tokens");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const RemoveAccount = async () => {
  try {
    let cookie = cookies().get("token");
    let oldToken = cookie ? decryptToken(cookie.value) : "";
    let newToken = uuidv4();

    const response = await fetch(`${URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldName: oldToken, newName: newToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to Delete Account");
    }

    const data = await response.json();
    let token = encryptToken(data.data);
    cookies().set("token", token);
    console.log("Account deleted successfully");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

