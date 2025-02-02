import React, { useState } from 'react';
import {
  Plane as Plant,
  Sprout,
  Map,
  Shovel,
  Droplets,
  FlaskRound as Flask,
  Shield,
  TreePine,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  Flower2,
  Apple,
  Wheat,
  Carrot
} from 'lucide-react';

interface CropType {
  name: string;
  icon: React.ReactNode;
  tips: string[];
}

interface CultivationTip {
  title: string;
  icon: React.ReactNode;
  content: string;
  timing: string;
  cropSpecific: CropType[];
}

export default function Cultivation() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [expandedCropType, setExpandedCropType] = useState<string | null>(null);

  const cultivationTips: CultivationTip[] = [
    {
      title: "Plant Selection",
      icon: <Plant className="w-6 h-6" />,
      content: "Choose high-quality, disease-resistant varieties suitable for your climate. Consider factors like growing season, soil type, and market demand.",
      timing: "2-3 months before planting season",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Choose season-appropriate varieties (cool vs. warm season vegetables)",
            "Select determinate varieties for compact gardens",
            "Consider disease-resistant hybrid varieties for better yields",
            "Look for bolt-resistant varieties in leafy greens",
            "Choose early-maturing varieties for shorter growing seasons"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Select based on blooming season for year-round color",
            "Consider height and spread for proper garden design",
            "Choose native species for better adaptation",
            "Mix annuals and perennials for continuous blooming",
            "Select pollinator-friendly varieties"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Choose varieties suited to your climate's chill hours",
            "Consider dwarf varieties for small spaces",
            "Select self-pollinating varieties if space is limited",
            "Look for disease-resistant rootstock",
            "Choose early, mid, or late season varieties for extended harvest"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Select varieties based on growing season length",
            "Choose drought-resistant varieties for dry areas",
            "Consider lodging resistance for windy regions",
            "Look for pest-resistant varieties",
            "Select based on intended use (feed vs. food)"
          ]
        }
      ]
    },
    {
      title: "Site Selection",
      icon: <Map className="w-6 h-6" />,
      content: "Select well-draining soil with proper sunlight exposure. Ensure good air circulation and avoid frost pockets.",
      timing: "3-4 months before planting",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Full sun location (6-8 hours daily)",
            "Well-draining, fertile soil with pH 6.0-7.0",
            "Protected from strong winds",
            "Avoid areas with tree root competition",
            "Consider raised beds for poor soil conditions"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Consider light requirements (full sun, partial shade, full shade)",
            "Ensure good air circulation to prevent fungal diseases",
            "Group plants with similar water needs",
            "Protected from harsh afternoon sun in hot climates",
            "Consider backdrop and viewing angles"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "South-facing slopes for better sun exposure",
            "Protection from late frost damage",
            "Good air drainage to prevent frost pockets",
            "Access to irrigation water",
            "Windbreak protection for tender fruits"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Large, open areas with full sun",
            "Level ground for mechanical operations",
            "Good soil drainage",
            "Away from shade-casting structures",
            "Accessible for farm machinery"
          ]
        }
      ]
    },
    {
      title: "Field Preparation",
      icon: <Shovel className="w-6 h-6" />,
      content: "Deep plowing, removal of debris, leveling, and basic soil testing. Add organic matter to improve soil structure.",
      timing: "1-2 months before planting",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Double digging for root vegetables",
            "Add compost (2-3 inches) and incorporate well",
            "Remove rocks and debris thoroughly",
            "Create raised beds for better drainage",
            "Test soil pH and adjust accordingly"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Incorporate organic matter for better water retention",
            "Ensure proper bed depth for root development",
            "Add sand for better drainage if needed",
            "Remove perennial weeds completely",
            "Consider mulch preparation"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Deep soil preparation (3-4 feet for trees)",
            "Improve soil structure with organic amendments",
            "Install irrigation systems before planting",
            "Add balanced fertilizer based on soil test",
            "Prepare proper spacing between plants"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Primary tillage for deep soil loosening",
            "Secondary tillage for seedbed preparation",
            "Level the field for uniform water distribution",
            "Remove previous crop residue",
            "Apply pre-plant fertilizers"
          ]
        }
      ]
    },
    {
      title: "Planting",
      icon: <Sprout className="w-6 h-6" />,
      content: "Follow recommended spacing and depth. Plant during appropriate season considering temperature and moisture conditions.",
      timing: "According to crop calendar",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Plant at proper depth (usually 2-3 times seed size)",
            "Follow row spacing guidelines for each crop",
            "Succession planting for continuous harvest",
            "Consider companion planting benefits",
            "Water immediately after planting"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Plant tall varieties in back, shorter in front",
            "Space according to mature plant size",
            "Plant in groups for better visual impact",
            "Consider bloom times for continuous color",
            "Plant deeper in loose soil"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Plant at proper depth avoiding buried graft union",
            "Space trees according to mature size",
            "Create proper planting holes (2x root ball)",
            "Proper orientation for cross-pollination",
            "Stake young trees if necessary"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Use appropriate seeding rate",
            "Plant at uniform depth",
            "Ensure good seed-soil contact",
            "Consider row spacing for specific grain",
            "Use certified seed for better germination"
          ]
        }
      ]
    },
    {
      title: "Irrigation",
      icon: <Droplets className="w-6 h-6" />,
      content: "Maintain proper soil moisture through regular irrigation. Use efficient methods like drip or sprinkler systems.",
      timing: "Throughout growing season",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Use drip irrigation for water efficiency",
            "Water deeply and less frequently",
            "Maintain consistent moisture for root crops",
            "Avoid overhead watering to prevent diseases",
            "Mulch to conserve moisture"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Water at base of plants to prevent leaf diseases",
            "Morning watering is preferred",
            "Adjust watering based on rainfall",
            "Different water needs during flowering",
            "Use soaker hoses for efficient watering"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Deep watering for established trees",
            "Critical irrigation during fruit development",
            "Reduce water before harvest",
            "Use irrigation bags for young trees",
            "Monitor soil moisture regularly"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Irrigate at critical growth stages",
            "Use sprinkler or flood irrigation",
            "Monitor soil moisture levels",
            "Avoid water stress during heading",
            "Consider rainfall patterns"
          ]
        }
      ]
    },
    {
      title: "Fertilization",
      icon: <Flask className="w-6 h-6" />,
      content: "Apply balanced fertilizers based on soil tests. Include both macro and micronutrients for optimal growth.",
      timing: "At planting and during growth stages",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Heavy feeders need regular fertilization",
            "Use nitrogen for leafy vegetables",
            "Phosphorus for root development",
            "Side-dress during growing season",
            "Use organic options like compost tea"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Balanced fertilizer for overall growth",
            "Phosphorus-rich for better blooming",
            "Slow-release fertilizers for season-long feeding",
            "Foliar feeding for quick results",
            "Reduce feeding during dormancy"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "NPK balanced for tree growth",
            "Additional calcium for fruit quality",
            "Micronutrient sprays if needed",
            "Avoid late-season nitrogen",
            "Fertigation through irrigation system"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Split nitrogen applications",
            "Pre-plant phosphorus and potassium",
            "Timing based on growth stages",
            "Consider soil type for application rates",
            "Use soil tests to guide applications"
          ]
        }
      ]
    },
    {
      title: "Plant Protection",
      icon: <Shield className="w-6 h-6" />,
      content: "Monitor for pests and diseases. Implement IPM strategies including biological and chemical controls when necessary.",
      timing: "Weekly monitoring",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Regular scouting for common pests",
            "Use companion plants for pest control",
            "Implement crop rotation",
            "Use row covers when needed",
            "Biological controls like beneficial insects"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Monitor for aphids and mites",
            "Remove diseased foliage promptly",
            "Use organic fungicides preventively",
            "Proper spacing for air circulation",
            "Encourage beneficial insects"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Regular spraying schedule",
            "Prune for better air circulation",
            "Monitor for fruit flies and moths",
            "Use pheromone traps",
            "Maintain orchard hygiene"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Scout for disease pressure",
            "Time fungicide applications",
            "Monitor insect thresholds",
            "Consider resistant varieties",
            "Maintain field borders"
          ]
        }
      ]
    },
    {
      title: "Harvesting",
      icon: <TreePine className="w-6 h-6" />,
      content: "Harvest at proper maturity stage. Use clean and sharp tools to minimize damage.",
      timing: "When crops reach maturity",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Harvest at peak maturity",
            "Morning harvest for best quality",
            "Use appropriate tools",
            "Handle produce carefully",
            "Regular harvesting promotes production"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Cut flowers in early morning",
            "Use clean, sharp scissors",
            "Harvest when buds are starting to open",
            "Remove all leaves below water line",
            "Place in water immediately"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Check fruit maturity indicators",
            "Gentle handling to prevent bruising",
            "Use proper picking techniques",
            "Sort during harvest",
            "Cool quickly after harvest"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Monitor grain moisture content",
            "Harvest when weather is dry",
            "Adjust combine settings properly",
            "Minimize grain damage",
            "Clean equipment between fields"
          ]
        }
      ]
    },
    {
      title: "Post-Harvest Handling",
      icon: <PackageCheck className="w-6 h-6" />,
      content: "Proper cleaning, grading, and storage. Maintain optimal temperature and humidity during storage.",
      timing: "Immediately after harvest",
      cropSpecific: [
        {
          name: "Vegetables",
          icon: <Carrot className="w-5 h-5" />,
          tips: [
            "Clean produce properly",
            "Sort and grade by quality",
            "Store at appropriate temperature",
            "Monitor storage conditions",
            "Use proper packaging materials"
          ]
        },
        {
          name: "Flowers",
          icon: <Flower2 className="w-5 h-5" />,
          tips: [
            "Remove damaged petals",
            "Use flower preservatives",
            "Store at proper temperature",
            "Maintain clean buckets",
            "Regular water changes"
          ]
        },
        {
          name: "Fruits",
          icon: <Apple className="w-5 h-5" />,
          tips: [
            "Pre-cooling before storage",
            "Grade by size and quality",
            "Control storage atmosphere",
            "Regular monitoring for ripeness",
            "Proper packaging for market"
          ]
        },
        {
          name: "Grains",
          icon: <Wheat className="w-5 h-5" />,
          tips: [
            "Dry to proper moisture content",
            "Clean and sort grains",
            "Store in proper facilities",
            "Monitor for pests",
            "Maintain proper aeration"
          ]
        }
      ]
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleCropType = (cropType: string) => {
    setExpandedCropType(expandedCropType === cropType ? null : cropType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Complete Cultivation Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tips and timelines for successful crop cultivation
          </p>
        </header>

        <div className="grid gap-6 max-w-4xl mx-auto">
          {cultivationTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-green-100 text-green-600">
                    {tip.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">{tip.title}</h2>
                </div>
                {expandedSection === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {expandedSection === index && (
                <div className="px-6 pb-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-gray-700 mb-2">Timing:</h3>
                    <p className="text-green-600">{tip.timing}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-700 mb-2">General Guidelines:</h3>
                    <p className="text-gray-600">{tip.content}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Crop-Specific Guidelines:</h3>
                    <div className="space-y-3">
                      {tip.cropSpecific.map((crop, cropIndex) => (
                        <div key={cropIndex} className="border rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleCropType(tip.title + crop.name)}
                            className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <div className="text-green-600">
                                {crop.icon}
                              </div>
                              <span className="font-medium text-gray-700">{crop.name}</span>
                            </div>
                            {expandedCropType === tip.title + crop.name ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                          {expandedCropType === tip.title + crop.name && (
                            <ul className="px-4 py-3 space-y-2 bg-white">
                              {crop.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="text-gray-600 flex items-start">
                                  <span className="mr-2">•</span>
                                  <span>{tip}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>© 2024 Cultivation Guide. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// export default App;