
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{' '}
          <span className="font-semibold">Brijraj Singh Solanki</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">
          © 2026 Kaivalya Library 
        </p>
      </div>
    </footer>
  );
};

export default Footer;