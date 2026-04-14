import React, { useState } from 'react';
import { Send, Mail, MessageCircle, GitFork, ExternalLink } from 'lucide-react';
import Panel from '../components/Panel';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    window.location.href = `mailto:sood.divyansh007@gmail.com?subject=${encodeURIComponent('Project Inquiry from ' + name)}&body=${encodeURIComponent(`Hi Divyansh,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)}`;
    setFormSent(true);
  };

  return (
    <div className="section-content" style={{ textAlign: 'center' }}>
      <Panel style={{ maxWidth: 640, margin: '0 auto', textAlign: 'left' }}>
        <h2 className="display glitch" data-text="LET'S BUILD" style={{ color: 'var(--neon-green)', fontSize: 'clamp(2rem, 6vw, 4rem)', textShadow: '0 0 40px rgba(74,222,128,0.3)', marginBottom: '0.5rem', textAlign: 'center' }}>
          LET'S BUILD
        </h2>
        <p className="body" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Describe your project below — I'll respond within 24 hours with a clear scope and timeline.
        </p>

        {formSent ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p className="heading" style={{ color: 'var(--neon-green)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>Message sent!</p>
            <p className="body">Your email client opened. I'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">Name</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea
                className="form-input form-textarea"
                placeholder="Tell me about your project..."
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={14} /> SEND MESSAGE
            </button>
          </form>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a href="mailto:sood.divyansh007@gmail.com" className="btn" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><Mail size={13} /> EMAIL</a>
          <a href="https://wa.me/919816091875" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: '#25D366', color: '#25D366', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><MessageCircle size={13} /> WHATSAPP</a>
          <a href="https://github.com/divyanshsood" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: 'var(--text-dim)', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><GitFork size={13} /> GITHUB</a>
          <a href="https://linkedin.com/in/divyanshsood" target="_blank" rel="noreferrer" className="btn" style={{ borderColor: 'var(--neon-blue)', color: 'var(--neon-blue)', fontSize: '0.8rem', padding: '0.6rem 1.2rem' }}><ExternalLink size={13} /> LINKEDIN</a>
        </div>
      </Panel>
    </div>
  );
};

export default Contact;
