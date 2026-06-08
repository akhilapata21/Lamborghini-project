import sys
import os
import struct

def inspect_mp4_atoms(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    print(f"\nAnalyzing atom layout: {filepath}")
    file_size = os.path.getsize(filepath)
    print(f"File size: {file_size} bytes")
    
    with open(filepath, 'rb') as f:
        offset = 0
        while offset < file_size:
            f.seek(offset)
            header = f.read(8)
            if len(header) < 8:
                break
            
            size, name = struct.unpack('>I4s', header)
            name_str = name.decode('latin1')
            
            print(f"Atom '{name_str}' at offset {offset}: size={size} bytes")
            if size == 0:
                print("  (extends to end of file)")
                break
            if size == 1:
                # 64-bit size
                size_64 = struct.unpack('>Q', f.read(8))[0]
                print(f"  (64-bit size: {size_64} bytes)")
                offset += size_64
            else:
                offset += size

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "public/video/video.mp4"
    inspect_mp4_atoms(path)
