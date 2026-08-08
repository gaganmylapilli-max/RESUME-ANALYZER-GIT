import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadCloud, Zap, Sparkles, Target } from 'lucide-react';
   
function Home() {


  return (

    <div style={{
      minHeight: '80vh',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center'
    }}>
      {/* {motion.dev is used to animate this whole block inside when the page loads} */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6  }}
        style={{maxWidth : '800px'}}
        >
          
          {/* Some badge Shi* at top */}
          <div style ={{
            display:'inline-flex',
            alignItems:'center',
            gap: '0.5rem',
            background: 'rgba(168, 85, 247, 0.1)',
            border : '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '9999px',
            padding: '0.4rem 0.1rem',
            fontSize: '0.8rem',
            color:'#c084fc',
            marginBottom: '2rem'
          }}>
            <Zap size={14} />
            <span>bhAAi org.</span>
          </div>

          {/* head line hai bhAAi */}
         <h1 style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1.5rem' }}>

        {/* Line 1 — "Master the" slides in with spring bounce */}
        <motion.span
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 10,
            mass: 1,
          }}
          style={{ display: 'block' }}  
        >
          Master 
        </motion.span>

        {/* Line 2 — "ATS Algorithm" blurs into sharp */}
        <motion.span
          className="heading-gradient"
          initial={{ filter: 'blur(12px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          transition={{
            duration: 0.9,
            delay: 0,
            ease: 'easeOut'
          }}
          style={{ display: 'block' }}  
        >
          ATS Algorithm
        </motion.span>

      </h1>

          {/* Chota bacha of the head line(subtitle) */}
          <p style={{fontSize:'1.2rem', color:'#9ca3af', lineHeight:'1.8', marginBottom:'3rem'}}>
            Resume upload chey ne yakka pandagoo
          </p>

          {/* feature cards anta */}
          <div style={{display:'flex', gap:'1rem', justifyContent:'center',
            marginBottom:'3rem', flexWrap:'wrap'}}>
              {/* 1st block */}
              <div className="glass-panel" style={{padding:'1.5rem', flex:'1', minWidth:'180px'}}>
                <Target size={28} color="#60a5fa" style={{ marginBottom: '0.5rem' }} />                
                <p style ={{fontWeight:600}}>
                  ATHU score
                </p>
                <p style={{color:'#94a3b8', fontSize:'0.85rem'}}>
                  Match choodara bhattu
                </p>              
              </div>

              {/* 2nd block */}
              <div className = "glass-panel" style={{padding:'1.5rem', flex:'1', minWidth:'180px'}}>
                <Sparkles size={28} color="#a78bfa" style={{ marginBottom: '0.5rem' }} />
                <p style = {{fontWeight:800}}> Missing Skills</p>
                <p style={{color:'#94a3b8', fontSize:'0.85rem'}}> See What's missing </p>
              </div>

              {/* 3rd block */}
            <div className = "glass-panel" style={{padding:'1.5rem', flex:'1', minWidth:'180px'}}>
              <UploadCloud size={28} color="#34d399" style={{ marginBottom: '0.5rem' }} />
              <p style={{fontWeight:600}}> AI Rewrite</p>
              <p style={{color:'#94a3b8', fontSize:'0.85rem'}}> Get better Bullet points sulliga</p>
            </div>

          </div>


        <Link to ="/analyze" style = {{textDecoration:'none'}}>
        <button style={{
          padding: '1rem 2.5rem',
          background: 'linear-gradient(to right, #2563eb, #7c3aed)',
          color: 'white',
          border:'none',
          borderRadius: '9999px',
          fontSize: '1rem',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          }}>
          <UploadCloud size={20} />

          Start Analyzing
          
          </button> 
          </Link>
        </motion.div>
    </div>
  );
}

export default Home;