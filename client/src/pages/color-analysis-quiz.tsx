import { useState } from "react";
import { Link } from "wouter";
import { ChampionshipSEO } from "@/components/ChampionshipSEO";
import { AdvancedPerformance } from "@/components/AdvancedPerformance";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    value: string;
    season: string[];
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "skin_tone",
    question: "How would you describe your skin tone?",
    options: [
      { text: "Very fair with pink undertones", value: "fair_pink", season: ["Light Summer", "True Summer", "Light Spring"] },
      { text: "Fair with neutral undertones", value: "fair_neutral", season: ["Light Summer", "Light Spring", "Soft Summer"] },
      { text: "Light with warm golden undertones", value: "light_warm", season: ["Light Spring", "True Spring", "Bright Spring"] },
      { text: "Medium with cool undertones", value: "medium_cool", season: ["True Summer", "Soft Summer", "True Winter"] },
      { text: "Medium with warm undertones", value: "medium_warm", season: ["True Spring", "True Autumn", "Soft Autumn"] },
      { text: "Deep with cool undertones", value: "deep_cool", season: ["True Winter", "Dark Winter", "Dark Autumn"] },
      { text: "Deep with warm undertones", value: "deep_warm", season: ["Dark Autumn", "True Autumn", "Dark Winter"] }
    ]
  },
  {
    id: "eye_color",
    question: "What is your natural eye color?",
    options: [
      { text: "Light blue or gray", value: "light_blue", season: ["Light Summer", "Soft Summer", "Light Spring"] },
      { text: "Deep blue", value: "deep_blue", season: ["True Winter", "Dark Winter", "True Summer"] },
      { text: "Green or hazel", value: "green_hazel", season: ["True Spring", "Soft Autumn", "True Autumn"] },
      { text: "Light brown", value: "light_brown", season: ["Light Spring", "Soft Summer", "Soft Autumn"] },
      { text: "Dark brown or black", value: "dark_brown", season: ["Dark Winter", "Dark Autumn", "True Winter"] },
      { text: "Amber or golden brown", value: "amber", season: ["True Autumn", "Bright Spring", "True Spring"] }
    ]
  },
  {
    id: "hair_color",
    question: "What is your natural hair color?",
    options: [
      { text: "Platinum blonde or ash blonde", value: "platinum", season: ["Light Summer", "Soft Summer", "True Summer"] },
      { text: "Golden blonde or strawberry blonde", value: "golden_blonde", season: ["Light Spring", "True Spring", "Bright Spring"] },
      { text: "Light to medium brown", value: "light_brown", season: ["Soft Summer", "Soft Autumn", "Light Spring"] },
      { text: "Dark brown with cool tones", value: "dark_cool", season: ["True Winter", "Dark Winter", "True Summer"] },
      { text: "Dark brown with warm tones", value: "dark_warm", season: ["Dark Autumn", "True Autumn", "Dark Winter"] },
      { text: "Black", value: "black", season: ["True Winter", "Dark Winter", "Dark Autumn"] },
      { text: "Auburn or red", value: "red", season: ["True Autumn", "Soft Autumn", "True Spring"] }
    ]
  },
  {
    id: "contrast",
    question: "How would you describe the contrast between your hair, eyes, and skin?",
    options: [
      { text: "High contrast (dark hair with light skin)", value: "high", season: ["True Winter", "Dark Winter", "Bright Spring"] },
      { text: "Medium contrast", value: "medium", season: ["True Summer", "True Spring", "True Autumn"] },
      { text: "Low contrast (all features similar in depth)", value: "low", season: ["Soft Summer", "Soft Autumn", "Light Summer", "Light Spring"] },
      { text: "Very high contrast (very dark with very light)", value: "very_high", season: ["Bright Winter", "True Winter", "Dark Winter"] }
    ]
  },
  {
    id: "jewelry",
    question: "Which metal looks better on you?",
    options: [
      { text: "Silver, platinum, white gold", value: "cool_metals", season: ["True Winter", "Dark Winter", "True Summer", "Light Summer", "Soft Summer"] },
      { text: "Gold, brass, copper", value: "warm_metals", season: ["True Spring", "Bright Spring", "Light Spring", "True Autumn", "Dark Autumn", "Soft Autumn"] },
      { text: "Both look good", value: "both", season: ["Bright Winter", "Soft Summer", "Soft Autumn"] }
    ]
  },
  {
    id: "colors_that_work",
    question: "Which colors make you look most vibrant?",
    options: [
      { text: "Bright, clear colors like royal blue and emerald", value: "bright_clear", season: ["True Winter", "Bright Winter", "True Spring"] },
      { text: "Soft, muted colors like dusty rose and sage", value: "soft_muted", season: ["Soft Summer", "Soft Autumn", "Light Summer"] },
      { text: "Warm, rich colors like coral and golden yellow", value: "warm_rich", season: ["True Spring", "Bright Spring", "True Autumn"] },
      { text: "Cool, deep colors like navy and burgundy", value: "cool_deep", season: ["True Winter", "Dark Winter", "True Summer"] },
      { text: "Light, delicate colors like powder blue and peach", value: "light_delicate", season: ["Light Spring", "Light Summer", "Soft Summer"] }
    ]
  }
];

