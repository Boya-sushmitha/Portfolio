import React, { useState } from 'react';
import { ArrowUpRight, X, ExternalLink } from 'lucide-react';
import './Projects.css';

import healthImg from '../assets/health.png';
import carServiceImg from '../assets/carservice.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: '01',
      title: 'AI-DRIVEN HEALTH ASSISTANT',
      subtitle: 'Intelligent Healthcare & Nutrition System',
      image: healthImg,
      description: 'A smart healthcare web application that utilizes artificial intelligence to respond to medical queries and provide nutrition analysis.',
      tech: ['Python', 'Flask', 'AI', 'NLP', 'Scikit-learn', 'React'],
      overview: 'An AI-powered web application that provides healthcare assistance by answering user queries and offering personalized nutrition analysis.',
      detailedTools: [
        { label: 'Frontend', value: 'HTML, CSS, JavaScript / React' },
        { label: 'Backend', value: 'Flask (Python)' },
        { label: 'ML Libraries', value: 'Scikit-learn / Pandas / NumPy' }
      ],
      methodology: [
        {
          title: 'Data collection',
          content: 'Healthcare-related datasets, including symptoms, diseases, and nutrition values, are collected from reliable sources such as CSV files and APIs. These datasets form the foundation for training the AI model and performing analysis.'
        },
        {
          title: 'Data preprocessing',
          content: 'The collected data is cleaned by removing missing or inconsistent values. Unstructured data is converted into a structured format, and normalization along with feature selection techniques are applied to improve model performance.'
        },
        {
          title: 'Model development',
          content: 'Machine learning algorithms such as Decision Tree, Logistic Regression, and NLP models are implemented and trained. The model learns to predict possible health conditions based on symptoms and to analyze nutritional values effectively.'
        },
        {
          title: 'Query processing',
          content: 'Users provide input in the form of health-related queries or food and nutrition details. This input is processed using AI and NLP techniques to convert it into a format suitable for model analysis.'
        },
        {
          title: 'Prediction & Analysis',
          content: 'The trained AI model analyzes the processed input and generates outputs such as health suggestions and nutrition insights, including calorie information and dietary recommendations.'
        },
        {
          title: 'Web application integration',
          content: 'The system is integrated into a web application using Flask as the backend. The machine learning model is connected with the frontend developed using HTML, CSS, and JavaScript or React, ensuring a user-friendly interface for displaying results.'
        }
      ],
      showcaseHeading: 'Medical ChatBot',
      showcaseImages: [healthImg],
      live: '#'
    },
    {
      id: '02',
      title: 'CarServices Management System',
      subtitle: 'Automotive Center Booking & Operations Platform',
      image: carServiceImg,
      description: 'A comprehensive full-stack management system for car service centers handling client appointments, operations, and vehicle tracking.',
      tech: ['React', 'Django', 'MySQL', 'Python', 'REST API'],
      overview: 'A full-stack application designed to streamline operations for automotive service centers, integrating appointment scheduling, customer management, and inventory tracking.',
      detailedTools: [
        { label: 'Frontend', value: 'HTML, CSS, JavaScript / React' },
        { label: 'Backend', value: 'Django (Python)' },
        { label: 'Database', value: 'MySQL' }
      ],
      methodology: [
        {
          title: 'Requirement analysis',
          content: 'Identified key pain points in traditional service center management and defined system requirements for a digital solution.'
        },
        {
          title: 'Database schema development',
          content: 'Designed a relational database schema using MySQL to efficiently store and link customer, vehicle, and service records.'
        },
        {
          title: 'Backend API implementation',
          content: 'Developed a robust RESTful API using Django to handle business logic, data persistence, and secure communications.'
        },
        {
          title: 'Frontend UI development',
          content: 'Built a responsive and intuitive dashboard using React, providing service managers with real-time insights and control.'
        },
        {
          title: 'Authentication and authorization',
          content: 'Implemented secure user authentication and role-based access control to protect sensitive business data.'
        },
        {
          title: 'Integration and testing',
          content: 'Conducted rigorous end-to-end testing to ensure seamless integration between the frontend, backend, and database layers.'
        }
      ],
      live: '#'
    }
  ];

  return (
    <section id="projects" className="container section">
      <div className="projects-header">
        <span className="projects-eyebrow">Featured Work</span>
        <h2 className="section-title projects-section-title">Selected <span className="title-accent">Projects</span></h2>
        <p className="projects-tagline">Engineered with modern technologies and clean architecture</p>
      </div>

      {/* One-by-one ordered projects stack */}
      <div className="projects-list">
        {projects.map((project, index) => (
          <article key={project.id} className="project-row-card glass">
            {/* Visual Media Showcase side */}
            <div className="project-row-media" onClick={() => setSelectedProject(project)}>
              <div className="project-media-wrapper">
                <img src={project.image} alt={project.title} className="project-row-image" />
                <div className="project-media-overlay">
                  <span>View Details <ArrowUpRight size={18} /></span>
                </div>
              </div>
            </div>

            {/* Informational side */}
            <div className="project-row-info">
              <div className="project-index-badge">
                <span>PROJECT {project.id}</span>
                <span className="index-dot" />
                <span className="project-subtitle-tag">{project.subtitle}</span>
              </div>

              <h3 className="project-row-title" onClick={() => setSelectedProject(project)}>
                {project.title}
              </h3>

              <p className="project-row-description">
                {project.description}
              </p>

              <div className="project-tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>

              <div className="project-row-actions">
                <button 
                  onClick={() => setSelectedProject(project)} 
                  className="btn btn-primary project-action-btn"
                >
                  Explore Architecture <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Modal for deep dive details */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <X size={22} />
            </button>
            
            <div className="modal-badge">CASE STUDY {selectedProject.id}</div>
            <h2 className="modal-title">{selectedProject.title}</h2>
            
            <div className="modal-section modal-card">
              <h3 className="modal-heading">OVERVIEW & OBJECTIVE</h3>
              <p className="modal-text">{selectedProject.overview}</p>
            </div>

            <div className="modal-section modal-card">
              <h3 className="modal-heading">TECHNOLOGY STACK</h3>
              {selectedProject.detailedTools ? (
                <ul className="detailed-tools-list">
                  {selectedProject.detailedTools.map((tool, i) => (
                    <li key={i} className="detailed-tool-item">
                      <strong>{tool.label}:</strong> <span>{tool.value}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="project-tech">
                  {selectedProject.tech.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-section">
              <h3 className="modal-heading highlight-heading">METHODOLOGY & LIFECYCLE</h3>
              <div className="methodology-grid">
                {selectedProject.methodology.map((item, i) => (
                  <div key={i} className="methodology-detailed-item">
                    <h4 className="methodology-step-title">{typeof item === 'string' ? item : item.title}</h4>
                    {item.content && <p className="methodology-step-content">{item.content}</p>}
                  </div>
                ))}
              </div>
            </div>

            {selectedProject.showcaseImages && (
              <div className="modal-section">
                <h3 className="modal-heading">{selectedProject.showcaseHeading || 'Interface Preview'}</h3>
                <div className="showcase-grid">
                  {selectedProject.showcaseImages.map((img, i) => (
                    <div key={i} className="showcase-image-container">
                      <img src={img} alt={`Preview ${i}`} className="showcase-image" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
