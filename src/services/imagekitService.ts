/**
 * ImageKit Service for handling file uploads and deletions
 * Provides centralized file management with automatic cleanup
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface UploadResult {
  url: string;
  fileId: string;
  fileName: string;
}

export interface UploadOptions {
  component?: string;
  existingFileId?: string;
}

/**
 * Upload file to ImageKit with automatic cleanup of old files
 * @param file File to upload
 * @param options Upload options including component name and existing file ID
 * @returns Promise with upload result
 */
export const uploadToImageKit = async (file: File, options: UploadOptions = {}): Promise<UploadResult> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    if (options.component) {
      formData.append('component', options.component);
    }
    
    if (options.existingFileId) {
      formData.append('existingFileId', options.existingFileId);
    }

    const response = await fetch(`${API_BASE_URL}/public/upload-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Upload failed');
    }

    return result.data;
  } catch (error) {
    console.error('ImageKit upload error:', error);
    throw error;
  }
};

/**
 * Delete file from ImageKit
 * @param fileId File ID to delete
 * @returns Promise indicating success
 */
export const deleteFromImageKit = async (fileId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/delete-image/${fileId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Delete failed');
    }
  } catch (error) {
    console.error('ImageKit delete error:', error);
    throw error;
  }
};

/**
 * Search for image by ID or name
 * @param imageId Image ID or name to search for
 * @returns Promise with image information
 */
export const searchImageKit = async (imageId: string): Promise<{ imageUrl: string; fileName: string; fileId: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/public/search-image?imageId=${encodeURIComponent(imageId)}`);
    
    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Search failed');
    }

    return result.data;
  } catch (error) {
    console.error('ImageKit search error:', error);
    throw error;
  }
};

/**
 * Extract file ID from ImageKit URL
 * @param url ImageKit URL
 * @returns File ID or null if not found
 */
export const extractFileIdFromUrl = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;
  
  try {
    // ImageKit URLs typically have the fileId in the path
    const match = url.match(/\/([a-zA-Z0-9]+)\.[a-zA-Z0-9]+$/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

/**
 * Check if URL is an ImageKit URL
 * @param url URL to check
 * @returns Boolean indicating if it's an ImageKit URL
 */
export const isImageKitUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  return url.includes('imagekit.io') || url.startsWith('http://') || url.startsWith('https://');
};

/**
 * Convert File to base64 data URL (fallback for offline use)
 * @param file File to convert
 * @returns Promise with base64 data URL
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target && event.target.result) {
        resolve(event.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });
};

/**
 * Smart upload function that tries ImageKit first, falls back to base64
 * @param file File to upload
 * @param options Upload options
 * @returns Promise with either ImageKit URL or base64 data URL
 */
export const smartUpload = async (file: File, options: UploadOptions = {}): Promise<string> => {
  try {
    // Try ImageKit upload first
    const result = await uploadToImageKit(file, options);
    return result.url;
  } catch (error) {
    console.warn('ImageKit upload failed, falling back to base64:', error);
    
    // Fallback to base64
    try {
      return await fileToBase64(file);
    } catch (base64Error) {
      console.error('Base64 conversion also failed:', base64Error);
      throw new Error('Both ImageKit upload and base64 conversion failed');
    }
  }
};