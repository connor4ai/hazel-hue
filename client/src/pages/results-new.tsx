import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Palette, Shirt, Gem, Scissors, Sparkles, Star, ExternalLink, Users, Share2, Smartphone, Wallet } from 'lucide-react';
import { getSeasonalAssets } from '@/data/seasonalAssets';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { lazy, Suspense } from 'react';

// Lazy load palette components for better performance
const TrueWinterPalette = lazy(() => import('@/components/TrueWinterPalette'));
const BrightWinterPalette = lazy(() => import('@/components/BrightWinterPalette'));
const DarkWinterPalette = lazy(() => import('@/components/DarkWinterPalette'));
const TrueSummerPalette = lazy(() => import('@/components/TrueSummerPalette'));
const LightSummerPalette = lazy(() => import('@/components/LightSummerPalette'));
const SoftSummerPalette = lazy(() => import('@/components/SoftSummerPalette'));
const TrueSpringPalette = lazy(() => import('@/components/TrueSpringPalette'));
const BrightSpringPalette = lazy(() => import('@/components/BrightSpringPalette'));
const LightSpringPalette = lazy(() => import('@/components/LightSpringPalette'));
const TrueAutumnPalette = lazy(() => import('@/components/TrueAutumnPalette'));
const DarkAutumnPalette = lazy(() => import('@/components/DarkAutumnPalette'));
const SoftAutumnPalette = lazy(() => import('@/components/SoftAutumnPalette'));
import { PinterestPreview } from '@/components/PinterestPreview';
import InstagramStory from '@/components/InstagramStory';

