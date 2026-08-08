import { useEffect, useState } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import { Clock, FileText, DownloadCloud } from 'lucide-react';


function History() {
  // fetching the backend list of history 
  const [ history, setHistory ] = useState<any[]>([]);
  // To know whether the data is still loading
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:8080/api/analyzer/history')
    .then(response => {
      setHistory(response.data);
    })
    .catch(error => {
      console.error('Error fetching history:', error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);


  return (
    <div style={{maxWidth: '800px', margin: '0 auto'}}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{textAlign: 'center', marginBottom: '3rem'}}
      >

        <div style ={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap:'0.75rem'}}>
          <Clock size={32} color="#a78bfa"/>
          <h1 style ={{fontSize: '2.5rem', fontWeight: '800'}}>Browser History</h1> 
        </div>        
        <p style={{color: '', marginTop:'0.5rem'}}>
          Load all your past Analysis history
        </p>        
      </motion.div>

      {/* Loading spinner */}
      {loading && (        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTop: '3px solid #a855f7',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}/>
      </div>       
      )
}
      
      {!loading && history.length === 0 && (
        <div className="glass-panel" style ={{textAlign: 'center', padding: '4rem', color :'#94a3b8'}}>
          <DownloadCloud size={48} style={{margin:'0 auto 1rem', display:'block'}}/>
          <p style={{fontSize:'1.25rem'}}>No history found</p>
          <p style={{fontSize:'0.9', marginTop:'0.5rem'}}>Go to analyze page and upload your first resume</p>
        </div>
      )}

      {/* Now show the actual history items */}
      <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
        {history.map((item, index) => (
          <motion.div
            key={index}
            className="glass-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between' 
            }}
            >
              {/* Left - File Name and JD preview */}            
            <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
              <FileText size={32} color='#60a5fa'/>
              <div>
                <p style={{fontSize:'1.1rem', fontWeight:'700', color: '#e2e8f0'}}>
                  {item.resume.fileName}
                </p>
                <p style={{
                  color:'#64748b',
                  fontSize:'0.85rem',
                  marginTop:'0.25rem',
                  maxWidth:'500px',
                  whiteSpace:'nowrap',
                  overflow:'hidden',
                  textOverflow:'ellipsis'
                }}>
                  {item.jobDescription.descriptionText}
                </p>              
              </div>
            </div>
          
          {/* Right ATS score badge */}
          <div style={{
            background: item.atsScore >= 80
              ? 'rgba(74, 222, 128, 0.15)'
              : item.atsScore >= 60
              ? 'rgba(250, 204, 21, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
              border: `1px solid ${item.atsScore >= 80 ? '#4ade80' : item.atsScore >= 60 ? '#facc15' : '#ef4444'}`,
            borderRadius: '9999px',
            padding: '0.4rem 1.2rem',
            textAlign: 'center',
            minWidth: '80px'
          }}>
            <p style={{
              fontWeight: '800',
              fontSize: '1.3rem',
              color: item.atsScore >= 80 ? '#4ade80' : item.atsScore >= 60 ? '#facc15' : '#ef4444'}}>
                {item.atsScore}%
            </p>
            <p style = {{fontSize:'0.75rem', color:'#94a3b8'}}>
              ATS Score
            </p>
          </div>

          </motion.div>
        ))}
      </div>

    </div>

  );
}

export default History;