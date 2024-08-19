from fastapi import UploadFile
from googleapiclient.http import MediaIoBaseUpload
import io
import PyPDF2

Folder_Name = "Document_DB"
file_metadata = {
    "name": "Fake",
    "mimeType": "application/vnd.google-apps.folder",
}

def check_folder(service):
    try:
        resource = service.files()
        result = resource.list(
            q=f"mimeType = 'application/vnd.google-apps.folder' and 'root' in parents",
            fields="nextPageToken, files(id, name)",
        ).execute()
        list_folders = result.get("files")
        
        folder_id = None
        
        for folder in list_folders:
            if folder["name"] == Folder_Name:
                folder_id = folder["id"]
                break
            
        if not folder_id:
            folder = service.files().create(body=file_metadata, fields="id").execute()
            folder_id = folder["id"]
        
        return folder_id, "success"
    except Exception as e:
        print(f"Error occurred while pushing file to DB: {e}")
        return None, str(e)

def extract_text_from_pdf(pdf_file_content):
    extracted_text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file_content))
        num_pages = len(pdf_reader.pages)
        for i in range(num_pages):
            page = pdf_reader.pages[i]
            page_text = page.extract_text()
            if "ABSTRACT" in page_text:
                extracted_text += page_text + "\n"
                break
        return extracted_text
    except Exception as e:
        print("An error occurred:", e)
        return None

async def extract_text_url(file:UploadFile):
    try:
        file_content = await file.read()
        extract_text = extract_text_from_pdf(file_content)
        return extract_text, "success"
    except Exception as e:
        print(f"Error occurred while pushing file to DB: {e}")
        return None, str(e)
        

async def push_file_db(service, file: UploadFile):
    try:
        folder_id, status = check_folder(service)
        
        if not folder_id:
            return [None, None, status]
        
        file_content = await file.read()
        
        file_metadata = {"name": file.filename, "parents": [folder_id]}
        media = MediaIoBaseUpload(io.BytesIO(file_content), mimetype="application/pdf")
        
        new_file = (
            service.files()
            .create(body=file_metadata, media_body=media, fields="id")
            .execute()
        )
        service.permissions().create(
            fileId=new_file["id"],
            body={"role": "reader", "type": "anyone"},
            fields="id",
        ).execute()
        
        extracted_text = extract_text_from_pdf(file_content)
        
        return new_file.get("id"), extracted_text, "success"
    
    except Exception as e:
        print(f"Error occurred while pushing file to DB: {e}")
        return None, None, str(e)
