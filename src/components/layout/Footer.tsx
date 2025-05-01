
import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            <li>Flights</li>
            <li>Hotels</li>
            <li>Packages</li>
            <li>Activities</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border text-center">
        <p>&copy; 2025 TravelPlanner. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
