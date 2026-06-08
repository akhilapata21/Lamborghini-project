import os
import sys
import struct

def parse_mp4_stsz(filepath):
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        return
    
    print(f"\nAnalyzing: {filepath}")
    with open(filepath, 'rb') as f:
        data = f.read()
        
        trak_offsets = []
        offset = 0
        while True:
            offset = data.find(b'trak', offset)
            if offset == -1:
                break
            trak_offsets.append(offset)
            offset += 4
            
        print(f"Found {len(trak_offsets)} tracks.")
        
        for i, trak_offset in enumerate(trak_offsets):
            end_offset = trak_offsets[i+1] if i+1 < len(trak_offsets) else len(data)
            stsz_offset = data.find(b'stsz', trak_offset, end_offset)
            
            if stsz_offset == -1:
                print(f"Track {i}: No 'stsz' atom found.")
                continue
            
            stsz_start = stsz_offset - 4
            atom_size = struct.unpack('>I', data[stsz_start:stsz_start+4])[0]
            default_sample_size = struct.unpack('>I', data[stsz_offset+8:stsz_offset+12])[0]
            entry_count = struct.unpack('>I', data[stsz_offset+12:stsz_offset+16])[0]
            
            print(f"Track {i}: default_sample_size={default_sample_size}, entry_count={entry_count}")
            
            if default_sample_size > 0:
                print(f"  Track has constant sample size: {default_sample_size} bytes.")
            elif entry_count > 0:
                sizes = []
                entry_start = stsz_offset + 16
                for j in range(min(entry_count, 1000)):
                    sz = struct.unpack('>I', data[entry_start + j*4 : entry_start + (j+1)*4])[0]
                    sizes.append(sz)
                
                avg_size = sum(sizes) / len(sizes)
                max_size = max(sizes)
                min_size = min(sizes)
                variance = sum((x - avg_size)**2 for x in sizes) / len(sizes)
                
                print(f"  Sample sizes (first 1000): avg={avg_size:.1f} bytes, min={min_size}, max={max_size}, var={variance:.1f}")
                if variance < 1.0 and avg_size < 20:
                    print("  -> Very low variance and small sizes: LIKELY SILENT AUDIO track!")
                else:
                    print("  -> Dynamic sizes: LIKELY ACTIVE AUDIO/VIDEO track!")

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "video.mp4"
    parse_mp4_stsz(path)
