import re 

def clean_text_data(raw_text): 
    cleaned_text = re.sub(r'[^\w\s,.!?\"\'()]', '', raw_text)
    cleaned_text = ' '.join(cleaned_text.split())
    return cleaned_text

raw_text = "Hello in Khmer is **\"សួស្តី\"** (pronounced \"suos-dey\"). 😊 \n"
clean_text = clean_text_data(raw_text)
print(clean_text)