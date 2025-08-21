"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowRight, ArrowLeft, User, Apple, Dumbbell, Pill, Crown, Star, Heart, Sparkles, ShoppingBag } from 'lucide-react'

interface Question {
  id: string
  question: string
  options: { value: string; label: string }[]
  category: string
  type: 'radio' | 'checkbox'
}

interface Answers {
  [key: string]: string | string[]
}

interface Recommendations {
  persona: string
  nutrition: string[]
  supplements: string[]
  exercises: string[]
  lifestyle: string[]
}

interface Doctor {
  name: string
  specialty: string
  focus: string
}

interface Product {
  name: string
  description: string
  price: string
  image: string
  benefits: string[]
}

interface Affirmation {
  text: string
  category: string
}

const questions: Question[] = [
  {
    id: "age",
    question: "What is your age range?",
    options: [
      { value: "40-45", label: "40-45 years" },
      { value: "46-50", label: "46-50 years" },
      { value: "51-55", label: "51-55 years" },
      { value: "56-60", label: "56-60 years" },
      { value: "60+", label: "60+ years" }
    ],
    category: "demographics",
    type: 'radio'
  },
  {
    id: "menopause_stage",
    question: "What stage of menopause are you in?",
    options: [
      { value: "perimenopause", label: "Perimenopause (irregular periods)" },
      { value: "menopause", label: "Menopause (no period for 12+ months)" },
      { value: "postmenopause", label: "Post-menopause (several years past menopause)" },
      { value: "unsure", label: "I'm not sure" }
    ],
    category: "menopause",
    type: 'radio'
  },
  {
    id: "primary_symptoms",
    question: "What are your most bothersome symptoms?",
    options: [
      { value: "hot_flashes", label: "Hot flashes and night sweats" },
      { value: "mood_changes", label: "Mood swings and irritability" },
      { value: "sleep_issues", label: "Sleep problems and fatigue" },
      { value: "weight_gain", label: "Weight gain and metabolism changes" },
      { value: "joint_pain", label: "Joint pain and stiffness" }
    ],
    category: "symptoms",
    type: 'radio'
  },
  {
    id: "energy_levels",
    question: "How would you describe your energy levels?",
    options: [
      { value: "very_low", label: "Very low - constantly tired" },
      { value: "low", label: "Low - tired most days" },
      { value: "moderate", label: "Moderate - some good and bad days" },
      { value: "good", label: "Good - generally energetic" },
      { value: "excellent", label: "Excellent - very energetic" }
    ],
    category: "energy",
    type: 'radio'
  },
  {
    id: "current_exercise",
    question: "How often do you currently exercise?",
    options: [
      { value: "never", label: "Never or rarely" },
      { value: "1-2_times", label: "1-2 times per week" },
      { value: "3-4_times", label: "3-4 times per week" },
      { value: "5-6_times", label: "5-6 times per week" },
      { value: "daily", label: "Daily" }
    ],
    category: "exercise",
    type: 'radio'
  },
  {
    id: "exercise_preference",
    question: "What type of exercise do you prefer or would like to try?",
    options: [
      { value: "low_impact", label: "Low-impact (walking, swimming, yoga)" },
      { value: "strength", label: "Strength training and resistance exercises" },
      { value: "cardio", label: "Cardio and high-intensity workouts" },
      { value: "flexibility", label: "Flexibility and balance (yoga, pilates)" },
      { value: "variety", label: "A mix of different activities" }
    ],
    category: "exercise",
    type: 'radio'
  },
  {
    id: "diet_quality",
    question: "How would you rate your current diet?",
    options: [
      { value: "poor", label: "Poor - mostly processed foods" },
      { value: "fair", label: "Fair - some healthy choices" },
      { value: "good", label: "Good - mostly healthy with occasional treats" },
      { value: "excellent", label: "Excellent - very healthy and balanced" }
    ],
    category: "nutrition",
    type: 'radio'
  },
  {
    id: "dietary_restrictions",
    question: "Do you have any dietary restrictions or preferences?",
    options: [
      { value: "none", label: "No restrictions" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
      { value: "gluten_free", label: "Gluten-free" },
      { value: "dairy_free", label: "Dairy-free" }
    ],
    category: "nutrition",
    type: 'radio'
  },
  {
    id: "sleep_quality",
    question: "How is your sleep quality?",
    options: [
      { value: "very_poor", label: "Very poor - frequent wake-ups, hard to fall asleep" },
      { value: "poor", label: "Poor - some sleep issues" },
      { value: "fair", label: "Fair - occasional sleep problems" },
      { value: "good", label: "Good - generally sleep well" },
      { value: "excellent", label: "Excellent - sleep soundly most nights" }
    ],
    category: "sleep",
    type: 'radio'
  },
  {
    id: "stress_levels",
    question: "How would you rate your stress levels?",
    options: [
      { value: "very_high", label: "Very high - constantly overwhelmed" },
      { value: "high", label: "High - frequently stressed" },
      { value: "moderate", label: "Moderate - manageable stress" },
      { value: "low", label: "Low - rarely stressed" },
      { value: "very_low", label: "Very low - very calm and relaxed" }
    ],
    category: "stress",
    type: 'radio'
  }
]

const doctors: Doctor[] = [
  { name: "Dr. Laura A. Carinci, MD", specialty: "Hot flashes, Night sweats", focus: "Temperature regulation and sleep quality" },
  { name: "Dr. Tracey J. Fein, MD", specialty: "Hormone imbalance, Hot flashes", focus: "Hormonal balance and symptom management" },
  { name: "Dr. Mary Jane Minkin, MD", specialty: "Vaginal dryness, Painful sex, Sexual discomfort", focus: "Sexual health and comfort" },
  { name: "Dr. Florence Comite, MD", specialty: "Bone loss, Osteoporosis, Metabolic changes", focus: "Bone health and metabolism" },
  { name: "Dr. Susan Lark, MD", specialty: "Brain fog, Memory issues, Holistic menopause care", focus: "Cognitive health and holistic wellness" },
  { name: "Dr. Niti R. Aggarwal, MD", specialty: "Heart palpitations, Cardiovascular risk", focus: "Cardiovascular health and heart function" },
  { name: "Dr. Suzanne Steinbaum, MD", specialty: "Cardiovascular health, Preventive care", focus: "Heart health and prevention" },
  { name: "Dr. Steven R. Goldstein, MD", specialty: "Hormone therapy, Irregular bleeding", focus: "Hormone therapy and menstrual health" },
  { name: "Dr. Deborah Kwolek, MD", specialty: "Perimenopause transition, Hormonal imbalance", focus: "Transition support and hormonal balance" },
  { name: "Dr. Jen Gunter, MD", specialty: "Pelvic pain, Sexual health, Body image concerns", focus: "Pelvic health and body confidence" }
]

const products: Product[] = [
  {
    name: "Empress Naturals Anti Aging (AM Serum)",
    description: "Morning radiance and hydration serum with naturally sourced ingredients",
    price: "From $30.00",
    image: "/am-serum.webp",
    benefits: ["Hydrates and brightens skin", "Reduces fine lines", "Protects against environmental damage", "Natural ingredients"]
  },
  {
    name: "Empress Naturals Luxe Night Elixir (PM Serum)",
    description: "Nighttime repair and rejuvenation serum for optimal skin recovery",
    price: "From $30.00",
    image: "/pm-serum.webp",
    benefits: ["Deep repair and regeneration", "Improves skin texture", "Reduces appearance of aging", "Calming and soothing"]
  },
  {
    name: "Kansa Wand - Face & Body",
    description: "Traditional Ayurvedic massage tool for facial and body wellness",
    price: "From $70.00",
    image: "/kansa-wand.webp",
    benefits: ["Improves circulation", "Reduces puffiness", "Promotes lymphatic drainage", "Natural anti-aging tool"]
  }
]

export default function SurveyPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [showResults, setShowResults] = useState(false)
  const [showAdditionalRecs, setShowAdditionalRecs] = useState(false)
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)

  const handleAnswer = (questionId: string, value: string, type: 'radio' | 'checkbox') => {
    if (type === 'radio') {
      setAnswers(prev => ({ ...prev, [questionId]: value }))
    } else {
      setAnswers(prev => {
        const currentValues = (prev[questionId] as string[]) || []
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value]
        return { ...prev, [questionId]: newValues }
      })
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      generateRecommendations()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const generateRecommendations = () => {
    const persona = determinePersona(answers)
    const recs = getRecommendations(persona, answers)
    setRecommendations(recs)
    setShowResults(true)
  }

  const showAdditionalRecommendations = () => {
    setShowAdditionalRecs(true)
  }

  const getRecommendedDoctors = (persona: string): Doctor[] => {
    const doctorMap: { [key: string]: string[] } = {
      thermal_regulator: ["Dr. Laura A. Carinci, MD", "Dr. Tracey J. Fein, MD", "Dr. Steven R. Goldstein, MD"],
      mood_balancer: ["Dr. Susan Lark, MD", "Dr. Deborah Kwolek, MD", "Dr. Jen Gunter, MD"],
      metabolism_booster: ["Dr. Florence Comite, MD", "Dr. Niti R. Aggarwal, MD", "Dr. Suzanne Steinbaum, MD"],
      sleep_optimizer: ["Dr. Laura A. Carinci, MD", "Dr. Susan Lark, MD", "Dr. Deborah Kwolek, MD"],
      joint_supporter: ["Dr. Florence Comite, MD", "Dr. Susan Lark, MD", "Dr. Jen Gunter, MD"],
      holistic_wellness: ["Dr. Susan Lark, MD", "Dr. Deborah Kwolek, MD", "Dr. Florence Comite, MD"]
    }
    
    const recommendedNames = doctorMap[persona] || doctorMap.holistic_wellness
    return doctors.filter(doctor => recommendedNames.includes(doctor.name))
  }

  const getPersonalizedAffirmations = (persona: string, answers: Answers): Affirmation[] => {
    const affirmations: { [key: string]: Affirmation[] } = {
      thermal_regulator: [
        { text: "I am cool, calm, and in control of my body's temperature", category: "temperature" },
        { text: "My body knows how to regulate itself naturally", category: "confidence" },
        { text: "I embrace my body's natural rhythms with grace", category: "acceptance" },
        { text: "I am strong and resilient through every change", category: "strength" }
      ],
      mood_balancer: [
        { text: "I choose peace and positivity in every moment", category: "mood" },
        { text: "My emotions are valid and I handle them with wisdom", category: "emotional" },
        { text: "I am worthy of joy and inner peace", category: "self-worth" },
        { text: "I trust my inner strength to guide me through challenges", category: "trust" }
      ],
      metabolism_booster: [
        { text: "My body is capable of amazing transformation", category: "transformation" },
        { text: "I fuel my body with love and nourishing choices", category: "nourishment" },
        { text: "I am building strength and vitality every day", category: "vitality" },
        { text: "My metabolism supports my health and wellness goals", category: "health" }
      ],
      sleep_optimizer: [
        { text: "I deserve restful, rejuvenating sleep", category: "sleep" },
        { text: "My mind and body are ready for peaceful rest", category: "peace" },
        { text: "I release all tension and embrace tranquility", category: "relaxation" },
        { text: "I wake up refreshed and ready for a beautiful day", category: "energy" }
      ],
      joint_supporter: [
        { text: "My body is strong and supports me in all I do", category: "strength" },
        { text: "I move with grace and ease through life", category: "movement" },
        { text: "I honor my body's needs and treat it with care", category: "care" },
        { text: "I am flexible and adaptable in body and mind", category: "flexibility" }
      ],
      holistic_wellness: [
        { text: "I am whole, healthy, and perfectly designed", category: "wholeness" },
        { text: "I embrace my journey with wisdom and grace", category: "wisdom" },
        { text: "I am worthy of optimal health and wellness", category: "worth" },
        { text: "I trust my body's natural wisdom and healing", category: "trust" }
      ]
    }
    
    return affirmations[persona] || affirmations.holistic_wellness
  }

  const determinePersona = (answers: Answers): string => {
    const symptoms = answers.primary_symptoms as string
    const energy = answers.energy_levels as string
    const exercise = answers.current_exercise as string
    const stress = answers.stress_levels as string

    if (symptoms === "hot_flashes" && energy === "very_low") {
      return "thermal_regulator"
    } else if (symptoms === "mood_changes" && stress === "very_high") {
      return "mood_balancer"
    } else if (symptoms === "weight_gain" && exercise === "never") {
      return "metabolism_booster"
    } else if (symptoms === "sleep_issues") {
      return "sleep_optimizer"
    } else if (symptoms === "joint_pain") {
      return "joint_supporter"
    } else {
      return "holistic_wellness"
    }
  }

  const getRecommendations = (persona: string, answers: Answers): Recommendations => {
    const baseRecs = {
      thermal_regulator: {
        persona: "Thermal Regulator - Managing heat and temperature fluctuations",
        nutrition: [
          "Increase phytoestrogen-rich foods (soy, flaxseeds, chickpeas)",
          "Stay hydrated with 8-10 glasses of water daily",
          "Limit spicy foods, caffeine, and alcohol",
          "Include cooling foods like cucumber, watermelon, and leafy greens",
          "Eat smaller, frequent meals to avoid heat spikes"
        ],
        supplements: [
          "Black Cohosh (40-80mg daily) for hot flash relief",
          "Evening Primrose Oil (1000mg daily)",
          "Vitamin E (400 IU daily)",
          "Magnesium (200-400mg daily) for temperature regulation",
          "Red Clover extract for natural cooling"
        ],
        exercises: [
          "Swimming or water aerobics for cooling exercise",
          "Early morning or evening walks",
          "Gentle yoga in cool environments",
          "Breathing exercises for hot flash management",
          "Avoid hot yoga or intense cardio during peak symptoms"
        ],
        lifestyle: [
          "Keep a fan nearby and dress in layers",
          "Use moisture-wicking fabrics",
          "Practice stress reduction techniques",
          "Maintain a cool sleeping environment",
          "Track hot flash triggers in a diary"
        ]
      },
      mood_balancer: {
        persona: "Mood Balancer - Stabilizing emotional well-being",
        nutrition: [
          "Increase omega-3 rich foods (salmon, walnuts, chia seeds)",
          "Include complex carbohydrates for serotonin production",
          "Eat regular meals to stabilize blood sugar",
          "Include tryptophan-rich foods (turkey, eggs, cheese)",
          "Limit sugar and processed foods that cause mood swings"
        ],
        supplements: [
          "Omega-3 fatty acids (1000-2000mg daily)",
          "Vitamin D3 (1000-2000 IU daily)",
          "B-Complex vitamins for nervous system support",
          "5-HTP (100-200mg daily) for mood regulation",
          "Ashwagandha (300-500mg daily) for stress management"
        ],
        exercises: [
          "Regular cardio exercise for endorphin release",
          "Yoga and meditation for stress relief",
          "Strength training 2-3 times per week",
          "Dancing or fun group activities",
          "Outdoor activities for natural mood boost"
        ],
        lifestyle: [
          "Establish a consistent daily routine",
          "Practice mindfulness and meditation",
          "Maintain social connections",
          "Get adequate sunlight exposure",
          "Consider counseling or support groups"
        ]
      },
      metabolism_booster: {
        persona: "Metabolism Booster - Revving up energy and weight management",
        nutrition: [
          "Increase protein intake (25-30g per meal)",
          "Include metabolism-boosting foods (green tea, chili peppers)",
          "Eat fiber-rich foods for satiety",
          "Practice portion control and mindful eating",
          "Include healthy fats (avocado, nuts, olive oil)"
        ],
        supplements: [
          "Green Tea Extract (400-500mg daily)",
          "Chromium (200mcg daily) for blood sugar control",
          "CLA (Conjugated Linoleic Acid) for fat metabolism",
          "Probiotics for gut health and metabolism",
          "Vitamin B12 for energy metabolism"
        ],
        exercises: [
          "High-Intensity Interval Training (HIIT) 2-3x per week",
          "Strength training to build lean muscle",
          "Daily walking (aim for 10,000 steps)",
          "Resistance band exercises",
          "Metabolic circuit training"
        ],
        lifestyle: [
          "Track food intake and exercise",
          "Get adequate sleep (7-9 hours)",
          "Manage stress to reduce cortisol",
          "Stay hydrated throughout the day",
          "Plan and prep healthy meals"
        ]
      },
      sleep_optimizer: {
        persona: "Sleep Optimizer - Improving rest and recovery",
        nutrition: [
          "Include magnesium-rich foods (almonds, spinach, pumpkin seeds)",
          "Avoid caffeine after 2 PM",
          "Include tart cherry juice for natural melatonin",
          "Eat light dinners 3 hours before bed",
          "Include calcium-rich foods for muscle relaxation"
        ],
        supplements: [
          "Melatonin (0.5-3mg) 30 minutes before bed",
          "Magnesium Glycinate (200-400mg) before bed",
          "L-Theanine (100-200mg) for relaxation",
          "Valerian Root (300-600mg) for sleep quality",
          "GABA (500-750mg) for calming effects"
        ],
        exercises: [
          "Gentle evening yoga or stretching",
          "Morning sunlight exposure for circadian rhythm",
          "Avoid intense exercise 3 hours before bed",
          "Progressive muscle relaxation",
          "Tai Chi for stress reduction"
        ],
        lifestyle: [
          "Establish a consistent bedtime routine",
          "Create a cool, dark sleeping environment",
          "Limit screen time 1 hour before bed",
          "Use white noise or earplugs if needed",
          "Practice relaxation techniques before sleep"
        ]
      },
      joint_supporter: {
        persona: "Joint Supporter - Maintaining mobility and reducing inflammation",
        nutrition: [
          "Include anti-inflammatory foods (turmeric, ginger, berries)",
          "Increase omega-3 fatty acids",
          "Include collagen-rich foods (bone broth, fish)",
          "Eat antioxidant-rich fruits and vegetables",
          "Limit inflammatory foods (processed foods, excess sugar)"
        ],
        supplements: [
          "Glucosamine and Chondroitin (1500mg/1200mg daily)",
          "Turmeric/Curcumin (500-1000mg daily)",
          "Omega-3 fatty acids (2000-3000mg daily)",
          "Collagen peptides (10-20g daily)",
          "Vitamin D3 for bone health"
        ],
        exercises: [
          "Low-impact activities (swimming, cycling)",
          "Gentle strength training with proper form",
          "Flexibility and mobility exercises",
          "Water aerobics for joint-friendly cardio",
          "Yoga or Pilates for flexibility"
        ],
        lifestyle: [
          "Maintain a healthy weight to reduce joint stress",
          "Use proper ergonomics at work",
          "Apply heat/cold therapy as needed",
          "Get adequate rest for tissue repair",
          "Consider physical therapy if needed"
        ]
      },
      holistic_wellness: {
        persona: "Holistic Wellness - Comprehensive health optimization",
        nutrition: [
          "Follow a balanced Mediterranean-style diet",
          "Include a variety of colorful fruits and vegetables",
          "Choose whole grains over refined carbohydrates",
          "Include lean proteins and healthy fats",
          "Stay well-hydrated throughout the day"
        ],
        supplements: [
          "High-quality multivitamin for women 50+",
          "Calcium and Vitamin D3 for bone health",
          "Omega-3 fatty acids for heart and brain health",
          "Probiotics for digestive health",
          "Coenzyme Q10 for cellular energy"
        ],
        exercises: [
          "Mix of cardio, strength, and flexibility training",
          "Aim for 150 minutes of moderate exercise per week",
          "Include balance and coordination exercises",
          "Try new activities to stay motivated",
          "Listen to your body and adjust intensity"
        ],
        lifestyle: [
          "Prioritize stress management techniques",
          "Maintain strong social connections",
          "Get regular health check-ups",
          "Practice gratitude and positive thinking",
          "Engage in hobbies and activities you enjoy"
        ]
      }
    }

    return baseRecs[persona as keyof typeof baseRecs] || baseRecs.holistic_wellness
  }

  if (showAdditionalRecs && recommendations) {
    const persona = determinePersona(answers)
    const recommendedDoctors = getRecommendedDoctors(persona)
    const personalizedAffirmations = getPersonalizedAffirmations(persona, answers)

    return (
      <div className="min-h-screen bg-[#FAF8F5] px-8 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="relative">
                <Crown className="h-8 w-8 text-purple-700" />
                <Star className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-purple-700">Empress Health</span>
            </div>
            <h1 className="text-4xl font-bold text-purple-700 mb-4">Your Complete Wellness Journey</h1>
            <p className="text-xl text-gray-600">
              Personalized recommendations to support your health and beauty
            </p>
          </div>

          {/* Doctors Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              Recommended Healthcare Providers
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {recommendedDoctors.map((doctor, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-3">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Affirmations Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-yellow-500" />
              Daily Affirmations for You
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {personalizedAffirmations.map((affirmation, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <p className="text-lg text-gray-800 italic">"{affirmation.text}"</p>
                  <span className="inline-block mt-2 text-sm text-purple-600 font-medium">{affirmation.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-purple-700 mb-8 flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-green-500" />
              Recommended Products from Empress Naturals
            </h2>
                         <div className="grid gap-8 md:grid-cols-3">
               {products.map((product, index) => (
                 <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
                   <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                     <img 
                       src={product.image} 
                       alt={product.name}
                       className="w-full h-full object-cover"
                     />
                   </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="text-lg font-bold text-purple-700 mb-4">{product.price}</p>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="text-center space-y-4">
            <Button
              onClick={() => {
                setShowAdditionalRecs(false)
                setShowResults(false)
                setCurrentQuestion(0)
                setAnswers({})
                setRecommendations(null)
              }}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Take Quiz Again
            </Button>
            <div>
              <Button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdK4N45ySKhGOkvAx43wLwSnLvBvbS4emkm3gCTTXax2CAJoA/viewform?usp=dialog', '_blank')}
                className="bg-purple-700 hover:bg-purple-800 text-white"
              >
                Share Your Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showResults && recommendations) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="relative">
                <Crown className="h-8 w-8 text-purple-700" />
                <Star className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold text-purple-700">Empress Health</span>
            </div>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-purple-700 mb-4">Your Personalized Menopause Plan</h1>
            <p className="text-xl text-gray-600">
              Based on your responses, we've created a tailored wellness plan just for you
            </p>
          </div>

          {/* Persona */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-2">
              <User className="h-6 w-6" />
              Your Persona
            </h2>
            <p className="text-lg text-gray-700">{recommendations.persona}</p>
          </div>

          {/* Recommendations Grid */}
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <Apple className="h-6 w-6 text-green-600" />
                Nutrition Recommendations
              </h2>
              <ul className="space-y-3">
                {recommendations.nutrition.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <Pill className="h-6 w-6 text-blue-600" />
                Supplement Suggestions
              </h2>
              <ul className="space-y-3">
                {recommendations.supplements.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-orange-600" />
                Exercise Plan
              </h2>
              <ul className="space-y-3">
                {recommendations.exercises.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-6">Lifestyle Recommendations</h2>
              <ul className="space-y-3">
                {recommendations.lifestyle.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-16 space-y-4">
            <Button
              onClick={showAdditionalRecommendations}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              Get More Recommendations →
            </Button>
            <div>
              <Button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdK4N45ySKhGOkvAx43wLwSnLvBvbS4emkm3gCTTXax2CAJoA/viewform?usp=dialog', '_blank')}
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                Share Your Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-8 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="relative">
              <Crown className="h-8 w-8 text-purple-700" />
              <Star className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold text-purple-700">Empress Health</span>
          </div>
          <h1 className="text-4xl font-bold text-purple-700 mb-4">Welcome to Empress Health.Ai</h1>
          <p className="text-xl text-gray-600 mb-8">
            Let's get to know you better to provide personalized health recommendation
          </p>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 max-w-lg mx-auto">
            <p className="text-gray-700">
              Why complete this assessment? This helps us provide personalized health recommendation, track your symptoms effectively, and connect you with the right specialists.
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-purple-700 mb-8">Basic Health Information</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's start with some basic information about your health journey.
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-6">{questions[currentQuestion].question}</h3>
          
          <div className="space-y-4">
            <RadioGroup
              value={answers[questions[currentQuestion].id] as string || ""}
              onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value, 'radio')}
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-gray-700 text-lg"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={!answers[questions[currentQuestion].id]}
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            {currentQuestion === questions.length - 1 ? "Get Results" : "Next →"}
          </Button>
        </div>

        {/* Survey Button */}
        <div className="text-center mt-8">
          <Button
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdK4N45ySKhGOkvAx43wLwSnLvBvbS4emkm3gCTTXax2CAJoA/viewform?usp=dialog', '_blank')}
            variant="outline"
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Share Your Feedback
          </Button>
        </div>
      </div>
    </div>
  )
}
