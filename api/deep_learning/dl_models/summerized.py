from transformers import pipeline

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def Summerized_Text(text):
    text = text.strip()
    a = summarizer(text, max_length=130, min_length=30, do_sample=False)
    print(a)
    return a[0]['summary_text']