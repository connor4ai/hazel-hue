import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';

interface PassData {
  season: string;
  coreNeutrals: string[];
  accentLights: string[];
  accentBrights: string[];
}

class WalletCardService {
  private readonly colorNames: { [key: string]: string } = {
    '#000000': 'True Black', '#333333': 'Charcoal', '#666666': 'Steel Gray',
    '#999999': 'Silver Gray', '#CCCCCC': 'Light Gray', '#FFFFFF': 'Pure White',
    '#E0E0E0': 'Platinum', '#F5F5F5': 'Pearl White', '#D3D3D3': 'Cloud Gray',
    '#FAFAFA': 'Snow White', '#F0F0F0': 'Ivory', '#E8E8E8': 'Whisper Gray',
    '#0033FF': 'Royal Blue', '#6600CC': 'Deep Purple', '#FF0066': 'Fuchsia Pink',
    '#FF3300': 'Crimson Red', '#0099FF': 'Electric Blue', '#33CC33': 'Emerald Green'
  };

  async generateWalletPass(analysisResult: any, orderId: string): Promise<string> {
    const passData: PassData = {
      season: analysisResult.season,
      coreNeutrals: analysisResult.coreNeutrals,
      accentLights: analysisResult.accentLights,
      accentBrights: analysisResult.accentBrights
    };

    // Generate pass.json
    const passJson = this.createPassJson(passData, orderId);
    
    // Create directory structure
    const passDir = path.join('uploads', 'wallet-passes', `color-card-${orderId}`);
    if (!fs.existsSync(passDir)) {
      fs.mkdirSync(passDir, { recursive: true });
    }

    // Write pass.json
    fs.writeFileSync(path.join(passDir, 'pass.json'), JSON.stringify(passJson, null, 2));

    // Generate manifest.json
    const manifest = this.createManifest(passDir);
    fs.writeFileSync(path.join(passDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

    // Create the .pkpass file (simplified version)
    const pkpassPath = path.join('uploads', 'wallet-passes', `${analysisResult.season.replace(/\s+/g, '-')}-Color-Card-${Date.now()}.pkpass`);
    
    // For demonstration, we'll create a JSON file that could be processed into a proper .pkpass
    const walletCardData = {
      ...passJson,
      instructions: 'This color card contains your personalized palette with CMYK-accurate colors for shopping and color matching.',
      usage: 'Hold this card up to clothing items to see if they match your perfect colors.'
    };

    fs.writeFileSync(pkpassPath, JSON.stringify(walletCardData, null, 2));
    
    return pkpassPath;
  }

  private createPassJson(passData: PassData, orderId: string): any {
    const serialNumber = `color-analysis-${orderId}-${Date.now()}`;
    
    return {
      formatVersion: 1,
      passTypeIdentifier: 'pass.com.huematcher.colorcard',
      serialNumber: serialNumber,
      teamIdentifier: 'HUEMATCHER',
      organizationName: 'HueMatcher',
      description: `${passData.season} Color Analysis Card`,
      logoText: 'HueMatcher',
      backgroundColor: 'rgb(255, 255, 255)',
      foregroundColor: 'rgb(33, 37, 41)',
      labelColor: 'rgb(108, 117, 125)',
      generic: {
        primaryFields: [
          {
            key: 'season',
            label: 'Your Season',
            value: passData.season
          }
        ],
        secondaryFields: [
          {
            key: 'neutrals-count',
            label: 'Foundation Colors',
            value: `${passData.coreNeutrals.length} colors`
          },
          {
            key: 'brights-count',
            label: 'Statement Colors',
            value: `${passData.accentBrights.length} colors`
          }
        ],
        auxiliaryFields: [
          {
            key: 'usage',
            label: 'Usage',
            value: 'Color matching for shopping'
          }
        ],
        backFields: [
          {
            key: 'neutrals-title',
            label: 'Foundation Neutrals',
            value: this.formatColorList(passData.coreNeutrals)
          },
          {
            key: 'lights-title',
            label: 'Accent Lights',
            value: this.formatColorList(passData.accentLights)
          },
          {
            key: 'brights-title',
            label: 'Statement Brights',
            value: this.formatColorList(passData.accentBrights)
          },
          {
            key: 'instructions',
            label: 'How to Use',
            value: 'Hold this card up to clothing items when shopping. Colors that closely match any color on this card will be flattering on you. Focus on colors nearest to your face for maximum impact.'
          },
          {
            key: 'cmyk-note',
            label: 'Color Accuracy',
            value: 'All colors are CMYK calibrated for accurate real-world matching across different lighting conditions.'
          }
        ]
      },
      barcodes: [
        {
          message: `huematcher://color-card/${orderId}`,
          format: 'PKBarcodeFormatQR',
          messageEncoding: 'iso-8859-1'
        }
      ],
      locations: [
        {
          latitude: 37.7749,
          longitude: -122.4194,
          relevantText: 'Perfect for shopping in fashion districts!'
        }
      ],
      maxDistance: 1000,
      relevantDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
    };
  }

  private createManifest(passDir: string): any {
    const manifest: { [key: string]: string } = {};
    
    // Calculate SHA1 hashes for all files in the pass
    const files = fs.readdirSync(passDir).filter(file => file !== 'manifest.json');
    
    files.forEach(file => {
      const filePath = path.join(passDir, file);
      const fileContent = fs.readFileSync(filePath);
      const hash = createHash('sha1').update(fileContent).digest('hex');
      manifest[file] = hash;
    });

    return manifest;
  }

  private formatColorList(colors: string[]): string {
    return colors.map(color => {
      const name = this.colorNames[color] || color;
      const cmyk = this.generateCMYKValues(color);
      return `${name} (${cmyk})`;
    }).join('\n');
  }

  private generateCMYKValues(hexColor: string): string {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    
    return `C${Math.round(c * 100)} M${Math.round(m * 100)} Y${Math.round(y * 100)} K${Math.round(k * 100)}`;
  }
}

export const walletCardService = new WalletCardService();