import { child, get, getDatabase, ref, set, update } from "firebase/database";
import { database } from "@/firebase/firebaseDB";

export interface userAccount {
  IDToken: string;
  Residence: string;
  userName: string;
  walletAddress: string;
  userNumber: number;
}

export function setUserNumber(): Promise<number | null> {
  return get(child(ref(database), "users/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.size;
      } else return 0;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

export async function setUserAccount(
  userName: string,
  walletAddress: string,
  IDToken: string,
) {
  const database = getDatabase();
  const userNumber = await setUserNumber();
  const userRef = ref(database, "users/");
  const snapshot = await get(userRef);
  const users = snapshot.val();

  const isDuplicate = users
    ? Object.values(users).some((user: any) => user.IDToken === IDToken)
    : false;

  if (!isDuplicate) {
    if (userNumber !== null) {
      set(ref(database, "users/" + `${userNumber + 1}`), {
        userName: userName,
        walletAddress: walletAddress,
        Residence: "",
        IDToken: IDToken,
        userNumber: userNumber + 1,
      });
    } else {
      console.log("firebase Error");
    }
  }
}

export async function getUserAccount(IDToken: string) {
  const database = getDatabase();
  const userRef = ref(database, "users/");
  const snapshot = await get(userRef);
  const users = snapshot.val();
  const userNow = users
    ? Object.values(users).find((user: any) => user.IDToken === IDToken)
    : undefined;

  return userNow;
}

export async function editResidence(
  userName: string,
  walletAddress: string,
  IDToken: string,
  userNumber: number,
  Residence: string,
) {
  const database = getDatabase();
  const userRef = ref(database, `users/${userNumber}`);
  const newData = {
    IDToken: IDToken,
    Residence: Residence,
    userName: userName,
    walletAddress: walletAddress,
    userNumber: userNumber,
  };

  //const userNow = users
  //? Object.values(users).find((user: any) => user.userNumber === userNumber)
  //: false;
  update(userRef, newData);
}
