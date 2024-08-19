from __future__ import print_function
import os
from dotenv import load_dotenv
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google.oauth2 import service_account

SCOPES = ['https://www.googleapis.com/auth/drive']

dotenv_path = '.env'
load_dotenv(dotenv_path)

details = {
    "refresh_token": os.getenv("NEXT_PUBLIC_REFRESH_TOKEN"),
    "token": os.getenv("NEXT_PUBLIC_TOKEN"),
    "token_uri": "https://oauth2.googleapis.com/token",
    "client_id": os.getenv('NEXT_PUBLIC_CLIENT_ID'),
    "client_secret": os.getenv('NEXT_PUBLIC_CLIENT_SECRET'),
    "scopes": ["https://www.googleapis.com/auth/drive"],
    "universe_domain": "googleapis.com",
    "account": "",
}

def main():
    try:
        print(details)
        creds = None
        creds = Credentials.from_authorized_user_info(details, SCOPES)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)

        service = build('drive', 'v3', credentials=creds)
        return service

    except Exception as error:
        print(f'An error occurred: {error}')
        
# results = service.files().list(
#     pageSize=10, fields="nextPageToken, files(id, name)").execute()
# items = results.get('files', [])

# if not items:
#     print('No files found.')
# else:
#     print('Files:')
#     for item in items:
#         print(u'{0} ({1})'.format(item['name'], item['id']))