export default function ColorAnalysisQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [seasonCounts, setSeasonCounts] = useState<Record<string, number>>({});

  const handleAnswer = (questionId: string, value: string, seasons: string[]) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Count season occurrences
    const newCounts = { ...seasonCounts };
    seasons.forEach(season => {
      newCounts[season] = (newCounts[season] || 0) + 1;
    });
    setSeasonCounts(newCounts);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const topSeason = Object.entries(newCounts).reduce((a, b) => 
        newCounts[a[0]] > newCounts[b[0]] ? a : b
      )[0];
      setResult(topSeason);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setSeasonCounts({});
  };

  const getSeasonDescription = (season: string) => {
    const descriptions: Record<string, string> = {
      "True Winter": "You have high contrast coloring with cool undertones. Your best colors are clear, pure, and icy.",
      "Dark Winter": "You have deep, rich coloring with cool undertones. Your palette includes deep jewel tones.",
      "Bright Winter": "You have high contrast with cool undertones and can handle very bright, clear colors.",
      "True Summer": "You have medium contrast with cool undertones. Your colors are soft and muted.",
      "Light Summer": "You have low contrast with cool undertones. Your palette is light and gentle.",
      "Soft Summer": "You have low contrast with neutral-cool undertones. Your colors are muted and sophisticated.",
      "True Spring": "You have medium contrast with warm undertones. Your colors are clear and warm.",
      "Bright Spring": "You have high contrast with warm undertones. Your palette is bright and energetic.",
      "Light Spring": "You have low contrast with warm undertones. Your colors are light and fresh.",
      "True Autumn": "You have medium contrast with warm undertones. Your colors are rich and earthy.",
      "Dark Autumn": "You have deep coloring with warm undertones. Your palette includes deep, rich colors.",
      "Soft Autumn": "You have low contrast with neutral-warm undertones. Your colors are muted and harmonious."
    };
    return descriptions[season] || "A unique seasonal color type with its own beautiful palette.";
  };

  const faqData = [
    {
      question: "How accurate is this color analysis quiz?",
      answer: "This quiz provides a general indication of your seasonal color type based on your natural features. For the most accurate analysis with 95% professional-grade accuracy, we recommend our AI photo analysis using OpenAI technology."
    },
    {
      question: "What's the difference between the quiz and photo analysis?",
      answer: "The quiz analyzes your self-reported features, while our AI photo analysis uses advanced computer vision to analyze your actual coloring in photos. The AI analysis provides more precise and objective results."
    },
    {
      question: "Can I get a detailed report from the quiz?",
      answer: "The quiz provides basic seasonal guidance. For a comprehensive 6-page report with specific color palettes, makeup recommendations, and styling advice, try our full AI color analysis service."
    },
    {
      question: "How do I know which result is more accurate?",
      answer: "If you're unsure about your quiz results, our AI photo analysis eliminates guesswork by analyzing your actual features objectively. It's the most reliable method for determining your true seasonal colors."
    }
  ];

  return (
    <>
      <AdvancedPerformance />
      <ChampionshipSEO
        title="Free Color Analysis Quiz | Discover Your Seasonal Color Type - Hazel & Hue"
        description="Take our free interactive color analysis quiz to discover your seasonal color type. Answer 6 simple questions about your natural features to find your perfect color palette. Get instant results!"
        keywords={[
          "color analysis quiz", "free color analysis", "seasonal color quiz", "color season test",
          "personal color quiz", "color type quiz", "what season am I", "color palette quiz",
          "free color test", "seasonal color analysis quiz", "color matching quiz", "beauty quiz",
          "style quiz", "color theory quiz", "undertone quiz", "skin tone quiz",
          "winter spring summer autumn colors", "seasonal color typing", "color season finder",
          "free color consultation", "color analysis test online", "personal color assessment"
        ]}
        canonicalUrl="/color-analysis-quiz"
        structuredData={{
          "@type": "Quiz",
          "name": "Color Analysis Quiz",
          "description": "Interactive quiz to determine your seasonal color type",
          "about": {
            "@type": "Thing",
            "name": "Color Analysis"
          },
          "educationalLevel": "Beginner",
          "assesses": "Personal Color Season"
        }}
        faqData={faqData}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Color Analysis Quiz", url: "/color-analysis-quiz" }
        ]}
      />
      
      <div className="min-h-screen bg-cream paper-texture">
        {/* Navigation */}
        <nav className="bg-forest text-cream shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-cream hover:text-golden transition-colors">
                Hazel & Hue
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/blog" className="text-cream hover:text-golden transition-colors">Blog</Link>
                <Link href="/faqs" className="text-cream hover:text-golden transition-colors">FAQs</Link>
                <Link href="/upload" className="bg-coral text-white px-6 py-2 rounded-lg hover:bg-coral-dark transition-all duration-200 shadow-coral">
                  Get AI Analysis
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {!result ? (
            <>
              {/* Quiz Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-6">
                  Free Color Analysis Quiz
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Discover your seasonal color type with our interactive quiz. 
                  Answer simple questions about your natural features to find your perfect colors.
                </p>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="bg-white/50 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-warm-coral to-dusty-rose h-3 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                </div>
              </div>

              {/* Current Question */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-playfair font-semibold text-forest-green mb-8 text-center">
                  {quizQuestions[currentQuestion].question}
                </h2>
                
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(
                        quizQuestions[currentQuestion].id,
                        option.value,
                        option.season
                      )}
                      className="w-full p-4 text-left bg-white border-2 border-sage-green/20 rounded-xl hover:border-warm-coral hover:bg-warm-coral/5 transition-all duration-200 group"
                    >
                      <span className="text-gray-800 group-hover:text-forest-green font-medium">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-forest-green mb-6">
                  Your Color Season: {result}
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  {getSeasonDescription(result)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Result Details */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                  <h3 className="text-2xl font-playfair font-bold text-warm-coral mb-6">
                    Your {result} Characteristics
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-sage-green/10 rounded-lg">
                      <h4 className="font-semibold text-forest-green mb-2">Key Features</h4>
                      <p className="text-gray-700">{getSeasonDescription(result)}</p>
                    </div>
                    <div className="p-4 bg-warm-coral/10 rounded-lg">
                      <h4 className="font-semibold text-forest-green mb-2">Best Colors</h4>
                      <p className="text-gray-700">
                        {result.includes("Winter") && "Cool, clear colors like navy, burgundy, and icy blues"}
                        {result.includes("Summer") && "Soft, muted colors like dusty rose, lavender, and sage green"}
                        {result.includes("Spring") && "Warm, clear colors like coral, golden yellow, and fresh greens"}
                        {result.includes("Autumn") && "Warm, rich colors like rust, olive, and golden brown"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Upgrade to AI Analysis */}
                <div className="bg-gradient-to-br from-warm-coral to-dusty-rose rounded-2xl p-8 text-white shadow-xl">
                  <h3 className="text-2xl font-playfair font-bold mb-6">
                    Want More Accurate Results?
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>95% professional-grade accuracy with AI photo analysis</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>6-page detailed report with 64 personalized colors</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Specific makeup and styling recommendations</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p>Scientific backing with OpenAI technology</p>
                    </div>
                  </div>
                  <Link 
                    href="/upload" 
                    className="block w-full bg-white text-warm-coral text-center py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Get AI Photo Analysis - $29.99
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={resetQuiz}
                  className="bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg hover:bg-forest-green hover:text-white transition-colors"
                >
                  Retake Quiz
                </button>
                <Link 
                  href="/upload" 
                  className="bg-warm-coral text-white px-8 py-3 rounded-lg hover:bg-dusty-rose transition-colors text-center"
                >
                  Get Professional AI Analysis
                </Link>
              </div>
            </>
          )}

          {/* FAQ Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-playfair font-bold text-forest-green text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-forest-green mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          {result && (
            <section className="mt-16 text-center bg-gradient-to-r from-forest-green to-sage-green rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-playfair font-bold mb-4">
                Ready for Your Complete Color Analysis?
              </h2>
              <p className="text-lg mb-6">
                Get professional AI analysis with 95% accuracy and comprehensive color recommendations.
              </p>
              <Link 
                href="/upload" 
                className="inline-block bg-warm-coral text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-dusty-rose transition-colors"
              >
                Upload Your Photo - $29.99
              </Link>
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-forest-green text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/60">&copy; 2025 Hazel & Hue. Free color analysis quiz with professional AI upgrade available.</p>
          </div>
        </footer>
      </div>
    </>
  );
}