import React, { useRef, useState } from 'react';
import { ArrowUpRight, Sparkles, Terminal, Code2 } from 'lucide-react';
import './Hero.css';

import sushmithaImg from '../assets/sushmitha_profile.png';

const Hero = () => {
  const frameRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  return (
    <section className="hero container section">
      {/* Top micro ticker/status badge */}
      <div className="hero-top-status animate-fade-in">
        <span className="status-indicator">
          <span className="status-ping" />
          <span className="status-dot" />
        </span>
        <span className="status-text">AVAILABLE FOR ROLES & FREELANCE</span>
        <span className="status-sep">/</span>
        <span className="status-location">INDIA</span>
      </div>

      <div className="hero-grid">
        {/* Left Side: Bold Editorial Typography */}
        <div className="hero-content animate-fade-in">
          <div className="hero-role-label">
            <span className="code-bracket">&lt;</span>
            BOYA SUSHMITHA
            <span className="code-bracket">/&gt;</span>
          </div>

          <h1 className="hero-display-title">
            <span className="title-line">
              <span className="title-text">TURNING IDEAS</span>
            </span>
            <span className="title-line">
              <span className="title-text">INTO DIGITAL</span>
            </span>
            <span className="title-line">
              <span className="title-text">EXPERIENCES</span>
            </span>
          </h1>

          <p className="hero-description">
            I’m a passionate developer who loves transforming ideas into interactive web experiences. 
            With Python, modern web frameworks, and a curiosity for AI, I build clean, performant, and 
            user-centered digital products.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-editorial-primary">
              <span>EXPLORE PROJECTS</span>
              <div className="btn-icon-bubble">
                <ArrowUpRight size={16} />
              </div>
            </a>
            <a href="#contact" className="btn btn-editorial-secondary">
              <span>GET IN TOUCH</span>
            </a>
          </div>

          {/* Quick Metrics / Tech Strip */}
          <div className="hero-stats-strip">
            <div className="stat-card">
              <span className="stat-num">02+</span>
              <span className="stat-label">FEATURED PROJECTS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-num">10+</span>
              <span className="stat-label">TECH STACK SKILLS</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-card">
              <span className="stat-num">AI+WEB</span>
              <span className="stat-label">CORE FOCUS</span>
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Framed Media with Motion Accents */}
        <div className="hero-media-showcase animate-fade-in">
          <div 
            ref={frameRef}
            className="editorial-frame"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
            }}
          >
            <div className="frame-corner top-left" />
            <div className="frame-corner top-right" />
            <div className="frame-corner bottom-left" />
            <div className="frame-corner bottom-right" />

            {/* Inner Floating Status Tag */}
            <div className="frame-tag top-tag">
              <Terminal size={12} />
              <span>FULL-STACK & AI DEVELOPER</span>
            </div>

            <div className="media-image-wrapper">
              <img src={sushmithaImg} alt="Boya Sushmitha - Software Developer" className="editorial-profile-img" />
              <div className="media-glare-effect" />
            </div>

            {/* Bottom floating micro card */}
            <div className="frame-tag bottom-tag">
              <Sparkles size={12} />
              <span>BUILDING CLEAN CODE</span>
            </div>
          </div>

          {/* Socials dock beneath image */}
          <div className="hero-socials-dock">
            <a href="https://github.com/Boya-sushmitha" target="_blank" rel="noreferrer" className="social-pill" title="GitHub">
              <span>GITHUB</span>
              <ArrowUpRight size={13} />
            </a>
            <a href="https://www.linkedin.com/in/sushmitha-boya" target="_blank" rel="noreferrer" className="social-pill" title="LinkedIn">
              <span>LINKEDIN</span>
              <ArrowUpRight size={13} />
            </a>
            <a href="mailto:boyasusmi4142@gmail.com" className="social-pill" title="Email">
              <span>EMAIL</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
