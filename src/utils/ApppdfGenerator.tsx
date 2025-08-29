import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

// Create styles for PDF document
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontFamily: 'Helvetica',
    marginTop: 10,
  },
  header: {
    marginBottom: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 3,
    marginBottom: 4,
    marginLeft: 30,
    marginRight: 30,
  },
  note: {
    fontSize: 8,
    marginTop: 2,
    marginBottom: 2,
    
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 40,
    marginBottom: 2,
    marginTop: 2,
    marginRight:20,
  },
  rollNoBox: {
    width: 50,
    height: 18,
    border: '1px solid #000',
    marginLeft: 30,
  },
  rollNoLabel: {
    fontSize: 8,
    textAlign: 'center',
    marginLeft: 30,
  },
  table: {
    marginTop: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 30,
    marginRight: 30,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 20,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    padding: 2,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableCellLeft: {
    padding: 2,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: '#000',
    textAlign: 'left',
    justifyContent: 'center',
  },
  courseNoCell: {
    width: '8%',
  },
  courseNameCell: {
    width: '52%',
  },
  streamCell: {
    width: '20%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  checkboxLabel: {
    fontSize: 8,
    marginRight: 2,
  },
  checkbox: {
    width: 10,
    height: 10,
    border: '1px solid #000',
    marginRight: 2,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 6,
    alignItems: 'flex-start',
      marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
  },
  formLabel: {
    fontSize: 9,
    width: '20%',
    marginRight: 4,
  },
  formValue: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  charBox: {
    width: 14,
    height: 14,
    border: '1px solid #000',
    marginRight: 2,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charText: {
    fontSize: 9,
    textAlign: 'center',
  },
  normalCell: {
    height: 14,
    border: '1px solid #000',
    justifyContent: 'center',
    paddingLeft: 2,
    paddingRight: 2,
    marginRight: 2,
  },
  normalCellText: {
    fontSize: 9,
    textAlign: 'left',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  radioCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    border: '1px solid #000',
    marginRight: 2,
  },
  radioFilled: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
    margin: 1,
  },
  radioLabel: {
    fontSize: 9,
  },
  smallNote: {
    fontSize: 7,
    fontStyle: 'italic',
    marginTop: 1,
    marginLeft: 4,
  },
  photo: {
    width: 70,
    height: 80,
    border: '1px solid #000',
    marginTop: 2,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  signatureBox: {
    width: '30%',
    alignItems: 'center',
  },
  signatureLabel: {
    fontSize: 9,
    marginTop: 2,
  },
  signature: {
    width: 100,
    height: 50,
    border: '1px solid #000',
  },
  refundSection: {
    marginTop: 6,
    border: '1px solid #000',
    padding: 6,
      marginLeft: 30,
    marginRight: 30,
  },
  refundTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 3,
  },
  refundText: {
    fontSize: 8,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  termsSection: {
    marginTop: 6,
      marginLeft: 30,
    marginRight: 30,
  },
  termItem: {
    fontSize: 9,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  paymentSection: {
    marginBottom: 8,
      marginLeft: 30,
    marginRight: 30,
  },
  paymentRow: {
    flexDirection: 'row',
    marginBottom: 2,
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  paymentField: {
    marginLeft: 4,
    height: 16,
    border: '1px solid #000',
    flex: 1,
    marginRight: 4,
  },
  paymentText: {
    fontSize: 9,
    paddingLeft: 2,
  },
  officeSection: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
  },
  officeTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  officeTable: {
    border: '1px solid #000',
  },
  officeRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    minHeight: 18,
    alignItems: 'stretch',
  },
  officeCellLabel: {
    width: '50%',
    borderRight: '1px solid #000',
    padding: 3,
  },
  officeCellValue: {
    width: '50%',
    padding: 3,
  },
  officeText: {
    fontSize: 9,
  },
});

// Helper function to render a single normal cell for text fields (replacing per-character boxes)
const CharacterBoxes = ({ text = '', count = 12, width }: { text?: any; count?: number; width?: number }) => {
  const content = (text ?? '').toString().toUpperCase();
  // Approximate width based on previous per-char boxes (each ~14 width + 2 margin)
  const approximateWidth = Math.max(14, count * 16);
  const finalWidth = typeof width === 'number' ? width : approximateWidth;

  return (
    <View style={styles.formValue}>
      <View style={[styles.normalCell, { width: finalWidth }]}> 
        <Text style={styles.normalCellText} wrap={false}>{content}</Text>
      </View>
    </View>
  );
};

