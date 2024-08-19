import { TbLockExclamation } from "react-icons/tb";
export default function Request_Sign() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-24 mx-6">
        <div>
          <TbLockExclamation size={50} color="white" />
        </div>
        <div className="text-white text-2xl md:text-4xl lg:text-5xl font-semibold mt-16 text-center">
          Account doesn't exist
        </div>
        <div className="text-slate-400 text-lg md:text-xl lg:text-2xl font-medium mt-6 text-center">
            <ul>
                <li>Your account is either not logged in or does not exist. </li>
                <li>Please try logging in again using the account options in the top right corner.</li>
            </ul>
          
        </div>
      </div>
    </>
  );
}
