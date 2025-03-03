import React from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import Counter from "./Counter";
import ImageSlider from "./ImageSlider";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Healthcare Management System</h1>
          <p>Your Trusted Partner for Smart Healthcare Solutions.</p>
          <button onClick={() => navigate("/login")} className="explore-btn">
            Get Started
          </button>
        </div>
      </section>

      {/* Counters Section */}
      <section className="counters">
        <Counter label="Total Users" end={5000} />
        <Counter label="Appointments Booked" end={12000} />
        <Counter label="Hospitals Registered" end={250} />
      </section>

      {/* Image Slider */}
      <section className="image-slider">
        <ImageSlider />
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-list">
          <div className="feature-card">
            <h3>Easy Appointments</h3>
            <p>Book doctor appointments in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Medical Records</h3>
            <p>All your medical data is encrypted and stored safely.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Customer Support</h3>
            <p>We are available round the clock for your queries.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-box">
          <p>"This platform made my medical history easily accessible. Love it!"</p>
          <h4>- Dr. Rohan Mehta</h4>
        </div>
        <div className="testimonial-box">
          <p>"Booking appointments has never been easier. Amazing experience!"</p>
          <h4>- Priya Sharma</h4>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Join Our Healthcare Revolution!</h2>
        <button onClick={() => navigate("/login")} className="explore-btn">
          Explore Now
        </button>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Healthcare Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
