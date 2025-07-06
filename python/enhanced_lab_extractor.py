#!/usr/bin/env python3
"""
Enhanced LAB Color Extractor with Consistency Improvements
Addresses accuracy issues in the color analysis system
"""

import sys
import cv2
import numpy as np
import mediapipe as mp
import json
from pathlib import Path

def extract_enhanced_lab_data(image_path):
    """Extract LAB data with enhanced consistency and accuracy"""
    try:
        # Read image
        img = cv2.imread(str(image_path))
        if img is None:
            print(f"ERROR: Cannot read image {image_path}", file=sys.stderr)
            return None
        
        height, width = img.shape[:2]
        rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        lab_img = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
        
        # Initialize MediaPipe Face Mesh
        mp_face_mesh = mp.solutions.face_mesh
        face_mesh = mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.7
        )
        
        results = face_mesh.process(rgb_img)
        
        if not results.multi_face_landmarks:
            print(f"ERROR: No face detected in {image_path}", file=sys.stderr)
            return None
        
        landmarks = results.multi_face_landmarks[0]
        
        # Enhanced region definitions for consistency
        skin_regions = get_enhanced_skin_regions(landmarks, width, height)
        hair_region = get_enhanced_hair_region(landmarks, width, height, lab_img)
        eye_regions = get_enhanced_eye_regions(landmarks, width, height)
        
        # Extract LAB values with outlier removal
        skin_lab = extract_robust_lab_values(lab_img, skin_regions, "skin")
        hair_lab = extract_robust_lab_values(lab_img, [hair_region], "hair")
        eye_lab = extract_robust_lab_values(lab_img, eye_regions, "eyes")
        
        # Enhanced analysis
        contrast_level = calculate_enhanced_contrast(skin_lab, hair_lab, eye_lab)
        undertone = determine_enhanced_undertone(skin_lab, hair_lab)
        chroma = determine_enhanced_chroma(skin_lab, hair_lab, eye_lab)
        
        return {
            "skin_LAB": [round(skin_lab[0], 2), round(skin_lab[1], 2), round(skin_lab[2], 2)],
            "hair_LAB": [round(hair_lab[0], 2), round(hair_lab[1], 2), round(hair_lab[2], 2)], 
            "eye_LAB": [round(eye_lab[0], 2), round(eye_lab[1], 2), round(eye_lab[2], 2)],
            "overall_contrast": contrast_level,
            "undertone": undertone,
            "chroma_intensity": chroma
        }
        
    except Exception as e:
        print(f"ERROR processing {image_path}: {str(e)}", file=sys.stderr)
        return None

def get_enhanced_skin_regions(landmarks, width, height):
    """Get multiple skin regions for robust sampling"""
    regions = []
    
    # Center forehead (more precise)
    forehead_landmarks = [9, 10, 151, 337, 299, 333, 298, 301]
    forehead_points = np.array([[int(landmarks.landmark[i].x * width), 
                                int(landmarks.landmark[i].y * height)] for i in forehead_landmarks])
    regions.append(forehead_points)
    
    # Both cheeks (inner areas only)
    left_cheek = np.array([[int(landmarks.landmark[i].x * width),
                           int(landmarks.landmark[i].y * height)] for i in [116, 117, 118, 119, 120, 121]])
    right_cheek = np.array([[int(landmarks.landmark[i].x * width),
                            int(landmarks.landmark[i].y * height)] for i in [345, 346, 347, 348, 349, 350]])
    
    regions.extend([left_cheek, right_cheek])
    
    # Nose bridge (consistent reference)
    nose_points = np.array([[int(landmarks.landmark[i].x * width),
                            int(landmarks.landmark[i].y * height)] for i in [6, 8, 9, 10]])
    regions.append(nose_points)
    
    return regions

def get_enhanced_hair_region(landmarks, width, height, lab_img):
    """Enhanced hair detection with multiple sampling areas"""
    # Get face boundary
    face_landmarks = [10, 151, 9, 8, 168, 6, 197, 195, 196, 3, 51, 48, 115, 131, 134, 102, 49, 220, 305, 292, 330, 280, 425, 266, 446, 366, 447, 376, 435, 410, 454, 323, 361, 340, 346, 347, 348, 349, 350, 451, 452, 453, 464, 435, 410, 134]
    face_points = np.array([[int(landmarks.landmark[i].x * width), 
                            int(landmarks.landmark[i].y * height)] for i in face_landmarks])
    
    # Create expanded hair region above face
    face_top = min(face_points[:, 1])
    face_left = min(face_points[:, 0])
    face_right = max(face_points[:, 0])
    face_width = face_right - face_left
    
    # Enhanced hair region (higher up, more focused)
    hair_top = max(0, face_top - int(face_width * 0.6))
    hair_bottom = face_top + int(face_width * 0.1)
    hair_left = max(0, face_left - int(face_width * 0.1))
    hair_right = min(width, face_right + int(face_width * 0.1))
    
    hair_region = np.array([
        [hair_left, hair_top],
        [hair_right, hair_top], 
        [hair_right, hair_bottom],
        [hair_left, hair_bottom]
    ])
    
    return hair_region

