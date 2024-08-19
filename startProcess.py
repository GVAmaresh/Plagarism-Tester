import os

script_path_1 = "api/deep_learning/app.py"
script_path_2 = "api/g_drive/app.py"

os.system(f"start cmd /k python {script_path_1}")
os.system(f"start cmd /k python {script_path_2}")
os.system(f"start cmd /k npm run dev")
