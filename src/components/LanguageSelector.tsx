import React from 'react';
import { Globe } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
];

export function LanguageSelector({ currentLanguage, onLanguageChange }: Props) {
  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <Globe className="h-5 w-5 text-gray-600 mr-2" />
        <select
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="appearance-none bg-transparent border-none pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.nativeName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}