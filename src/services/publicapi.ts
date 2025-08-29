import axios from 'axios';

export interface ApplicationFormPayload {
  selectedCourse?: string;
  rollNumber?: string;
  name?: string;
  gender?: string;
  dateOfBirth?: string;
  fathersName?: string;
  occupation?: string;
  address?: string;
  pincode?: string;
  parentMobile?: string;
  alternateMobile?: string;
  parentWhatsapp?: string;
  studentMobile?: string;
  parentEmail?: string;
  studentEmail?: string;
  // Educational Details - using model field names consistently
  tenthSchoolName?: string;
  tenthBoard?: string;
  tenthMarks?: Record<string, any> | string | number;
  tenthMarklistUrl?: string;
  tenthMarklist?: string; // Base64 or ImageKit URL for marklist image
  // +2 fields for repeater courses
  plusTwoSchoolName?: string;
  plusTwoBoard?: string;
  plusTwoMarks?: Record<string, any> | string | number;
  plusTwoMarklistUrl?: string;
  plusTwoMarklist?: string; // Base64 or ImageKit URL for marklist image
  // Payment details
  paymentMethod?: string;
  amount?: string;
  termsAccepted?: boolean;
  studentName: string,
  accountHolderName: string,
  amountRemitted: number,
  bankName: string,
  referenceNumber: string,
  remittanceDate: string,
  mobileNumber: string,
  physics?: boolean;
  chemistry?: boolean;
  maths?: boolean;
  studentSignature?: string;
  parentSignature?: string;
  photo?: string;
  // Entrance Exam Marks (for repeater courses)
  jeeMainMarks?: string;
  jeeAdvancedMarks?: string;
  neetMarks?: string;
  // Office Use Only fields
  courseFee?: number;
  concessionAmount?: number;
  balanceFeePayable?: number;
  amountPaidDuringAdmission?: number;
  feeReceiptNoAndDate?: string; // Legacy field for backward compatibility
  feeReceiptNo?: string;
  receiptDate?: string;
  balanceDue?: number;
  reasonForConcession?: string;
  authorisedPersonName?: string;
  authorisedPersonSignature?: string;
  // allow any extra fields
  [key: string]: any;
}

export interface SubmitApplicationFormResponse {
  success: boolean;
  message: string;
  data: any;
}

export const submitApplicationForm = async (
  payload: ApplicationFormPayload
): Promise<SubmitApplicationFormResponse> => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/public/application-form`, payload);
  return response.data as SubmitApplicationFormResponse;
};

// Pagination types and API for fetching application forms
export interface ApplicationFormRecord {
  _id: string;
  selectedCourse?: string;
  rollNumber?: string;
  name?: string;
  parentMobile?: string;
  studentMobile?: string;
  parentEmail?: string;
  studentEmail?: string;
  createdAt?: string;
  [key: string]: any;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
export const getApplicationForm = async (id: string): Promise<GetApplicationFormResponse> => {
  try {
    const response = await axios.get<GetApplicationFormResponse>(
      `${import.meta.env.VITE_API_URL}/public/application-forms/${id}`
    );
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch application form');
    }
    
    return {
      success: true,
      data: response.data.data
    };
  } catch (error) {
    console.error('Error fetching application form:', error);
    throw error;
  }
};
