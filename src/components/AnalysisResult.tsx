import React from 'react';
import { AlertCircle, ThumbsUp, AlertTriangle, AlertOctagon } from 'lucide-react';
import type { PlantAnalysisResult } from '../types';

interface Props {
  result: PlantAnalysisResult;
}

export function AnalysisResult({ result }: Props) {
  const getSeverityIcon = () => {
    switch (result.severity) {
      case 'low':
        return <ThumbsUp className="h-6 w-6 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case 'high':
        return <AlertOctagon className="h-6 w-6 text-red-500" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-500" />;
    }
  };

  const getSeverityColor = () => {
    switch (result.severity) {
      case 'low':
        return 'bg-green-50 border-green-200';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200';
      case 'high':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={`rounded-lg border p-6 ${getSeverityColor()}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">{getSeverityIcon()}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {result.disease_name}
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">{result.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Treatment Recommendations:</h4>
              <p className="text-sm text-gray-600">{result.treatment}</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Confidence:</span>
              <div className="ml-2 bg-gray-200 rounded-full h-2 w-24">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {result.confidence.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}