import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    feedback: 'This platform transformed my English learning. The adaptive questions are perfectly calibrated to my level!',
    avatar: '👩‍🎓'
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Professional',
    feedback: 'I improved my business English significantly in just 3 months. Highly recommended for professionals!',
    avatar: '👨‍💼'
  },
  {
    name: 'Yuki Tanaka',
    role: 'Language Enthusiast',
    feedback: 'The spaced repetition system really works. I\'ve never retained vocabulary so well before!',
    avatar: '👩‍🏫'
  },
  {
    name: 'Ahmed Hassan',
    role: 'Teacher',
    feedback: 'I recommend this to all my students. The personalized learning path keeps them engaged.',
    avatar: '👨‍🏫'
  }
];

const features = [
  {
    icon: '🎯',
    title: 'Adaptive Learning',
    description: 'Questions automatically adjust to match your skill level using IRT (Item Response Theory) algorithms.'
  },
  {
    icon: '📚',
    title: 'Spaced Repetition',
    description: 'Scientifically-proven spacing algorithm ensures optimal retention of vocabulary and concepts.'
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Monitor your improvement with our theta ability scoring system in real-time.'
  },
  {
    icon: '⚡',
    title: 'Fast & Efficient',
    description: 'Learn effectively with short, focused sessions that fit into your busy schedule.'
  },
  {
    icon: '🌍',
    title: 'Globally Curated Content',
    description: 'Practice with questions covering diverse topics and real-world English usage.'
  },
  {
    icon: '🏆',
    title: 'Proven Results',
    description: 'Join thousands of learners who have achieved their English language goals.'
  }
];

export default function Landing({ onGetStarted }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex((i) => (i + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const carouselSlides = [
    {
      title: 'Learn at Your Own Pace',
      subtitle: 'Adaptive questions that grow with you',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Master English Vocabulary',
      subtitle: 'Never forget what you\'ve learned',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Track Your Progress',
      subtitle: 'See measurable improvement every day',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="landing-page">
      {/* Header & Navigation */}
      <header className="header">
        <div className="header-container">
          <div className="logo">📖 Adaptive English</div>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#about">About</a>
          </nav>
          <button className="nav-cta" onClick={onGetStarted}>Sign In</button>
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="hero-carousel">
        <div 
          className="carousel-slide"
          style={{ background: carouselSlides[carouselIndex].gradient }}
        >
          <div className="carousel-content">
            <h1>{carouselSlides[carouselIndex].title}</h1>
            <p>{carouselSlides[carouselIndex].subtitle}</p>
            <button className="cta-button-large" onClick={onGetStarted}>Start Learning Now</button>
          </div>
          <div className="carousel-indicator">
            {carouselSlides.map((_, i) => (
              <div 
                key={i}
                className={`indicator ${i === carouselIndex ? 'active' : ''}`}
                onClick={() => setCarouselIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Why Choose Adaptive English?</h2>
          <p className="section-subtitle">Leverage cutting-edge AI and learning science</p>
          
          <div className="features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card-large">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat">
            <h3>10K+</h3>
            <p>Active Learners</p>
          </div>
          <div className="stat">
            <h3>5K+</h3>
            <p>Questions</p>
          </div>
          <div className="stat">
            <h3>87%</h3>
            <p>Success Rate</p>
          </div>
          <div className="stat">
            <h3>30+</h3>
            <p>Countries</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">What Our Learners Say</h2>
          <p className="section-subtitle">Real stories from real students</p>
          
          <div className="testimonial-carousel">
            <button className="carousel-nav prev" onClick={prevTestimonial}>❮</button>
            
            <div className="testimonial-card">
              <div className="testimonial-avatar">{testimonials[testimonialIndex].avatar}</div>
              <p className="testimonial-text">"{testimonials[testimonialIndex].feedback}"</p>
              <h4 className="testimonial-name">{testimonials[testimonialIndex].name}</h4>
              <p className="testimonial-role">{testimonials[testimonialIndex].role}</p>
            </div>
            
            <button className="carousel-nav next" onClick={nextTestimonial}>❯</button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === testimonialIndex ? 'active' : ''}`}
                onClick={() => setTestimonialIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your English?</h2>
          <p>Join thousands of learners achieving their language goals</p>
          <button className="cta-button-xl" onClick={onGetStarted}>Get Started Free</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>📖 Adaptive English</h4>
            <p>Learn English smarter, not harder.</p>
          </div>
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Adaptive English. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
