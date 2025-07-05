#!/usr/bin/env python3
"""
Enhanced LAB Color Utilities with Improved Region Detection
Based on ChatGPT recommendations for more precise color extraction
"""

import cv2
import numpy as np
import mediapipe as mp
import sys
from skimage import color

# Tighter landmark sets (MediaPipe FaceMesh indices)
# -- skin = inner cheeks (no blush) + centre forehead
_SKIN = [98, 205, 50, 187,      # left inner cheek
         329, 424, 280, 411,    # right inner cheek
         9, 107, 336            # centre-forehead triangle
        ]

# -- hair = polygon across hairline; we'll sample *above* this
_HAIRLINE = [10, 338, 297, 332, 284, 251, 9, 8]

# -- irises
_IRIS = list(range(468, 478))

def _mask(lms, idxs, h, w):
    """Create binary mask from landmark indices."""
    if len(idxs) < 3:
        return np.zeros((h, w), dtype=bool)
    
    pts = [(int(lms.landmark[i].x * w), int(lms.landmark[i].y * h)) for i in idxs]
    pts = np.array(pts, dtype=np.int32)
    
    mask = np.zeros((h, w), dtype=np.uint8)
    cv2.fillPoly(mask, [pts], (255,))
    return mask.astype(bool)

def _median_lab(region_rgb):
    """Return median L*, a*, b* (robust against outliers)."""
    if region_rgb.size == 0:
        return [50.0, 0.0, 0.0]  # Default neutral values
    
    lab = color.rgb2lab(region_rgb.reshape(-1, 3) / 255.0)
    return [round(float(x), 2) for x in np.median(lab, axis=0)]

def extract_lab(img_path: str, debug: bool = False) -> dict:
    """
    Extract LAB color values using enhanced precision methods.
    
    Args:
        img_path: Path to image file
        debug: If True, saves debug overlay showing detected regions
        
    Returns:
        Dict with skin_LAB, hair_LAB, eye_LAB arrays
    """
    # Initialize MediaPipe
    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(
        static_image_mode=True,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5
    )
    
    # Load and process image
    img = cv2.imread(img_path)
    if img is None:
        raise ValueError(f"Could not load image: {img_path}")
    
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    h, w = rgb.shape[:2]
    
    # Detect face landmarks
    results = face_mesh.process(rgb)
    if not results.multi_face_landmarks:
        raise ValueError("No face detected in image")
    
    lms = results.multi_face_landmarks[0]
    
    # ---------- build masks ----------
    skin_m = _mask(lms, _SKIN, h, w)
    hairline_m = _mask(lms, _HAIRLINE, h, w)
    
    # shift hairline mask upward by 25 px to grab true hair pixels
    hair_m = np.zeros_like(hairline_m)
    shift = min(25, h//10)
    hair_m[:h-shift, :] = np.roll(hairline_m, -shift, axis=0)[:h-shift, :]
    
    iris_m = _mask(lms, _IRIS, h, w)
    
    out = {
        "skin_LAB": _median_lab(rgb[skin_m]),
        "hair_LAB": _median_lab(rgb[hair_m]),
        "eye_LAB": _median_lab(rgb[iris_m]),
    }
    
    # optional debug overlay
    if debug:
        overlay = rgb.copy()
        overlay[skin_m] = [255, 0, 0]    # red
        overlay[hair_m] = [0, 255, 0]    # green
        overlay[iris_m] = [0, 0, 255]    # blue
        debug_path = img_path.replace('.', '_debug_masks.')
        cv2.imwrite(debug_path, cv2.cvtColor(overlay, cv2.COLOR_RGB2BGR))
        print(f"Debug masks saved to: {debug_path}", file=sys.stderr)
    
    return out

def analyze_contrast_and_features(lab_data):
    """
    Analyze contrast and color features from LAB data.
    
    Args:
        lab_data: Dict with skin_LAB, hair_LAB, eye_LAB
        
    Returns:
        Dict with analysis results
    """
    skin_L, skin_a, skin_b = lab_data["skin_LAB"]
    hair_L, hair_a, hair_b = lab_data["hair_LAB"]
    eye_L, eye_a, eye_b = lab_data["eye_LAB"]
    
    # Calculate contrast levels
    skin_hair_contrast = abs(skin_L - hair_L)
    skin_eye_contrast = abs(skin_L - eye_L)
    overall_contrast_value = max(skin_hair_contrast, skin_eye_contrast)
    
    # Determine contrast level
    if overall_contrast_value < 20:
        overall_contrast = "low"
    elif overall_contrast_value < 35:
        overall_contrast = "medium"
    else:
        overall_contrast = "high"
    
    # Determine undertone from a* and b* values
    avg_a = (skin_a + hair_a + eye_a) / 3
    avg_b = (skin_b + hair_b + eye_b) / 3
    
    if avg_a > 2 and avg_b > 5:
        undertone = "warm"
    elif avg_a < -2 and avg_b < 2:
        undertone = "cool"
    else:
        undertone = "neutral"
    
    # Calculate chroma intensity
    skin_chroma = np.sqrt(skin_a**2 + skin_b**2)
    hair_chroma = np.sqrt(hair_a**2 + hair_b**2)
    eye_chroma = np.sqrt(eye_a**2 + eye_b**2)
    avg_chroma = (skin_chroma + hair_chroma + eye_chroma) / 3
    
    if avg_chroma < 8:
        chroma_intensity = "muted"
    elif avg_chroma < 15:
        chroma_intensity = "moderate"
    else:
        chroma_intensity = "vibrant"
    
    return {
        "overall_contrast": overall_contrast,
        "undertone": undertone,
        "chroma_intensity": chroma_intensity,
        "contrast_values": {
            "skin_hair": skin_hair_contrast,
            "skin_eye": skin_eye_contrast,
            "overall": overall_contrast_value
        },
        "chroma_values": {
            "skin": skin_chroma,
            "hair": hair_chroma,
            "eye": eye_chroma,
            "average": avg_chroma
        }
    }