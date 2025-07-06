#!/usr/bin/env python3
"""
Image Quality Checker for Color Analysis
Validates image quality before LAB extraction
"""

import sys
import cv2
import numpy as np
from pathlib import Path

def check_image_quality(image_path):
    """Check if image meets quality standards for color analysis"""
    try:
        # Read image
        img = cv2.imread(str(image_path))
        if img is None:
            return {
                "valid": False,
                "reason": "Cannot read image file",
                "file_size": 0,
                "resolution": "0x0",
                "blur_score": 0
            }
        
        height, width = img.shape[:2]
        file_size = Path(image_path).stat().st_size
        
        # Check minimum resolution (should be at least 300x300)
        min_resolution = width >= 300 and height >= 300
        
        # Check file size (should be at least 50KB for decent quality)
        min_file_size = file_size >= 50000
        
        # Check for excessive blur using Laplacian variance
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur_score = cv2.Laplacian(gray, cv2.CV_64F).var()
        min_sharpness = blur_score > 100  # Higher = sharper
        
        # Check brightness distribution
        brightness = np.mean(gray)
        good_brightness = 30 < brightness < 220  # Not too dark or overexposed
        
        # Overall quality assessment
        valid = min_resolution and min_file_size and min_sharpness and good_brightness
        
        issues = []
        if not min_resolution:
            issues.append(f"Low resolution {width}x{height} (need 300x300+)")
        if not min_file_size:
            issues.append(f"Small file size {file_size//1000}KB (need 50KB+)")
        if not min_sharpness:
            issues.append(f"Blurry image (blur score: {blur_score:.0f})")
        if not good_brightness:
            issues.append(f"Poor lighting (brightness: {brightness:.0f})")
        
        return {
            "valid": bool(valid),
            "reason": "; ".join(issues) if issues else "Good quality",
            "file_size": int(file_size),
            "resolution": f"{width}x{height}",
            "blur_score": float(round(blur_score, 1)),
            "brightness": float(round(brightness, 1))
        }
        
    except Exception as e:
        return {
            "valid": False,
            "reason": f"Error checking image: {str(e)}",
            "file_size": 0,
            "resolution": "0x0",
            "blur_score": 0
        }

def main():
    if len(sys.argv) < 2:
        print("Usage: python image_quality_checker.py <image_path> [image_path2] ...")
        sys.exit(1)
    
    results = []
    
    for image_path in sys.argv[1:]:
        quality = check_image_quality(image_path)
        results.append({
            "image": image_path,
            "quality": quality
        })
    
    # Output JSON
    import json
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()