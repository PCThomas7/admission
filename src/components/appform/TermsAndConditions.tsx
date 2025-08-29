import { useForm } from 'react-hook-form';
import { useState } from 'react';

type TermsAndConditionsProps = {
  register: any;
  errors: any;
  isEditMode?: boolean;
};

const TermsAndConditions = ({ register, errors ,isEditMode}: TermsAndConditionsProps) => {
  const [showTerms, setShowTerms] = useState(true);
  const terms = [
    'I have received the Prospectus and gone through it.',
    'I will not discontinue the course',
    'I am agreable to all the changes in the time table you make according to necessity',
    'I shall obey all the rules regarding discipline.',
    'Your decision will be final on matters regarding discipline.',
    'Prof. P.C. Thomas Classes reserve the absolute right to decide the mode of coaching.'
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg md:text-xl">14. Terms and Conditions</h3>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="mb-4">
          <button 
            type="button" 
            onClick={() => setShowTerms(!showTerms)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            {showTerms ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Hide Terms
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                View All Terms
              </>
            )}
          </button>
        </div>
        
        {showTerms && (
          <div className="space-y-2 mb-4 p-3 bg-white rounded border border-gray-100 text-sm">
            {terms.map((term, index) => (
              <div key={index} className="flex items-start py-1">
                <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
                <p className="text-sm">{term}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-start bg-blue-50 p-3 rounded-md">
          <input
            type="checkbox"
            id="termsAgreed"
            checked={isEditMode ? true : register.termsAgreed}
            {...register('termsAgreed', { required: 'You must agree to all terms and conditions' })}
            className="h-5 w-5 mt-0.5 mr-3 accent-blue-600"
          />
          <label htmlFor="termsAgreed" className="text-sm font-medium">
            I have read and agree to all the terms and conditions listed above
          </label>
        </div>
        
        {errors.termsAgreed && (
          <p className="text-red-500 text-sm mt-2">{errors.termsAgreed.message}</p>
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">REFUND OF FEES (General Norms)</h3>
        <p className="text-sm mb-4">
          If you discontinue the class room course you have joined, you are entitled for a partial
          refund of fee, as per the following norms:
        </p>
        
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>
            The application for refund must be made in the prescribed form available free of cost from
            the office on request.
          </li>
          <li>
            Admission fees will not be refunded.
          </li>
          <li>
            The cost of study material supplied at the time of admission or laterwill not be refunded.
          </li>
          <li>
            GST will not be refunded.
          </li>
          <li>
            For getting refund of the remaining amount the student or guardian has to apply in the
            prescribed application form. If the application is submitted in person, he will get a receipt
            indicating the date of receiving the application. If not submitted in person the application is
            to be sent by registered post A/D. The date of receiving the application will be taken for
            calculating the amount of refund.
          </li>
        </ol>
        
        <p className="text-sm mt-4">
        (1) Number of sessions taken for deduction at the above rates will be the sessions conducted at
        the centre between the starting of the course and the receipt of refund application. Whether the
        student was actually present or not is not taken into consideration.
        (2) The actual number of sessions conducted may be more than that quoted above. It depends on
        the time available before the examination. Any how those sessions will not be included for refund.
        </p>
        <p className="text-sm mt-2">
        An amount of Rs. 650/Session for Repeater and Rs. 200/Session for other courses will be deducted for each teaching session conducted after the date of joining 
        </p>
        <p className="text-sm mt-2">
          The following items namely (1) Fee Receipt (2) must be surrendered
          along with the application for refund. Without the above items the refund cannot be made.
        </p>
        
        <p className="text-sm mt-2">
          The refund amount will be given as crossed cheque in the name of the parent or guardian
          within 30 days after the receipt of the application for refund.
        </p>
      
        <p className="text-sm font-bold mt-4">I agree to it.</p>
        <input type="checkbox" 
        checked={isEditMode ? true : register.refundAgreed}
        {...register('refundAgreed', { required: 'You must agree to the refund terms' })} />
        {errors.refundAgreed && (
          <p className="text-red-500 text-sm mt-2">{errors.refundAgreed.message}</p>
        )}
      </div>
    </div>
  );
};

export default TermsAndConditions;