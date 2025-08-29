import { useState, useEffect } from 'react';
import { smartUpload, extractFileIdFromUrl, isImageKitUrl } from '../../services/imagekitService';
import { toast } from 'react-hot-toast';

type EducationalDetailsProps = {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
};

const EducationalDetails = ({ register, errors, setValue, watch }: EducationalDetailsProps) => {
  const [tenthMarklistURL, setTenthMarklistURL] = useState('');
  const [plusTwoMarklistURL, setPlusTwoMarklistURL] = useState('');
  const [marksInitialized, setMarksInitialized] = useState(false);
  const [isUploadingTenth, setIsUploadingTenth] = useState(false);
  const [isUploadingPlusTwo, setIsUploadingPlusTwo] = useState(false);
  const [tenthFileId, setTenthFileId] = useState<string | null>(null);
  const [plusTwoFileId, setPlusTwoFileId] = useState<string | null>(null);

  // Watch course selection and board changes
  const selectedCourse = watch('selectedCourse');
  const tenthBoard = watch('tenthBoard');
  const plusTwoBoard = watch('plusTwoBoard');

  // Determine if this is a repeater course
  const isRepeaterCourse = selectedCourse?.includes('repeater');
  
  // Determine stream type for entrance exam marks
  const isJEEStream = selectedCourse?.includes('_jee');
  const isNEETStream = selectedCourse?.includes('_neet');

  // Board options
  const boardOptions = ['CBSE', 'STATE BOARD', 'ICSE', 'Others'];

  // Initialize marks based on board selection (only once per component lifecycle)
  useEffect(() => {
    if (!marksInitialized && (tenthBoard || plusTwoBoard)) {
      // Handle tenth marks initialization
      if (tenthBoard) {
        const currentTenthMarks = watch('tenthMarks');
        if (!currentTenthMarks) {
          setValue('tenthMarks', '');
        }
      }
      
      // Handle plus two marks initialization for repeater courses
      if (isRepeaterCourse && plusTwoBoard) {
        const currentPlusTwoMarks = watch('plusTwoMarks');
        if (!currentPlusTwoMarks) {
          setValue('plusTwoMarks', '');
        }
      }
      
      setMarksInitialized(true);
    }
  }, [tenthBoard, plusTwoBoard, isRepeaterCourse, setValue, watch, marksInitialized]);

  // Handle tenth marklist image upload with ImageKit integration
  const handleTenthMarklistChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (3MB limit as per specifications)
      if (file.size > 3 * 1024 * 1024) {
        toast.error('Marklist file size must be less than 3MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setIsUploadingTenth(true);
      
      try {
        // Use smart upload (ImageKit with base64 fallback)
        const uploadedUrl = await smartUpload(file, {
          component: 'tenth-marklist',
          existingFileId: tenthFileId || undefined
        });
        
        setTenthMarklistURL(uploadedUrl);
        setValue('tenthMarklist', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setTenthFileId(newFileId);
          toast.success('10th marklist uploaded successfully!');
        }
        
      } catch (error) {
        console.error('10th marklist upload failed:', error);
        toast.error('Failed to upload 10th marklist. Please try again.');
      } finally {
        setIsUploadingTenth(false);
      }
    }
  };

  // Handle plus two marklist image upload with ImageKit integration
  const handlePlusTwoMarklistChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file size (3MB limit as per specifications)
      if (file.size > 3 * 1024 * 1024) {
        toast.error('Marklist file size must be less than 3MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }
      
      setIsUploadingPlusTwo(true);
      
      try {
        // Use smart upload (ImageKit with base64 fallback)
        const uploadedUrl = await smartUpload(file, {
          component: 'plus-two-marklist',
          existingFileId: plusTwoFileId || undefined
        });
        
        setPlusTwoMarklistURL(uploadedUrl);
        setValue('plusTwoMarklist', uploadedUrl);
        
        // Update current file ID if it's an ImageKit URL
        if (isImageKitUrl(uploadedUrl)) {
          const newFileId = extractFileIdFromUrl(uploadedUrl);
          setPlusTwoFileId(newFileId);
          toast.success('+2 marklist uploaded successfully!');
        }
        
      } catch (error) {
        console.error('+2 marklist upload failed:', error);
        toast.error('Failed to upload +2 marklist. Please try again.');
      } finally {
        setIsUploadingPlusTwo(false);
      }
    }
  };
  
  // Handle remove tenth marklist
  const handleRemoveTenthMarklist = () => {
    setTenthMarklistURL('');
    setValue('tenthMarklist', '');
    setTenthFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('tenthMarklist') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  // Handle remove plus two marklist
  const handleRemovePlusTwoMarklist = () => {
    setPlusTwoMarklistURL('');
    setValue('plusTwoMarklist', '');
    setPlusTwoFileId(null);
    
    // Reset file input
    const fileInput = document.getElementById('plusTwoMarklist') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  // Load existing marklist images if available
  useEffect(() => {
    const existingTenthMarklist = watch('tenthMarklist');
    const existingPlusTwoMarklist = watch('plusTwoMarklist');
    
    
    if (existingTenthMarklist && typeof existingTenthMarklist === 'string') {
      setTenthMarklistURL(existingTenthMarklist);
      if (isImageKitUrl(existingTenthMarklist)) {
        const fileId = extractFileIdFromUrl(existingTenthMarklist);
        setTenthFileId(fileId);
      }
      
    }
    
    if (existingPlusTwoMarklist && typeof existingPlusTwoMarklist === 'string') {
      setPlusTwoMarklistURL(existingPlusTwoMarklist);
      if (isImageKitUrl(existingPlusTwoMarklist)) {
        const fileId = extractFileIdFromUrl(existingPlusTwoMarklist);
        setPlusTwoFileId(fileId);
      }
      
    }
  }, [watch]);

  return (
    <div className="space-y-6">
      {/* 10th Standard Details */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">10th Standard Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 10th School Name */}
          <div>
            <label htmlFor="tenthSchoolName" className="block text-sm font-medium mb-1">11. School Name (10th)</label>
            <input
              type="text"
              id="tenthSchoolName"
              {...register('tenthSchoolName', { 
                required: '10th school name is required' 
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter 10th school name"
            />
            {errors.tenthSchoolName && (
              <p className="text-red-500 text-sm">{errors.tenthSchoolName.message}</p>
            )}
          </div>

          {/* 10th Board */}
          <div>
            <label htmlFor="tenthBoard" className="block text-sm font-medium mb-1">Board (10th)</label>
            <select
              id="tenthBoard"
              {...register('tenthBoard', { 
                required: '10th board is required' 
              })}
              className="w-full border rounded-md p-2"
            >
              <option value="">Select Board</option>
              {boardOptions.map(board => (
                <option key={board} value={board}>{board}</option>
              ))}
            </select>
            {errors.tenthBoard && (
              <p className="text-red-500 text-sm">{errors.tenthBoard.message}</p>
            )}
          </div>

          {/* 10th Marks */}
          <div>
            <label htmlFor="tenthMarks" className="block text-sm font-medium mb-1">Marks/Percentage (10th)</label>
            <input
              type="number"
              id="tenthMarks"
              {...register('tenthMarks', { 
                required: '10th marks are required',
                pattern: {
                  value: /^[0-9.]+$/,
                  message: 'Please enter valid marks/percentage'
                }
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter marks or percentage"
            />
            {errors.tenthMarks && (
              <p className="text-red-500 text-sm">{errors.tenthMarks.message}</p>
            )}
          </div>

          {/* 10th Marklist Upload */}
          <div>
            <label htmlFor="tenthMarklist" className="block text-sm font-medium mb-1">10th Marklist (Image)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-2 h-20 flex items-center justify-center bg-white hover:border-gray-400 transition-colors relative">
              {isUploadingTenth ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mb-1"></div>
                  <p className="text-xs text-gray-500">Uploading...</p>
                </div>
              ) : tenthMarklistURL ? (
                <>
                  <img src={tenthMarklistURL} alt="10th Marklist" className="max-h-full max-w-full object-contain" />
                  <button
                    type="button"
                    onClick={handleRemoveTenthMarklist}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                    title="Remove marklist"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <div className="mb-1">
                    <svg className="mx-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-xs">Upload marklist image</p>
                  <p className="text-gray-300 text-xs">(Max 3MB)</p>
                </div>
              )}
            </div>
            <input
              type="file"
              id="tenthMarklist"
              accept="image/*"
              onChange={handleTenthMarklistChange}
              disabled={isUploadingTenth}
              className="mt-2 text-sm disabled:opacity-50"
            />
            {tenthMarklistURL && (
              <button
                type="button"
                onClick={handleRemoveTenthMarklist}
                className="mt-1 text-xs text-red-600 hover:text-red-800 transition-colors"
              >
                Remove Marklist
              </button>
            )}
            <input
              type="hidden"
              {...register('tenthMarklist')}
            />
          </div>
        </div>
      </div>

      {/* Plus Two Details - Only for Repeater Course */}
      {isRepeaterCourse && (
        <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
          <h4 className="font-semibold text-lg mb-4 text-blue-800">+2/12th Standard Details (Repeater Course)</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plus Two School Name */}
            <div>
              <label htmlFor="plusTwoSchoolName" className="block text-sm font-medium mb-1">School Name (+2/12th)</label>
              <input
                type="text"
                id="plusTwoSchoolName"
                {...register('plusTwoSchoolName', { 
                  required: isRepeaterCourse ? '+2 school name is required for repeater course' : false
                })}
                className="w-full border rounded-md p-2"
                placeholder="Enter +2/12th school name"
              />
              {errors.plusTwoSchoolName && (
                <p className="text-red-500 text-sm">{errors.plusTwoSchoolName.message}</p>
              )}
            </div>

            {/* Plus Two Board */}
            <div>
              <label htmlFor="plusTwoBoard" className="block text-sm font-medium mb-1">Board (+2/12th)</label>
              <select
                id="plusTwoBoard"
                {...register('plusTwoBoard', { 
                  required: isRepeaterCourse ? '+2 board is required for repeater course' : false
                })}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Board</option>
                {boardOptions.map(board => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
              {errors.plusTwoBoard && (
                <p className="text-red-500 text-sm">{errors.plusTwoBoard.message}</p>
              )}
            </div>

            {/* Plus Two Marks */}
            <div>
              <label htmlFor="plusTwoMarks" className="block text-sm font-medium mb-1">Marks/Percentage (+2/12th)</label>
              <input
                type="number"
                id="plusTwoMarks"
                {...register('plusTwoMarks', { 
                  required: isRepeaterCourse ? '+2 marks are required for repeater course' : false,
                  pattern: {
                    value: /^[0-9.]+$/,
                    message: 'Please enter valid marks/percentage'
                  }
                })}
                className="w-full border rounded-md p-2"
                placeholder="Enter marks or percentage"
              />
              {errors.plusTwoMarks && (
                <p className="text-red-500 text-sm">{errors.plusTwoMarks.message}</p>
              )}
            </div>

            {/* Plus Two Marklist Upload */}
            <div>
              <label htmlFor="plusTwoMarklist" className="block text-sm font-medium mb-1">+2/12th Marklist (Image)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-2 h-20 flex items-center justify-center bg-white hover:border-gray-400 transition-colors relative">
                {isUploadingPlusTwo ? (
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mb-1"></div>
                    <p className="text-xs text-gray-500">Uploading...</p>
                  </div>
                ) : plusTwoMarklistURL ? (
                  <>
                    <img src={plusTwoMarklistURL} alt="+2 Marklist" className="max-h-full max-w-full object-contain" />
                    <button
                      type="button"
                      onClick={handleRemovePlusTwoMarklist}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      title="Remove marklist"
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="mb-1">
                      <svg className="mx-auto h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-400 text-xs">Upload marklist image</p>
                    <p className="text-gray-300 text-xs">(Max 3MB)</p>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="plusTwoMarklist"
                accept="image/*"
                onChange={handlePlusTwoMarklistChange}
                disabled={isUploadingPlusTwo}
                className="mt-2 text-sm disabled:opacity-50"
              />
              {plusTwoMarklistURL && (
                <button
                  type="button"
                  onClick={handleRemovePlusTwoMarklist}
                  className="mt-1 text-xs text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove Marklist
                </button>
              )}
              <input
                type="hidden"
                {...register('plusTwoMarklist')}
              />
            </div>
          </div>
        </div>
      )}

      {/* Entrance Exam Marks - Only for Repeater Course with specific streams */}
      {isRepeaterCourse && (isJEEStream || isNEETStream) && (
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
          <h4 className="font-semibold text-lg mb-4 text-green-800">
            {isJEEStream ? 'JEE Entrance Exam Marks' : 'NEET Entrance Exam Marks'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isJEEStream && (
              <>
                {/* JEE Main Marks */}
                <div>
                  <label htmlFor="jeeMainMarks" className="block text-sm font-medium mb-1">JEE Main percentile</label>
                  <input
                    type="number"
                    id="jeeMainMarks"
                    {...register('jeeMainMarks', {
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: 'Please enter valid marks'
                      }
                    })}
                    className="w-full border rounded-md p-2"
                    placeholder="Enter JEE Main marks"
                  />
                  {errors.jeeMainMarks && (
                    <p className="text-red-500 text-sm">{errors.jeeMainMarks.message}</p>
                  )}
                </div>

                {/* JEE Advanced Marks
                <div>
                  <label htmlFor="jeeAdvancedMarks" className="block text-sm font-medium mb-1">JEE Advanced Marks</label>
                  <input
                    type="text"
                    id="jeeAdvancedMarks"
                    {...register('jeeAdvancedMarks', {
                      pattern: {
                        value: /^[0-9.]+$/,
                        message: 'Please enter valid marks'
                      }
                    })}
                    className="w-full border rounded-md p-2"
                    placeholder="Enter JEE Advanced marks"
                  />
                  {errors.jeeAdvancedMarks && (
                    <p className="text-red-500 text-sm">{errors.jeeAdvancedMarks.message}</p>
                  )}
                </div> */}
              </>
            )}

            {isNEETStream && (
              <div>
                <label htmlFor="neetMarks" className="block text-sm font-medium mb-1">NEET Marks</label>
                <input
                  type="text"
                  id="neetMarks"
                  {...register('neetMarks', {
                    pattern: {
                      value: /^[0-9.]+$/,
                      message: 'Please enter valid marks'
                    }
                  })}
                  className="w-full border rounded-md p-2"
                  placeholder="Enter NEET marks"
                />
                {errors.neetMarks && (
                  <p className="text-red-500 text-sm">{errors.neetMarks.message}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Selection Info */}
      {selectedCourse && (
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Selected Course:</strong> {selectedCourse}
            {isRepeaterCourse && (
              <span className="block mt-1">
                Additional fields for repeater course are shown above.
                {(isJEEStream || isNEETStream) && (
                  <span className="block">
                    {isJEEStream ? 'JEE' : 'NEET'} entrance exam marks section is also available.
                  </span>
                )}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationalDetails;