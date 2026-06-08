import os
import sys
import struct

def parse_mp4_tkhd(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    print(f"\nAnalyzing track headers: {filepath}")
    with open(filepath, 'rb') as f:
        data = f.read()
        
        tkhd_offsets = []
        offset = 0
        while True:
            offset = data.find(b'tkhd', offset)
            if offset == -1:
                break
            tkhd_offsets.append(offset)
            offset += 4
            
        print(f"Found {len(tkhd_offsets)} tkhd atoms.")
        
        for i, tkhd_offset in enumerate(tkhd_offsets):
            st_start = tkhd_offset - 4
            atom_size = struct.unpack('>I', data[st_start:st_start+4])[0]
            version = data[tkhd_offset+4]
            
            payload_offset = tkhd_offset + 4
            vol_bytes = data[payload_offset+36:payload_offset+38]
            vol = struct.unpack('>H', vol_bytes)[0]
            vol_float = (vol >> 8) + (vol & 0xFF) / 256.0
            print(f"Track {i} (v0): Volume bytes={vol_bytes.hex()}, Volume value={vol_float}")

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "video.mp4"
    parse_mp4_tkhd(path)
