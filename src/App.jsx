import React, { useState } from "react";
import heroImage from "../src/assets/image.png"; 

export default function Brochure() {
  const [formData, setFormData] = useState({
    studentName: "",
    parentContact: "",
    programme: "",
    preferredMode: "Offline",
    schoolBoard: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://api.example.com/submit-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('Success:', data);
      setSubmitStatus('success');
      // Reset form after successful submission
      setFormData({
        studentName: "",
        parentContact: "",
        programme: "",
        preferredMode: "Offline",
        schoolBoard: ""
      });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const programs = [
    {
      id: 1,
      title: "Regular Tuition & Entrance Coaching (OFFLINE)",
      subtitle: "CBSE / State Syllabus",
      mode: "Offline | Classroom",
      timing: "Mon–Sat • 5:00–6:30 PM",
      subjects: ["Physics", "Chemistry", "Mathematics / Biology"],
      idealFor: [
        "Students who prefer structured, face-to-face learning",
        "Daily discipline and peer learning",
      ],
      highlights: [
        "Concept → Practice → Mock tests every fortnight",
        "Doubt-clearing desk after every class",
        "Printed notes + Homework tracker",
      ],
      extras: ["Monthly parent review meet", "Mentor check-ins & study plans"],
      cta: "Enroll for Offline Batch",
    },
    {
      id: 2,
      title: "Holiday Vacation Batch",
      subtitle: "With OFFLINE coaching on Holidays",
      mode: "Online live classes + Offline classes on Holidays",
      timing:
        "Mon–Sat • 5:00–6:30 PM (Online) • 2nd Saturdays, allied Sundays & select Public Holidays (Offline Intensives)",
      subjects: ["Physics", "Chemistry", "Mathematics / Biology"],
      idealFor: ["Students outside city", "Flexibility + rigor"],
      highlights: [
        "Live + recordings access",
        "Practice packs for holidays",
      ],
      extras: ["Attendance & progress analytics", "Quarterly counseling call"],
      cta: "Join Holiday Vacation Batch",
    },
    {
      id: 3,
      title: "Regular Tuition & Entrance Coaching (ONLINE)",
      subtitle: "Live, interactive, device-friendly",
      mode: "Online | Live + LMS",
      timing: "Mon–Sat • 5:00–6:30 PM",
      subjects: ["Physics", "Chemistry", "Mathematics / Biology"],
      idealFor: ["Commute-free learning", "Balance school + sports/arts"],
      highlights: [
        "Recorded classes saved to your LMS",
        "Doubt rooms during the live class",
      ],
      extras: ["Recorded replays", "Digital notes & Daily Practice Papers (DPP)"],
      cta: "Start Online Regular Batch",
    },
    {
      id: 4,
      title: "PCM Tuition",
      subtitle: "Focused subject mastery",
      mode: "Offline | Classroom",
      timing: "Mon-Sat • 6:30–8:00 AM",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      idealFor: [
        "Kerala State Board Students",
        "Students focussing on Board Exams",
      ],
      highlights: [
        "Chapter-wise drills & PYQ mapping",
        "Periodic unit tests & analytics",
      ],
      extras: ["Custom per subject pricing ", "Personal attention for weak areas"],
      cta: "Apply for PCM Tuition",
    },
    {
      id: 5,
      title: "Class 10 → 11 Bridge",
      subtitle: "Smooth Transition to Class 11",
      mode: "Offline / Online",
      timing: "Mon-Sat (Mid Apr to May end) • 9:00–2:00 PM",
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      idealFor: [
        "Students completing Class 10",
        "Lay a strong foundation for NEET & JEE ",
      ],
      highlights: [
        "Chapter-wise drills & PYQ mapping",
        "Periodic unit tests & analytics",
      ],
      extras: ["Custom per subject pricing ", "Personal attention for weak areas"],
      cta: "Apply for PCM Tuition",
    },
  ];

  const faqs = [
    {
      q: "Who are these programmes for?",
      a: "Students completing Class 10 and moving to Class 11 who want a strong foundation for JEE (Main/Advanced) or NEET while managing school academics (CBSE/State/ICSE).",
    },
    {
      q: "What if I miss a class?",
      a: "Offline batches have recap huddles; Online batches provide recordings on the LMS and quick recap notes. Mentors help you catch up.",
    },
    {
      q: "Are there scholarship tests?",
      a: "Yes. Appear for our Scholarship-cum-Admission Test to avail up to 100% fee waiver based on performance.",
    },
    {
      q: "How are doubts resolved?",
      a: "Daily post-class doubt windows, dedicated mentor chat, and weekend clinics. Online learners get private doubt rooms as needed.",
    },
  ];

  return (
    <main className="br-main">
      {/* Hero */}
      <section className="br-hero">
        <div className="br-hero__grid br-container">
          <div className="br-hero__copy">
            <span className="br-pill">
              Class 10 → 11 Bridge • 11 & 12 JEE/NEET Entrance & Tuition
            </span>
            <h1 className="br-hero__title">
              Rock-solid preparation for <span className="txt-indigo">JEE</span> /{" "}
              <span className="txt-rose">NEET</span> — without burning out.
            </h1>
            <p className="br-hero__subtitle">
              Classes that sync with school, smart practice, and mentor
              support. Choose Offline, Online, or Hybrid—designed for real
              progress.
            </p>
            <div className="br-actions">
              <a href="#programmes" className="btn btn--primary">
                Explore Programmes
              </a>
              <a href="#apply" className="btn btn--ghost">
                Take Scholarship Test
              </a>
            </div>
            <ul className="br-hero__bullets">
              <li>✓ Daily 90-min classes (5:00–6:30 PM)</li>
              <li>✓ Fortnightly mock tests with analysis</li>
              <li>✓ Doubt support & mentor tracking</li>
              <li>✓ NCERT-first approach + PYQ mapping</li>
            </ul>
          </div>

          <div className="br-hero__imagewrap">
            <img
              src={heroImage}
              alt="Students studying Physics, Chemistry, Maths and Biology with mentor guidance"
              className="br-hero__image"
            />
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="br-section">
        <div className="br-container">
          <h2 className="br-h2">Choose your programme</h2>
          <p className="br-subtext">
            All options cover Physics, Chemistry, and Mathematics/Biology as per your
            stream. Timings align with school schedules.
          </p>

          <div className="br-grid-2">

            {programs.map((p) => (
              <article key={p.id} className="card">
                <div className="card__head">
                  <h3 className="card__title">{p.title}</h3>
                  <span className="badge">{p.badge}</span>
                </div>
                <p className="card__subtitle">{p.subtitle}</p>

                <div className="card__meta">
                  <div>
                    🕒 <span className="meta__label">Timings:</span> {p.timing}
                  </div>
                  <div>
                    🏷️ <span className="meta__label">Mode:</span> {p.mode}
                  </div>
                  <div>
                    📚 <span className="meta__label">Subjects:</span>{" "}
                    {p.subjects.join(", ")}
                  </div>
                </div>

                <div className="card__cols">
                  <div className="card__panel panel--indigo">
                    <div className="panel__label">Ideal for</div>
                    <ul className="panel__list">
                      {p.idealFor.map((i, idx) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="card__panel panel--rose">
                    <div className="panel__label">Highlights</div>
                    <ul className="panel__list">
                      {p.highlights.map((h, idx) => (
                        <li key={idx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card__extras">
                  <div className="panel__label panel__label--muted">Extras</div>
                  <ul className="panel__list">
                    {p.extras.map((e, idx) => (
                      <li key={idx}>{e}</li>
                    ))}
                  </ul>
                </div>


              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="br-section">
        <div className="br-container">
          <h2 className="br-h2">Compare at a glance</h2>
          <div className="table-wrap">
            <table className="br-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Offline Regular</th>
                  <th>Holiday Vacation (Online + Offline)</th>
                  <th>Online Regular</th>
                  <th>PCM Tuition</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Offline sessions", "Daily", "2nd Sat/Sundays/Holidays", "—", "Sundays"],
                  ["Recordings available", "✓", "✓", "✓", "Optional"],
                  ["Mentor check-ins", "✓", "✓", "✓", "✓"],
                  ["Mock tests + analysis", "Fortnightly", "Fortnightly", "Fortnightly", "Unit-wise"],
                  ["Doubt clinics", "Daily desk", "Online + Offline", "Online chat rooms", "Weekend clinics"],
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 ? "is-alt" : ""}>
                    {row.map((cell, cidx) => (
                      <td key={cidx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* Apply */}
      <section id="apply" className="br-apply">
        <div className="br-apply__bg" />
        <div className="br-container br-apply__content">
          <div className="br-apply__grid">
            <div>
              <h2 className="br-h2">Admissions now open for Class 10 graduates</h2>
              <p className="br-subtext">
                Appear for the Scholarship-cum-Admission Test to secure your seat.
                Limited classroom slots for Offline batches.
              </p>
              <ul className="panel__list">
                <li>• Eligibility: Students completing Class 10 (CBSE/State/ICSE)</li>
                <li>• Documents: Latest report card, ID proof, 2 passport photos</li>
                <li>• Centers: Thrissur campus (Offline)</li>
              </ul>
              <div className="br-actions">
                <a href="#form" className="btn btn--rose">Apply Now</a>
                <a href="#contact" className="btn btn--ghost">Talk to an Academic Counselor</a>
              </div>
            </div>

            <form id="form" className="form" onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <div className="form__message form__message--success">
                  Thank you for your interest! We will contact you shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form__message form__message--error">
                  There was an error submitting your form. Please try again.
                </div>
              )}
              
              <div className="form__row">
                <label className="form__field">
                  <span>Student Name</span>
                  <input 
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    placeholder="Your full name" 
                    required
                  />
                </label>
                <label className="form__field">
                  <span>Parent Contact</span>
                  <input 
                    name="parentContact"
                    value={formData.parentContact}
                    onChange={handleInputChange}
                    placeholder="Phone number" 
                    required
                  />
                </label>
              </div>

              <div className="form__row">
                <label className="form__field">
                  <span>Programme</span>
                  <select 
                    name="programme"
                    value={formData.programme}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select a programme</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.title}>{p.title}</option>
                    ))}
                  </select>
                </label>
                <label className="form__field">
                  <span>Preferred Mode</span>
                  <select 
                    name="preferredMode"
                    value={formData.preferredMode}
                    onChange={handleInputChange}
                  >
                    <option value="Offline">Offline</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </label>
              </div>

              <label className="form__field">
                <span>School / Board</span>
                <input 
                  name="schoolBoard"
                  value={formData.schoolBoard}
                  onChange={handleInputChange}
                  placeholder="CBSE / State" 
                  required
                />
              </label>
              
              <button 
                type="submit" 
                className="btn btn--primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Interest'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="br-section">
        <div className="br-container">
          <h2 className="br-h2">Frequently Asked Questions</h2>
          <div className="br-grid-2">
            {faqs.map((f, i) => (
              <div key={i} className="card">
                <h3 className="card__title">{f.q}</h3>
                <p className="br-paragraph">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="br-footer">
        <div className="br-container br-footer__grid">
          <div>
            <div className="br-brand">PROF P.C. THOMAS & CHAITHANYA CLASSES</div>
            <p className="br-subtext">Class 10 → 11 Bridge • 11 & 12 JEE/NEET Entrance & Tuition</p>
          </div>
          <div>
            <div className="br-foothead">Contact</div>
            <p className="br-subtext">Thrissur Campus • +91-9656676695 • contact@professorpcthomas.com</p>
          </div>
          <div>
            <div className="br-foothead">Quick Links</div>
            <ul className="br-links">
              <li><a href="#programmes">Programmes</a></li>
              <li><a href="#apply">Admissions</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
