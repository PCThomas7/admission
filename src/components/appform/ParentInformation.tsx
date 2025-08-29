import { Controller } from 'react-hook-form';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
type ParentInformationProps = {
  register: any;
  errors: any;
  control: any;
  watch: any;
};

const ParentInformation = ({ register, errors, control, watch }: ParentInformationProps) => {
  return (
    <div className="space-y-4">
      {/* Parent Mobile */}
      <div>
        <label htmlFor="parentMobile" className="block text-sm font-medium mb-1">6. Parent Mobile No</label>
        <Controller
          name="parentMobile"
          control={control}
          rules={{
            required: 'Parent mobile number is required',
            validate: {
              format: (value) =>
                !!value && /^\+91\d{10}$/.test(value) && isValidPhoneNumber(value) || 'Enter a valid Indian mobile number (+91...)',
              uniqueFromStudent: (value) => {
                const studentMobile = watch('studentMobile');
                return !value || !studentMobile || value !== studentMobile || 'Parent mobile number cannot be same as student mobile number';
              },
              uniqueFromAlternate: (value) => {
                const alternateMobile = watch('alternateMobile');
                return !value || !alternateMobile || value !== alternateMobile || 'Parent mobile number cannot be same as alternate mobile number';
              }
            }
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="parentMobile"
              defaultCountry="IN"
              international
              countryCallingCodeEditable={false}
              className="w-full border rounded-md p-2"
            />
          )}
        />
        {errors.parentMobile && (
          <p className="text-red-500 text-sm">{errors.parentMobile.message}</p>
        )}
      </div>

      {/* Alternate Mobile */}
      <div>
        <label htmlFor="alternateMobile" className="block text-sm font-medium mb-1">Alternate Mobile No</label>
        <Controller
          name="alternateMobile"
          control={control}
          rules={{
            required: 'Alternate mobile number is required',
            validate: {
              format: (value) =>
                !value || (/^\+91\d{10}$/.test(value) && isValidPhoneNumber(value)) || 'Enter a valid Indian mobile number (+91...)',
              uniqueFromParent: (value) => {
                const parentMobile = watch('parentMobile');
                return !value || !parentMobile || value !== parentMobile || 'Alternate mobile number cannot be same as parent mobile number';
              },
              uniqueFromStudent: (value) => {
                const studentMobile = watch('studentMobile');
                return !value || !studentMobile || value !== studentMobile || 'Alternate mobile number cannot be same as student mobile number';
              }
            }
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="alternateMobile"
              defaultCountry="IN"
              international
              countryCallingCodeEditable={false}
              className="w-full border rounded-md p-2"
            />
          )}
        />
        {errors.alternateMobile && (
          <p className="text-red-500 text-sm">{errors.alternateMobile.message}</p>
        )}
      </div>

      {/* Parent's Whatsapp */}
      <div>
        <label htmlFor="parentWhatsapp" className="block text-sm font-medium mb-1">7. Parent's Whatsapp No</label>
        <Controller
          name="parentWhatsapp"
          control={control}
          rules={{
            required: "Parent's Whatsapp number is required",
            validate: (value) => !!value && isValidPhoneNumber(value) || 'Enter a valid phone number',
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="parentWhatsapp"
              defaultCountry="IN"
              international
              className="w-full border rounded-md p-2"
            />
          )}
        />
        <p className="text-xs italic mt-1">(For the purpose of sending examination marks and dates of absence)</p>
        {errors.parentWhatsapp && (
          <p className="text-red-500 text-sm">{errors.parentWhatsapp.message}</p>
        )}
      </div>

      {/* Student Mobile */}
      {/* should be india number */}
      <div>
        <label htmlFor="studentMobile" className="block text-sm font-medium mb-1">8. Student Mobile number for sending login details</label>
        <Controller
          name="studentMobile"
          control={control}
          rules={{
            required: 'Student mobile number is required',
            validate: {
              format: (value) => (/^\+91\d{10}$/.test(value) && isValidPhoneNumber(value)) || 'Enter a valid Indian mobile number (+91...)',
              uniqueFromParent: (value) => {
                const parentMobile = watch('parentMobile');
                return !value || !parentMobile || value !== parentMobile || 'Student mobile number cannot be same as parent mobile number';
              },
              uniqueFromAlternate: (value) => {
                const alternateMobile = watch('alternateMobile');
                return !value || !alternateMobile || value !== alternateMobile || 'Student mobile number cannot be same as alternate mobile number';
              }
            }
          }}
          render={({ field }) => (
            <PhoneInput
              {...field}
              id="studentMobile"
              defaultCountry="IN"
              international
              countryCallingCodeEditable={false}
              className="w-full border rounded-md p-2"
            />
          )}
        />
        
        {errors.studentMobile && (
          <p className="text-red-500 text-sm">{errors.studentMobile.message}</p>
        )}
      </div>

      {/* Parent Email  */}
      <div>
        <label htmlFor="parentEmail" className="block text-sm font-medium mb-1">9. Parent's E-mail</label>
        <input
          type="email"
          id="parentEmail"
          {...register('parentEmail', { 
            required: 'Parent email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            },
            validate: {
              uniqueFromStudent: (value) => {
                const studentEmail = watch('studentEmail');
                return !value || !studentEmail || value.toLowerCase() !== studentEmail.toLowerCase() || 'Parent email cannot be same as student email';
              }
            }
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.parentEmail && (
          <p className="text-red-500 text-sm">{errors.parentEmail.message}</p>
        )}
      </div>

      {/* Confirm Parent Email */}
      <div>
        <label htmlFor="parentEmailConfirm" className="block text-sm font-medium mb-1">Confirm Parent's E-mail</label>
        <input
          type="email"
          id="parentEmailConfirm"
          {...register('parentEmailConfirm', {
            required: 'Please confirm parent email',
            validate: (value: string) => value === watch('parentEmail') || 'Emails do not match',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.parentEmailConfirm && (
          <p className="text-red-500 text-sm">{errors.parentEmailConfirm.message}</p>
        )}
      </div>

      {/* Student Email */}
      <div>
        <label htmlFor="studentEmail" className="block text-sm font-medium mb-1">10. Student's E-mail for sending login details</label>
        <input
          type="email"
          id="studentEmail"
          {...register('studentEmail', { 
            required: 'Student email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            },
            validate: {
              uniqueFromParent: (value) => {
                const parentEmail = watch('parentEmail');
                return !value || !parentEmail || value.toLowerCase() !== parentEmail.toLowerCase() || 'Student email cannot be same as parent email';
              }
            }
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.studentEmail && (
          <p className="text-red-500 text-sm">{errors.studentEmail.message}</p>
        )}
      </div>

      {/* Confirm Student Email */}
      <div>
        <label htmlFor="studentEmailConfirm" className="block text-sm font-medium mb-1">Confirm Student's E-mail</label>
        <input
          type="email"
          id="studentEmailConfirm"
          {...register('studentEmailConfirm', {
            required: 'Please confirm student email',
            validate: (value: string) => value === watch('studentEmail') || 'Emails do not match',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          className="w-full border rounded-md p-2"
        />
        {errors.studentEmailConfirm && (
          <p className="text-red-500 text-sm">{errors.studentEmailConfirm.message}</p>
        )}
      </div>
    </div>
  );
};

export default ParentInformation;