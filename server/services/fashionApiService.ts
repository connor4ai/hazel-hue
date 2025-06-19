interface FashionProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  priceFormatted: string;
  imageUrl: string;
  productUrl: string;
  color: string;
  colorHex: string;
  category: string;
}

interface OutfitLook {
  id: string;
  name: string;
  image: string;
  brand: string;
  priceRange: string;
  keyColor: string;
  keyColorHex: string;
  shopUrl: string;
  products: FashionProduct[];
}

export class FashionApiService {
  private readonly baseUrl = 'https://api.shopstyle.com/api/v2';
  
  async generateOutfitLooks(colorPalette: {
    coreNeutrals: string[];
    accentLights: string[];
    accentBrights: string[];
  }): Promise<OutfitLook[]> {
    try {
      const outfits: OutfitLook[] = [];
      
      // Create 3-5 different looks based on the color palette
      const lookTemplates = [
        {
          name: 'Professional Office Look',
          keyColorType: 'neutral',
          categories: ['blouses', 'pants', 'blazers'],
          priceRange: [40, 100]
        },
        {
          name: 'Weekend Casual',
          keyColorType: 'light',
          categories: ['sweaters', 'jeans', 'casual-tops'],
          priceRange: [25, 75]
        },
        {
          name: 'Evening Elegant',
          keyColorType: 'bright',
          categories: ['dresses', 'heels', 'jewelry'],
          priceRange: [60, 150]
        },
        {
          name: 'Comfortable Athleisure',
          keyColorType: 'neutral',
          categories: ['activewear', 'sneakers', 'hoodies'],
          priceRange: [30, 90]
        }
      ];

      for (const template of lookTemplates) {
        const keyColor = this.selectKeyColor(colorPalette, template.keyColorType);
        const complementaryColors = this.getComplementaryColors(colorPalette, keyColor);
        
        const products = await this.searchProductsByColors(
          template.categories,
          [keyColor, ...complementaryColors],
          template.priceRange
        );

        if (products.length >= 2) {
          const outfit: OutfitLook = {
            id: `outfit-${outfits.length + 1}`,
            name: template.name,
            image: this.generateOutfitImage(products),
            brand: this.getMostCommonBrand(products),
            priceRange: this.calculatePriceRange(products),
            keyColor: this.getColorName(keyColor),
            keyColorHex: keyColor,
            shopUrl: this.generateShopUrl(template.categories, keyColor),
            products: products.slice(0, 4)
          };
          
          outfits.push(outfit);
        }
      }

      return outfits.slice(0, 4); // Return max 4 looks
    } catch (error) {
      console.error('Error generating outfit looks:', error);
      return this.getFallbackOutfits(colorPalette);
    }
  }

  private selectKeyColor(palette: any, type: string): string {
    switch (type) {
      case 'neutral':
        return palette.coreNeutrals[0] || '#8B7355';
      case 'light':
        return palette.accentLights[0] || '#F4A460';
      case 'bright':
        return palette.accentBrights[0] || '#E2725B';
      default:
        return palette.coreNeutrals[0] || '#8B7355';
    }
  }

  private getComplementaryColors(palette: any, keyColor: string): string[] {
    const allColors = [
      ...palette.coreNeutrals,
      ...palette.accentLights,
      ...palette.accentBrights
    ];
    
    return allColors.filter(color => color !== keyColor).slice(0, 2);
  }

  private async searchProductsByColors(
    categories: string[],
    colors: string[],
    priceRange: number[]
  ): Promise<FashionProduct[]> {
    // In a real implementation, this would call ShopStyle API, Amazon PA-API, etc.
    // For now, we'll generate realistic product data based on the colors
    
    const products: FashionProduct[] = [];
    const brands = ['J.Crew', 'Everlane', 'Madewell', 'Reformation', 'COS', 'Zara'];
    
    for (let i = 0; i < Math.min(categories.length, 3); i++) {
      const category = categories[i];
      const color = colors[i % colors.length];
      const brand = brands[Math.floor(Math.random() * brands.length)];
      const basePrice = priceRange[0] + Math.random() * (priceRange[1] - priceRange[0]);
      
      products.push({
        id: `product-${Date.now()}-${i}`,
        name: this.generateProductName(category, color),
        brand,
        price: Math.round(basePrice),
        priceFormatted: `$${Math.round(basePrice)}`,
        imageUrl: `/api/placeholder/product-${category}.jpg`,
        productUrl: this.generateAffiliateUrl(category, color, brand),
        color: this.getColorName(color),
        colorHex: color,
        category
      });
    }
    
    return products;
  }

