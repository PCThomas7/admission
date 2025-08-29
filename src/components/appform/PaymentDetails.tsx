import { Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
type PaymentDetailsProps = {
  register: any;
  errors: any;
  control: any;
};

const PaymentDetails = ({ register, errors, control }: PaymentDetailsProps) => {
  return (
    <div className="space-y-4">
        {/* Online Transfer Details */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="font-medium text-lg mb-3">ONLINE TRANSFER DETAILS</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm"><span className="font-medium">Name of the Account Holder:</span> PROF P C THOMAS CLASSES</p>
            <p className="text-sm"><span className="font-medium">Name of the Bank:</span> SOUTH INDIAN BANK LTD</p>
            <p className="text-sm"><span className="font-medium">Address:</span> EASTFORT, THRISSUR</p>
            <p className="text-sm"><span className="font-medium">Account No:</span> 0368073000001102</p>
          </div>
          <div>
            <p className="text-sm"><span className="font-medium">Account Type:</span> CD</p>
            <p className="text-sm"><span className="font-medium">IFSC:</span> SIBL0000368</p>
            <p className="text-sm"><span className="font-medium">Email ID:</span> contact@professorpcthomas.com</p>
          </div>
        </div>
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm">Please send the following details to <span className="font-medium">contact@professorpcthomas.com</span> after making the payment to issue Receipt</p>
        </div>
      </div>
      

      {/* Student Name */}
      <div>
        <label htmlFor="studentName" className="block text-sm font-medium mb-1">Name of the Student</label>
        <input
          type="text"
          id="studentName"
          {...register('studentName', { required: 'Student name is required' })}
          className="w-full border rounded-md p-2"
        />
        {errors.studentName && (
          <p className="text-red-500 text-sm">{errors.studentName.message}</p>
        )}
      </div>

      {/* Account Holder Name */}
      <div>
        <label htmlFor="accountHolderName" className="block text-sm font-medium mb-1">Name of the Account Holder</label>
        <input
          type="text"
          id="accountHolderName"
          {...register('accountHolderName', { required: 'Account holder name is required' })}
          className="w-full border rounded-md p-2"
        />
        {errors.accountHolderName && (
          <p className="text-red-500 text-sm">{errors.accountHolderName.message}</p>
        )}
      </div>

      {/* Amount Remitted */}
      <div>
        <label htmlFor="amountRemitted" className="block text-sm font-medium mb-1">Amount Remitted</label>
        <input
          type="number"
          id="amountRemitted"
          {...register('amountRemitted', {
            required: 'Amount is required',
            valueAsNumber: true,
            min: { value: 1, message: 'Amount must be greater than 0' },
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.amountRemitted && (
          <p className="text-red-500 text-sm">{errors.amountRemitted.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Bank Name */}
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium mb-1">Name of Bank</label>
          <input
            type="text"
            id="bankName"
            {...register('bankName', { required: 'Bank name is required' })}
            className="w-full border rounded-md p-2"
          />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName.message}</p>
          )}
        </div>

        {/* Reference Number */}
        <div>
          <label htmlFor="referenceNumber" className="block text-sm font-medium mb-1">Reference Number</label>
          <input
            type="text"
            id="referenceNumber"
            {...register('referenceNumber', { required: 'Reference number is required' })}
            className="w-full border rounded-md p-2"
          />
          {errors.referenceNumber && (
            <p className="text-red-500 text-sm">{errors.referenceNumber.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Date of Remittance */}
        <div>
          <label htmlFor="remittanceDate" className="block text-sm font-medium mb-1">Date of Remittance</label>
          <input
            type="date"
            id="remittanceDate"
            {...register('remittanceDate', { required: 'Remittance date is required' })}
            className="w-full border rounded-md p-2"
          />
          {errors.remittanceDate && (
            <p className="text-red-500 text-sm">{errors.remittanceDate.message}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label htmlFor="mobileNumber" className="block text-sm font-medium mb-1">Mobile No</label>
          <Controller
            name="mobileNumber"
            control={control}
            rules={{
              required: 'Mobile number is required',
              validate: (value) => isValidPhoneNumber(value) || 'Enter a valid phone number',
            }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                id="mobileNumber"
                defaultCountry="IN"
                international
                className="w-full border rounded-md p-2"
              />
            )}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">{errors.mobileNumber.message}</p>
          )}
        </div>
      </div>


    
    </div>
  );
};

export default PaymentDetails;