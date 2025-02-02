import React, { useState } from 'react';
import { Upload, Leaf, AlertCircle, Check,  Menu, X, CalculatorIcon, HelpCircle, HelpingHandIcon, AlertTriangleIcon, ArrowLeft } from 'lucide-react';
import { AnalysisResponse, PlantAnalysisResult } from '../types';
import { API_CONFIG } from '../config';
import { LanguageSelector } from '../components/LanguageSelector';
import { AnalysisResult } from '../components/AnalysisResult';
import { Chatbot } from '../components/Chatbot';
import { Link } from 'react-router-dom';
// import { AnalysisResult } from './components/AnalysisResult';
// import { LanguageSelector } from './components/LanguageSelector';
// import { Chatbot } from './components/Chatbot';
// import type { AnalysisResponse, PlantAnalysisResult } from './types';
// import { API_CONFIG } from './config';

// Add mock data for when API fails
const MOCK_RESULTS: PlantAnalysisResult[] = [
  {
    disease_name: "Sample Analysis Result",
    confidence: 95.5,
    description: "This is a sample analysis result since the API is currently unavailable. In a production environment, this would be real data from the API.",
    treatment: "This is a sample treatment recommendation. In production, you would receive specific treatment steps based on the detected condition.",
    severity: "low"
  }
];

function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<PlantAnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const analyzeImage = async (imageData: string) => {
    if (!API_CONFIG.API_KEY || !API_CONFIG.API_URL) {
      // Use mock data if API configuration is missing
      setAnalysisResults(MOCK_RESULTS);
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const base64Image = imageData.split(',')[1];
      
      const response = await fetch("https://plant.id/api/v3/identification", {
        method: 'POST',
        headers: {
                   'Content-Type': 'application/json',
                   'Api-key': `XJo6NcNfq3eWY164P27ZCqY5B4cTVwl4zzJLiGoYv5DwbU9952`
                 },
                 body: JSON.stringify({
                    "images": [base64Image],  // Ensure base64Image is correctly formatted
                    "latitude": 49.207,
                    "longitude": 16.608,
                    "similar_images": true
                  })
      });
    //   console.log(response);
    //   if (!response.ok) {
    //     // If API fails, use mock data instead of showing error
    //     setAnalysisResults(MOCK_RESULTS);
    //     console.log(response);
    //     return;
        
    //   }
    // const response = await fetch("https://plant.id/api/v3/kb/plants/name_search?q=aloe vera", {
    //     method: 'GET', // GET requests should NOT have a body
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Api-key': `XJo6NcNfq3eWY164P27ZCqY5B4cTVwl4zzJLiGoYv5DwbU9952`
    //     },
    //     // body: JSON.stringify({
    //     //            image: base64Image
    //     //  })
    //   });
      
      // Check if response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // Parse JSON response
    

      const data: any = await response.json();
      console.log(data);
      if (data.results && data.results.length > 0) {
        setAnalysisResults(data.result.classification.suggestions[0]);
      } else {
        // If API returns no results, use mock data
        setAnalysisResults(MOCK_RESULTS);
      }
    } catch (err) {
      // If any error occurs, use mock data instead of showing error
      setAnalysisResults(MOCK_RESULTS);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        await analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageData = reader.result as string;
        setSelectedImage(imageData);
        await analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResults([]);
    setError(null);
    setIsAnalyzing(false);
  };

  const renderHeader = () => (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">PlantGuard AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
            <button 
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-green-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#how-it-works" className="text-gray-600 hover:text-green-600">Home</a>
            <a href="#about" className="text-gray-600 hover:text-green-600">Buy</a>
            <a href="#contact" className="text-gray-600 hover:text-green-600">Sell</a>
            <a href="GovtHelp.html" className="text-gray-600 hover:text-green-600">Government Help</a>
          </nav>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-2">
            <a 
              href="#how-it-works" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a 
              href="GovtHelp.html" 
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-green-600 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Government Help
            </a>
          </nav>
        )}
      </div>
    </header>
  );

  const renderAnalysisPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={handleReset}
        className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Upload</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Uploaded Image</h2>
          <img
            src={selectedImage!}
            alt="Uploaded plant"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
          
          {isAnalyzing ? (
            <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                <span className="text-gray-600">Analyzing your plant...</span>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <span className="text-red-700">{error}</span>
              </div>
            </div>
          ) : analysisResults.length > 0 ? (
            <div className="space-y-4">
              {analysisResults.map((result, index) => (
                <AnalysisResult key={index} result={result} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600">No analysis results available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderUploadPage = () => (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Detect Plant Diseases Instantly
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Upload a photo of your plant and our AI will analyze it for diseases,
            providing instant results and treatment recommendations.
          </p>
        </div>

        <div className="max-w-2xl mx-auto px-4">
          <div
            className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center ${
              isDragging
                ? 'border-green-500 bg-green-50'
                : 'border-gray-300 hover:border-green-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Drag and drop your plant image here, or
                </p>
                <label className="inline-block bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg cursor-pointer hover:bg-green-700">
                  Browse Files
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 px-4">
          <a  className="bg-white p-6 rounded-lg shadow-sm">
          <Link className='w-full' to={"/fertilizer"}>

            <div className="flex items-center space-x-3 mb-4">
              <CalculatorIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Fertilizer calculator</h3>
            </div>
            <p className="text-gray-600">
              Get recommendations for the best fertilizer for your plants
            </p>
          </Link>

          </a>
          <a className="bg-white p-6 rounded-lg shadow-sm">
            <Link to={"/cultivation"} className='w-full'>
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Cultivation Tips</h3>
            </div>
            <p className="text-gray-600">
              Learn how to care for your plants 
            </p>
            </Link>
          </a>
          <a href="https://example.com/pests-diseases" className="bg-white p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangleIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Pests & diseases</h3>
            </div>
            <p className="text-gray-600">
              Get information on common pests and diseases that affect plants
            </p>
          </a>
          <a href="GovtHelp.html" className="bg-white p-6 rounded-lg shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <HelpingHandIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Government Help</h3>
            </div>
            <p className="text-gray-600">
              Get information on government programs that can help you with your plants
            </p>
          </a>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-12 sm:py-16" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">1. Upload Photo</h3>
              <p className="text-gray-600">
                Take a clear photo of the affected plant part
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">2. AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes the image for disease patterns
              </p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">3. Get Results</h3>
              <p className="text-gray-600">
                Receive detailed analysis and treatment recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {renderHeader()}
      <main>
        {selectedImage ? renderAnalysisPage() : renderUploadPage()}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Leaf className="h-6 w-6" />
                <span className="font-bold text-xl">PlantGuard AI</span>
              </div>
              <p className="text-gray-400">
                Protecting your plants with artificial intelligence
              </p>
            </div>
            <div className="sm:mx-auto lg:mx-0">
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-white">Buy</a></li>
                <li><a href="#about" className="hover:text-white">Sell</a></li>
                <li><a href="GovtHelp.html" className="hover:text-white">Government Help</a></li>
              </ul>
            </div>
            <div className="sm:mx-auto lg:mx-0">
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">
                Email: support@plantguard.ai<br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PlantGuard AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Home;