import React, { useState } from 'react';
import { Cpu, Code2, Database, Wrench, BookOpen, Globe, Server, Layers } from 'lucide-react';
import './Skills.css';

const skillGroups = [
  {
    category: 'Programming Languages',
    icon: <Code2 size={15} />,
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    ]
  },
  {
    category: 'Frontend',
    icon: <Globe size={15} />,
    items: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
      { name: 'React JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    ]
  },
  {
    category: 'Backend & Database',
    icon: <Server size={15} />,
    items: [
      { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    ]
  },
  {
    category: 'Core Concepts',
    icon: <Layers size={15} />,
    items: [
      { name: 'OOPs', isCustom: true, emoji: '🧩' },
      { name: 'DSA', isLucide: true },
      { name: 'Modules & Packages', isCustom: true, emoji: '📦' },
      { name: 'Collections', isCustom: true, emoji: '🗂️' },
      { name: 'Exception Handling', isCustom: true, emoji: '⚠️' },
      { name: 'File Handling', isCustom: true, emoji: '📁' },
    ]
  },
  {
    category: 'Data & Libraries',
    icon: <BookOpen size={15} />,
    items: [
      { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
      { name: 'Seaborn', isCustom: true, emoji: '📊' },
    ]
  },
  {
    category: 'Developer Tools',
    icon: <Wrench size={15} />,
    items: [
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'PyCharm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg' },
    ]
  },
];

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredGroups = activeFilter === 'ALL'
    ? skillGroups
    : skillGroups.filter(g => g.category === activeFilter);

  return (
    <section id="skills" className="container section skills-section">
      <div className="skills-header">
        <span className="skills-eyebrow">TECH STACK & EXPERTISE</span>
        <h2 className="section-title skills-title">Skills & <span className="title-accent">Capabilities</span></h2>
        <p className="skills-tagline">Clean, organized tools and technologies I use to build software</p>

        {/* Minimal Category Pills Filter Bar */}
        <div className="skills-filter-nav">
          <button
            className={`filter-btn ${activeFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveFilter('ALL')}
          >
            All Skills
          </button>
          {skillGroups.map(g => (
            <button
              key={g.category}
              className={`filter-btn ${activeFilter === g.category ? 'active' : ''}`}
              onClick={() => setActiveFilter(g.category)}
            >
              {g.icon}
              <span>{g.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Unified Tag Cloud Container */}
      <div className="skills-tag-cloud-container glass">
        {filteredGroups.map((group) => (
          <div key={group.category} className="skill-cloud-group">
            <div className="cloud-group-header">
              <span className="cloud-group-icon">{group.icon}</span>
              <span className="cloud-group-title">{group.category}</span>
              <span className="cloud-group-count">{group.items.length}</span>
            </div>

            <div className="cloud-badges-wrapper">
              {group.items.map((item, i) => (
                <div key={i} className="cloud-skill-chip">
                  <div className="chip-icon-box">
                    {item.isCustom ? (
                      <span className="chip-emoji">{item.emoji}</span>
                    ) : item.isLucide ? (
                      <Cpu size={16} className="chip-lucide" />
                    ) : (
                      <img src={item.icon} alt={item.name} className="chip-img" />
                    )}
                  </div>
                  <span className="chip-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
