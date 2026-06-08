import os
import urllib.request
import shutil
import time

root = r"c:\Users\apata\OneDrive\Desktop\lamborghini\public"

urls = {
    "temerario": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/0/0f/Lamborghini_Temerario_Retro_Classics_2026_IMG_4738.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/4/42/Lamborghini_Temerario_%282026%29_%2855081181722%29.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Lamborghini_Temerario_IMG_5358.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/2/28/Lamborghini_Revuelto_%2853877996613%29.jpg" # Revuelto interior as sibling hybrid
    },
    "sian": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/2/22/2021_Lamborghini_Sian.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/9/95/2022_Lamborghini_Sian_2.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/2/23/Rear_of_Lamborghini_Sian_2022_FKP_37.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/2/28/Lamborghini_Revuelto_%2853877996613%29.jpg"
    },
    "aventador-svj": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Lamborghini_Aventador_SVJ_63.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/b/b8/2019_Lamborghini_Aventador_SVJ_4.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/5/58/2019_Lamborghini_Aventador_SVJ_5.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/2/28/Lamborghini_Revuelto_%2853877996613%29.jpg"
    }
}

headers = {
    'User-Agent': 'LamborghiniLineupMediaDownloader/1.0 (apata@lambo.in)'
}

def download_file(url, filepath):
    try:
        print(f"Downloading {url} to {filepath}...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as response, open(filepath, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        time.sleep(1.0) # respect rate limit
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return False

for slug, cfg in urls.items():
    print(f"\nProcessing {slug}...")
    base_dir = os.path.join(root, "assets", "models", slug)
    os.makedirs(os.path.join(base_dir, "360"), exist_ok=True)
    os.makedirs(os.path.join(base_dir, "gallery"), exist_ok=True)
    
    hero_path = os.path.join(base_dir, "hero.jpg")
    side_path = os.path.join(base_dir, "side.jpg")
    rear_path = os.path.join(base_dir, "rear.jpg")
    interior_path = os.path.join(base_dir, "interior.jpg")
    
    # Download hero
    if not download_file(cfg["hero"], hero_path):
        open(hero_path, 'a').close()
        
    # Download others with fallback
    if not download_file(cfg["side"], side_path):
        shutil.copy(hero_path, side_path)
    if not download_file(cfg["rear"], rear_path):
        shutil.copy(hero_path, rear_path)
    if not download_file(cfg["interior"], interior_path):
        shutil.copy(hero_path, interior_path)
        
    # Copy to gallery folder
    shutil.copy(rear_path, os.path.join(base_dir, "gallery", "01.jpg"))
    shutil.copy(interior_path, os.path.join(base_dir, "gallery", "02.jpg"))
    
    # Build 18 frames for 360 view
    for i in range(18):
        frame_name = f"frame-{i:03d}.jpg"
        target_frame = os.path.join(base_dir, "360", frame_name)
        if i <= 4:
            shutil.copy(hero_path, target_frame)
        elif i <= 8:
            shutil.copy(side_path, target_frame)
        elif i <= 12:
            shutil.copy(rear_path, target_frame)
        else:
            shutil.copy(side_path, target_frame)

print("\nFinished downloading new models.")