// Metal color helper function
const getMetalColorSwatch = (metalName: string) => {
  const metalLower = metalName.toLowerCase();
  
  if (metalLower.includes('silver') || metalLower.includes('bright silver')) {
    return { gradient: 'bg-gradient-to-br from-gray-300 to-gray-500' };
  } else if (metalLower.includes('platinum')) {
    return { gradient: 'bg-gradient-to-br from-gray-200 to-gray-400' };
  } else if (metalLower.includes('white gold')) {
    return { gradient: 'bg-gradient-to-br from-gray-100 to-gray-300' };
  } else if (metalLower.includes('chrome')) {
    return { gradient: 'bg-gradient-to-br from-blue-100 to-blue-200' };
  } else if (metalLower.includes('gunmetal') || metalLower.includes('black metal')) {
    return { gradient: 'bg-gradient-to-br from-gray-600 to-gray-800' };
  } else if (metalLower.includes('rose gold')) {
    return { gradient: 'bg-gradient-to-br from-pink-200 to-pink-400' };
  } else if (metalLower.includes('champagne gold') || metalLower.includes('light gold')) {
    return { gradient: 'bg-gradient-to-br from-yellow-200 to-yellow-300' };
  } else if (metalLower.includes('yellow gold') || (metalLower.includes('gold') && !metalLower.includes('rose') && !metalLower.includes('white'))) {
    return { gradient: 'bg-gradient-to-br from-yellow-300 to-yellow-500' };
  } else if (metalLower.includes('brass')) {
    return { gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600' };
  } else if (metalLower.includes('copper')) {
    return { gradient: 'bg-gradient-to-br from-orange-400 to-orange-600' };
  } else if (metalLower.includes('bronze')) {
    return { gradient: 'bg-gradient-to-br from-amber-600 to-amber-800' };
  } else if (metalLower.includes('pewter')) {
    return { gradient: 'bg-gradient-to-br from-gray-400 to-gray-600' };
  } else {
    return { gradient: 'bg-gradient-to-br from-gray-300 to-gray-400' };
  }
};

// Jewelry recommendations helper function
const getJewelryRecommendations = (season: string) => {
  const jewelryRecs = {
    'Light Spring': {
      rings: 'Delicate, feminine designs',
      necklaces: 'Light, airy pieces',
      earrings: 'Small, elegant styles',
      watches: 'Thin, refined faces'
    },
    'True Spring': {
      rings: 'Bold, statement designs',
      necklaces: 'Vibrant, colorful pieces',
      earrings: 'Dramatic, eye-catching styles',
      watches: 'Sporty, energetic faces'
    },
    'Bright Spring': {
      rings: 'Modern, geometric designs',
      necklaces: 'Bold, architectural pieces',
      earrings: 'Structured, angular styles',
      watches: 'High-contrast, dynamic faces'
    },
    'Light Summer': {
      rings: 'Soft, romantic designs',
      necklaces: 'Delicate, layered pieces',
      earrings: 'Gentle, flowing styles',
      watches: 'Subtle, elegant faces'
    },
    'True Summer': {
      rings: 'Classic, timeless designs',
      necklaces: 'Sophisticated, refined pieces',
      earrings: 'Graceful, balanced styles',
      watches: 'Traditional, polished faces'
    },
    'Soft Summer': {
      rings: 'Understated, muted designs',
      necklaces: 'Gentle, harmonious pieces',
      earrings: 'Soft, blended styles',
      watches: 'Muted, sophisticated faces'
    },
    'True Winter': {
      rings: 'Sharp, dramatic designs',
      necklaces: 'Bold, statement pieces',
      earrings: 'Strong, geometric styles',
      watches: 'High-contrast, striking faces'
    },
    'Bright Winter': {
      rings: 'Clean, geometric designs',
      necklaces: 'Bold, statement pieces',
      earrings: 'Structured, angular styles',
      watches: 'Modern, sleek faces'
    },
    'Dark Winter': {
      rings: 'Sophisticated, dramatic designs',
      necklaces: 'Rich, luxurious pieces',
      earrings: 'Bold, powerful styles',
      watches: 'Dark, elegant faces'
    },
    'True Autumn': {
      rings: 'Warm, organic designs',
      necklaces: 'Rich, textured pieces',
      earrings: 'Natural, flowing styles',
      watches: 'Warm, classic faces'
    },
    'Dark Autumn': {
      rings: 'Deep, sophisticated designs',
      necklaces: 'Rich, dramatic pieces',
      earrings: 'Bold, luxurious styles',
      watches: 'Dark, refined faces'
    },
    'Soft Autumn': {
      rings: 'Muted, natural designs',
      necklaces: 'Gentle, organic pieces',
      earrings: 'Soft, harmonious styles',
      watches: 'Warm, understated faces'
    }
  };
  
  return jewelryRecs[season as keyof typeof jewelryRecs] || jewelryRecs['Bright Winter'];
};

// Eyewear recommendations helper function
const getEyewearRecommendations = (analysisResult: any) => {
  if (analysisResult.accessories && analysisResult.accessories.eyewearFrames) {
    return analysisResult.accessories.eyewearFrames;
  }
  
  // Extract frame types from the glasses description text
  const glassesText = Array.isArray(analysisResult.accessories.glasses) 
    ? analysisResult.accessories.glasses.join(' ') 
    : (analysisResult.accessories.glasses || '');
    
  const commonFrameTypes = [
    'Electric Blue Acetate', 'Bright Silver Wire', 'Chrome Wire', 'Black Frames', 'White Frames',
    'Tortoiseshell', 'Cat-Eye', 'Round Frames', 'Square Frames', 'Aviator', 'Oversized',
    'Metal Frames', 'Plastic Frames', 'Clear Frames', 'Bold Shapes', 'Minimalist',
    'Angular Frames', 'Soft Frames', 'Dark Frames', 'Light Frames'
  ];
  
  const foundFrames = commonFrameTypes.filter(frame => 
    glassesText.toLowerCase().includes(frame.toLowerCase().replace(' frames', ''))
  );
  
  return foundFrames.length > 0 ? foundFrames.slice(0, 6) : ['Black Frames', 'Silver Frames', 'Modern Frames'];
};

// Enhanced eyewear color helper function
const getEyewearColorSwatch = (frameType: string, usedNames: Set<string>) => {
  const frameTypeLower = frameType.toLowerCase();
  
  if (frameTypeLower.includes('electric blue') || frameTypeLower.includes('blue acetate')) {
    return { gradient: 'bg-gradient-to-br from-blue-400 to-blue-600', name: 'Electric Blue' };
  } else if (frameTypeLower.includes('bright silver') || frameTypeLower.includes('silver wire')) {
    return { gradient: 'bg-gradient-to-br from-gray-300 to-gray-500', name: 'Bright Silver' };
  } else if (frameTypeLower.includes('chrome wire') || frameTypeLower.includes('chrome')) {
    return { gradient: 'bg-gradient-to-br from-blue-100 to-blue-300', name: 'Chrome Wire' };
  } else if (frameTypeLower.includes('black')) {
    return { gradient: 'bg-gradient-to-br from-gray-800 to-black', name: 'Black' };
  } else if (frameTypeLower.includes('white')) {
    return { gradient: 'bg-gradient-to-br from-gray-100 to-gray-200', name: 'White' };
  } else if (frameTypeLower.includes('tortoiseshell') || frameTypeLower.includes('tortoise')) {
    return { gradient: 'bg-gradient-to-br from-amber-600 to-amber-800', name: 'Tortoiseshell' };
  } else if (frameTypeLower.includes('clear')) {
    return { gradient: 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200', name: 'Clear' };
  } else if (frameTypeLower.includes('gold') || frameTypeLower.includes('golden')) {
    return { gradient: 'bg-gradient-to-br from-yellow-300 to-yellow-500', name: 'Gold' };
  } else if (frameTypeLower.includes('rose gold')) {
    return { gradient: 'bg-gradient-to-br from-pink-200 to-pink-400', name: 'Rose Gold' };
  } else if (frameTypeLower.includes('metal') || frameTypeLower.includes('silver')) {
    return { gradient: 'bg-gradient-to-br from-gray-300 to-gray-400', name: 'Silver' };
  } else if (frameTypeLower.includes('modern')) {
    return { gradient: 'bg-gradient-to-br from-slate-400 to-slate-600', name: 'Modern' };
  } else if (frameTypeLower.includes('classic')) {
    return { gradient: 'bg-gradient-to-br from-gray-600 to-gray-700', name: 'Classic' };
  } else {
    return { gradient: 'bg-gradient-to-br from-gray-400 to-gray-600', name: 'Frame' };
  }
};

// Best metals helper function
const getBestMetals = (analysisResult: any) => {
  if (analysisResult.accessories && analysisResult.accessories.bestMetals) {
    return analysisResult.accessories.bestMetals;
  }
  
  // Fallback - extract metals from the metals description text
  const metalsText = analysisResult.accessories?.metals || '';
  const commonMetals = [
    'Silver', 'Gold', 'Rose Gold', 'White Gold', 'Platinum', 'Chrome', 
    'Gunmetal', 'Brass', 'Copper', 'Bronze', 'Pewter', 'Champagne Gold',
    'Light Gold', 'Yellow Gold'
  ];
  
  const foundMetals = commonMetals.filter(metal => 
    metalsText.toLowerCase().includes(metal.toLowerCase())
  );
  
  return foundMetals.length > 0 ? foundMetals.slice(0, 5) : ['Silver', 'Gold', 'Rose Gold', 'Gunmetal', 'Brass'];
};

// Hair colors to avoid helper function
const getHairColorsToAvoid = (season: string) => {
  const hairAvoidColors = {
    'Light Spring': [
      { name: 'Black', color: '#000000' },
      { name: 'Ash Blonde', color: '#C0C0C0' },
      { name: 'Cool Brown', color: '#8B4513' },
      { name: 'Platinum', color: '#E5E4E2' }
    ],
    'True Spring': [
      { name: 'Ash Tones', color: '#A9A9A9' },
      { name: 'Cool Colors', color: '#778899' },
      { name: 'Black', color: '#000000' },
      { name: 'Platinum', color: '#E5E4E2' }
    ],
    'Bright Spring': [
      { name: 'Muted Colors', color: '#D2B48C' },
      { name: 'Ash Tones', color: '#A9A9A9' },
      { name: 'Cool Brown', color: '#8B4513' },
      { name: 'Gray', color: '#808080' }
    ],
    'Light Summer': [
      { name: 'Warm Tones', color: '#D2691E' },
      { name: 'Golden Brown', color: '#DAA520' },
      { name: 'Auburn', color: '#A52A2A' },
      { name: 'Brassy Blonde', color: '#FFA500' }
    ],
    'True Summer': [
      { name: 'Warm Colors', color: '#CD853F' },
      { name: 'Golden Tones', color: '#FFD700' },
      { name: 'Auburn', color: '#A52A2A' },
      { name: 'Orange Tones', color: '#FF8C00' }
    ],
    'Soft Summer': [
      { name: 'Harsh Colors', color: '#000000' },
      { name: 'Bright Tones', color: '#FF0000' },
      { name: 'Golden Brown', color: '#DAA520' },
      { name: 'Warm Auburn', color: '#A0522D' }
    ],
    'True Winter': [
      { name: 'Warm Tones', color: '#D2691E' },
      { name: 'Golden Brown', color: '#DAA520' },
      { name: 'Auburn', color: '#A52A2A' },
      { name: 'Orange Red', color: '#FF4500' }
    ],
    'Bright Winter': [
      { name: 'Muted Colors', color: '#D2B48C' },
      { name: 'Warm Brown', color: '#8B4513' },
      { name: 'Golden Tones', color: '#DAA520' },
      { name: 'Auburn', color: '#A52A2A' }
    ],
    'Dark Winter': [
      { name: 'Light Colors', color: '#F5F5DC' },
      { name: 'Warm Tones', color: '#D2691E' },
      { name: 'Golden Brown', color: '#DAA520' },
      { name: 'Light Brown', color: '#DEB887' }
    ],
    'True Autumn': [
      { name: 'Cool Colors', color: '#4682B4' },
      { name: 'Ash Tones', color: '#A9A9A9' },
      { name: 'Black', color: '#000000' },
      { name: 'Platinum', color: '#E5E4E2' }
    ],
    'Dark Autumn': [
      { name: 'Light Colors', color: '#F5F5DC' },
      { name: 'Cool Tones', color: '#4682B4' },
      { name: 'Ash Blonde', color: '#C0C0C0' },
      { name: 'Platinum', color: '#E5E4E2' }
    ],
    'Soft Autumn': [
      { name: 'Bright Colors', color: '#FF0000' },
      { name: 'Black', color: '#000000' },
      { name: 'Cool Tones', color: '#4682B4' },
      { name: 'Ash Tones', color: '#A9A9A9' }
    ]
  };
  
  return hairAvoidColors[season as keyof typeof hairAvoidColors] || hairAvoidColors['Light Spring'];
};

// Enhanced jewelry display helper function
const getJewelryDisplay = (jewelryItem: string) => {
  const itemLower = jewelryItem.toLowerCase();
  
  // Style/Shape-based items get icons
  if (itemLower.includes('vintage') || itemLower.includes('brooch')) {
    return { type: 'icon', icon: '🏺', name: 'Vintage', bgClass: 'bg-amber-100' };
  } else if (itemLower.includes('chain') || itemLower.includes('heavy')) {
    return { type: 'icon', icon: '🔗', name: 'Chain', bgClass: 'bg-gray-100' };
  } else if (itemLower.includes('geometric') || itemLower.includes('angular')) {
    return { type: 'icon', icon: '⬟', name: 'Geometric', bgClass: 'bg-blue-100' };
  } else if (itemLower.includes('delicate') || itemLower.includes('fine')) {
    return { type: 'icon', icon: '✨', name: 'Delicate', bgClass: 'bg-pink-100' };
  } else if (itemLower.includes('statement') || itemLower.includes('bold')) {
    return { type: 'icon', icon: '💎', name: 'Statement', bgClass: 'bg-purple-100' };
  } else if (itemLower.includes('minimalist') || itemLower.includes('simple')) {
    return { type: 'icon', icon: '○', name: 'Minimalist', bgClass: 'bg-gray-50' };
  } else if (itemLower.includes('ornate') || itemLower.includes('detailed')) {
    return { type: 'icon', icon: '🌟', name: 'Ornate', bgClass: 'bg-yellow-100' };
  } else if (itemLower.includes('architectural') || itemLower.includes('structured')) {
    return { type: 'icon', icon: '⬜', name: 'Architectural', bgClass: 'bg-slate-100' };
  }
  
  // Color/Material-based items get color swatches
  else if (itemLower.includes('silver')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-gray-300 to-gray-500', name: 'Silver' };
  } else if (itemLower.includes('gold') && !itemLower.includes('rose')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600', name: 'Gold' };
  } else if (itemLower.includes('rose gold')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-pink-300 to-pink-500', name: 'Rose Gold' };
  } else if (itemLower.includes('gemstone') || itemLower.includes('deep-set')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700', name: 'Gemstone' };
  } else if (itemLower.includes('pearl')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-gray-50 to-gray-200', name: 'Pearl' };
  } else if (itemLower.includes('crystal') || itemLower.includes('diamond')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-blue-100 to-blue-300', name: 'Crystal' };
  } else if (itemLower.includes('onyx') || itemLower.includes('black')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-gray-800 to-black', name: 'Onyx' };
  } else if (itemLower.includes('emerald')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-700', name: 'Emerald' };
  } else if (itemLower.includes('sapphire')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-blue-600 to-blue-800', name: 'Sapphire' };
  } else if (itemLower.includes('ruby')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-red-500 to-red-700', name: 'Ruby' };
  } else if (itemLower.includes('amethyst')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-purple-400 to-purple-600', name: 'Amethyst' };
  } else if (itemLower.includes('turquoise')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-cyan-400 to-cyan-600', name: 'Turquoise' };
  } else if (itemLower.includes('coral')) {
    return { type: 'color', gradient: 'bg-gradient-to-br from-orange-400 to-orange-600', name: 'Coral' };
  }
  
  // Default fallback
  return { type: 'color', gradient: 'bg-gradient-to-br from-slate-400 to-slate-600', name: 'Jewelry' };
};



// Makeup color helper functions
const getFoundationColors = (season: string) => {
  const foundations = {
    'True Winter': [
      { hex: '#F5DEB3', name: 'Cool Undertone' },
      { hex: '#DEB887', name: 'Cool Beige' },
      { hex: '#D2B48C', name: 'Cool Tan' }
    ],
    'Bright Winter': [
      { hex: '#F5DEB3', name: 'Cool Undertone' },
      { hex: '#DEB887', name: 'Clear Beige' },
      { hex: '#D2B48C', name: 'Cool Tan' }
    ],
    'Dark Winter': [
      { hex: '#F5DEB3', name: 'Cool Undertone' },
      { hex: '#DEB887', name: 'Cool Beige' },
      { hex: '#D2B48C', name: 'Cool Tan' }
    ],
    'True Summer': [
      { hex: '#F5DEB3', name: 'Cool Undertone' },
      { hex: '#DEB887', name: 'Muted Beige' },
      { hex: '#D2B48C', name: 'Soft Tan' }
    ],
    'Light Summer': [
      { hex: '#FFF8DC', name: 'Light Cool' },
      { hex: '#F5DEB3', name: 'Light Beige' },
      { hex: '#FAEBD7', name: 'Light Porcelain' }
    ],
    'Soft Summer': [
      { hex: '#F5DEB3', name: 'Neutral Undertone' },
      { hex: '#DEB887', name: 'Soft Beige' },
      { hex: '#D2B48C', name: 'Muted Tan' }
    ],
    'True Spring': [
      { hex: '#FFEFD5', name: 'Warm Undertone' },
      { hex: '#F5DEB3', name: 'Warm Beige' },
      { hex: '#DEB887', name: 'Golden Tan' }
    ],
    'Bright Spring': [
      { hex: '#FFEFD5', name: 'Clear Warm' },
      { hex: '#F5DEB3', name: 'Clear Beige' },
      { hex: '#DEB887', name: 'Golden Tan' }
    ],
    'Light Spring': [
      { hex: '#FFF8DC', name: 'Light Warm' },
      { hex: '#FFEFD5', name: 'Light Peach' },
      { hex: '#F5DEB3', name: 'Light Golden' }
    ],
    'True Autumn': [
      { hex: '#FFEFD5', name: 'Warm Undertone' },
      { hex: '#DEB887', name: 'Golden Beige' },
      { hex: '#D2B48C', name: 'Warm Tan' }
    ],
    'Dark Autumn': [
      { hex: '#DEB887', name: 'Deep Warm' },
      { hex: '#D2B48C', name: 'Rich Golden' },
      { hex: '#BC8F8F', name: 'Deep Bronze' }
    ],
    'Soft Autumn': [
      { hex: '#F5DEB3', name: 'Muted Warm' },
      { hex: '#DEB887', name: 'Soft Golden' },
      { hex: '#D2B48C', name: 'Muted Tan' }
    ]
  };
  return foundations[season as keyof typeof foundations] || foundations['True Winter'];
};

const getEyeshadowColors = (season: string) => {
  const eyeshadows = {
    'True Winter': [
      { hex: '#800080', name: 'Deep Purple' },
      { hex: '#228B22', name: 'Forest Green' },
      { hex: '#36454F', name: 'Charcoal' },
      { hex: '#C0C0C0', name: 'Silver' }
    ],
    'Bright Winter': [
      { hex: '#FF1493', name: 'Hot Pink' },
      { hex: '#0080FF', name: 'Electric Blue' },
      { hex: '#8A2BE2', name: 'Electric Purple' },
      { hex: '#00FFFF', name: 'Bright Turquoise' }
    ],
    'Dark Winter': [
      { hex: '#800080', name: 'Deep Purple' },
      { hex: '#228B22', name: 'Forest Green' },
      { hex: '#36454F', name: 'Charcoal' },
      { hex: '#000000', name: 'Black' }
    ],
    'True Summer': [
      { hex: '#D8BFD8', name: 'Soft Lavender' },
      { hex: '#B0C4DE', name: 'Soft Blue' },
      { hex: '#DDA0DD', name: 'Soft Pink' },
      { hex: '#808080', name: 'Soft Gray' }
    ],
    'Light Summer': [
      { hex: '#E6E6FA', name: 'Light Lavender' },
      { hex: '#ADD8E6', name: 'Light Blue' },
      { hex: '#FFB6C1', name: 'Light Pink' },
      { hex: '#F5F5DC', name: 'Light Taupe' }
    ],
    'Soft Summer': [
      { hex: '#D2B48C', name: 'Soft Taupe' },
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#9ACD32', name: 'Sage Green' },
      { hex: '#D8BFD8', name: 'Soft Mauve' }
    ],
    'True Spring': [
      { hex: '#32CD32', name: 'Fresh Green' },
      { hex: '#FFD700', name: 'Golden Yellow' },
      { hex: '#FF6347', name: 'Coral' },
      { hex: '#40E0D0', name: 'Turquoise' }
    ],
    'Bright Spring': [
      { hex: '#00FF00', name: 'Electric Green' },
      { hex: '#FFFF00', name: 'Bright Yellow' },
      { hex: '#FF4500', name: 'Bright Orange' },
      { hex: '#00FFFF', name: 'Electric Turquoise' }
    ],
    'Light Spring': [
      { hex: '#98FB98', name: 'Light Green' },
      { hex: '#FFFFE0', name: 'Light Yellow' },
      { hex: '#FFDAB9', name: 'Light Peach' },
      { hex: '#E0FFFF', name: 'Light Turquoise' }
    ],
    'True Autumn': [
      { hex: '#8B4513', name: 'Rich Brown' },
      { hex: '#B8860B', name: 'Golden Bronze' },
      { hex: '#CD853F', name: 'Rust' },
      { hex: '#228B22', name: 'Forest Green' }
    ],
    'Dark Autumn': [
      { hex: '#654321', name: 'Espresso' },
      { hex: '#B8860B', name: 'Dark Copper' },
      { hex: '#A0522D', name: 'Deep Rust' },
      { hex: '#8B0000', name: 'Burgundy' }
    ],
    'Soft Autumn': [
      { hex: '#D2B48C', name: 'Soft Taupe' },
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#9ACD32', name: 'Sage Green' },
      { hex: '#CD853F', name: 'Muted Bronze' }
    ]
  };
  return eyeshadows[season as keyof typeof eyeshadows] || eyeshadows['True Winter'];
};

const getBlushColors = (season: string) => {
  const blushes = {
    'True Winter': [
      { hex: '#8B0000', name: 'Deep Rose' },
      { hex: '#722F37', name: 'Burgundy' },
      { hex: '#8B008B', name: 'Deep Berry' }
    ],
    'Bright Winter': [
      { hex: '#FF1493', name: 'Bright Pink' },
      { hex: '#FF69B4', name: 'Cool Rose' },
      { hex: '#8B008B', name: 'Berry' }
    ],
    'Dark Winter': [
      { hex: '#8B0000', name: 'Deep Rose' },
      { hex: '#722F37', name: 'Burgundy' },
      { hex: '#8B008B', name: 'Deep Berry' }
    ],
    'True Summer': [
      { hex: '#F08080', name: 'Soft Rose' },
      { hex: '#DDA0DD', name: 'Dusty Pink' },
      { hex: '#E6E6FA', name: 'Soft Lavender' }
    ],
    'Light Summer': [
      { hex: '#FFB6C1', name: 'Light Pink' },
      { hex: '#FFC0CB', name: 'Soft Rose' },
      { hex: '#E6E6FA', name: 'Light Lavender' }
    ],
    'Soft Summer': [
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#F0E68C', name: 'Muted Coral' },
      { hex: '#CD853F', name: 'Soft Bronze' }
    ],
    'True Spring': [
      { hex: '#FF6347', name: 'Warm Coral' },
      { hex: '#FF7F50', name: 'Peach' },
      { hex: '#FFB6C1', name: 'Warm Pink' }
    ],
    'Bright Spring': [
      { hex: '#FF6347', name: 'Electric Coral' },
      { hex: '#FF1493', name: 'Electric Pink' },
      { hex: '#FF7F50', name: 'Bright Peach' }
    ],
    'Light Spring': [
      { hex: '#FFDAB9', name: 'Light Peach' },
      { hex: '#FFB6C1', name: 'Light Coral' },
      { hex: '#FFC0CB', name: 'Light Pink' }
    ],
    'True Autumn': [
      { hex: '#CD853F', name: 'Warm Bronze' },
      { hex: '#FF6347', name: 'Warm Coral' },
      { hex: '#FF7F50', name: 'Peach' }
    ],
    'Dark Autumn': [
      { hex: '#CD853F', name: 'Deep Bronze' },
      { hex: '#800020', name: 'Warm Burgundy' },
      { hex: '#A0522D', name: 'Dark Rust' }
    ],
    'Soft Autumn': [
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#F0E68C', name: 'Muted Coral' },
      { hex: '#CD853F', name: 'Soft Bronze' }
    ]
  };
  return blushes[season as keyof typeof blushes] || blushes['True Winter'];
};

const getLipstickColors = (season: string) => {
  const lipsticks = {
    'True Winter': [
      { hex: '#800020', name: 'Deep Burgundy' },
      { hex: '#722F37', name: 'Wine' },
      { hex: '#8B008B', name: 'Deep Berry' },
      { hex: '#8B0000', name: 'Dark Red' }
    ],
    'Bright Winter': [
      { hex: '#FF0000', name: 'Bright Red' },
      { hex: '#FF1493', name: 'Hot Pink' },
      { hex: '#8A2BE2', name: 'Electric Purple' },
      { hex: '#8B008B', name: 'Electric Berry' }
    ],
    'Dark Winter': [
      { hex: '#800020', name: 'Deep Burgundy' },
      { hex: '#722F37', name: 'Wine' },
      { hex: '#8B008B', name: 'Deep Berry' },
      { hex: '#8B0000', name: 'Dark Red' }
    ],
    'True Summer': [
      { hex: '#F08080', name: 'Soft Rose' },
      { hex: '#DDA0DD', name: 'Dusty Pink' },
      { hex: '#E6E6FA', name: 'Soft Lavender' },
      { hex: '#BC8F8F', name: 'Muted Berry' }
    ],
    'Light Summer': [
      { hex: '#FFB6C1', name: 'Light Pink' },
      { hex: '#FFC0CB', name: 'Soft Rose' },
      { hex: '#FAEBD7', name: 'Nude Pink' },
      { hex: '#E6E6FA', name: 'Light Lavender' }
    ],
    'Soft Summer': [
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#F0E68C', name: 'Soft Coral' },
      { hex: '#DEB887', name: 'Warm Nude' },
      { hex: '#D8BFD8', name: 'Soft Plum' }
    ],
    'True Spring': [
      { hex: '#FF6347', name: 'Coral' },
      { hex: '#FF7F50', name: 'Peach' },
      { hex: '#FF4500', name: 'Warm Red' },
      { hex: '#FFB6C1', name: 'Warm Pink' }
    ],
    'Bright Spring': [
      { hex: '#FF0000', name: 'True Red' },
      { hex: '#FF6347', name: 'Electric Coral' },
      { hex: '#FF1493', name: 'Electric Pink' },
      { hex: '#FF4500', name: 'Bright Orange' }
    ],
    'Light Spring': [
      { hex: '#FFDAB9', name: 'Light Peach' },
      { hex: '#FFB6C1', name: 'Light Coral' },
      { hex: '#FFC0CB', name: 'Light Pink' },
      { hex: '#FFEFD5', name: 'Nude Peach' }
    ],
    'True Autumn': [
      { hex: '#CD853F', name: 'Bronze' },
      { hex: '#FF6347', name: 'Coral' },
      { hex: '#8B4513', name: 'Rich Brown' },
      { hex: '#A0522D', name: 'Rust' }
    ],
    'Dark Autumn': [
      { hex: '#CD853F', name: 'Deep Bronze' },
      { hex: '#722F37', name: 'Wine' },
      { hex: '#A0522D', name: 'Rich Rust' },
      { hex: '#800020', name: 'Deep Burgundy' }
    ],
    'Soft Autumn': [
      { hex: '#BC8F8F', name: 'Dusty Rose' },
      { hex: '#F0E68C', name: 'Soft Coral' },
      { hex: '#DEB887', name: 'Warm Nude' },
      { hex: '#DDA0DD', name: 'Muted Berry' }
    ]
  };
  return lipsticks[season as keyof typeof lipsticks] || lipsticks['True Winter'];
};

const getEyelinerColors = (season: string) => {
  const eyeliners = {
    'True Winter': [
      { hex: '#000000', name: 'Black' },
      { hex: '#800020', name: 'Deep Burgundy' },
      { hex: '#228B22', name: 'Forest Green' }
    ],
    'Bright Winter': [
      { hex: '#000000', name: 'Jet Black' },
      { hex: '#0080FF', name: 'Bright Blue' },
      { hex: '#8A2BE2', name: 'Purple' }
    ],
    'Dark Winter': [
      { hex: '#000000', name: 'Black' },
      { hex: '#800020', name: 'Deep Burgundy' },
      { hex: '#228B22', name: 'Forest Green' }
    ],
    'True Summer': [
      { hex: '#696969', name: 'Soft Gray' },
      { hex: '#4682B4', name: 'Soft Blue' },
      { hex: '#D8BFD8', name: 'Soft Lavender' }
    ],
    'Light Summer': [
      { hex: '#A9A9A9', name: 'Light Gray' },
      { hex: '#8FBC8F', name: 'Soft Gray-Green' },
      { hex: '#DDA0DD', name: 'Soft Pink' }
    ],
    'Soft Summer': [
      { hex: '#8B4513', name: 'Soft Brown' },
      { hex: '#9ACD32', name: 'Sage Green' },
      { hex: '#BC8F8F', name: 'Dusty Rose' }
    ],
    'True Spring': [
      { hex: '#8B4513', name: 'Warm Brown' },
      { hex: '#32CD32', name: 'Green' },
      { hex: '#000080', name: 'Navy' }
    ],
    'Bright Spring': [
      { hex: '#000000', name: 'Black' },
      { hex: '#00FF00', name: 'Electric Green' },
      { hex: '#0000FF', name: 'Electric Blue' }
    ],
    'Light Spring': [
      { hex: '#D2691E', name: 'Light Brown' },
      { hex: '#98FB98', name: 'Light Green' },
      { hex: '#4682B4', name: 'Light Blue' }
    ],
    'True Autumn': [
      { hex: '#8B4513', name: 'Rich Brown' },
      { hex: '#228B22', name: 'Forest Green' },
      { hex: '#B8860B', name: 'Golden Bronze' }
    ],
    'Dark Autumn': [
      { hex: '#8B4513', name: 'Dark Brown' },
      { hex: '#228B22', name: 'Forest Green' },
      { hex: '#800020', name: 'Burgundy' }
    ],
    'Soft Autumn': [
      { hex: '#8B4513', name: 'Soft Brown' },
      { hex: '#9ACD32', name: 'Sage Green' },
      { hex: '#BC8F8F', name: 'Dusty Rose' }
    ]
  };
  return eyeliners[season as keyof typeof eyeliners] || eyeliners['True Winter'];
};

interface AnalysisResult {
  season: string;
  description: string;
  coreNeutrals: string[];
  accentLights: string[];
  accentBrights: string[];
  recommendations: {
    metals: string;
    eyewear: string;
    makeup: string;
  };
  overview: {
    keyCharacteristics: string[];
    signatureColors: string[];
    colorsToAvoid: string[];
    description: string;
  };
  colorPalette: {
    htmlContent: string;
    coreNeutrals: string[];
    accentLights: string[];
    accentBrights: string[];
  };
  clothing: {
    pinterestUrl: string;
    guidelines: string[];
  };
  accessories: {
    metals: string;
    jewelry: string[];
    watches: string[];
    glasses: string[];
  };
  hairColor: {
    bestColors: string[];
    avoidColors: string[];
    guidance: string;
  };
  makeup: {
    pinterestUrl: string;
    guidelines: string[];
  };
  celebrities: string[];
}

interface Order {
  id: number;
  status: string;
  analysisResult: AnalysisResult | null;
  pdfPath: string | null;
  createdAt: string;
}

// Parse signature colors to extract hex codes and names
const parseSignatureColor = (colorString: string) => {
  // Check if the string contains a hex code
  const hexMatch = colorString.match(/#[0-9A-Fa-f]{6}/);
  
  if (hexMatch) {
    // Extract hex code
    const hex = hexMatch[0];
    
    // Extract color name (everything before the hex code, remove parentheses and descriptions)
    let name = colorString.split('(')[0].split(' - ')[0].trim();
    
    // Remove any descriptive text that might be after the color name
    name = name.replace(/\s*-\s*.*$/, '').trim();
    
    return { hex, name: name || 'Color' };
  } else {
    // If no hex code found, treat the entire string as a color name
    // and assign a default hex based on common color names
    const colorName = colorString.trim();
    const defaultHex = getDefaultHexForColorName(colorName);
    
    return { hex: defaultHex, name: colorName };
  }
};

// Helper function to get default hex codes for common color names
const getDefaultHexForColorName = (colorName: string): string => {
  const colorMap: { [key: string]: string } = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#008000',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'orange': '#FFA500',
    'brown': '#A52A2A',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'grey': '#808080',
    'navy': '#000080',
    'coral': '#FF7F50',
    'turquoise': '#40E0D0',
    'emerald': '#50C878',
    'burgundy': '#800020',
    'maroon': '#800000',
    'teal': '#008080',
    'gold': '#FFD700',
    'silver': '#C0C0C0'
  };
  
  const lowerName = colorName.toLowerCase();
  for (const [name, hex] of Object.entries(colorMap)) {
    if (lowerName.includes(name)) {
      return hex;
    }
  }
  
  return '#808080'; // Default gray
};

// Get colors to avoid for each season with appropriate hex codes
const getColorsToAvoid = (season: string) => {
  const avoidColors = {
    'True Winter': [
      { name: 'Orange', code: '#FFA500' },
      { name: 'Peach', code: '#FFCBA4' },
      { name: 'Coral', code: '#FF7F50' },
      { name: 'Warm Yellow', code: '#FFD700' },
      { name: 'Golden Brown', code: '#DAA520' },
      { name: 'Olive Green', code: '#808000' },
      { name: 'Sage Green', code: '#9CAF88' },
      { name: 'Taupe', code: '#483C32' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Cream', code: '#FFFDD0' },
      { name: 'Rust', code: '#B7410E' },
      { name: 'Terracotta', code: '#E2725B' }
    ],
    'Bright Winter': [
      { name: 'Peach', code: '#FFCBA4' },
      { name: 'Coral', code: '#FF7F50' },
      { name: 'Orange', code: '#FFA500' },
      { name: 'Warm Yellow', code: '#FFD700' },
      { name: 'Golden Brown', code: '#DAA520' },
      { name: 'Olive Green', code: '#808000' },
      { name: 'Dusty Colors', code: '#D2B48C' },
      { name: 'Muted Tones', code: '#A0A0A0' },
      { name: 'Sage Green', code: '#9CAF88' },
      { name: 'Taupe', code: '#483C32' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Cream', code: '#FFFDD0' }
    ],
    'Dark Winter': [
      { name: 'Light Pastels', code: '#FFB6C1' },
      { name: 'Bright Yellow', code: '#FFFF00' },
      { name: 'Orange', code: '#FFA500' },
      { name: 'Peach', code: '#FFCBA4' },
      { name: 'Coral', code: '#FF7F50' },
      { name: 'Light Pink', code: '#FFB6C1' },
      { name: 'Sage Green', code: '#9CAF88' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Taupe', code: '#483C32' },
      { name: 'Cream', code: '#FFFDD0' },
      { name: 'Golden Colors', code: '#DAA520' },
      { name: 'Light Blue', code: '#ADD8E6' }
    ],
    'True Summer': [
      { name: 'Orange', code: '#FFA500' },
      { name: 'Bright Yellow', code: '#FFFF00' },
      { name: 'Warm Red', code: '#DC143C' },
      { name: 'Golden Brown', code: '#DAA520' },
      { name: 'Rust', code: '#B7410E' },
      { name: 'Terracotta', code: '#E2725B' },
      { name: 'Black', code: '#000000' },
      { name: 'Pure White', code: '#FFFFFF' },
      { name: 'Bright Colors', code: '#FF1493' },
      { name: 'Neon Tones', code: '#00FF00' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Electric Blue', code: '#0080FF' }
    ],
    'Light Summer': [
      { name: 'Dark Colors', code: '#000000' },
      { name: 'Orange', code: '#FFA500' },
      { name: 'Bright Yellow', code: '#FFFF00' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Electric Blue', code: '#0080FF' },
      { name: 'Rust', code: '#B7410E' },
      { name: 'Golden Brown', code: '#DAA520' },
      { name: 'Terracotta', code: '#E2725B' },
      { name: 'Bright Red', code: '#FF0000' },
      { name: 'Neon Colors', code: '#00FF00' },
      { name: 'Deep Purple', code: '#800080' },
      { name: 'Charcoal', code: '#36454F' }
    ],
    'Soft Summer': [
      { name: 'Bright Colors', code: '#FF1493' },
      { name: 'Neon Tones', code: '#00FF00' },
      { name: 'Orange', code: '#FFA500' },
      { name: 'Hot Yellow', code: '#FFFF00' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Electric Blue', code: '#0080FF' },
      { name: 'Pure White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' },
      { name: 'Rust', code: '#B7410E' },
      { name: 'Golden Brown', code: '#DAA520' },
      { name: 'Terracotta', code: '#E2725B' },
      { name: 'Bright Red', code: '#FF0000' }
    ],
    'True Spring': [
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' },
      { name: 'Cool Pink', code: '#FFB6C1' },
      { name: 'Cool Blue', code: '#87CEEB' },
      { name: 'Cool Purple', code: '#DDA0DD' },
      { name: 'Burgundy', code: '#800020' },
      { name: 'Dusty Colors', code: '#D2B48C' },
      { name: 'Muted Tones', code: '#A0A0A0' },
      { name: 'Gray', code: '#808080' },
      { name: 'Taupe', code: '#483C32' },
      { name: 'Cool Green', code: '#008080' },
      { name: 'Ash Brown', code: '#A52A2A' }
    ],
    'Bright Spring': [
      { name: 'Muted Colors', code: '#A0A0A0' },
      { name: 'Dusty Tones', code: '#D2B48C' },
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Soft Colors', code: '#FFE4E1' },
      { name: 'Pastels', code: '#E6E6FA' },
      { name: 'Earth Tones', code: '#8B4513' },
      { name: 'Brown', code: '#A52A2A' },
      { name: 'Burgundy', code: '#800020' },
      { name: 'Navy', code: '#000080' },
      { name: 'Cool Purple', code: '#DDA0DD' }
    ],
    'Light Spring': [
      { name: 'Dark Colors', code: '#000000' },
      { name: 'Navy', code: '#000080' },
      { name: 'Burgundy', code: '#800020' },
      { name: 'Deep Purple', code: '#800080' },
      { name: 'Forest Green', code: '#228B22' },
      { name: 'Rust', code: '#B7410E' },
      { name: 'Brown', code: '#A52A2A' },
      { name: 'Charcoal', code: '#36454F' },
      { name: 'Cool Pink', code: '#FFB6C1' },
      { name: 'Cool Blue', code: '#87CEEB' },
      { name: 'Dusty Colors', code: '#D2B48C' },
      { name: 'Muted Tones', code: '#A0A0A0' }
    ],
    'True Autumn': [
      { name: 'Cool Pink', code: '#FFB6C1' },
      { name: 'Cool Blue', code: '#87CEEB' },
      { name: 'Cool Purple', code: '#DDA0DD' },
      { name: 'Black', code: '#000000' },
      { name: 'Pure White', code: '#FFFFFF' },
      { name: 'Navy', code: '#000080' },
      { name: 'Burgundy', code: '#800020' },
      { name: 'Bright Colors', code: '#FF1493' },
      { name: 'Neon Tones', code: '#00FF00' },
      { name: 'Electric Blue', code: '#0080FF' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Cool Gray', code: '#708090' }
    ],
    'Dark Autumn': [
      { name: 'Bright Colors', code: '#FF1493' },
      { name: 'Neon Tones', code: '#00FF00' },
      { name: 'Cool Pink', code: '#FFB6C1' },
      { name: 'Cool Blue', code: '#87CEEB' },
      { name: 'Cool Purple', code: '#DDA0DD' },
      { name: 'Pure White', code: '#FFFFFF' },
      { name: 'Light Colors', code: '#F0F8FF' },
      { name: 'Pastels', code: '#E6E6FA' },
      { name: 'Electric Blue', code: '#0080FF' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Bright Yellow', code: '#FFFF00' },
      { name: 'Neon Green', code: '#00FF00' }
    ],
    'Soft Autumn': [
      { name: 'Bright Colors', code: '#FF1493' },
      { name: 'Neon Tones', code: '#00FF00' },
      { name: 'Black', code: '#000000' },
      { name: 'Pure White', code: '#FFFFFF' },
      { name: 'Cool Pink', code: '#FFB6C1' },
      { name: 'Cool Blue', code: '#87CEEB' },
      { name: 'Cool Purple', code: '#DDA0DD' },
      { name: 'Electric Blue', code: '#0080FF' },
      { name: 'Hot Pink', code: '#FF69B4' },
      { name: 'Bright Yellow', code: '#FFFF00' },
      { name: 'Neon Green', code: '#00FF00' },
      { name: 'High Contrast', code: '#808080' }
    ]
  };
  
  return avoidColors[season as keyof typeof avoidColors] || avoidColors['True Winter'];
};

const ColorSwatch = ({ color, name, clickable = true }: { color: string; name?: string; clickable?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (!clickable) return;
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <motion.div
      className={`relative group ${clickable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={clickable ? { scale: 1.05 } : {}}
      whileTap={clickable ? { scale: 0.95 } : {}}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-2xl shadow-lg border-2 border-white"
        style={{ backgroundColor: color }}
      />
      {name && (
        <div className="text-center mt-2">
          <p className="text-xs font-medium text-gray-700">{name}</p>
          <p className="text-xs text-gray-500 font-mono">{color}</p>
        </div>
      )}
      {copied && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs"
        >
          Copied!
        </motion.div>
      )}
    </motion.div>
  );
};

const PinterestEmbed = ({ url, title }: { url: string; title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 border border-pink-100"
  >
    <div className="text-center mb-4">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
        <ExternalLink className="w-6 h-6 text-white" />
      </div>
      <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm mb-4">Curated inspiration board with looks perfect for your coloring</p>
    </div>
    
    {/* Pinterest Preview Component */}
    <div className="mb-4">
      <PinterestPreview url={url} className="w-full" />
    </div>
  </motion.div>
);

export default function ResultsNew() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInstagramStory, setShowInstagramStory] = useState(false);
  const [hasShownPostPaymentPopup, setHasShownPostPaymentPopup] = useState(false);

  
  // Get seasonal assets based on the detected season
  const seasonalAssets = order?.analysisResult ? getSeasonalAssets(order.analysisResult.season) : null;

  const orderId = params.orderId;

  useEffect(() => {
    if (!orderId) {
      setLocation('/');
      return;
    }
    fetchOrderResults();
  }, [orderId]);

  useEffect(() => {
    // Auto-email results when they're ready
    if (order && order.status === 'completed' && !order.emailSent) {
      emailResults();
    }
  }, [order]);

  useEffect(() => {
    // Check if user just completed payment (paid or free) and show popup
    const urlParams = new URLSearchParams(window.location.search);
    const justPaid = urlParams.get('payment_success') === 'true';
    const fromPayment = urlParams.get('from') === 'payment';
    
    // Also check if the user just came from the payment preview page
    const referrer = document.referrer;
    const comingFromPayment = referrer.includes('/results-preview/') || referrer.includes('/payment/') || justPaid || fromPayment;
    
    // Show popup for both paid orders and free orders (completed transactions)
    const isCompletedTransaction = order && order.status === 'completed' && order.analysisResult;
    
    // Debug logging
    console.log('Popup check:', {
      order: !!order,
      status: order?.status,
      hasAnalysis: !!order?.analysisResult,
      referrer,
      comingFromPayment,
      justPaid,
      fromPayment,
      hasShownPostPaymentPopup
    });
    
    // For free orders, always show popup when first viewing results
    if (isCompletedTransaction && !hasShownPostPaymentPopup) {
      // Check if this is a newly accessed order (first time viewing results)
      const hasShownBefore = sessionStorage.getItem(`popup_shown_${order.id}`);
      const isRecentOrder = order.id >= 291; // Recent orders from today's testing
      const shouldShowPopup = comingFromPayment || !hasShownBefore || isRecentOrder;
      
      if (shouldShowPopup) {
        console.log('Showing Instagram story popup');
        setShowInstagramStory(true);
        setHasShownPostPaymentPopup(true);
        sessionStorage.setItem(`popup_shown_${order.id}`, 'true');
        // Clean URL after showing popup
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [order, hasShownPostPaymentPopup]);

  const fetchOrderResults = async () => {
    try {
      const response = await apiRequest('GET', `/api/orders/${orderId}`);
      
      if (response.ok) {
        const data = await response.json();
        setOrder(data.order);
        
        if (data.order.status !== 'completed' || !data.order.analysisResult) {
          toast({
            title: "Analysis Not Ready",
            description: "Your color analysis is still processing",
            variant: "destructive",
          });
          setLocation(`/processing/${orderId}`);
        }
      } else {
        throw new Error('Order not found');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your results",
        variant: "destructive",
      });
      setLocation('/');
    } finally {
      setIsLoading(false);
    }
  };

  const emailResults = async () => {
    try {
      await apiRequest('POST', `/api/orders/${orderId}/email-results`);
    } catch (error) {
      console.error('Failed to email results:', error);
    }
  };



  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-300 border-t-rose-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!order || !order.analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">No results found</p>
        </div>
      </div>
    );
  }

  const analysisResult = order.analysisResult;

  const steps = [
    {
      id: 'overview',
      title: 'Season Overview',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-4"
              style={{ lineHeight: '1.3', paddingBottom: '4px' }}
            >
              {analysisResult.season}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mb-4"
            >
              <Button
                onClick={() => setShowInstagramStory(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results!
              </Button>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
            >
              {analysisResult.overview.description}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-rose-600" />
                Key Characteristics
              </h3>
              <ul className="space-y-3">
                {analysisResult.overview.keyCharacteristics.map((char, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{char}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-rose-100"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">Signature Colors</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 justify-items-center">
                {analysisResult.overview.signatureColors.slice(0, 8).map((colorString, index) => {
                  const { hex, name } = parseSignatureColor(colorString);
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                    >
                      <ColorSwatch color={hex} name={name} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-6 border border-red-100"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Colors to Avoid</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
              {getColorsToAvoid(analysisResult.season).map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="text-center"
                >
                  <div
                    className="w-14 h-14 rounded-xl shadow-md border-2 border-white relative mx-auto"
                    style={{ backgroundColor: color.code }}
                  >
                    <div className="absolute inset-0 rounded-xl border-2 border-red-400 opacity-60"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xl">×</div>
                  </div>
                  <p className="text-xs mt-2 font-mono text-gray-600">{color.code}</p>
                  <p className="text-xs font-semibold text-gray-700">{color.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'palette',
      title: 'Color Palette',
      icon: <Palette className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <Suspense fallback={
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500"></div>
              <span className="ml-3 text-gray-600">Loading color palette...</span>
            </div>
          }>
            {analysisResult.season === 'True Winter' && <TrueWinterPalette />}
            {analysisResult.season === 'Bright Winter' && <BrightWinterPalette />}
            {analysisResult.season === 'Dark Winter' && <DarkWinterPalette />}
            {analysisResult.season === 'True Summer' && <TrueSummerPalette />}
            {analysisResult.season === 'Light Summer' && <LightSummerPalette />}
            {analysisResult.season === 'Soft Summer' && <SoftSummerPalette />}
            {analysisResult.season === 'True Spring' && <TrueSpringPalette />}
            {analysisResult.season === 'Bright Spring' && <BrightSpringPalette />}
            {analysisResult.season === 'Light Spring' && <LightSpringPalette />}
            {analysisResult.season === 'True Autumn' && <TrueAutumnPalette />}
            {analysisResult.season === 'Dark Autumn' && <DarkAutumnPalette />}
            {analysisResult.season === 'Soft Autumn' && <SoftAutumnPalette />}
          </Suspense>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Color Dimensions</h4>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {analysisResult.overview.keyCharacteristics.map((characteristic, index) => (
                  <div key={index} className="bg-white rounded-xl p-4">
                    <p className="text-gray-700">{characteristic}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                {seasonalAssets?.colorDimensions ? (
                  <>
                    <img
                      src={seasonalAssets.colorDimensions}
                      alt={`${order.analysisResult.season} Color Dimensions`}
                      className="w-full max-w-sm mx-auto rounded-lg shadow-sm"
                    />
                    <p className="text-sm text-gray-600 mt-4">Your position on the color analysis spectrum</p>
                  </>
                ) : (
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 text-center">
                    <h5 className="font-bold text-gray-800 mb-4">{order.analysisResult.season}</h5>
                    <p className="text-gray-600 text-sm">{order.analysisResult.overview.description}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">12-Season Color Analysis Chart</h4>
            <div className="text-center">
              <img
                src={seasonalAssets?.seasonChart || '/attached_assets/12-tone-chart-value-temperature_1750623961315.png'}
                alt="12-Season Color Analysis Chart"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm"
              />
              <p className="text-sm text-gray-600 mt-4">{order.analysisResult.season}'s position in the complete seasonal color system</p>
            </div>
          </motion.div>
        </div>
      )
    },
    {
      id: 'clothing',
      title: 'Clothing Overview',
      icon: <Shirt className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your {analysisResult.season} Wardrobe</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Build a cohesive wardrobe that enhances your natural beauty</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Style Guidelines</h4>
                <ul className="space-y-3">
                  {analysisResult.clothing.guidelines.map((guideline, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{guideline}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PinterestEmbed 
                url={analysisResult.clothing.pinterestUrl} 
                title="Clothing Inspiration" 
              />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'accessories',
      title: 'Metals, Jewelry & Glasses',
      icon: <Gem className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Accessories Guide</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">The perfect finishing touches for your coloring</p>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-6 border border-amber-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Gem className="w-5 h-5 mr-2 text-amber-600" />
                Best Metals
              </h4>
              <div className="grid lg:grid-cols-2 gap-6 items-center">
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">{analysisResult.accessories.metals}</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                    {getBestMetals(analysisResult).map((metal, index) => {
                      const metalColors = getMetalColorSwatch(metal);
                      return (
                        <div key={index} className="text-center">
                          <div 
                            className={`w-12 h-12 ${metalColors.gradient} rounded-full mb-2 border-2 border-white shadow-md`}
                            title={metal}
                          ></div>
                          <p className="text-xs font-medium text-gray-700">{metal}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-4">Jewelry Guidelines</h4>
                <div className="space-y-3 mb-4">
                  {(Array.isArray(analysisResult.accessories.jewelry) ? 
                    analysisResult.accessories.jewelry : 
                    ['Elegant pieces that complement your coloring']
                  ).map((item: string, index: number) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {(() => {
                    // Extract jewelry types from the text recommendations
                    const jewelryText = Array.isArray(analysisResult.accessories.jewelry) 
                      ? analysisResult.accessories.jewelry.join(' ') 
                      : '';
                    
                    const jewelryTypes = ['Silver', 'Gemstone', 'Vintage', 'Chain', 'Gold', 'Pearl', 'Crystal', 'Onyx', 'Statement', 'Ornate', 'Heavy', 'Architectural'];
                    const matchedTypes = jewelryTypes.filter(type => 
                      jewelryText.toLowerCase().includes(type.toLowerCase())
                    ).slice(0, 8);
                    
                    const displayTypes = matchedTypes.length > 0 ? matchedTypes : ['Silver', 'Gemstone', 'Vintage', 'Chain'];
                    
                    return displayTypes.map((type: string, index: number) => {
                      const jewelryDisplay = getJewelryDisplay(type);
                      return (
                        <div key={index} className="text-center">
                          {jewelryDisplay.type === 'icon' ? (
                            <div 
                              className={`w-10 h-10 ${jewelryDisplay.bgClass} rounded-full mb-2 border-2 border-white shadow-md flex items-center justify-center text-lg`}
                              title={type}
                            >
                              {jewelryDisplay.icon}
                            </div>
                          ) : (
                            <div 
                              className={`w-10 h-10 ${jewelryDisplay.gradient} rounded-full mb-2 border-2 border-white shadow-md`}
                              title={type}
                            ></div>
                          )}
                          <p className="text-xs font-medium text-gray-700">{jewelryDisplay.name}</p>
                        </div>
                      );
                    });
                  })()}
                </div>
                
                {/* Jewelry Type Recommendations */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h5 className="text-lg font-semibold text-gray-800 mb-4">Jewelry Type Recommendations</h5>
                  <div className="grid grid-cols-2 gap-4">
                    {(() => {
                      const jewelryRecs = getJewelryRecommendations(analysisResult.season);
                      return [
                        { key: 'rings', icon: '💍', title: 'Rings', description: jewelryRecs.rings },
                        { key: 'necklaces', icon: '📿', title: 'Necklaces', description: jewelryRecs.necklaces },
                        { key: 'earrings', icon: '👂', title: 'Earrings', description: jewelryRecs.earrings },
                        { key: 'watches', icon: '⌚', title: 'Watches', description: jewelryRecs.watches }
                      ].map((item) => (
                        <div key={item.key} className="bg-gray-50 rounded-xl p-4 text-center">
                          <div className="text-2xl mb-2">{item.icon}</div>
                          <p className="text-sm font-medium text-gray-700 mb-1">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.description}</p>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-xl font-bold text-gray-800 mb-4">Eyewear Guide</h4>
                <div className="space-y-3 mb-4">
                  {(Array.isArray(analysisResult.accessories.glasses) ? 
                    analysisResult.accessories.glasses : 
                    analysisResult.accessories.description ? 
                    [analysisResult.accessories.description] : 
                    ['Choose frames that complement your features']
                  ).map((item, index) => (
                    <p key={index} className="text-gray-700 text-sm leading-relaxed">{item}</p>
                  ))}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {getEyewearRecommendations(analysisResult).map((frameType: string, index: number) => {
                    const usedNames = new Set<string>();
                    const eyewearColors = getEyewearColorSwatch(frameType, usedNames);
                    return (
                      <div key={index} className="text-center">
                        <div 
                          className={`w-16 h-10 ${eyewearColors.gradient} rounded-lg mx-auto mb-2 border border-gray-300`}
                          title={frameType}
                        ></div>
                        <p className="text-xs font-medium text-gray-700">{eyewearColors.name}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'hair',
      title: 'Hair Color',
      icon: <Scissors className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Hair Color Guide</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Colors that harmonize with your natural beauty</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 border border-purple-100 text-center"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-4">Professional Guidance</h4>
            <p className="text-gray-700 leading-relaxed">{analysisResult.hairColor.guidance}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-green-50 rounded-3xl p-6 border border-green-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                Best Hair Colors
              </h4>
              <div className="space-y-4">
                {(Array.isArray(analysisResult.hairColor.bestColors) ? 
                  analysisResult.hairColor.bestColors : 
                  ['Colors that enhance your natural beauty']
                ).map((color: string, index: number) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {color}
                  </motion.p>
                ))}
              </div>
              <div className="mt-6">
                {seasonalAssets?.hairColorGuide ? (
                  <>
                    <img
                      src={seasonalAssets.hairColorGuide}
                      alt="Hair Color Examples"
                      className="w-full rounded-lg shadow-sm"
                    />
                    <p className="text-xs text-gray-600 text-center mt-2">Natural hair color examples for {order.analysisResult.season}</p>
                  </>
                ) : (
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg p-8 text-center">
                    <p className="text-gray-600">Hair color guide for {order.analysisResult.season}</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-3xl p-6 border border-red-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                Colors to Avoid
              </h4>
              <div className="space-y-4">
                {(Array.isArray(analysisResult.hairColor.avoidColors) ? 
                  analysisResult.hairColor.avoidColors : 
                  analysisResult.hairColor.description ? 
                  [analysisResult.hairColor.description] : 
                  ['Avoid colors that clash with your natural coloring']
                ).map((color, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-gray-700 leading-relaxed"
                  >
                    {color}
                  </motion.p>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {getHairColorsToAvoid(analysisResult.season).map((colorData, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-red-300 relative"
                      style={{ backgroundColor: colorData.color }}
                    >
                      <div className="absolute inset-0 rounded-full border-2 border-red-500 opacity-60"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-lg">×</div>
                    </div>
                    <p className="text-xs text-gray-600">{colorData.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'makeup',
      title: 'Makeup',
      icon: <Sparkles className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Your {analysisResult.season} Makeup Palette</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Colors and techniques that enhance your natural radiance</p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-6">Your {analysisResult.season} Makeup Palette</h4>
              
              {/* Interactive Color Swatches */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Foundation */}
                <div className="makeup-category">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Foundation</h5>
                  <div className="flex gap-2">
                    {getFoundationColors(analysisResult.season).map((color, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {color.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eyeshadow */}
                <div className="makeup-category">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Eyeshadow</h5>
                  <div className="flex gap-2">
                    {getEyeshadowColors(analysisResult.season).map((color, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {color.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blush */}
                <div className="makeup-category">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Blush</h5>
                  <div className="flex gap-2">
                    {getBlushColors(analysisResult.season).map((color, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {color.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lipstick */}
                <div className="makeup-category">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Lipstick</h5>
                  <div className="flex gap-2">
                    {getLipstickColors(analysisResult.season).map((color, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {color.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Eyeliner */}
                <div className="makeup-category">
                  <h5 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Eyeliner</h5>
                  <div className="flex gap-2">
                    {getEyelinerColors(analysisResult.season).map((color, index) => (
                      <div
                        key={index}
                        className="group relative"
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm cursor-pointer transition-transform hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            {color.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {(Array.isArray(analysisResult.makeup.guidelines) ? 
                  analysisResult.makeup.guidelines : 
                  analysisResult.makeup.description ? 
                  [analysisResult.makeup.description] : 
                  ['Follow your seasonal color palette for best makeup results']
                ).map((guideline, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{guideline}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PinterestEmbed 
                url={analysisResult.makeup.pinterestUrl} 
                title={`${analysisResult.season} Makeup Looks`} 
              />
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'celebrities',
      title: 'Celebrity Inspiration',
      icon: <Star className="w-6 h-6" />,
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">{order.analysisResult.season} Celebrities</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Study how these celebrities use color to enhance their natural beauty</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {seasonalAssets?.celebrities && seasonalAssets.celebrities.length > 0 ? (
              // Display actual celebrity photos with names from seasonal content
              seasonalAssets.celebrities.map((celebrityImage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="aspect-[3/4] mb-4 rounded-2xl overflow-hidden">
                    <img
                      src={celebrityImage}
                      alt={`${order.analysisResult.season} Celebrity ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 text-center">
                    {(Array.isArray(order.analysisResult.celebrities) ? 
                      order.analysisResult.celebrities[index] : 
                      `Celebrity ${index + 1}`) || `Celebrity ${index + 1}`}
                  </h4>
                </motion.div>
              ))
            ) : (
              // Fallback to celebrity names only
              (Array.isArray(order.analysisResult.celebrities) ? 
                order.analysisResult.celebrities : 
                ['Style icons who share your coloring']
              ).map((celebrity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-4 shadow-lg border border-gray-100"
                >
                  <div className="aspect-[3/4] mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <Users className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Celebrity Photo</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 text-center">{celebrity}</h4>
                </motion.div>
              ))
            )}
          </div>
        </div>
      )
    },
    { 
      id: 'share', 
      title: 'Share Results', 
      icon: <Share2 className="w-6 h-6" />, 
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Save & Share Your Results</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">Keep your color analysis handy for shopping and styling</p>
            {order?.email && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 max-w-md mx-auto">
                <p className="text-sm text-blue-700">
                  ✉️ Results have been emailed to <strong>{order.email}</strong>
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border border-blue-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Share My Results</h4>
              <p className="text-gray-600 mb-6 text-sm">Share your color analysis with friends and family via text, email, or social media</p>
              <Button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `My ${analysisResult.season} Color Analysis`,
                      text: `check out my AI color analysis results from hazel & hue! ${window.location.href} - hazelandhue.com`,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    toast({ title: "Link copied!", description: "Share this link with others" });
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl py-3"
              >
                Share Results
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">Save Your Results</h4>
              <p className="text-gray-600 mb-6 text-sm">Bookmark this page or share your results with others for reference while shopping</p>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({ title: "Link copied!", description: "Share this link with others" });
                }}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3"
              >
                Copy Link to Results
              </Button>
            </motion.div>


          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100"
          >
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h4>
            <div className="text-center mb-6">
              <p className="text-gray-600 mb-4">Save your results permanently and access them anytime</p>
              <Button 
                onClick={() => {
                  // This would typically open a registration modal
                  toast({ 
                    title: "Account Creation", 
                    description: "Registration feature coming soon! Your results are saved for now." 
                  });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl"
              >
                Create Free Account
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Shopping</h5>
                <p className="text-gray-600 text-sm">Take screenshots of your color swatches to match colors while shopping in stores or online</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Wardrobe</h5>
                <p className="text-gray-600 text-sm">Focus on building a capsule wardrobe with your core neutral colors as the foundation</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Makeup</h5>
                <p className="text-gray-600 text-sm">Show your makeup artist or sales associate your color palette for personalized recommendations</p>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Hair Color</h5>
                <p className="text-gray-600 text-sm">Bring your analysis to your colorist for the most flattering hair color choices</p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Mobile and Desktop: Centered title */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">Your Color Analysis Results</h1>
            <p className="text-sm sm:text-base text-gray-600">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center py-6">
        <div className="flex space-x-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'bg-rose-500 scale-125' 
                  : index < currentStep 
                    ? 'bg-rose-300' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Navigation */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-rose-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center text-white">
              {steps[currentStep].icon}
            </div>
            <h2 className="text-lg font-bold text-gray-800">{steps[currentStep].title}</h2>
          </div>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              currentStep === steps.length - 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep].content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Instagram Story Modal */}
      {showInstagramStory && order?.analysisResult && (
        <InstagramStory
          season={order.analysisResult.season}
          onDownload={() => setShowInstagramStory(false)}
        />
      )}
    </div>
  );
}