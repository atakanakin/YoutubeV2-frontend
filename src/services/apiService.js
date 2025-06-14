import axios from 'axios';
import toast from 'react-hot-toast';

class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:5258/api';
    this.timeout = 30000;

    // Create axios instance
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  handleError(error) {
    const { response, request, message } = error;

    if (response) {
      // Server responded with error status
      const { status, data } = response;

      switch (status) {
        case 400:
          toast.error(data?.message || 'Bad Request');
          break;
        case 404:
          toast.error('Resource Not Found');
          break;
        case 422:
          toast.error(data?.message || 'Validation Error');
          break;
        case 500:
          toast.error('Server Error - Please try again later');
          break;
        default:
          toast.error(data?.message || `Error: ${status}`);
      }

      console.error(`API Error ${status}:`, data);
    } else if (request) {
      // Network error
      toast.error('Network Error - Check your connection');
      console.error('Network Error:', request);
    } else {
      // Other error
      toast.error('Something went wrong');
      console.error('Error:', message);
    }
  }

  // Generic request method
  async request(method, endpoint, data = null, config = {}) {
    try {
      const response = await this.client({
        method,
        url: endpoint,
        data,
        ...config
      });

      return {
        success: true,
        data: response.data,
        status: response.status,
        headers: response.headers
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status || 0
      };
    }
  }

  // HTTP Methods
  async get(endpoint, config = {}) {
    return this.request('GET', endpoint, null, config);
  }

  async post(endpoint, data, config = {}) {
    return this.request('POST', endpoint, data, config);
  }

  // API Endpoints

  // Search endpoints
  async searchAll(query, params = {}) {
    return this.get('/Search/all', { params: { q: query, ...params } });
  }

  async searchVideos(query, params = {}) {
    return this.get('/Search/video', { params: { q: query, ...params } });
  }

  async searchChannels(query, params = {}) {
    return this.get('/Search/channel', { params: { q: query, ...params } });
  }

  async searchPlaylists(query, params = {}) {
    return this.get('/Search/playlist', { params: { q: query, ...params } });
  }

  // Video endpoint
  async getVideo(videoIdOrUrl) {
    return this.get('/Video', { params: { videoIdOrUrl } });
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;