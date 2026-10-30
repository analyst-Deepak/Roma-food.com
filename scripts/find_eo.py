with open('scripts/loom_shared_lib.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find("Eo=")
print("pos of Eo:", pos)
print(text[max(0, pos-20):min(len(text), pos+300)])

