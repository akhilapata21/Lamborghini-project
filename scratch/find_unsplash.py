import os

def search_unsplash(dir_path):
    print("Searching for unsplash.com in:", dir_path)
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith(('.js', '.jsx', '.html', '.css')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    if 'unsplash.com' in content:
                        print(f"Found in: {file_path}")
                        # Print lines containing unsplash
                        for i, line in enumerate(content.split('\n'), 1):
                            if 'unsplash.com' in line:
                                print(f"  Line {i}: {line.strip()}")
                except Exception as e:
                    pass

search_unsplash(r"c:\Users\apata\OneDrive\Desktop\lamborghini\src")
search_unsplash(r"c:\Users\apata\OneDrive\Desktop\lamborghini\public")
