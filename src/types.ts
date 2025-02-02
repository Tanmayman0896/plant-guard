export interface PlantAnalysisResult {
  disease_name: string;
  confidence: number;
  description: string;
  treatment: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AnalysisResponse {
  status: string;
  results: PlantAnalysisResult[];
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatbotResponse {
  text: string;
  links?: { text: string; url: string }[];
}