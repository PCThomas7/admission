import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { smartUpload, extractFileIdFromUrl, isImageKitUrl } from '../../services/imagekitService';
import { toast } from 'react-hot-toast';

type SignaturesProps = {
  register: any;
  setValue: any;
  errors: any;
  watch?: any;
  defaultValues?: {
    studentSignature?: string;
    parentSignature?: string;
  };
};

const Signatures = ({ register, setValue, errors, watch, defaultValues }: SignaturesProps) => {
  const [studentSignatureURL, setStudentSignatureURL] = useState('');
  const [parentSignatureURL, setParentSignatureURL] = useState('');
  const [isUploadingStudent, setIsUploadingStudent] = useState(false);
  const [isUploadingParent, setIsUploadingParent] = useState(false);
  const [studentFileId, setStudentFileId] = useState<string | null>(null);
  const [parentFileId, setParentFileId] = useState<string | null>(null);
  
  // Load existing signatures if available
  useEffect(() => {
    const existingStudentSignature = watch ? watch('studentSignature') : defaultValues?.studentSignature;
    const existingParentSignature = watch ? watch('parentSignature') : defaultValues?.parentSignature;
    
    if (existingStudentSignature && typeof existingStudentSignature === 'string') {
      setStudentSignatureURL(existingStudentSignature);
      if (isImageKitUrl(existingStudentSignature)) {
        const fileId = extractFileIdFromUrl(existingStudentSignature);
        setStudentFileId(fileId);
      }
    }
    
    if (existingParentSignature && typeof existingParentSignature === 'string') {
      setParentSignatureURL(existingParentSignature);
      if (isImageKitUrl(existingParentSignature)) {
        const fileId = extractFileIdFromUrl(existingParentSignature);
        setParentFileId(fileId);
      }
    }
  }, [watch, defaultValues]);
  
  // Handle student signature upload with ImageKit integration
  const handleStudentSignatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (2MB limit as per specifications)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Signature file size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setIsUploadingStudent(true);
      
      try {
        // Use smart upload (ImageKit with base64 fallback)
        const uploadedUrl = await smartUpload(file, {
          component: 'student-signature',
          existingFileId: studentFileId || undefined
        });
        
        setStudentSignatureURL(uploadedUrl);
        setValue('studentSignature', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setStudentFileId(newFileId);
          toast.success('Student signature uploaded successfully!');
        }
        
      } catch (error) {
        console.error('Student signature upload failed:', error);
        toast.error('Failed to upload student signature. Please try again.');
      } finally {
        setIsUploadingStudent(false);
      }
    }
  };
  
  // Handle parent signature upload with ImageKit integration
  const handleParentSignatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (2MB limit as per specifications)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Signature file size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setIsUploadingParent(true);
      
      try {
        // Use smart upload (ImageKit with base64 fallback)
        const uploadedUrl = await smartUpload(file, {
          component: 'parent-signature',
          existingFileId: parentFileId || undefined
        });
        
        setParentSignatureURL(uploadedUrl);
        setValue('parentSignature', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setParentFileId(newFileId);
          toast.success('Parent signature uploaded successfully!');
        }
        
      } catch (error) {
        console.error('Parent signature upload failed:', error);
        toast.error('Failed to upload parent signature. Please try again.');
      } finally {
        setIsUploadingParent(false);
      }
    }
  };
  
  // Handle remove student signature
  const handleRemoveStudentSignature = () => {
    setStudentSignatureURL('');
    setValue('studentSignature', '');
    setStudentFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('studentSignature') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  // Handle remove parent signature
  const handleRemoveParentSignature = () => {
    setParentSignatureURL('');
    setValue('parentSignature', '');
    setParentFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('parentSignature') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Student Signature */}
        <div>
          <label htmlFor="studentSignature" className="block text-sm font-medium mb-2 text-gray-700">
            Signature of Student <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 hover:border-gray-400 transition-colors relative">
            {isUploadingStudent ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-xs text-gray-500">Uploading...</p>
              </div>
            ) : studentSignatureURL ? (
              <>
                <img src={studentSignatureURL} alt="Student Signature" className="max-h-full max-w-full object-contain" />
                <button
                  type="button"
                  onClick={handleRemoveStudentSignature}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  title="Remove signature"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-2">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Upload signature image</p>
                <p className="text-gray-300 text-xs">(Max 2MB)</p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="studentSignature"
            accept="image/*"
            onChange={handleStudentSignatureChange}
            disabled={isUploadingStudent}
            className="mt-2 text-sm disabled:opacity-50"
          />
          {studentSignatureURL && (
            <button
              type="button"
              onClick={handleRemoveStudentSignature}
              className="mt-2 text-xs text-red-600 hover:text-red-800 transition-colors"
            >
              Remove Signature
            </button>
          )}
          <input
            type="hidden"
            {...register('studentSignature')}
          />
          {errors.studentSignature && (
            <p className="text-red-500 text-sm mt-1">{errors.studentSignature.message}</p>
          )}
        </div>

        {/* Parent Signature */}
        <div>
          <label htmlFor="parentSignature" className="block text-sm font-medium mb-2 text-gray-700">
            Signature of Parent <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 hover:border-gray-400 transition-colors relative">
            {isUploadingParent ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                <p className="text-xs text-gray-500">Uploading...</p>
              </div>
            ) : parentSignatureURL ? (
              <>
                <img src={parentSignatureURL} alt="Parent Signature" className="max-h-full max-w-full object-contain" />
                <button
                  type="button"
                  onClick={handleRemoveParentSignature}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                  title="Remove signature"
                >
                  ×
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="mb-2">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Upload signature image</p>
                <p className="text-gray-300 text-xs">(Max 2MB)</p>
              </div>
            )}
          </div>
          <input
            type="file"
            id="parentSignature"
            accept="image/*"
            onChange={handleParentSignatureChange}
            disabled={isUploadingParent}
            className="mt-2 text-sm disabled:opacity-50"
          />
          {parentSignatureURL && (
            <button
              type="button"
              onClick={handleRemoveParentSignature}
              className="mt-2 text-xs text-red-600 hover:text-red-800 transition-colors"
            >
              Remove Signature
            </button>
          )}
          <input
            type="hidden"
            {...register('parentSignature')}
          />
          {errors.parentSignature && (
            <p className="text-red-500 text-sm mt-1">{errors.parentSignature.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signatures;