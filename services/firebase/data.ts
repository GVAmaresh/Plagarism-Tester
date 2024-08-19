interface DataInterface {
  uid?: string;
  id?: string;
  title?: string;
  summary?: string;
  drive?: string;
  year?: string;
  timestamp?: string;
  category?: Array<string>;
  compare?: string;
}
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const addData = async (data: DataInterface) => {
  if (!data) return;
  try {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid.toString();
      const details = {
        title: data.title,
        summary: data.summary,
        drive: data.drive,
        year: data.year,
        timestamp: new Date().toISOString(),
        uid: uid,
        category: data.category || [],
        compare: data.compare || ""
      };

      const docRef = doc(db, `Report Section/${data.id || uid}`);
      await setDoc(docRef, details);
      console.log("Data updated successfully");
    } else {
      console.log("User is signed out");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
};

export const getDataFirebase = async () => {
  try {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      const uid = user.uid.toString();
      const q = query(
        collection(db, "Report Section"),
        where("uid", "==", uid)
      );
      const querySnapshot = await getDocs(q);

      const userReports: DataInterface[] = [];
      querySnapshot.forEach((doc) => {
        userReports.push(doc.data() as DataInterface);
      });

      return userReports;
    } else {
      console.log("User is signed out");
      return [];
    }
  } catch (error) {
    console.error("Error getting data:", error);
    return [];
  }
};

export const deleteData = async (id: string) => {
  console.log("Document ID:", id);

  try {
    const user = auth.currentUser;
    console.log("Current User:", user);

    if (!user) {
      console.log("User is signed out");
      return [];
    }

    const uid = user.uid;
    console.log("User UID:", uid);

    const docRef = doc(db, "Report Section", id);
    const q = query(collection(db, "Report Section"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    await deleteDoc(docRef);
    console.log("Document deleted successfully");

    return { success: true };
  } catch (err: any) {
    console.log("Error Deleting Document:", err);
    return { success: false, error: err.message };
  }
};

export const deleteAllData = async () => {
  try {
    const collectionRef = collection(db, "Report Section");

    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "Report Section", docSnapshot.id));
    });
    console.log("All documents deleted successfully");
  } catch (err) {
    console.log(err);
    return [];
  }
};
