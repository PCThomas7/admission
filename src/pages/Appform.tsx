import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { submitApplicationForm, getApplicationForm } from '../services/publicapi';
import { toast } from 'react-hot-toast';

import CourseSelection from '../components/appform/CourseSelection';
import PersonalInformation from '../components/appform/PersonalInformation';
import ParentInformation from '../components/appform/ParentInformation';
import EducationalDetails from '../components/appform/EducationalDetails';
import PaymentDetails from '../components/appform/PaymentDetails';
import TermsAndConditions from '../components/appform/TermsAndConditions';
import Signatures from '../components/appform/Signatures';
import PhotoUpload from '../components/appform/PhotoUpload';
import OfficeUse from '../components/appform/OfficeUse';

// Import PDF generator
import { PDFDownloadButton } from '../utils/ApppdfGenerator';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

interface AppFormProps {
  isEditMode?: boolean;
}

function Appform({ isEditMode = false }: AppFormProps) {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, control, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(isEditMode);

  // Load form data in edit mode
  useEffect(() => {
    const loadFormData = async () => {
      if (!isEditMode || !id) return;
      
      try {
        const response = await getApplicationForm(id);
        if (response?.data) {
          const formData = response.data;
          
          
          
          // Process marks data to match form structure
          const processedData = {
            ...formData,
            // Handle tenth marks - extract the actual value from nested structure
            marksType: 'percentage',
            tenthMarks: (() => {
              if (formData.tenthMarks && typeof formData.tenthMarks === 'object') {
                // Find the board that has a value
                const boardKeys = ['cbse', 'stateboard', 'icse', 'others'];
                for (const key of boardKeys) {
                  if (formData.tenthMarks[key] && formData.tenthMarks[key] !== '') {
                    
                    return formData.tenthMarks[key];
                  }
                }
              }
              return formData.tenthMarks || '';
            })(),
            // Handle plus two marks - extract the actual value from nested structure
            plusTwoMarks: (() => {
              if (formData.plusTwoMarks && typeof formData.plusTwoMarks === 'object') {
                // Find the board that has a value
                const boardKeys = ['cbse', 'stateboard', 'icse', 'others'];
                for (const key of boardKeys) {
                  if (formData.plusTwoMarks[key] && formData.plusTwoMarks[key] !== '') {
                   
                    return formData.plusTwoMarks[key];
                  }
                }
              }
              
              return formData.plusTwoMarks || '';
            })(),
            // Preserve the original marks objects for legacy compatibility
            'tenthMarks.cbse': formData.tenthMarks?.cbse || '',
            'tenthMarks.stateboard': formData.tenthMarks?.stateboard || '',
            'tenthMarks.icse': formData.tenthMarks?.icse || '',
            'tenthMarks.others': formData.tenthMarks?.others || '',
            'plusTwoMarks.cbse': formData.plusTwoMarks?.cbse || '',
            'plusTwoMarks.stateboard': formData.plusTwoMarks?.stateboard || '',
            'plusTwoMarks.icse': formData.plusTwoMarks?.icse || '',
            'plusTwoMarks.others': formData.plusTwoMarks?.others || '',
            // Set board values using model field names
            tenthBoard: formData.tenthBoard,
            plusTwoBoard: formData.plusTwoBoard,
            // Set school names using model field names
            tenthSchoolName: formData.tenthSchoolName,
            plusTwoSchoolName: formData.plusTwoSchoolName,
            // Set marklist URLs and images for preview in edit mode
            tenthMarklistUrl: formData.tenthMarklistUrl,
            plusTwoMarklistUrl: formData.plusTwoMarklistUrl,
            // Map marklist URLs to image fields for component preview
            tenthMarklist: formData.tenthMarklistUrl || formData.tenthMarklist || '',
            plusTwoMarklist: formData.plusTwoMarklistUrl || formData.plusTwoMarklist || '',
            // Set email confirmations
            parentEmailConfirm: formData.parentEmail,
            studentEmailConfirm: formData.studentEmail,
            // Office use fields
            courseFee: formData.courseFee,
            concessionAmount: formData.concessionAmount,
            balanceFeePayable: formData.balanceFeePayable,
            amountPaidDuringAdmission: formData.amountPaidDuringAdmission,
            // Handle both old and new receipt fields for backward compatibility
            feeReceiptNoAndDate: formData.feeReceiptNoAndDate,
            feeReceiptNo: formData.feeReceiptNo,
            receiptDate: formData.receiptDate,
            balanceDue: formData.balanceDue,
            reasonForConcession: formData.reasonForConcession,
            authorisedPersonName: formData.authorisedPersonName,
            authorisedPersonSignature: formData.authorisedPersonSignature
          };
          
         
          
          reset(processedData);
          setFormData(processedData);
        }
      } catch (error) {
     
        toast.error('Failed to load application form');
      } finally {
        setIsFormLoading(false);
      }
    };

    loadFormData();
  }, [id, isEditMode, reset]);

 

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
     
      
      // Clean up the data and remove conflicting nested field paths
      const { 
        parentEmailConfirm, 
        studentEmailConfirm,
        marksType,
        // Remove nested field paths that conflict with main fields
        'tenthMarks.cbse': tenthMarksCbse,
        'tenthMarks.stateboard': tenthMarksStateboard,
        'tenthMarks.icse': tenthMarksIcse,
        'tenthMarks.others': tenthMarksOthers,
        'plusTwoMarks.cbse': plusTwoMarksCbse,
        'plusTwoMarks.stateboard': plusTwoMarksStateboard,
        'plusTwoMarks.icse': plusTwoMarksIcse,
        'plusTwoMarks.others': plusTwoMarksOthers,
        ...payload 
      } = data || {};
      
      // Format marks data according to the expected structure
      const formattedData = {
        ...payload,
        // Ensure marklist images are included if they exist
        ...(payload.tenthMarklist && { tenthMarklist: payload.tenthMarklist }),
        ...(payload.plusTwoMarklist && { plusTwoMarklist: payload.plusTwoMarklist }),
        // Ensure marklist URLs are mapped correctly for backend storage
        ...(payload.tenthMarklist && { tenthMarklistUrl: payload.tenthMarklist }),
        ...(payload.plusTwoMarklist && { plusTwoMarklistUrl: payload.plusTwoMarklist }),
        // Format tenth marks - ensure we send the correct structure
        tenthMarks: (() => {
          if (typeof payload.tenthMarks === 'object' && payload.tenthMarks !== null) {
            // If tenthMarks is already an object, use it
            return payload.tenthMarks;
          } else {
            // If tenthMarks is a simple value, create the object structure
            const marksValue = payload.tenthMarks || '';
            return {
              cbse: payload.tenthBoard === 'CBSE' ? marksValue : '',
              stateboard: payload.tenthBoard === 'STATE BOARD' ? marksValue : '',
              icse: payload.tenthBoard === 'ICSE' ? marksValue : '',
              others: (!['CBSE', 'STATE BOARD', 'ICSE'].includes(payload.tenthBoard) && payload.tenthBoard) ? marksValue : ''
            };
          }
        })(),
        // Format plus two marks if available
        ...(payload.plusTwoSchoolName && {
          plusTwoMarks: (() => {
            if (typeof payload.plusTwoMarks === 'object' && payload.plusTwoMarks !== null) {
              // If plusTwoMarks is already an object, use it
              return payload.plusTwoMarks;
            } else {
              // If plusTwoMarks is a simple value, create the object structure
              const marksValue = payload.plusTwoMarks || '';
              return {
                cbse: payload.plusTwoBoard === 'CBSE' ? marksValue : '',
                stateboard: payload.plusTwoBoard === 'STATE BOARD' ? marksValue : '',
                icse: payload.plusTwoBoard === 'ICSE' ? marksValue : '',
                others: (!['CBSE', 'STATE BOARD', 'ICSE'].includes(payload.plusTwoBoard) && payload.plusTwoBoard) ? marksValue : ''
              };
            }
          })()
        })
      };
      ;
      
      // Normalize checkbox arrays like ['on'] to booleans
      const toBool = (v: any) => Array.isArray(v) ? v.length > 0 : v === true || v === 'true' || v === 1 || v === '1';
      formattedData.physics = toBool(formattedData.physics);
      formattedData.chemistry = toBool(formattedData.chemistry);
      formattedData.maths = toBool(formattedData.maths);
      
      let res;
      if (isEditMode && id) {
        // Update existing applicati
      } else {
        // Create new application
        res = await submitApplicationForm(formattedData);
        if (res?.success) {
          toast.success('Application saved successfully');
          setFormData(res.data);
        }
      }
      
      if (!res?.success) {
        throw new Error(res?.message || 'Failed to save application');
      }
    } catch (err: any) {

      toast.error(err?.response?.data?.message || err.message || 'Failed to save application');
      setFormData(data); // fallback on error
    } finally {
      setIsLoading(false);
      if (!isEditMode) {
        setIsSubmitted(true);
      }
    }
  };

  const onError = (formErrors: any) => {
    try {
      toast.error('Please fix the highlighted fields');
      const firstKey = Object.keys(formErrors)[0];
      if (!firstKey) return;
      // Try to find element by name
      let el: HTMLElement | null = document.querySelector(`[name="${firstKey}"]`);
      // Fallback for nested names like marks.cbse
      if (!el) {
        const escaped = firstKey.replace(/\./g, '\\.');
        el = document.querySelector(`[name="${escaped}"]`) as HTMLElement;
      }
      // Try id-based fallback
      if (!el) {
        el = document.getElementById(firstKey);
      }
      if (el && 'focus' in el) {
        (el as HTMLInputElement).focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <LoadingSpinner />
          <p className="mt-3 text-sm text-gray-700">Processing your application…</p>
        </div>
      )}
      <div className="max-w-4xl mx-auto p-3 sm:p-5 md:p-6 bg-white shadow-lg rounded-lg">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Prof. P. C. Thomas Classes & Chaithanya Classes</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2">
            {isEditMode ? 'EDIT APPLICATION FORM' : 'APPLICATION FORM'}
          </h2>
          
          {/* PDF Download Button in Edit Mode */}
          {isEditMode && formData && Object.keys(formData).length > 0 && (
            <div className="mt-4 flex justify-center">
              <div className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors shadow-sm cursor-pointer">
                <PDFDownloadButton formData={formData} isEditMode={isEditMode} />
              </div>
            </div>
          )}
        </div>
        
        {isFormLoading ? (
          <div className="flex items-center justify-center min-h-64">
            <LoadingSpinner />
          </div>
        ) : isSubmitted ? (
          <div className="text-center p-4 sm:p-6 md:p-8">
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-100 mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-green-600 mb-2 sm:mb-4">Application Submitted Successfully!</h3>
              <p className="mb-4 text-sm sm:text-base text-gray-700">Thank you for submitting your application.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-green-700 transition-colors shadow-sm">
                <PDFDownloadButton formData={formData} isEditMode={isEditMode} />
              </div>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-md hover:bg-blue-700 transition-colors shadow-sm"
              >
                Fill Another Application
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Course Selection</h3>
              <CourseSelection register={register} errors={errors} watch={watch} setValue={setValue}  isEditMode={isEditMode}/>
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Personal Information</h3>
              <PersonalInformation register={register} errors={errors} />
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Parent/Guardian Information</h3>
              <ParentInformation register={register} errors={errors} control={control} watch={watch} />
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Educational Details</h3>
              <EducationalDetails register={register} errors={errors} setValue={setValue} watch={watch} />
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Payment Details</h3>
              <PaymentDetails register={register} errors={errors} control={control} />
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2 md:hidden">Terms and Conditions</h3>
                <TermsAndConditions register={register} errors={errors} isEditMode={isEditMode} />
              </div>
              <div>
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Photo</h3>
                <PhotoUpload register={register} setValue={setValue} errors={errors} watch={watch} />
              </div>
            </div>
            
            <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
              <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-gray-800 border-b pb-2">Signatures</h3>
              <Signatures register={register} setValue={setValue} errors={errors} watch={watch} />
            </div>
            
            {/* Office Use Only - Only visible in edit mode */}
            {isEditMode && (
              <div className="border p-3 sm:p-4 md:p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-orange-50 border-orange-200">
                <h3 className="font-bold mb-2 sm:mb-3 md:mb-4 text-base sm:text-lg md:text-xl text-orange-800 border-b pb-2">For Office Use Only</h3>
                <OfficeUse register={register} setValue={setValue} errors={errors} watch={watch} />
              </div>
            )}
            
            <div className="text-center mt-6 sm:mt-8 md:mt-10">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-md transition-colors text-base sm:text-lg font-medium shadow-md text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {isLoading ? 'Submitting…' : (isEditMode ? 'Update Application' : 'Submit Application')}
                </button>
                
                {/* PDF Download Button in Edit Mode */}
                {isEditMode && formData && Object.keys(formData).length > 0 && (
                  <div className="bg-green-600 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-md hover:bg-green-700 transition-colors shadow-md cursor-pointer">
                    <PDFDownloadButton formData={formData} isEditMode={isEditMode} />
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Appform
