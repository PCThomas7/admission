 

type FormInputs = {
  selectedCourse: string;
  rollNumber: string;
  // Other form fields will be added as needed
};

type CourseSelectionProps = {
  register: any;
  errors: any;
  watch: any;
  setValue: any;
  isEditMode?: boolean;
};

 const CourseSelection = ({ register, errors, watch, setValue ,isEditMode}: CourseSelectionProps) => {
  const courses = [
    { id: 1, name: 'Repeater', value: 'repeater' },
    { id: 2, name: 'Bridge Course', value: 'bridge' },
    { id: 3, name: 'Offline Regular Tuition & Entrance Coaching ', value: 'offline_regular' },
    { id: 4, name: 'Online Regular Tuition & Entrance Coaching', value: 'online_regular' },
    { id: 5, name: 'Holiday-Vacation Batch - Tuition & Entrance Coaching', value: 'holiday_vacation' },
    { id: 6, name: 'PCM Tuition only', value: 'tuition_only_hybrid' },
  ];

  // Watch current selections to enforce mutual exclusivity
  const selectedCourse = watch('selectedCourse');
  const physics = watch('physics');
  const chemistry = watch('chemistry');
  const maths = watch('maths');
  const pcmSelected = !!(physics || chemistry || maths);
  
  // Check if PCM Tuition only radio option is selected
  const isPCMTuitionSelected = selectedCourse === 'tuition_only_hybrid';

  return (
    <div className="space-y-4">
      {isEditMode && <div className="flex justify-end mb-4">
        <div className="border border-gray-300 p-2 w-48 sm:w-48 shadow-sm rounded">
          <div className="text-sm mb-1 font-medium">Roll No</div>
          <input
            type="text"
            {...register('rollNumber')}
            className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>}
      
      {/* Mobile view - Stacked cards for small screens */}
      <div className="md:hidden">
        {courses.map((course) => (
          <div key={course.id} className="mb-4 border rounded-lg shadow-sm p-3 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Course {course.id}</span>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">{course.name}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="border-r pr-2">
                <div className="text-center mb-1 text-sm font-medium text-gray-600">JEE Stream</div>
                <div className="flex justify-center">
                  {course.id !== 6 ? (
                    <input
                      type="radio"
                      id={`course-${course.id}-jee-mobile`}
                      value={`${course.value}_jee`}
                      disabled={pcmSelected}
                      {...register('selectedCourse', {
                        validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                        onChange: () => {
                          // Clear PCM selections when choosing a main course
                          setValue('physics', false);
                          setValue('chemistry', false);
                          setValue('maths', false);
                        },
                      })}
                      className="h-5 w-5"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <input
                        type="radio"
                        id={`course-${course.id}-pcm-mobile`}
                        value={course.value}
                        {...register('selectedCourse', {
                          validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                          onChange: () => {
                            // Clear individual PCM selections when selecting the radio
                            setValue('physics', false);
                            setValue('chemistry', false);
                            setValue('maths', false);
                          },
                        })}
                        className="h-5 w-5"
                      />
                      {isPCMTuitionSelected && (
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Physics</span>
                            <input
                              type="checkbox"
                              id="physics-mobile"
                              {...register('physics', {
                                setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                              })}
                              className="h-4 w-4"
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Chemistry</span>
                            <input
                              type="checkbox"
                              id="chemistry-mobile"
                              {...register('chemistry', {
                                setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                              })}
                              className="h-4 w-4"
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm">Maths</span>
                            <input
                              type="checkbox"
                              id="maths-mobile"
                              {...register('maths', {
                                setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                              })}
                              className="h-4 w-4"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pl-2">
                <div className="text-center mb-1 text-sm font-medium text-gray-600">NEET Stream</div>
                <div className="flex justify-center">
                  {course.id !== 6 && (
                    <input
                      type="radio"
                      id={`course-${course.id}-neet-mobile`}
                      value={`${course.value}_neet`}
                      disabled={pcmSelected}
                      {...register('selectedCourse', {
                        validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                        onChange: () => {
                          setValue('physics', false);
                          setValue('chemistry', false);
                          setValue('maths', false);
                        },
                      })}
                      className="h-5 w-5"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Desktop view - Traditional table for medium screens and up */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-center w-16">Course No.</th>
              <th className="border p-2 text-center">Course </th>
              <th className="border p-2 text-center w-24">JEE Stream</th>
              <th className="border p-2 text-center w-24">NEET Stream</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="border p-2 text-center font-medium">{course.id}</td>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2 text-center">
                  {course.id !== 6 ? (
                    <input
                      type="radio"
                      id={`course-${course.id}-jee`}
                      value={`${course.value}_jee`}
                      disabled={pcmSelected}
                      {...register('selectedCourse', {
                        validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                        onChange: () => {
                          setValue('physics', false);
                          setValue('chemistry', false);
                          setValue('maths', false);
                        },
                      })}
                      className="h-4 w-4"
                    />
                  ) : (
                    <div className="flex flex-col items-center">
                      <input
                        type="radio"
                        id={`course-${course.id}-pcm`}
                        value={course.value}
                        {...register('selectedCourse', {
                          validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                          onChange: () => {
                            // Clear individual PCM selections when selecting the radio
                            setValue('physics', false);
                            setValue('chemistry', false);
                            setValue('maths', false);
                          },
                        })}
                        className="h-4 w-4 mb-2"
                      />
                      {isPCMTuitionSelected && (
                        <div className="flex justify-center items-center">
                          <span className="mr-2 text-xs">Phy</span>
                          <input
                            type="checkbox"
                            id="physics"
                            {...register('physics', {
                              setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                            })}
                            className="h-4 w-4 mx-1"
                          />
                          <span className="mx-2 text-xs">Che</span>
                          <input
                            type="checkbox"
                            id="chemistry"
                            {...register('chemistry', {
                              setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                            })}
                            className="h-4 w-4 mx-1"
                          />
                          <span className="mx-2 text-xs">Maths</span>
                          <input
                            type="checkbox"
                            id="maths"
                            {...register('maths', {
                              setValueAs: (v: any) => Array.isArray(v) ? v.length > 0 : !!v,
                            })}
                            className="h-4 w-4 mx-1"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td className="border p-2 text-center ">
                  {course.id !== 6 && (
                    <input
                      type="radio"
                      id={`course-${course.id}-neet`}
                      value={`${course.value}_neet`}
                      disabled={pcmSelected}
                      {...register('selectedCourse', {
                        validate: (v: string) => (pcmSelected || !!v) || 'Please select a course',
                        onChange: () => {
                          setValue('physics', false);
                          setValue('chemistry', false);
                          setValue('maths', false);
                        },
                      })}
                      className="h-4 w-4"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {errors.selectedCourse && (
        <p className="text-red-500 text-sm mt-2">{errors.selectedCourse.message}</p>
      )}
    </div>
  );
};

export default CourseSelection;