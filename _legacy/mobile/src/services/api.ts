// API service for mobile app integration with web backend

const API_BASE_URL = 'https://your-web-app-url.com/api';

interface AnalysisRequest {
  photos: string[];
  email: string;
}

interface AnalysisResponse {
  orderId: string;
  status: 'processing' | 'completed' | 'failed';
  message: string;
}

interface OrderResult {
  id: string;
  status: string;
  analysisResult?: {
    season: string;
    overview: any;
    colorPalette: any;
    styling: any;
  };
  email?: string;
  createdAt: string;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async startAnalysis(data: AnalysisRequest): Promise<AnalysisResponse> {
    // Convert photos to base64 or upload to cloud storage
    const formData = new FormData();
    
    data.photos.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, {
        uri: photo,
        type: 'image/jpeg',
        name: `photo${index + 1}.jpg`,
      } as any);
    });
    
    formData.append('email', data.email);

    return this.request('/start-analysis', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  async getOrderStatus(orderId: string): Promise<{ status: string; progress?: number }> {
    return this.request(`/orders/${orderId}/status`);
  }

  async getOrderResults(orderId: string): Promise<OrderResult> {
    return this.request(`/orders/${orderId}`);
  }

  async updateUserEmail(orderId: string, email: string): Promise<void> {
    return this.request('/orders/update-email', {
      method: 'POST',
      body: JSON.stringify({ orderId, email }),
    });
  }

  async downloadPalette(orderId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/download-palette`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to download palette');
    }
    
    return response.blob();
  }

  async emailResults(orderId: string): Promise<void> {
    return this.request(`/orders/${orderId}/email-results`, {
      method: 'POST',
    });
  }
}

export const apiService = new ApiService();

// Mock data for development
export const mockApiService = {
  async startAnalysis(data: AnalysisRequest): Promise<AnalysisResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      orderId: `mobile_order_${Date.now()}`,
      status: 'processing',
      message: 'Analysis started successfully'
    };
  },

  async getOrderStatus(orderId: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      status: 'completed',
      progress: 100
    };
  },

  async getOrderResults(orderId: string): Promise<OrderResult> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      id: orderId,
      status: 'completed',
      analysisResult: {
        season: 'True Winter',
        overview: {
          description: 'True Winters have high contrast coloring with cool undertones.',
          keyCharacteristics: [
            'High contrast between hair, eyes, and skin',
            'Cool undertones in skin',
            'Clear, bright eye color',
            'Hair ranges from dark brown to black'
          ],
          signatureColors: ['#DC143C', '#000080', '#50C878', '#E85AA0']
        },
        colorPalette: {
          coreNeutrals: ['#1C1C1C', '#E8E8E8', '#4A4A4A', '#D4D4D4'],
          accentLights: ['#FFE8FC', '#E6F3FF', '#E8F5E8', '#FCE4B8'],
          accentBrights: ['#DC143C', '#E85AA0', '#663399', '#50C878']
        },
        styling: {
          clothing: 'Choose crisp whites, true blacks, and jewel tones.',
          makeup: 'True red lipstick, navy or black eyeliner, cool pink blush.',
          accessories: 'Silver, platinum, or white gold jewelry.'
        }
      },
      email: 'user@example.com',
      createdAt: new Date().toISOString()
    };
  }
};

// Use mock service for development, real service for production
export default __DEV__ ? mockApiService : apiService;