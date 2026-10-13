import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="container section">
      <h2 className="section-title">About Me</h2>
      <div className="about-text glass">
        <p>
          I am an aspiring Full-Stack Python Developer passionate about building modern, scalable, and user-focused web applications. I enjoy transforming ideas into functional digital solutions using Python and web technologies. My interests include backend development, API integration, database management, and creating seamless user experiences. I am committed to continuous learning and developing innovative applications that solve real-world challenges.
        </p>
        <ul className="about-list">
          <li>🔹 Passionate about Full-Stack Development and modern web technologies</li>
          <li>🔹 Skilled in building responsive and user-friendly web applications</li>
          <li>🔹 Experienced in developing RESTful APIs and backend services using Python</li>
          <li>🔹 Strong understanding of databases, server-side logic, and application architecture</li>
          <li>🔹 Focused on writing clean, maintainable, and efficient code</li>
          <li>🔹 Continuously learning new technologies to build scalable and high-performance solutions</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
