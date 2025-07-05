#!/usr/bin/env python3
"""
LAB Color Extractor using OpenCV, MediaPipe, and scikit-image
Extracts skin, hair, and eye LAB values from portrait photos
Compliant with OpenAI policies - no image data sent to API
"""

import os
os.environ['OPENCV_VIDEOIO_PRIORITY_MSMF'] = '0'
os.environ['DISPLAY'] = ':99'  # Force headless mode

import cv2
import numpy as np
import mediapipe as mp
import json
import sys
from skimage import color

class LABColorExtractor:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5
        )
        
    def extract_skin_region(self, image, landmarks):
        """Extract skin color from face region avoiding eyes/mouth"""
        h, w = image.shape[:2]
        
        # Define skin region points (cheek area)
        skin_indices = [
            # Left cheek
            116, 117, 118, 119, 120, 121, 126, 142, 36, 205, 206, 207, 213, 192, 147, 187, 207, 58, 
            # Right cheek  
            345, 346, 347, 348, 349, 350, 451, 452, 453, 464, 435, 410, 454, 323, 361, 340, 346, 288,
            # Forehead
            10, 151, 9, 8, 107, 55, 8, 9, 10, 151, 337, 299, 333, 298, 301
        ]
        
        skin_points = []
        for idx in skin_indices:
            if idx < len(landmarks.landmark):
                x = int(landmarks.landmark[idx].x * w)
                y = int(landmarks.landmark[idx].y * h)
                skin_points.append([x, y])
        
        # Create mask for skin region
        mask = np.zeros((h, w), dtype=np.uint8)
        if len(skin_points) > 3:
            cv2.fillPoly(mask, [np.array(skin_points)], 255)
            
        # Extract skin pixels
        skin_pixels = image[mask > 0]
        if len(skin_pixels) > 0:
            return np.mean(skin_pixels, axis=0)
        return None
    
    def extract_hair_region(self, image, landmarks):
        """Extract hair color from top region of image"""
        h, w = image.shape[:2]
        
        # Get forehead landmarks to define hair region
        forehead_indices = [10, 151, 9, 8, 107, 55, 8, 9, 10, 151, 337, 299, 333, 298, 301]
        
        forehead_points = []
        for idx in forehead_indices:
            if idx < len(landmarks.landmark):
                x = int(landmarks.landmark[idx].x * w)
                y = int(landmarks.landmark[idx].y * h)
                forehead_points.append([x, y])
        
        if len(forehead_points) > 3:
            # Hair region is above forehead
            min_y = min([p[1] for p in forehead_points])
            hair_region = image[0:min_y, :]
            
            if hair_region.size > 0:
                # Use upper portion of hair region
                hair_top = hair_region[0:hair_region.shape[0]//3, :]
                return np.mean(hair_top.reshape(-1, 3), axis=0)
        
        return None
    
    def extract_eye_region(self, image, landmarks):
        """Extract eye color from iris region"""
        h, w = image.shape[:2]
        
        # Left eye landmarks
        left_eye_indices = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
        # Right eye landmarks  
        right_eye_indices = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
        
        eye_colors = []
        
        for eye_indices in [left_eye_indices, right_eye_indices]:
            eye_points = []
            for idx in eye_indices:
                if idx < len(landmarks.landmark):
                    x = int(landmarks.landmark[idx].x * w)
                    y = int(landmarks.landmark[idx].y * h)
                    eye_points.append([x, y])
            
            if len(eye_points) > 3:
                # Create mask for eye region
                mask = np.zeros((h, w), dtype=np.uint8)
                cv2.fillPoly(mask, [np.array(eye_points)], 255)
                
                # Extract center pixels (iris area)
                eye_pixels = image[mask > 0]
                if len(eye_pixels) > 0:
                    eye_colors.append(np.mean(eye_pixels, axis=0))
        
        if eye_colors:
            return np.mean(eye_colors, axis=0)
        return None
    
    def rgb_to_lab(self, rgb_color):
        """Convert RGB to LAB color space"""
        if rgb_color is None:
            return None
            
        # Normalize RGB to [0,1]
        rgb_normalized = rgb_color / 255.0
        
        # Convert to LAB
        lab_color = color.rgb2lab(rgb_normalized.reshape(1, 1, 3))
        return lab_color[0, 0].tolist()
    
    def assess_contrast_and_undertone(self, skin_lab, hair_lab, eye_lab):
        """Assess overall contrast and undertone from LAB values"""
        contrast = "medium"
        undertone = "neutral"
        chroma = "moderate"
        
        if skin_lab and hair_lab:
            # Calculate contrast based on L* (lightness) difference
            l_diff = abs(skin_lab[0] - hair_lab[0])
            if l_diff > 40:
                contrast = "high"
            elif l_diff < 20:
                contrast = "low"
            
            # Assess undertone from a* value (red-green axis)
            if skin_lab[1] > 3:
                undertone = "warm"
            elif skin_lab[1] < 1:
                undertone = "cool"
            
            # Assess chroma from a* and b* values
            chroma_value = np.sqrt(skin_lab[1]**2 + skin_lab[2]**2)
            if chroma_value > 15:
                chroma = "vibrant"
            elif chroma_value < 8:
                chroma = "muted"
        
        return contrast, undertone, chroma
    
    def process_image(self, image_path):
        """Process single image and extract LAB values"""
        try:
            # Read image
            image = cv2.imread(image_path)
            if image is None:
                raise ValueError(f"Could not read image: {image_path}")
            
            # Convert BGR to RGB
            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            
            # Detect face landmarks
            results = self.face_mesh.process(image_rgb)
            
            if not results.multi_face_landmarks:
                raise ValueError("No face detected in image")
            
            landmarks = results.multi_face_landmarks[0]
            
            # Extract color regions
            skin_rgb = self.extract_skin_region(image_rgb, landmarks)
            hair_rgb = self.extract_hair_region(image_rgb, landmarks)
            eye_rgb = self.extract_eye_region(image_rgb, landmarks)
            
            # Convert to LAB
            skin_lab = self.rgb_to_lab(skin_rgb)
            hair_lab = self.rgb_to_lab(hair_rgb)
            eye_lab = self.rgb_to_lab(eye_rgb)
            
            # Assess additional properties
            contrast, undertone, chroma = self.assess_contrast_and_undertone(
                skin_lab, hair_lab, eye_lab
            )
            
            return {
                "skin_LAB": skin_lab,
                "hair_LAB": hair_lab, 
                "eye_LAB": eye_lab,
                "overall_contrast": contrast,
                "undertone": undertone,
                "chroma_intensity": chroma
            }
            
        except Exception as e:
            print(f"Error processing {image_path}: {str(e)}", file=sys.stderr)
            return None

def main():
    if len(sys.argv) < 2:
        print("Usage: python lab_extractor.py <image_path1> [image_path2] [image_path3]")
        sys.exit(1)
    
    extractor = LABColorExtractor()
    results = []
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            result = extractor.process_image(image_path)
            if result:
                results.append(result)
        else:
            print(f"Image not found: {image_path}", file=sys.stderr)
    
    # Output results as JSON
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()