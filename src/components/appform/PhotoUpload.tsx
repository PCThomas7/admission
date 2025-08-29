import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { smartUpload, extractFileIdFromUrl, isImageKitUrl } from '../../services/imagekitService';
import { toast } from 'react-hot-toast';

type PhotoUploadProps = {
  register: any;
  setValue: any;
  errors: any;
  watch?: any;
  defaultValue?: string;
};

const PhotoUpload = ({ register, setValue, errors, watch, defaultValue }: PhotoUploadProps) => {
  const [photoURL, setPhotoURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  
  // Load existing photo if available
  useEffect(() => {
    const existingPhoto = watch ? watch('photo') : defaultValue;
    if (existingPhoto && typeof existingPhoto === 'string') {
      setPhotoURL(existingPhoto);
      
      // Extract file ID if it's an ImageKit URL
      if (isImageKitUrl(existingPhoto)) {
        const fileId = extractFileIdFromUrl(existingPhoto);
        setCurrentFileId(fileId);
      }
    }
  }, [watch, defaultValue]);
  
  // Handle photo upload with ImageKit integration
  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (5MB limit as per specifications)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Photo file size must be less than 5MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setIsUploading(true);
      
      try {
        // Use smart upload (ImageKit with base64 fallback)
        const uploadedUrl = await smartUpload(file, {
          component: 'photo',
          existingFileId: currentFileId || undefined
        });
        
        setPhotoURL(uploadedUrl);
        setValue('photo', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setCurrentFileId(newFileId);
          toast.success('Photo uploaded successfully!');
        }
        
      } catch (error) {
        console.error('Photo upload failed:', error);
        toast.error('Failed to upload photo. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };
  
  // Handle remove photo
  const handleRemovePhoto = () => {
    setPhotoURL('');
    setValue('photo', '');
    setCurrentFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 w-32 h-40 flex items-center justify-center bg-gray-50 mb-2 relative hover:border-gray-400 transition-colors">
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-xs text-gray-500">Uploading...</p>
          </div>
        ) : photoURL ? (
          <>
            <img src={photoURL} alt="Student Photo" className="max-h-full max-w-full object-cover rounded" />
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              title="Remove photo"
            >
              ×
            </button>
          </>
        ) : (
          <p className="text-gray-400 text-sm text-center">Upload Photo<br/><span className="text-xs">(Max 5MB)</span></p>
        )}
      </div>
      
      <input
        type="file"
        id="photo"
        accept="image/*"
        onChange={handlePhotoChange}
        disabled={isUploading}
        className="text-sm disabled:opacity-50"
      />
      
      {photoURL && (
        <button
          type="button"
          onClick={handleRemovePhoto}
          className="mt-2 text-xs text-red-600 hover:text-red-800 transition-colors"
        >
          Remove Photo
        </button>
      )}
      
      {/* Hidden input for form registration */}
      <input
        type="hidden"
        {...register('photo')}
      />
      
      {errors.photo && (
        <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
      )}
    </div>
  );
};

export default PhotoUpload;