import { useState, useEffect } from 'react';
import { smartUpload, extractFileIdFromUrl, isImageKitUrl } from '../../services/imagekitService';
import { toast } from 'react-hot-toast';

type OfficeUseProps = {
  register: any;
  errors: any;
  setValue: any;
  watch?: any;
};

const OfficeUse = ({ register, errors, setValue, watch }: OfficeUseProps) => {
  const [authorisedSignatureURL, setAuthorisedSignatureURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  
  // Watch for existing signature data and calculation fields
  const existingSignature = watch ? watch('authorisedPersonSignature') : null;
  const courseFee = watch ? watch('courseFee') : 0;
  const concessionAmount = watch ? watch('concessionAmount') : 0;
  const amountPaidDuringAdmission = watch ? watch('amountPaidDuringAdmission') : 0;
  
  // Calculate balance fee payable and balance due
  const balanceFeePayable = (courseFee || 0) - (concessionAmount || 0);
  const balanceDue = balanceFeePayable - (amountPaidDuringAdmission || 0);
  
  // Load existing signature if available
  useEffect(() => {
    if (existingSignature && typeof existingSignature === 'string') {
      setAuthorisedSignatureURL(existingSignature);
      if (isImageKitUrl(existingSignature)) {
        const fileId = extractFileIdFromUrl(existingSignature);
        setCurrentFileId(fileId);
      }
    }
  }, [existingSignature]);
  
  // Update calculated fields when dependencies change
  useEffect(() => {
    setValue('balanceFeePayable', balanceFeePayable);
  }, [balanceFeePayable, setValue]);
  
  useEffect(() => {
    setValue('balanceDue', balanceDue);
  }, [balanceDue, setValue]);
  
  // Handle authorised person signature upload with ImageKit integration
  const handleAuthorisedSignatureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (2MB limit as per specifications)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Office signature file size must be less than 2MB');
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
          component: 'office-signature',
          existingFileId: currentFileId || undefined
        });
        
        setAuthorisedSignatureURL(uploadedUrl);
        setValue('authorisedPersonSignature', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setCurrentFileId(newFileId);
          toast.success('Office signature uploaded successfully!');
        }
        
      } catch (error) {
        console.error('Office signature upload failed:', error);
        toast.error('Failed to upload office signature. Please try again.');
      } finally {
        setIsUploading(false);
      }
    }
  };
  
  // Handle remove signature
  const handleRemoveSignature = () => {
    setAuthorisedSignatureURL('');
    setValue('authorisedPersonSignature', '');
    setCurrentFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('authorisedPersonSignature') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800 mb-4">
          <strong>Note:</strong> This section is only available in edit mode for office use.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Course Fee */}
          <div>
            <label htmlFor="courseFee" className="block text-sm font-medium mb-1">Course Fee</label>
            <input
              type="number"
              id="courseFee"
              step="0.01"
              min="0"
              {...register('courseFee', {
                valueAsNumber: true,
                min: { value: 0, message: 'Course fee must be positive' }
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter course fee"
            />
            {errors.courseFee && (
              <p className="text-red-500 text-sm">{errors.courseFee.message}</p>
            )}
          </div>

          {/* Concession Amount */}
          <div>
            <label htmlFor="concessionAmount" className="block text-sm font-medium mb-1">Concession Amount</label>
            <input
              type="number"
              id="concessionAmount"
              step="0.01"
              min="0"
              {...register('concessionAmount', {
                valueAsNumber: true,
                min: { value: 0, message: 'Concession amount must be positive' }
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter concession amount"
            />
            {errors.concessionAmount && (
              <p className="text-red-500 text-sm">{errors.concessionAmount.message}</p>
            )}
          </div>

          {/* Balance Fee Payable - Auto Calculated */}
          <div>
            <label htmlFor="balanceFeePayable" className="block text-sm font-medium mb-1">
              Balance Fee Payable
              <span className="text-xs text-gray-500 ml-1">(Auto-calculated: Course Fee - Concession)</span>
            </label>
            <input
              type="number"
              id="balanceFeePayable"
              step="0.01"
              value={balanceFeePayable.toFixed(2)}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              placeholder="Auto-calculated"
            />
            <input
              type="hidden"
              {...register('balanceFeePayable', {
                valueAsNumber: true
              })}
            />
            {errors.balanceFeePayable && (
              <p className="text-red-500 text-sm">{errors.balanceFeePayable.message}</p>
            )}
          </div>

          {/* Amount Paid During Admission */}
          <div>
            <label htmlFor="amountPaidDuringAdmission" className="block text-sm font-medium mb-1">Amount Paid During Admission</label>
            <input
              type="number"
              id="amountPaidDuringAdmission"
              step="0.01"
              min="0"
              {...register('amountPaidDuringAdmission', {
                valueAsNumber: true,
                min: { value: 0, message: 'Amount must be positive' }
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter amount paid during admission"
            />
            {errors.amountPaidDuringAdmission && (
              <p className="text-red-500 text-sm">{errors.amountPaidDuringAdmission.message}</p>
            )}
          </div>

          {/* Fee Receipt No. */}
          <div>
            <label htmlFor="feeReceiptNo" className="block text-sm font-medium mb-1">Fee Receipt No.</label>
            <input
              type="text"
              id="feeReceiptNo"
              {...register('feeReceiptNo')}
              className="w-full border rounded-md p-2"
              placeholder="Enter fee receipt number"
            />
            {errors.feeReceiptNo && (
              <p className="text-red-500 text-sm">{errors.feeReceiptNo.message}</p>
            )}
          </div>

          {/* Receipt Date */}
          <div>
            <label htmlFor="receiptDate" className="block text-sm font-medium mb-1">Receipt Date</label>
            <input
              type="date"
              id="receiptDate"
              {...register('receiptDate')}
              className="w-full border rounded-md p-2"
            />
            {errors.receiptDate && (
              <p className="text-red-500 text-sm">{errors.receiptDate.message}</p>
            )}
          </div>

          {/* Balance Due - Auto Calculated */}
          <div>
            <label htmlFor="balanceDue" className="block text-sm font-medium mb-1">
              Balance Due
              <span className="text-xs text-gray-500 ml-1">(Auto-calculated: Balance Fee - Amount Paid)</span>
            </label>
            <input
              type="number"
              id="balanceDue"
              step="0.01"
              value={balanceDue.toFixed(2)}
              disabled
              className="w-full border rounded-md p-2 bg-gray-100 text-gray-600 cursor-not-allowed"
              placeholder="Auto-calculated"
            />
            <input
              type="hidden"
              {...register('balanceDue', {
                valueAsNumber: true
              })}
            />
            {errors.balanceDue && (
              <p className="text-red-500 text-sm">{errors.balanceDue.message}</p>
            )}
          </div>
        </div>

        {/* Reason for Concession - Full Width */}
        <div className="mt-4">
          <label htmlFor="reasonForConcession" className="block text-sm font-medium mb-1">Reason for Concession</label>
          <textarea
            id="reasonForConcession"
            rows={3}
            {...register('reasonForConcession')}
            className="w-full border rounded-md p-2"
            placeholder="Enter reason for concession (if applicable)"
          />
          {errors.reasonForConcession && (
            <p className="text-red-500 text-sm">{errors.reasonForConcession.message}</p>
          )}
        </div>

        {/* Authorised Person Details */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Authorised Person Name */}
          <div>
            <label htmlFor="authorisedPersonName" className="block text-sm font-medium mb-1">Name of Authorised Person</label>
            <input
              type="text"
              id="authorisedPersonName"
              {...register('authorisedPersonName')}
              className="w-full border rounded-md p-2"
              placeholder="Enter authorised person name"
            />
            {errors.authorisedPersonName && (
              <p className="text-red-500 text-sm">{errors.authorisedPersonName.message}</p>
            )}
          </div>

          {/* Authorised Person Signature */}
          <div>
            <label htmlFor="authorisedPersonSignature" className="block text-sm font-medium mb-2">Signature of Authorised Person</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-32 flex items-center justify-center bg-gray-50 hover:border-gray-400 transition-colors relative">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
                  <p className="text-xs text-gray-500">Uploading...</p>
                </div>
              ) : authorisedSignatureURL ? (
                <>
                  <img src={authorisedSignatureURL} alt="Authorised Person Signature" className="max-h-full max-w-full object-contain" />
                  <button
                    type="button"
                    onClick={handleRemoveSignature}
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
              id="authorisedPersonSignature"
              accept="image/*"
              onChange={handleAuthorisedSignatureChange}
              disabled={isUploading}
              className="mt-2 text-sm disabled:opacity-50"
            />
            {authorisedSignatureURL && (
              <button
                type="button"
                onClick={handleRemoveSignature}
                className="mt-2 text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                Remove Signature
              </button>
            )}
            <input
              type="hidden"
              {...register('authorisedPersonSignature')}
            />
            {errors.authorisedPersonSignature && (
              <p className="text-red-500 text-sm mt-1">{errors.authorisedPersonSignature.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeUse;