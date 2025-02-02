import  { useState } from 'react';
import { Plane as Plant, Calculator, Leaf, Droplets, Scale } from 'lucide-react';

export default function Fertilizer() {
  const [area, setArea] = useState<number>(100);
  const [cropType, setCropType] = useState<string>('vegetables');
  const [soilType, setSoilType] = useState<string>('loamy');
  const [result, setResult] = useState<{n: number, p: number, k: number} | null>(null);

  const calculateFertilizer = () => {
    // Basic calculation rates (kg/hectare)
    const baseRates = {
      vegetables: { n: 120, p: 60, k: 60 },
      fruits: { n: 100, p: 50, k: 80 },
      grains: { n: 80, p: 40, k: 40 },
      flowers: { n: 60, p: 30, k: 50 }
    };

    // Soil type multipliers
    const soilMultipliers = {
      sandy: 1.2,  // Sandy soils need more
      loamy: 1.0,  // Loamy is baseline
      clay: 0.8    // Clay retains nutrients better
    };

    const base = baseRates[cropType as keyof typeof baseRates];
    const multiplier = soilMultipliers[soilType as keyof typeof soilMultipliers];
    const areaInHectares = area / 10000; // Convert m² to hectares

    setResult({
      n: Number((base.n * multiplier * areaInHectares).toFixed(2)),
      p: Number((base.p * multiplier * areaInHectares).toFixed(2)),
      k: Number((base.k * multiplier * areaInHectares).toFixed(2))
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Plant className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Smart Fertilizer Calculator</h1>
            <p className="text-gray-600">Calculate the optimal fertilizer amounts for your crops</p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area (m²)
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="Enter area in square meters"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Crop Type
                  </label>
                  <div className="relative">
                    <Leaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="vegetables">Vegetables</option>
                      <option value="fruits">Fruits</option>
                      <option value="grains">Grains</option>
                      <option value="flowers">Flowers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Soil Type
                  </label>
                  <div className="relative">
                    <Droplets className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      value={soilType}
                      onChange={(e) => setSoilType(e.target.value)}
                      className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    >
                      <option value="sandy">Sandy</option>
                      <option value="loamy">Loamy</option>
                      <option value="clay">Clay</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateFertilizer}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="h-5 w-5" />
                  Calculate
                </button>
              </div>

              {/* Results Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Fertilizer Amount</h3>
                {result ? (
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-600">Nitrogen (N)</div>
                      <div className="text-2xl font-bold text-green-600">{result.n} kg</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-600">Phosphorus (P)</div>
                      <div className="text-2xl font-bold text-green-600">{result.p} kg</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                      <div className="text-sm text-gray-600">Potassium (K)</div>
                      <div className="text-2xl font-bold text-green-600">{result.k} kg</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Enter your details and click calculate to see recommendations
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Tips for Application</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Apply fertilizer when the soil is moist but not wet</li>
              <li>Distribute the fertilizer evenly across the area</li>
              <li>Water thoroughly after application</li>
              <li>Consider splitting the total amount into multiple applications</li>
              <li>Always wear protective gear when handling fertilizers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
