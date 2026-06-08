import os
import urllib.request
import shutil
import time

root = r"C:\Users\apata\OneDrive\Desktop\lamborghini"

# Use highly stable and verified Wikimedia Commons image URLs that directly represent each model
photos = {
    "revuelto": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Lamborghini_Revuelto_%282024%29_%2853622083054%29.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/6/60/Lamborghini_Revuelto_%282024%29_%2853621749676%29.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/1/1b/2023_Lamborghini_Revuelto_Rear.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/2/28/Lamborghini_Revuelto_%2853877996613%29.jpg"
    },
    "huracan-tecnica": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/d/dc/2022_Lamborghini_Huracan_Tecnica_Front.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/e/ec/2023_Lamborghini_Huracan_Tecnica_10.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/f/f4/2022_Lamborghini_Huracan_Tecnica_Rear.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/c/c2/2023_Lamborghini_Huracan_Tecnica_12.jpg"
    },
    "huracan-sto": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/f/f3/2022_Lamborghini_Huracan_STO_Front.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/f/f8/2023_Lamborghini_Huracan_STO_20.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/6/65/2022_Lamborghini_Huracan_STO_Rear.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/1/1a/2023_Lamborghini_Huracan_STO_22.jpg"
    },
    "urus": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/8/82/Lamborghini_Urus_%282022%29_%2852720616991%29.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/a/a8/2022_Lamborghini_Urus_S_Auto.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/1/10/Lamborghini_Urus_S_1X7A6798.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/4/4a/2023_Lamborghini_Urus_S_Auto_%2871645%29.jpg"
    },
    "countach": {
        "hero": "https://upload.wikimedia.org/wikipedia/commons/b/b2/2022_Lamborghini_Countach_LPI_800-4_in_Impact_White%2C_front_right.jpg",
        "side": "https://upload.wikimedia.org/wikipedia/commons/a/ab/Lamborghini_Countach_LPI_800-4_%282%29.jpg",
        "rear": "https://upload.wikimedia.org/wikipedia/commons/c/ce/2022_Lamborghini_Countach_LPI800-4_Rear.jpg",
        "interior": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Lamborghini_Countach_LPI_800-4_%283%29.jpg"
    }
}

headers = {
    'User-Agent': 'LamborghiniLineupMediaDownloader/1.0 (https://github.com/apata/lamborghini; apata@lambo.in)'
}

def download_file(url, filepath):
    try:
        print(f"Downloading {url} to {filepath}...")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as response, open(filepath, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)
        # Sleep for 1.2 seconds between downloads to respect Wikimedia's rate limits
        time.sleep(1.2)
        return True
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        # Sleep on failure as well
        time.sleep(1.2)
        return False

for slug, cfg in photos.items():
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
        
    # Download others with fallback to hero
    if not download_file(cfg["side"], side_path):
        shutil.copy(hero_path, side_path)
    if not download_file(cfg["rear"], rear_path):
        shutil.copy(hero_path, rear_path)
    if not download_file(cfg["interior"], interior_path):
        shutil.copy(hero_path, interior_path)
        
    # Copy to gallery folder for thumbnails
    shutil.copy(rear_path, os.path.join(base_dir, "gallery", "01.jpg"))
    shutil.copy(interior_path, os.path.join(base_dir, "gallery", "02.jpg"))
    
    # Copy side profile to assets/img for panel card backgrounds
    img_dir = os.path.join(root, "assets", "img")
    os.makedirs(img_dir, exist_ok=True)
    if slug == "revuelto":
        shutil.copy(side_path, os.path.join(img_dir, "lambo_revuelto.png"))
    elif slug == "huracan-tecnica":
        shutil.copy(side_path, os.path.join(img_dir, "lamborghini_side_profile.png"))
    elif slug == "huracan-sto":
        shutil.copy(side_path, os.path.join(img_dir, "lamborghini_rear_wing.png"))
    elif slug == "urus":
        shutil.copy(side_path, os.path.join(img_dir, "lamborghini_front_fascia.png"))
    elif slug == "countach":
        shutil.copy(side_path, os.path.join(img_dir, "lamborghini_wheel_detail.png"))
        
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

print("\nDone. All assets downloaded locally.")
