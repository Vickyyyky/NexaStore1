import React from 'react';
import { Heart, Users, Award, ShoppingBag, Truck, Shield, Star } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-bg-elements">
          <div className="hero-bg-circle-1"></div>
          <div className="hero-bg-circle-2"></div>
          <div className="hero-bg-circle-3"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="hero-title-gradient">Nexa Store</span>
          </h1>
          <p className="hero-description">
            Where innovation meets style. Discover the future of online shopping with cutting-edge products and exceptional service.
          </p>
          <div className="hero-stats">
            <div className="hero-stat-item">
              <Star className="hero-stat-icon" style={{ color: '#fbbf24' }} />
              <span className="hero-stat-text">4.9/5 Rating</span>
            </div>
            <div className="hero-stat-item">
              <Users className="hero-stat-icon" style={{ color: '#10b981' }} />
              <span className="hero-stat-text">50K+ Customers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-grid">
            <div className="story-content">
              <h2 className="story-title">
                Our Story
              </h2>
              <p className="story-text">
                Founded in 2020, Nexa Store emerged from a simple vision: to revolutionize the way people shop online. We believe that shopping should be an experience that delights, inspires, and connects.
              </p>
              <p className="story-text">
                What started as a small team of passionate entrepreneurs has grown into a thriving community of innovators, creators, and dreamers. We curate the finest products from around the world, ensuring quality, sustainability, and style in everything we offer.
              </p>
              <div className="story-stats">
                <div className="story-stat">
                  <div className="story-stat-number" style={{ color: '#8b5cf6' }}>50K+</div>
                  <div className="story-stat-label">Happy Customers</div>
                </div>
                <div className="story-stat">
                  <div className="story-stat-number" style={{ color: '#3b82f6' }}>1000+</div>
                  <div className="story-stat-label">Products</div>
                </div>
                <div className="story-stat">
                  <div className="story-stat-number" style={{ color: '#10b981' }}>99%</div>
                  <div className="story-stat-label">Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="story-image-container">
              <div className="story-image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center" 
                  alt="Modern office space" 
                  className="story-image"
                />
              </div>
              <div className="story-badge">
                <div className="story-badge-content">
                  <Heart className="story-badge-icon" />
                  <span className="story-badge-text">Made with Love</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="values-header">
            <h2 className="values-title">Our Values</h2>
            <p className="values-description">
              The principles that guide everything we do and shape the future we're building together.
            </p>
          </div>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-wrapper value-icon-1">
                <Award className="value-icon" />
              </div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-text">
                We strive for excellence in every product we offer and every interaction we have. Quality isn't just a goal—it's our standard.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon-wrapper value-icon-2">
                <Users className="value-icon" />
              </div>
              <h3 className="value-title">Community</h3>
              <p className="value-text">
                Our customers are our family. We build lasting relationships based on trust, respect, and shared values.
              </p>
            </div>
            
            <div className="value-card">
              <div className="value-icon-wrapper value-icon-3">
                <Heart className="value-icon" />
              </div>
              <h3 className="value-title">Sustainability</h3>
              <p className="value-text">
                We're committed to sustainable practices that protect our planet for future generations while delivering exceptional products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Meet Our Team</h2>
            <p className="team-description">
              The passionate individuals behind Nexa Store who make the magic happen every day.
            </p>
          </div>
          
          <div className="team-grid">
            {[
              {
                name: "Vicky Kumar",
                role: "Founder & CEO",
                image: "https://media.licdn.com/dms/image/v2/D5603AQH2PMWxMRdHpA/profile-displayphoto-shrink_800_800/B56ZbWEf14GgAc-/0/1747348226325?e=1756944000&v=beta&t=HmUDqOmg6DNcjB1oDQGjghW6HdYQLlrJolOvKAEydmI",
                description: "Visionary leader with 10+ years in e-commerce"
              },
              {
                name: "Vishal Kumar Yadav",
                role: "Head of Product",
                image: "https://media.licdn.com/dms/image/v2/D5635AQG100o-fy8Zng/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1727246469297?e=1751810400&v=beta&t=b3MSGccy_8KpSGiRXQ2ev3A0PbZt8w-wuryqlSKM8zo",
                description: "Product innovator focused on user experience"
              },
              {
                name: "Manikant Tiwari",
                role: "Mern Stack Developer",
                image: "https://media.licdn.com/dms/image/v2/D4D35AQHGxXYACYvkuQ/profile-framedphoto-shrink_800_800/profile-framedphoto-shrink_800_800/0/1733226454585?e=1751806800&v=beta&t=MgssqYtG0SrMhG5VoFcwvUdYM7WxxPQsFp-zVW8lfbU",
                description: "Dedicated to ensuring customer happiness"
              }
            ].map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-member-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-member-image"
                  />
                  <div className="team-member-badge">
                    Team
                  </div>
                </div>
                <h3 className="team-member-name">{member.name}</h3>
                <p className="team-member-role">{member.role}</p>
                <p className="team-member-description">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Nexa Store?</h2>
            <p className="features-description">
              Experience the difference with our commitment to excellence and innovation.
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Truck className="feature-icon" />
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-text">
                Lightning-fast shipping with real-time tracking. Most orders delivered within 24-48 hours.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" />
              </div>
              <h3 className="feature-title">Secure Shopping</h3>
              <p className="feature-text">
                Bank-level security with SSL encryption. Your data and transactions are always protected.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <ShoppingBag className="feature-icon" />
              </div>
              <h3 className="feature-title">Quality Products</h3>
              <p className="feature-text">
                Carefully curated selection of premium products from trusted brands worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">
            Ready to Experience the Future?
          </h2>
          <p className="cta-description">
            Join thousands of satisfied customers and discover what makes Nexa Store special.
          </p>
          <div className="cta-buttons">
            <button className="cta-button-primary">
              Start Shopping Now
            </button>
            <button className="cta-button-secondary">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;