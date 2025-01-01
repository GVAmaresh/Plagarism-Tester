export const Load_Drive = (drive_id: string) => {
  return `https://drive.google.com/file/d/${drive_id}/view`;
};

require('dotenv').config();

export const GDRIVE_URL = process.env['NEXT_PUBLIC_DRIVE_URL'] || "";
export const ML_URL = process.env['NEXT_PUBLIC_DL_URL'] || "";
