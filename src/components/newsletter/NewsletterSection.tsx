
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeToNewsletter } from "@/services/api";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email);
      setEmail(""); // Clear input on success
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content-area bg-gradient-to-r from-blue-500 to-green-400 text-white py-16">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Get Travel Inspiration</h2>
        <p className="text-lg mb-6">Subscribe to our newsletter for exclusive deals and travel tips</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input 
            placeholder="Your email address" 
            className="bg-white/20 border-white/30 placeholder:text-white/70 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
          />
          <Button 
            className="bg-white text-blue-600 hover:bg-white/90"
            onClick={handleSubscribe}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
