import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Reports.css';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load reports from localStorage
    const savedReports = localStorage.getItem('medicalReports');
    if (savedReports) {
      const reportsData = JSON.parse(savedReports);
      // Filter reports for current user
      const userReports = reportsData.filter(report => report.userEmail === user.email);
      setReports(userReports);
    } else {
      // Generate sample reports for demonstration
      generateSampleReports();
    }
  }, [user, navigate]);

  const generateSampleReports = () => {
    const sampleReports = [
      {
        id: 1,
        userEmail: user.email,
        reportType: 'Blood Test',
        date: '2026-01-15',
        doctor: 'Dr. Sarah Johnson',
        status: 'Completed',
        content: 'Complete Blood Count (CBC) results:\n- Hemoglobin: 14.5 g/dL (Normal)\n- WBC Count: 7,200/μL (Normal)\n- Platelet Count: 250,000/μL (Normal)\n\nAll values within normal range. No abnormalities detected.'
      },
      {
        id: 2,
        userEmail: user.email,
        reportType: 'X-Ray',
        date: '2026-01-20',
        doctor: 'Dr. Michael Chen',
        status: 'Completed',
        content: 'Chest X-Ray Report:\n- Lungs: Clear, no infiltrates or masses\n- Heart: Normal size and contour\n- Bones: No fractures or abnormalities\n\nImpression: Normal chest radiograph.'
      },
      {
        id: 3,
        userEmail: user.email,
        reportType: 'General Checkup',
        date: '2026-01-28',
        doctor: 'Dr. Emily Williams',
        status: 'Completed',
        content: 'Annual Health Checkup:\n- Blood Pressure: 120/80 mmHg\n- Heart Rate: 72 bpm\n- Temperature: 98.6°F\n- Weight: Normal BMI\n\nRecommendation: Continue regular exercise and balanced diet. Next checkup in 12 months.'
      }
    ];

    localStorage.setItem('medicalReports', JSON.stringify(sampleReports));
    setReports(sampleReports);
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  const handleDownloadReport = (report) => {
    // Create professional HTML report
    const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Report - ${report.reportType}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 60px 20px;
            color: #333;
            min-height: 100vh;
        }
        .report-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            position: relative;
        }
        .report-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
            background-size: 200% 100%;
        }
        .report-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 50px 60px;
            position: relative;
            overflow: hidden;
        }
        .report-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -10%;
            width: 400px;
            height: 400px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
        }
        .report-header::after {
            content: '';
            position: absolute;
            bottom: -30%;
            left: -5%;
            width: 300px;
            height: 300px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 50%;
        }
        .header-content {
            position: relative;
            z-index: 1;
        }
        .hospital-logo {
            font-size: 3.5rem;
            margin-bottom: 15px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        .hospital-name {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .hospital-tagline {
            font-size: 1rem;
            opacity: 0.9;
            font-weight: 300;
            margin-bottom: 20px;
        }
        .hospital-address {
            font-size: 0.9rem;
            opacity: 0.85;
            line-height: 1.6;
            font-weight: 400;
        }
        .report-title {
            background: linear-gradient(to right, #f8f9fa 0%, #ffffff 100%);
            padding: 35px 60px;
            border-bottom: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .report-title h1 {
            color: #667eea;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: -1px;
        }
        .report-id {
            background: #667eea;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        .report-body {
            padding: 50px 60px;
        }
        .info-section {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 50px;
        }
        .info-group {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            padding: 30px;
            border-radius: 12px;
            border-left: 4px solid #667eea;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .info-group h3 {
            color: #667eea;
            font-size: 0.95rem;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-group h3::before {
            content: '▪';
            font-size: 1.2rem;
        }
        .info-item {
            margin-bottom: 18px;
            padding-bottom: 12px;
            border-bottom: 1px solid #e9ecef;
        }
        .info-item:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }
        .info-label {
            color: #6c757d;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            margin-bottom: 6px;
        }
        .info-value {
            color: #212529;
            font-size: 1.05rem;
            font-weight: 500;
            letter-spacing: -0.2px;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 16px;
            font-size: 0.85rem;
            font-weight: 600;
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            box-shadow: 0 2px 4px rgba(21, 87, 36, 0.15);
        }
        .status-badge::before {
            content: '✓';
            font-size: 1rem;
        }
        .report-content {
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            padding: 40px;
            border-radius: 12px;
            margin-bottom: 40px;
            border: 1px solid #e9ecef;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .report-content h3 {
            color: #667eea;
            font-size: 1.4rem;
            margin-bottom: 25px;
            font-weight: 700;
            letter-spacing: -0.5px;
            padding-bottom: 15px;
            border-bottom: 2px solid #667eea;
        }
        .report-text {
            color: #495057;
            line-height: 1.9;
            white-space: pre-wrap;
            font-size: 1.05rem;
            letter-spacing: -0.1px;
        }
        .report-footer {
            padding: 40px 0 0 0;
            margin-top: 40px;
            border-top: 2px solid #e9ecef;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }
        .doctor-signature {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
        }
        .doctor-signature p {
            margin-bottom: 12px;
            color: #6c757d;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        .signature-line {
            border-top: 3px solid #667eea;
            margin-top: 50px;
            padding-top: 12px;
            font-weight: 600;
            color: #212529;
            font-size: 1.1rem;
        }
        .generated-date {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .generated-date p {
            color: #495057;
            font-size: 0.9rem;
            margin-bottom: 8px;
        }
        .generated-date strong {
            color: #212529;
            font-weight: 700;
        }
        .watermark {
            background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
            text-align: center;
            padding: 40px;
            color: #6c757d;
            font-size: 0.85rem;
            line-height: 1.8;
            border-top: 1px solid #dee2e6;
        }
        .watermark p:first-child {
            font-weight: 600;
            margin-bottom: 8px;
        }
        .confidential-notice {
            background: #fff3cd;
            border: 2px solid #ffc107;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            color: #856404;
        }
        .confidential-notice strong {
            display: block;
            margin-bottom: 8px;
            font-size: 1.05rem;
        }
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .report-container {
                box-shadow: none;
                max-width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <div class="header-content">
                <div class="hospital-logo">⚕️</div>
                <div class="hospital-name">Stay Healthy Medical Center</div>
                <div class="hospital-tagline">Excellence in Healthcare Since 2010</div>
                <div class="hospital-address">
                    123 Health Street, Medical District, NY 10001<br>
                    Phone: (555) 123-4567 | Fax: (555) 123-4568<br>
                    Email: reports@stayhealthy.com | www.stayhealthy.com
                </div>
            </div>
        </div>
        
        <div class="report-title">
            <h1>📋 Medical Report</h1>
            <div class="report-id">Report ID: SH-${report.id}-${report.date.replace(/-/g, '')}</div>
        </div>
        
        <div class="report-body">
            <div class="confidential-notice">
                <strong>⚠️ CONFIDENTIAL MEDICAL DOCUMENT</strong>
                This report contains private health information protected by HIPAA regulations. Unauthorized disclosure is prohibited by law.
            </div>
            
            <div class="info-section">
                <div class="info-group">
                    <h3>Patient Information</h3>
                    <div class="info-item">
                        <span class="info-label">Patient Name</span>
                        <div class="info-value">${user.name}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Email Address</span>
                        <div class="info-value">${user.email}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Contact Number</span>
                        <div class="info-value">${user.phone || 'Not Provided'}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Patient ID</span>
                        <div class="info-value">PT-${user.email.substring(0, 8).toUpperCase()}</div>
                    </div>
                </div>
                
                <div class="info-group">
                    <h3>Report Information</h3>
                    <div class="info-item">
                        <span class="info-label">Report Type</span>
                        <div class="info-value">${report.reportType}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Report Date</span>
                        <div class="info-value">${new Date(report.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Attending Physician</span>
                        <div class="info-value">${report.doctor}</div>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Report Status</span>
                        <div class="info-value"><span class="status-badge">${report.status}</span></div>
                    </div>
                </div>
            </div>
            
            <div class="report-content">
                <h3>📊 Clinical Findings & Results</h3>
                <div class="report-text">${report.content}</div>
            </div>
            
            <div class="report-footer">
                <div class="doctor-signature">
                    <p>Electronically Verified & Signed By</p>
                    <div class="signature-line">${report.doctor}</div>
                    <p style="margin-top: 8px; font-size: 0.8rem; color: #6c757d;">Licensed Medical Practitioner</p>
                </div>
                <div class="generated-date">
                    <p><strong>Report Generated:</strong></p>
                    <p>${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                    <p style="margin-top: 15px;"><strong>Valid Until:</strong></p>
                    <p>${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </div>
        
        <div class="watermark">
            <p>This is a computer-generated report and is valid without physical signature.</p>
            <p>For verification, contact Stay Healthy Medical Center at (555) 123-4567</p>
            <p style="margin-top: 15px;">© 2026 Stay Healthy Medical Center. All Rights Reserved. | Accredited by Joint Commission</p>
        </div>
    </div>
</body>
</html>
    `.trim();

    // Create blob and download as HTML
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `StayHealthy_${report.reportType.replace(/\s+/g, '_')}_${report.date}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section className="reports-section">
      <div className="container">
        <h2>Your Medical Reports</h2>
        <p className="subtitle">View and download your medical reports</p>
        
        {reports.length === 0 ? (
          <div className="no-reports">
            <p>You don't have any medical reports yet.</p>
            <a href="/instant-consultation" className="btn btn-primary">Book an Appointment</a>
          </div>
        ) : (
          <div className="reports-table">
            <table>
              <thead>
                <tr>
                  <th>Report Type</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>View Report</th>
                  <th>Download Report</th>
                </tr>
              </thead>
              <tbody>
                {reports.map(report => (
                  <tr key={report.id}>
                    <td>{report.reportType}</td>
                    <td>{report.date}</td>
                    <td>{report.doctor}</td>
                    <td>
                      <span className={`status-badge ${report.status.toLowerCase()}`}>
                        {report.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-view"
                        onClick={() => handleViewReport(report)}
                      >
                        View Report
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn btn-download"
                        onClick={() => handleDownloadReport(report)}
                      >
                        Download Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Popup open={showModal} onClose={handleCloseModal} modal nested>
          <div className="report-modal">
            <button className="close-modal" onClick={handleCloseModal}>
              <i className="bi bi-x-lg"></i>
            </button>
            
            <h3>Medical Report</h3>
            
            {selectedReport && (
              <div className="report-content">
                <div className="report-header">
                  <div className="report-info-item">
                    <strong>Report Type:</strong> {selectedReport.reportType}
                  </div>
                  <div className="report-info-item">
                    <strong>Date:</strong> {selectedReport.date}
                  </div>
                  <div className="report-info-item">
                    <strong>Doctor:</strong> {selectedReport.doctor}
                  </div>
                  <div className="report-info-item">
                    <strong>Status:</strong> <span className={`status-badge ${selectedReport.status.toLowerCase()}`}>{selectedReport.status}</span>
                  </div>
                </div>
                
                <div className="report-details">
                  <h4>Report Details</h4>
                  <pre>{selectedReport.content}</pre>
                </div>

                <div className="modal-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleDownloadReport(selectedReport)}
                  >
                    <i className="bi bi-download"></i> Download Report
                  </button>
                </div>
              </div>
            )}
          </div>
        </Popup>
      </div>
    </section>
  );
}
