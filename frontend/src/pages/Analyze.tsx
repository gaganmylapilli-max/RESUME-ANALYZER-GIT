import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, UploadCloud, ChevronRight, AlertCircle, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function Analyze() {
  const [file, setFile] = useState<File | null>(null);
  const [jdText, setJdText ] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop : (acceptedFiles) => setFile(acceptedFiles[0]),
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if(!file || !jdText) {
      setError('Please provide a file and job description text.');
      return;
    }
    setError(null);
    setLoading(true);

    //form Data will package the date - file + text to send it to the backend
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobDescription', jdText);
    try{
      const response = await axios.post(
            'http://localhost:8080/api/analyzer/upload',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );
          setResult(response.data);  
      } 
      
      catch (err: any) {
        setError('An error occurred while analyzing the file.');
      }

      finally {
            setLoading(false);
      }
    };

    const getScoreColor = (score: number) => {
      if (score >= 80) return '#4ade80';
      if (score >= 50) return '#facc15';
      return '#ef4444';
    }

  return (
    <div style ={{ maxWidth: '1100px', margin: '0 auto' }}>

      {/* main heading of the page */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}
      >
      <h1 className="heading-gradient" style={{fontSize: '2.5rem', fontWeight: 'bold'}}>
        Analyze Your Resume
      </h1>
      <p style={{fontSize: '1.2rem', color: '#94a3b8', marginTop: '0.5rem'}}>
        Upload your resume and job description to get a detailed analysis.
      </p>
      </motion.div>

      {/* Shows Error if it comes */}
      { error && (
        <div style={{ 
          display: 'flex',
          alignItems: 'center', gap: '0.5rem',
          background: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: '0.75rem', marginBottom: '1.5rem', padding: '1rem',
          color: '#fca5a5'}}>
            <AlertCircle size={20}/>
            <span>{error}</span>
        </div>
      )}

      {/* INPUT SECTION */}
      <AnimatePresence>
        {!result && (
          <motion.div
          initial = {{ opacity: 0, scale: 0.98 }}
          animate = {{ opacity: 1, scale: 1 }}
          exit = {{ opacity: 0, scale: 0.95 }}
          >  
            <div style = {{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="glass-panel" style ={{padding: '1.5rem', display: 'flex', flexDirection: 'column', height:'380px'}}>
                  <h3 style ={{fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0'}}>
                    1. Upload Resume (PDF / DOCX)
                  </h3>
                    <div
                    {...getRootProps()}
                    style={{
                      flex: 1,
                      border: `2px dashed ${isDragActive ? '#a855f7' : '#33415'}`,
                      borderRadius: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      background: isDragActive ? 'rgba(168, 85, 247, 0.08)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                    > 
                    <input {...getInputProps()} />
                    {file ? (
                          <div style={{ textAlign: 'center' }}>
                            <CheckCircle2 size={48} color="#4ade80" style={{marginBottom: '0.75rem'}} />
                            <p style={{ fontWeight: 600, color: '#e2e8f0' }}>{file.name}</p>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}> Click to change file </p>
                          </div>
                    ) : (
                          <div style={{ textAlign: 'center', color: '#64748b' }}>
                            <UploadCloud size={52} style={{marginBottom: '1rem', display: 'block',
                              margin: '0 auto 1rem'}} />
                              <p style ={{fontSize: '1rem' }}> Drag & drop your resume here </p>
                              <p style ={{fontSize: '0.875rem', marginTop: '0.5rem'}}> or click to browse </p>
                          </div>
                    )}

                    </div>
            </div>
          {/* RIGTH - JOB DESCRIPTION TEXT AREA */}
                <div className="glass-panel" style ={{padding: '1.5rem', display: 'flex', flexDirection: 'column', height:'380px'}}>
                <h3 style = {{fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0'}}>
                  2. Paste Job Description
                </h3>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here..."
                  style={{ flex: 1,
                    border: '1px solid #334155',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    background: 'rgba(15, 23, 42, 0.6)',
                    color: '#e2e8f0',
                    fontSize: '0.9rem',
                    resize: 'none',
                    outline: 'none',
                    fontFamily: 'inter, sans-serif',
                    lineHeight: 1.6}}
                />
                </div>
          </div>
          
          <div style={{display: 'fkex', justifyContent: 'center', marginTop: '2rem'}}>
                    <button
                      onClick={handleAnalyze}
                      disabled={loading || !file || !jdText}
                      style={{
                        padding: '1rem 3rem',
                        background: loading || !file || !jdText ? '#1e293b' : 'linear-gradient(to right, #2563eb, #7c3aed)',
                        color: loading || !file || !jdText ? '#64748b' : 'white',
                        border: 'none',
                        borderRadius: '9999px',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        cursor: loading || !file || !jdText ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {loading ? (
                        <>
                        <div style={{
                          width: '20px', height: '20px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTop: '2px solid white',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite'
                        }}></div>
                        <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                        <span>Start Analysis</span>
                        <ChevronRight size={22} />
                        </>
                      )}
                    </button>
          </div>
          </motion.div>
    )}
    </AnimatePresence>

    {/* Result section */}
    <AnimatePresence>
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <p style= {{color: '#94a3b8', marginBottom: '1.5rem', fontWeight: 600}}>ATS score</p>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                border: `6px solid ${getScoreColor(result.atsScore)}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: `0 0 30px ${getScoreColor(result.atsScore)}40`
              }}>
                <span style= {{ fontSize: '2.5rem', fontWeight: 800, color: getScoreColor(result.atsScore) }}>
                  {result.atsScore}%
                </span>
              </div>

            <p style ={{
              marginTop: '1rem', fontWeight: 600, color:  getScoreColor(result.atsScore)}}>
              {result.atsScore >= 80 ? '🎉 Strong Match!' : result.atsScore >= 50 ? '⚠️ Moderate Match' : '❌ Weak Match'}
            </p>            
            </div>

            {/* Missing Skill card */}
            <div className="glass-panel" style={{ padding: '2rem'}}>
              <p style= {{ fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0', fontSize: '1.1rem'}}>Missing Skills</p>
              <div style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '0.75rem', padding: '1rem',
                color: '#fca5a5', lineHeight: 1.8
              }}>
                <ReactMarkdown>{result.missingSkills}</ReactMarkdown>              
              </div>
            </div>
          </div>


        {/* Rewritten Resume Card */}
        <div className="glass-panel" style={{ padding: '2rem', marginTop: '1.5rem'}}>
          <p style= {{ fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0', fontSize: '1.1rem'}}>
            AI Suggested Bullet Points
          </p>
          <div style={{
            background: 'rgba(37, 99, 235, 0.05)',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            borderRadius: '0.75rem', padding: '1.5rem',
            color: '#bfdbfe', lineHeight: 1.9
          }}>
            <ReactMarkdown>{result.rewrittenResume}</ReactMarkdown>
          </div>
        </div>

      {/* Analyse another Button */}
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '1rem'}}>
        <button
          onClick={() => {
            setResult(null);
            setFile(null);
            setJdText('');
          }}
          style={{
            padding: '0.75rem 2rem',
            background: 'transparent',            
            color: '#94a3b8',
            border: '1px solid #334155',
            borderRadius: '9999px',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.95rem'
          }}>
            ← Analyze Another Resume
          </button>
      </div>
        </motion.div>
      )}
    </AnimatePresence>

      </div>
  );
}
export default Analyze;
