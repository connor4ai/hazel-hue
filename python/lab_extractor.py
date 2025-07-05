#!/usr/bin/env python3
"""
LAB Color Extractor using Enhanced Utilities
Extracts skin, hair, and eye LAB values from portrait photos
Compliant with OpenAI policies - no image data sent to API
Enhanced with ChatGPT precision improvements
"""

import os
os.environ['OPENCV_VIDEOIO_PRIORITY_MSMF'] = '0'
os.environ['DISPLAY'] = ':99'  # Force headless mode

import json
import sys
from lab_utils import extract_lab, analyze_contrast_and_features

def extract_lab_from_image(image_path, debug=False):
    """
    Extract LAB values using enhanced precision methods.
    Enhanced with ChatGPT improvements for better accuracy.
    """
    try:
        lab_data = extract_lab(image_path, debug=debug)
        analysis = analyze_contrast_and_features(lab_data)
        
        # Combine LAB data with analysis
        result = {
            **lab_data,
            **analysis
        }
        
        return result
    except Exception as e:
        print(f"Error extracting LAB from {image_path}: {e}")
        # Return default neutral values
        return {
            "skin_LAB": [60.0, 2.0, 8.0],
            "hair_LAB": [40.0, 1.0, 3.0], 
            "eye_LAB": [35.0, 1.0, 2.0],
            "overall_contrast": "medium",
            "undertone": "neutral", 
            "chroma_intensity": "moderate"
        }

def main():
    """Main function to process multiple images."""
    if len(sys.argv) < 2:
        print("Usage: python lab_extractor.py <image1> [image2] [image3] ...")
        sys.exit(1)
    
    results = []
    
    for image_path in sys.argv[1:]:
        if not os.path.exists(image_path):
            print(f"Warning: Image not found: {image_path}")
            continue
            
        print(f"Processing: {image_path}")
        result = extract_lab_from_image(image_path, debug=False)
        results.append(result)
    
    # Output results as JSON
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()