def get_enhanced_eye_regions(landmarks, width, height):
    """Get both eye regions for consistent analysis"""
    # Left eye region
    left_eye = np.array([[int(landmarks.landmark[i].x * width),
                         int(landmarks.landmark[i].y * height)] for i in [33, 7, 163, 144, 145, 153, 154, 155, 133]])
    
    # Right eye region  
    right_eye = np.array([[int(landmarks.landmark[i].x * width),
                          int(landmarks.landmark[i].y * height)] for i in [362, 382, 381, 380, 374, 373, 390, 249, 263]])
    
    return [left_eye, right_eye]

def extract_robust_lab_values(lab_img, regions, region_name):
    """Extract LAB values with outlier removal and consistency checks"""
    all_values = []
    
    for region in regions:
        mask = np.zeros(lab_img.shape[:2], dtype=np.uint8)
        cv2.fillPoly(mask, [region], 255)
        
        # Get LAB values in region
        lab_values = lab_img[mask > 0]
        
        if len(lab_values) > 0:
            all_values.extend(lab_values)
    
    if len(all_values) == 0:
        print(f"WARNING: No pixels found for {region_name}", file=sys.stderr)
        return [50.0, 0.0, 0.0]  # Default neutral values
    
    all_values = np.array(all_values)
    
    # Remove outliers using IQR method for each channel
    robust_lab = []
    for channel in range(3):
        values = all_values[:, channel]
        q1, q3 = np.percentile(values, [25, 75])
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        # Filter outliers
        filtered_values = values[(values >= lower_bound) & (values <= upper_bound)]
        
        if len(filtered_values) > 0:
            # Use median for robustness
            median_val = float(np.median(filtered_values))
            # Ensure LAB values are in valid ranges
            if channel == 0:  # L* channel (0-100)
                median_val = max(0, min(100, median_val))
            else:  # a* and b* channels (-128 to +127)
                median_val = max(-128, min(127, median_val))
            robust_lab.append(median_val)
        else:
            # Fallback to mean if too many outliers
            mean_val = float(np.mean(values))
            if channel == 0:  # L* channel (0-100)
                mean_val = max(0, min(100, mean_val))
            else:  # a* and b* channels (-128 to +127)
                mean_val = max(-128, min(127, mean_val))
            robust_lab.append(mean_val)
    
    return robust_lab

def calculate_enhanced_contrast(skin_lab, hair_lab, eye_lab):
    """Enhanced contrast calculation with scientific thresholds"""
    # Calculate lightness differences
    skin_hair_diff = abs(skin_lab[0] - hair_lab[0])
    skin_eye_diff = abs(skin_lab[0] - eye_lab[0])
    hair_eye_diff = abs(hair_lab[0] - eye_lab[0])
    
    # Average contrast
    avg_contrast = (skin_hair_diff + skin_eye_diff + hair_eye_diff) / 3
    
    # Enhanced thresholds based on color analysis standards
    if avg_contrast >= 30:
        return "high"
    elif avg_contrast >= 15:
        return "medium"
    else:
        return "low"

def determine_enhanced_undertone(skin_lab, hair_lab):
    """Enhanced undertone determination using multiple factors"""
    # Primary indicator: skin a* value
    skin_a = skin_lab[1]
    
    # Secondary indicator: hair undertone
    hair_a = hair_lab[1]
    hair_b = hair_lab[2]
    
    # Weighted decision
    skin_weight = 0.7
    hair_weight = 0.3
    
    # Calculate overall undertone score
    undertone_score = (skin_a * skin_weight) + (hair_a * hair_weight)
    
    # Enhanced thresholds
    if undertone_score > 8:
        return "warm"
    elif undertone_score < 3:
        return "cool"
    else:
        return "neutral"

def determine_enhanced_chroma(skin_lab, hair_lab, eye_lab):
    """Enhanced chroma determination using saturation analysis"""
    # Calculate chroma (saturation) for each feature
    skin_chroma = np.sqrt(skin_lab[1]**2 + skin_lab[2]**2)
    hair_chroma = np.sqrt(hair_lab[1]**2 + hair_lab[2]**2)
    eye_chroma = np.sqrt(eye_lab[1]**2 + eye_lab[2]**2)
    
    # Average chroma intensity
    avg_chroma = (skin_chroma + hair_chroma + eye_chroma) / 3
    
    # Enhanced thresholds for 12-season system
    if avg_chroma >= 25:
        return "vibrant"
    elif avg_chroma >= 15:
        return "moderate"
    else:
        return "muted"

def main():
    if len(sys.argv) < 2:
        print("Usage: python enhanced_lab_extractor.py <image_path> [image_path2] ...", file=sys.stderr)
        sys.exit(1)
    
    results = []
    
    for image_path in sys.argv[1:]:
        print(f"Processing: {image_path}", file=sys.stderr)
        result = extract_enhanced_lab_data(image_path)
        if result:
            results.append(result)
    
    if not results:
        print("ERROR: No successful extractions", file=sys.stderr)
        sys.exit(1)
    
    # Output clean JSON
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()