// Helper function for radio buttons
const RadioButton = ({ selected, label }) => (
  <View style={styles.radioOption}>
    <View style={styles.radioCircle}>
      {selected && <View style={styles.radioFilled} />}
    </View>
    <Text style={styles.radioLabel}>{label}</Text>
  </View>
);

// Helper function for checkboxes
const Checkbox = ({ checked, label }) => (
  <View style={styles.checkboxRow}>
    {label && <Text style={styles.checkboxLabel}>{label}</Text>}
    <View style={styles.checkbox}>
      {checked && (
        <View style={{
          width: 6,
          height: 6,
          backgroundColor: '#000',
          margin: 1,
        }} />
      )}
    </View>
  </View>
);

// PDF Document component
const ApplicationFormPDF = ({ formData, isEditMode = false }: { formData: any; isEditMode?: boolean }) => {
  // Extract course type and stream from selectedCourse
  const courseValue = formData.selectedCourse || '';
  const isJEEStream = courseValue.includes('jee');
  const isNEETStream = courseValue.includes('neet');
  // Remove trailing _jee or _neet to preserve multi-word course type like offline_regular
  const courseType = courseValue.replace(/_(jee|neet)$/i, '');
  
  // Normalize 10th std fields (support backend alias keys)
  const tenthSchoolName = formData.schoolName || formData.tenthSchoolName || '';
  const tenthBoard = formData.board || formData.tenthBoard || '';
  const tenthMarksRaw = formData.marks ?? formData.tenthMarks;
  const getBoardKey = (b: string) => (b || '').toLowerCase().replace(/\s+/g, '');
  const tenthMarks = (() => {
    if (tenthMarksRaw == null) return '';
    // If it's a simple number or string, use it directly
    if (typeof tenthMarksRaw === 'number' || (typeof tenthMarksRaw === 'string' && tenthMarksRaw !== '')) {
      return String(tenthMarksRaw);
    }
    // If it's an object, find the value for the selected board
    if (typeof tenthMarksRaw === 'object') {
      const key = getBoardKey(tenthBoard);
      // Known keys: cbse, stateboard, icse, others
      const value = tenthMarksRaw?.[key] ?? '';
      return String(value);
    }
    return '';
  })();

  // Normalize +2 fields (support backend alias keys)
  const plusTwoSchoolName = formData.schoolNamePlusTwo || formData.plusTwoSchoolName || '';
  const plusTwoBoard = formData.boardPlusTwo || formData.plusTwoBoard || '';
  const plusTwoMarksRaw = formData.marksPlusTwo ?? formData.plusTwoMarks;
  const plusTwoMarks = (() => {
    if (plusTwoMarksRaw == null) return '';
    // If it's a simple number or string, use it directly
    if (typeof plusTwoMarksRaw === 'number' || (typeof plusTwoMarksRaw === 'string' && plusTwoMarksRaw !== '')) {
      return String(plusTwoMarksRaw);
    }
    // If it's an object, find the value for the selected board
    if (typeof plusTwoMarksRaw === 'object') {
      const key = getBoardKey(plusTwoBoard);
      const value = plusTwoMarksRaw?.[key] ?? '';
      return String(value);
    }
    return '';
  })();
  
  // Format date of birth
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  // Today's date for signature section
  const todayDateStr = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  
  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Prof. P. C. Thomas Classes & Chaithanya Classes</Text>
          <Text style={styles.subtitle}>APPLICATION FORM</Text>
          <View style={styles.headerRow}>
            <View> 
            </View>
            <View>
              <Text style={styles.rollNoLabel}>Roll No</Text>
              <View style={styles.rollNoBox}>
                <Text style={{ fontSize: 10, textAlign: 'center' }}>{formData.rollNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Course Selection Table */}
        <Text style={styles.sectionTitle}>Course Selection</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={[styles.tableCell, styles.courseNoCell]}>
              <Text>Course No.</Text>
            </View>
            <View style={[styles.tableCellLeft, styles.courseNameCell]}>
              <Text>Course </Text>
            </View>
            <View style={[styles.tableCell, styles.streamCell]}>
              <Text>JEE Stream</Text>
            </View>
            <View style={[styles.tableCell, styles.streamCell]}>
              <Text>NEET Stream</Text>
            </View>
          </View>
          {/* Only show the selected course row */}
          {courseType === 'repeater' && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>1</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>Repeater</Text>
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isJEEStream} />
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isNEETStream} />
              </View>
            </View>
          )}

          {courseType === 'bridge' && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>2</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>Bridge Course</Text>
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isJEEStream} />
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isNEETStream} />
              </View>
            </View>
          )}

          {courseType === 'offline_regular' && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>3</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>Offline Regular Tuition & Entrance Coaching</Text>
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isJEEStream} />
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isNEETStream} />
              </View>
            </View>
          )}

          {courseType === 'online_regular' && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>4</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>Online Regular Tuition & Entrance Coaching</Text>
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isJEEStream} />
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isNEETStream} />
              </View>
            </View>
          )}

          {courseType === 'holiday_vacation' && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>5</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>Holiday-Vacation Batch - Tuition & Entrance Coaching</Text>
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isJEEStream} />
              </View>
              <View style={[styles.tableCell, styles.streamCell]}>
                <Checkbox checked={isNEETStream} />
              </View>
            </View>
          )}

          {(formData.physics || formData.chemistry || formData.maths) && (
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.courseNoCell]}>
                <Text>6</Text>
              </View>
              <View style={[styles.tableCellLeft, styles.courseNameCell]}>
                <Text>PCM Tuition only</Text>
              </View>
              <View style={[styles.tableCell, { width: '40%' }]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Checkbox label="Phy" checked={formData.physics} />
                  <Checkbox label="Che" checked={formData.chemistry} />
                  <Checkbox label="Maths" checked={formData.maths} />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Photo Box */}
        <View style={{ position: 'absolute', top: 170, right: 50, width: 70, height: 80, border: '1px solid #000', justifyContent: 'center', alignItems: 'center' }}>
          {formData.photo ? (
            <Image src={formData.photo} style={{ width: 68, height: 78 }} />
          ) : (
            <Text style={{ fontSize: 9, textAlign: 'center' }}>PHOTO</Text>
          )}
        </View>
        
        {/* Personal Information */}
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>1. Name</Text>
          <CharacterBoxes text={formData.name} count={30} width={300} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>2. Sex</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton selected={formData.gender === 'Male'} label="Male" />
            <RadioButton selected={formData.gender === 'Female'} label="Female" />
            <Text style={[styles.formLabel, { marginLeft: 20 }]}>Date of Birth</Text>
            <Text style={{ fontSize: 9, border: '1px solid #000', padding: 2, width: 50, textAlign: 'center' }}>{formatDate(formData.dateOfBirth)}</Text>
          </View>
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>3. Father's Name</Text>
          <CharacterBoxes text={formData.fathersName} count={30} width={300} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>4. Occupation</Text>
          <CharacterBoxes text={formData.occupation} count={30} width={300} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>5. Address</Text>
          <View style={{ width: '80%' }}>
            <CharacterBoxes text={formData.address?.substring(0, 50)} count={50} />
            <CharacterBoxes text={formData.address?.substring(50, 100)} count={50} />
            <CharacterBoxes text={formData.address?.substring(100, 150)} count={50} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 1 }}>
              <Text style={{ fontSize: 6, marginRight: 2 }}>Pin</Text>
              <CharacterBoxes text={formData.pincode} count={6} />
            </View>
          </View>
        </View>
        
        {/* Parent/Guardian Information */}
        <Text style={styles.sectionTitle}>Parent/Guardian Information</Text>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>6. Parent Mobile No</Text>
          <CharacterBoxes text={formData.parentMobile} count={10} />
          <Text style={{ fontSize: 6, marginLeft: 5, marginRight: 2 }}>Alternate Mobile No</Text>
          <CharacterBoxes text={formData.alternateMobile} count={10} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>7. Parent's Whatsapp No</Text>
          <CharacterBoxes text={formData.parentWhatsapp} count={10} />
          <Text style={styles.smallNote}>(For the purpose of sending examination marks and dates of absence)</Text>
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>8. Student Mobile number for sending login details</Text>
          <CharacterBoxes text={formData.studentMobile} count={10} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>9. Parent's E-mail</Text>
          <CharacterBoxes text={formData.parentEmail} count={35} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>10. Student's E-mail for sending login details</Text>
          <CharacterBoxes text={formData.studentEmail} count={35} />
        </View>
        
        {/* Educational Details */}
        <Text style={styles.sectionTitle}>Educational Details</Text>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>11. Name of School (10th Std)</Text>
          <CharacterBoxes text={tenthSchoolName} count={35} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>12. Board (10th Std)</Text>
          <CharacterBoxes text={tenthBoard} count={20} />
        </View>
        
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>13. Marks/Percentage (10th)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Show selected board and marks */}
            {tenthBoard && (
              <View style={{ marginRight: 10, marginBottom: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 8, marginRight: 5 }}>{tenthBoard}:</Text>
                <View style={{ border: '1px solid #000', padding: 2, width: 60 }}>
                  <Text style={{ fontSize: 8, textAlign: 'center' }}>{tenthMarks}</Text>
                </View>
              </View>
            )}
            
            {/* Legacy display for backward compatibility */}
            {!tenthBoard && (
              <>
                <View style={{ marginRight: 5, marginBottom: 2 }}>
                  <Text style={{ fontSize: 5 }}>STATE BOARD</Text>
                  <CharacterBoxes text={formData.marks?.stateboard} count={4} />
                </View>
                <View style={{ marginRight: 5, marginBottom: 2 }}>
                  <Text style={{ fontSize: 5 }}>CBSE</Text>
                  <CharacterBoxes text={formData.marks?.cbse} count={4} />
                </View>
                <View style={{ marginRight: 5, marginBottom: 2 }}>
                  <Text style={{ fontSize: 5 }}>ICSE</Text>
                  <CharacterBoxes text={formData.marks?.icse} count={4} />
                </View>
                <View style={{ marginRight: 5, marginBottom: 2 }}>
                  <Text style={{ fontSize: 5 }}>Others</Text>
                  <CharacterBoxes text={formData.marks?.others} count={4} />
                </View>
              </>
            )}
          </View>
        </View>
        
        {/* +2 Educational Details for Repeater Course */}
        {(formData.selectedCourse?.startsWith('repeater') || plusTwoSchoolName || plusTwoBoard || plusTwoMarks) && (
          <>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>14. Name of School (+2/12th Std)</Text>
              <CharacterBoxes text={plusTwoSchoolName} count={35} />
            </View>
            
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>15. Board (+2/12th Std)</Text>
              <CharacterBoxes text={plusTwoBoard} count={20} />
            </View>
            
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>16. Marks/Percentage (+2/12th)</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Show selected +2 board and marks */}
                {plusTwoBoard && (
                  <View style={{ marginRight: 10, marginBottom: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 8, marginRight: 5 }}>{plusTwoBoard}:</Text>
                    <View style={{ border: '1px solid #000', padding: 2, width: 60 }}>
                      <Text style={{ fontSize: 8, textAlign: 'center' }}>{plusTwoMarks}</Text>
                    </View>
                  </View>
                )}
                
                {/* Legacy display for backward compatibility */}
                {!plusTwoBoard && (
                  <>
                    <View style={{ marginRight: 5, marginBottom: 2 }}>
                      <Text style={{ fontSize: 5 }}>CBSE</Text>
                      <CharacterBoxes text={(plusTwoMarksRaw && typeof plusTwoMarksRaw === 'object') ? plusTwoMarksRaw.cbse : ''} count={4} />
                    </View>
                    <View style={{ marginRight: 5, marginBottom: 2 }}>
                      <Text style={{ fontSize: 5 }}>STATE BOARD</Text>
                      <CharacterBoxes text={(plusTwoMarksRaw && typeof plusTwoMarksRaw === 'object') ? plusTwoMarksRaw.stateboard : ''} count={4} />
                    </View>
                    <View style={{ marginRight: 5, marginBottom: 2 }}>
                      <Text style={{ fontSize: 5 }}>ICSE</Text>
                      <CharacterBoxes text={(plusTwoMarksRaw && typeof plusTwoMarksRaw === 'object') ? plusTwoMarksRaw.icse : ''} count={4} />
                    </View>
                    <View style={{ marginRight: 5, marginBottom: 2 }}>
                      <Text style={{ fontSize: 5 }}>Others</Text>
                      <CharacterBoxes text={(plusTwoMarksRaw && typeof plusTwoMarksRaw === 'object') ? plusTwoMarksRaw.others : ''} count={4} />
                    </View>
                  </>
                )}
              </View>
            </View>
          </>
        )}

        {/* Entrance Exam Marks - Only for Repeater Course with specific streams */}
        {formData.selectedCourse?.startsWith('repeater') && (isJEEStream || isNEETStream) && (
          <>
            {isJEEStream && (
              <>
                <View style={styles.formRow}>
                  <Text style={styles.formLabel}>17. JEE Main Percentile</Text>
                  <CharacterBoxes text={formData.jeeMainMarks} count={15} />
                </View>
                
                {/* <View style={styles.formRow}>
                  <Text style={styles.formLabel}>18. JEE Advanced Marks</Text>
                  <CharacterBoxes text={formData.jeeAdvancedMarks} count={15} />
                </View> */}
              </>
            )}
            
            {isNEETStream && (
              <View style={styles.formRow}>
                <Text style={styles.formLabel}>17. NEET Marks</Text>
                <CharacterBoxes text={formData.neetMarks} count={15} />
              </View>
            )}
          </>
        )}
      </Page>
      
      {/* Second Page */}
      <Page size="A4" style={styles.page}>
        
        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={styles.paymentSection}>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Name of the Student</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.studentName}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Name of the Account Holder</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.accountHolderName}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Amount Remitted</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.amountRemitted}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Name of Bank</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.bankName}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Reference Number</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.referenceNumber}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Date of Remittance</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.remittanceDate}</Text>
            </View>
          </View>
          
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Mobile No</Text>
            <View style={styles.paymentField}>
              <Text style={styles.paymentText}>{formData.mobileNumber}</Text>
            </View>
          </View>
        </View>
        
        {/* Terms and Conditions */}
        <Text style={styles.sectionTitle}>Terms and Conditions</Text>
        <View style={styles.termsSection}>
          <Text style={styles.termItem}> a) I have received the Prospectus and gone through it.</Text>
          <Text style={[styles.termItem , {paddingLeft:12}]}> b) I will not discontinue the course</Text>
          <Text style={[styles.termItem , {paddingLeft:12}]}> c) I am agreable to all the changes in the time table you
 make according to necessity</Text>
          <Text style={[styles.termItem , {paddingLeft:12}]}> d) I shall obey all the rules regarding discipline.</Text>
          <Text style={[styles.termItem , {paddingLeft:12}]}> e) Your decision will be final on matters regarding discipline.</Text>
          <Text style={[styles.termItem , {paddingLeft:12}]}> f) Prof. P. C. Thomas Classes reserve the absolute right to decide the mode of coaching.</Text>
        </View>
        
        {/* Refund Policy */}
        <View style={styles.refundSection}>
          <Text style={styles.refundTitle}>REFUND OF FEES (General Norms)</Text>
          <Text style={styles.refundText}>If you discontinue the class room course you have joined, you are entitled for a partial refund of fee, as per the following norms</Text>
          <Text style={styles.refundText}> a) The application for refund must be made in the prescribed form available free of cost from
 the office on request.</Text>
          <Text style={styles.refundText}> b) Admission fees will not be refunded.</Text>
          <Text style={styles.refundText}> c) The cost of study material supplied at the time of admission or later will not be refunded.</Text>
          <Text style={styles.refundText}> d) GST will not be refunded.</Text>
          <Text style={styles.refundText}> e) For getting refund of the remaining amount the student or guardian has to apply in the prescribed application form. If the application is submitted in person,  he will get a receipt
 indicating the date of receiving the application. If not submitted in person the application is
 to be sent by registered post A/D. The date of receiving the application will be taken for
 calculating the amount of refund.</Text>
          <Text style={styles.refundText}> f) (1) Number of sessions taken for deduction at the above rates will be the sessions conducted at
 the centre between the starting of the course and the receipt of refund application. Whether the
 student was actually present or not is not taken into consideration. </Text>
          <Text style={styles.refundText}> (2) The actual number of sessions conducted may be more than the quoted above. It depends on the time available before the examination. Any how these sessions will not be included for refund.</Text>
          <Text style={styles.refundText}> g) An amount of Rs. 650/Session for Repeater and Rs. 200/Session for other courses will be deducted for each teaching session conducted after the date of joining </Text>
          <Text style={styles.refundText}> h) The following items namely (1) Fee Receipt (2) must be surrendered along with the application for refund. Without the above items the refund cannot be made.</Text>
          <Text style={styles.refundText}> i) The refund amount will be given as crossed cheque in the name of the parent or guardian within 30 days after the receipt of the application for refund.</Text>
        </View>
        
        <View style={{ marginTop: 3 ,marginLeft:30 ,marginRight:30}}>
          <Text style={{ fontSize: 8, fontWeight: 'bold' }}>I agree to it.</Text>
        </View>
        
        {/* Signatures */}
        <Text style={styles.sectionTitle}>Signatures</Text>
        <View style={styles.signatureRow}>
          <View style={styles.signatureBox}>
            <Text style={{ fontSize: 8 }}>16.</Text>
            <Text style={styles.signatureLabel}>Signature of Student</Text>
            <View style={styles.signature}>
              {formData.studentSignature ? (
                <Image src={formData.studentSignature} style={{ width: 98, height: 50 }} />
              ) : null}
            </View>
          </View>
          
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Signature of Parent</Text>
            <View style={styles.signature}>
              {formData.parentSignature ? (
                <Image src={formData.parentSignature} style={{ width: 98, height: 50 }} />
              ) : null}
            </View>
          </View>
          
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Date</Text>
            <CharacterBoxes text={todayDateStr} count={5} />
          </View>
        </View>

        
        <View style={{ marginTop: 5 ,marginLeft:30 ,marginRight:30 ,marginBottom:3 ,textAlign:'center'}}>
          <Text style={{ fontSize: 8, fontWeight: 'bold' ,borderBottom:'1px dotted #000'}}></Text>
        </View>

        {/* For Office Use Only - Only visible in edit mode */}
        {isEditMode && (
          <View style={styles.officeSection}>
            <Text style={styles.officeTitle}>For Office Use Only</Text>
            <View style={styles.officeTable}>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Course Fee</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.courseFee ? `${formData.courseFee}` : ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Concession Amount</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.concessionAmount ? `${formData.concessionAmount}` : ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Balance Fee payable</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.balanceFeePayable ? `${formData.balanceFeePayable}` : ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Amount paid during admission</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.amountPaidDuringAdmission ? `${formData.amountPaidDuringAdmission}` : ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Fee Receipt No.</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.feeReceiptNo || formData.feeReceiptNoAndDate || ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Receipt Date</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.receiptDate || ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Balance due</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.balanceDue ? `${formData.balanceDue}` : ''}</Text>
                </View>
              </View>
              <View style={styles.officeRow}>
                <View style={styles.officeCellLabel}><Text style={styles.officeText}>Reason for concession</Text></View>
                <View style={styles.officeCellValue}>
                  <Text style={styles.officeText}>{formData.reasonForConcession || ''}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', minHeight: 32 }}>
                <View style={[styles.officeCellLabel, { borderRight: '1px solid #000', borderTop: '1px solid #000' }]}>
                  <Text style={styles.officeText}>Name & Signature of Authorised Person</Text>
                  {formData.authorisedPersonName && (
                    <Text style={[styles.officeText, { marginTop: 2, fontWeight: 'bold' }]}>{formData.authorisedPersonName}</Text>
                  )}
                </View>
                <View style={{ width: '50%', borderTop: '1px solid #000', padding: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {formData.authorisedPersonSignature && (
                    <Image src={formData.authorisedPersonSignature} style={{ width: 80, height: 25 }} />
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

// PDF Download Button component
export const PDFDownloadButton = ({ formData, isEditMode = false }: { formData: any; isEditMode?: boolean }) => (
  <PDFDownloadLink 
    document={<ApplicationFormPDF formData={formData} isEditMode={isEditMode} />} 
    fileName="application-form.pdf"
    style={{
      textDecoration: 'none',
      padding: '10px 20px',
      color: 'white',
      backgroundColor: '#4CAF50',
      borderRadius: '4px',
      cursor: 'pointer',
      display: 'inline-block',
      marginTop: '10px',
    }}
  >
    {({ blob, url, loading, error }) => 
      loading ? 'Generating PDF...' : 'Download Application PDF'
    }
  </PDFDownloadLink>
);

export default ApplicationFormPDF;