  private generateProductName(category: string, color: string): string {
    const categoryNames: Record<string, string[]> = {
      'blouses': ['Silk Blouse', 'Cotton Shirt', 'Wrap Top'],
      'pants': ['Tailored Trousers', 'Wide-Leg Pants', 'Straight Pants'],
      'blazers': ['Structured Blazer', 'Oversized Blazer', 'Cropped Jacket'],
      'sweaters': ['Cashmere Sweater', 'Knit Pullover', 'Cardigan'],
      'jeans': ['High-Rise Jeans', 'Straight Jeans', 'Wide-Leg Jeans'],
      'dresses': ['Midi Dress', 'Wrap Dress', 'Shift Dress'],
      'activewear': ['Sports Bra', 'Leggings', 'Athletic Top'],
      'casual-tops': ['T-Shirt', 'Tank Top', 'Henley']
    };
    
    const names = categoryNames[category] || ['Item'];
    const baseName = names[Math.floor(Math.random() * names.length)];
    const colorName = this.getColorName(color);
    
    return `${colorName} ${baseName}`;
  }

  private getColorName(hex: string): string {
    const colorMap: Record<string, string> = {
      '#F26F63': 'Coral',
      '#E2725B': 'Terracotta', 
      '#9CAF88': 'Sage',
      '#D4A574': 'Camel',
      '#8B7355': 'Taupe',
      '#F5F5DC': 'Cream',
      '#2C3E50': 'Navy',
      '#FFD700': 'Gold',
      '#DDA0DD': 'Mauve',
      '#87CEEB': 'Sky Blue'
    };
    
    return colorMap[hex] || 'Color';
  }

  private generateOutfitImage(products: FashionProduct[]): string {
    // In production, this would generate or fetch actual outfit flat-lay images
    return `/api/placeholder/outfit-${products[0]?.category || 'default'}.jpg`;
  }

  private getMostCommonBrand(products: FashionProduct[]): string {
    const brandCounts: Record<string, number> = {};
    products.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
    });
    
    const mostCommon = Object.entries(brandCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    return mostCommon ? mostCommon[0] : 'Mixed Brands';
  }

  private calculatePriceRange(products: FashionProduct[]): string {
    const prices = products.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return `$${min}-$${max}`;
  }

  private generateShopUrl(categories: string[], keyColor: string): string {
    const searchTerm = `${this.getColorName(keyColor)} ${categories[0]}`;
    return `https://www.shopstyle.com/browse?fts=${encodeURIComponent(searchTerm)}&pid=uid3481-37692121-31`;
  }

  private generateAffiliateUrl(category: string, color: string, brand: string): string {
    const searchTerm = `${brand} ${this.getColorName(color)} ${category}`;
    return `https://www.shopstyle.com/browse?fts=${encodeURIComponent(searchTerm)}&pid=uid3481-37692121-31`;
  }

  private getFallbackOutfits(colorPalette: any): OutfitLook[] {
    // Fallback outfits using the user's actual color palette
    return [
      {
        id: 'fallback-1',
        name: 'Elegant Essentials',
        image: '/api/placeholder/outfit-elegant.jpg',
        brand: 'Curated Selection',
        priceRange: '$45-$85',
        keyColor: this.getColorName(colorPalette.accentBrights[0]),
        keyColorHex: colorPalette.accentBrights[0],
        shopUrl: `https://www.shopstyle.com/browse?fts=${encodeURIComponent(this.getColorName(colorPalette.accentBrights[0]))}`,
        products: []
      },
      {
        id: 'fallback-2',
        name: 'Casual Chic',
        image: '/api/placeholder/outfit-casual.jpg',
        brand: 'Mixed Brands',
        priceRange: '$35-$75',
        keyColor: this.getColorName(colorPalette.accentLights[0]),
        keyColorHex: colorPalette.accentLights[0],
        shopUrl: `https://www.shopstyle.com/browse?fts=${encodeURIComponent(this.getColorName(colorPalette.accentLights[0]))}`,
        products: []
      }
    ];
  }
}

export const fashionApiService = new FashionApiService();