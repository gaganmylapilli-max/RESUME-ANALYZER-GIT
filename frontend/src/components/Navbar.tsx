// useLocation tells us which page the user is currently on
import { useLocation } from 'react-router-dom';
// Link is like <a href="..."> but without page reload
import { Link } from 'react-router-dom';

//file text is an icon from the lucide -react 
import {FileText} from 'lucide-react';

function Navbar() {
    // uselocation is a function call 
    const location = useLocation();
    const isActive = (path:string) => location.pathname === path;
    return (
        <nav style={{
            display : 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

        }}
        className="glass-panel"  /* the frosted glass efect we have added int eh index.css*/
        >
            {/*LEFT SIDE LOGO AND APP NAME*/}
            <div style ={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            {/*circular item with gradeint bg*/}
            <div style={{
                width: '2rem',
                height:'2rem',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #3b82f6, #a855f7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <FileText size ={16} color= "white"/>
            </div>
            {/* appname -> click this it'll go back to the home */}
            <Link to="/" style={{textDecoration: 'none' }}>
                <span className="heading-gradient" style={{
                    fontSize:'1.25rem',
                    fontWeight: 800
                }}>
                    Analyzer.AI
                </span>
            </Link>

            </div>
            {/* RIGHT SIDE NAVIGATION LINKS  */}
            <div style ={{display: 'flex',
                gap:'2rem'
            }}>
                <Link to="/analyze" style={{
                    textDecoration:'none',
                    color:isActive('/analyze')?'white' : '#94a3b8',
                    fontWeight:600,
                    borderBottom: isActive('/analyze') ? '2px solid #a855f7' : 'none',
                    paddingBottom: '4px'
                }}>
                    Analyze
                </Link>

                <Link to="/history" style={{
                    textDecoration:'none',
                    color: isActive('/history') ? 'white' : '#94a3b8',
                    fontWeight:600,
                    borderBottom: isActive('/history') ? '2px solid #a855f7' : 'none',
                    paddingBottom: '4px'
                }}>
                    History
                </Link>
            </div>
            

        </nav>
    );  
}

export default Navbar;