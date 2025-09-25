import React, { useState, useEffect } from "react";
import { ChatInterface } from "./components/ChatInterface";
import { StudySupport } from "./components/StudySupport";
import { WellnessTracker } from "./components/WellnessTracker";
import { SettingsPanel } from "./components/SettingsPanel";
import { MoodIndicator } from "./components/MoodIndicator";
import { ConfettiAnimation } from "./components/ConfettiAnimation";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import {
  MessageCircle,
  BookOpen,
  Heart,
  Settings,
  Brain,
  Sparkles,
  User,
  Moon,
  Sun,
  Star,
  Zap,
  Rainbow,
} from "lucide-react";

export default function App() {
  const [currentMood, setCurrentMood] = useState("neutral");
  const [language, setLanguage] = useState("en");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [showConfetti, setShowConfetti] = useState(false);
  const [previousMood, setPreviousMood] = useState("neutral");

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle confetti animation for happy mood
  useEffect(() => {
    if (currentMood === 'happy' && previousMood !== 'happy') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [currentMood, previousMood]);

  // Update previous mood separately to avoid dependency loop
  useEffect(() => {
    setPreviousMood(currentMood);
  }, [currentMood]);

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Get mood-based colors
  const getMoodColors = (mood: string) => {
    switch (mood) {
      case 'happy':
        return {
          gradient: 'from-yellow-400 via-orange-400 to-orange-500',
          bg: 'bg-gradient-to-br from-yellow-50 to-orange-50',
          text: 'text-orange-600',
          border: 'border-orange-200'
        };
      case 'sad':
        return {
          gradient: 'from-blue-400 via-blue-500 to-blue-600',
          bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
          text: 'text-blue-600',
          border: 'border-blue-200'
        };
      case 'stressed':
        return {
          gradient: 'from-green-400 via-emerald-500 to-green-600',
          bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
          text: 'text-green-600',
          border: 'border-green-200'
        };
      case 'excited':
        return {
          gradient: 'from-pink-400 via-purple-500 to-purple-600',
          bg: 'bg-gradient-to-br from-pink-50 to-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200'
        };
      default:
        return {
          gradient: 'from-purple-400 via-violet-500 to-purple-600',
          bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
          text: 'text-purple-600',
          border: 'border-purple-200'
        };
    }
  };

  const moodColors = getMoodColors(currentMood);

  const texts = {
    en: {
      welcome: "Welcome to BestuAI",
      tagline: "Not just smart, but your best friend too.",
      chat: "Chat",
      study: "Study",
      wellness: "Wellness",
      settings: "Settings",
      currentMood: "Current Mood",
      featuresTitle: "Your AI Best Friend",
      moodSupport: "Mood Detection & Emotional Support",
      studyHelp: "Study Support & Learning Tools",
      wellnessTracking: "Wellness & Daily Planning",
      privacyFirst: "Privacy-First & Secure",
    },
    hi: {
      welcome: "BestuAI में आपका स्वागत है",
      tagline: "केवल स्मार्ट नहीं, बल्कि आपका सबसे अच्छा दोस्त भी।",
      chat: "चैट",
      study: "अध्ययन",
      wellness: "कल्याण",
      settings: "सेटिंग्स",
      currentMood: "वर्तमान मूड",
      featuresTitle: "आपका AI सबसे अच्छा दोस्त",
      moodSupport: "मूड डिटेक्शन और भावनात्मक समर्थन",
      studyHelp: "अध्ययन सहायता और सीखने के उपकरण",
      wellnessTracking: "कल्याण और दैनिक योजना",
      privacyFirst: "गोपनीयता-प्रथम और सुरक्षित",
    },
    mr: {
      welcome: "BestuAI मध्ये तुमचे स्वागत आहे",
      tagline: "फक्त स्मार्ट नाही, तर तुमचा सर्वोत्तम मित्र देखील.",
      chat: "चॅट",
      study: "अभ्यास",
      wellness: "कल्याण",
      settings: "सेटिंग्ज",
      currentMood: "सध्याचा मूड",
      featuresTitle: "तुमचा AI सर्वोत्तम मित्र",
      moodSupport: "मूड डिटेक्शन आणि भावनिक समर्थन",
      studyHelp: "अभ्यास सहाय्य आणि शिकण्याची साधने",
      wellnessTracking: "कल्याण आणि दैनंदिन नियोजन",
      privacyFirst: "गोपनीयता-प्रथम आणि सुरक्षित",
    },
    bn: {
      welcome: "BestuAI তে আপনাকে স্বাগতম",
      tagline: "শুধু স্মার্ট নয়, আপনার সেরা বন্ধুও।",
      chat: "চ্যাট",
      study: "অধ্যয়ন",
      wellness: "সুস্থতা",
      settings: "সেটিংস",
      currentMood: "বর্তমান মেজাজ",
      featuresTitle: "আপনার AI সেরা বন্ধু",
      moodSupport: "মেজাজ সনাক্তকরণ ও আবেগের সহায়তা",
      studyHelp: "অধ্যয়ন সহায়তা ও শেখার সরঞ্জাম",
      wellnessTracking: "সুস্থতা ও দৈনন্দিন পরিকল্পনা",
      privacyFirst: "গোপনীয়তা-প্রথম ও নিরাপদ",
    },
    ta: {
      welcome: "BestuAI க்கு வரவேற்கிறோம்",
      tagline: "வெறும் புத்திசாலித்தனம் மட்டுமல்ல, உங்கள் சிறந்த நண்பரும் கூட.",
      chat: "சாட்",
      study: "படிப்பு",
      wellness: "நல்வாழ்வு",
      settings: "அமைப்புகள்",
      currentMood: "தற்போதைய மனநிலை",
      featuresTitle: "உங்கள் AI சிறந்த நண்பர்",
      moodSupport: "மனநிலை கண்டறிதல் & உணர்ச்சி ஆதரவு",
      studyHelp: "படிப்பு உதவி & கற்றல் கருவிகள்",
      wellnessTracking: "நல்வாழ்வு & தினசரி திட்டமிடல்",
      privacyFirst: "தனியுரிமை-முதல் & பாதுகாப்பான",
    },
    te: {
      welcome: "BestuAI కి స్వాగతం",
      tagline: "కేవలం తెలివైనదే కాదు, మీ మంచి స్నేహితుడు కూడా.",
      chat: "చాట్",
      study: "అధ్యయనం",
      wellness: "శ్రేయస్సు",
      settings: "సెట్టింగులు",
      currentMood: "ప్రస్తుత మూడ్",
      featuresTitle: "మీ AI మంచి స్నేహితుడు",
      moodSupport: "మూడ్ గుర్తింపు & భావోద్వేగ మద్దతు",
      studyHelp: "అధ్యయన సహాయం & నేర్చుకునే సాధనాలు",
      wellnessTracking: "శ్రేయస్సు & రోజువారీ ప్రణాళిక",
      privacyFirst: "గోప్యత-మొదటి & సురక్షితమైన",
    },
    gu: {
      welcome: "BestuAI માં તમારું સ્વાગત છે",
      tagline: "માત્ર સ્માર્ટ જ નહીં, પણ તમારો શ્રેષ્ઠ મિત્ર પણ.",
      chat: "ચેટ",
      study: "અભ્યાસ",
      wellness: "આરોગ્ય",
      settings: "સેટિંગ્સ",
      currentMood: "વર્તમાન મૂડ",
      featuresTitle: "તમારો AI શ્રેષ્ઠ મિત્ર",
      moodSupport: "મૂડ ઓળખ અને ભાવનાત્મક આધાર",
      studyHelp: "અભ્યાસ સહાય અને શીખવાના સાધનો",
      wellnessTracking: "આરોગ્ય અને દૈનિક આયોજન",
      privacyFirst: "ગોપનીયતા-પ્રથમ અને સુરક્ષિત",
    },
    kn: {
      welcome: "BestuAI ಗೆ ಸ್ವಾಗತ",
      tagline: "ಕೇವಲ ಸ್ಮಾರ್ಟ್ ಅಲ್ಲ, ನಿಮ್ಮ ಉತ್ತಮ ಸ್ನೇಹಿತನೂ ಕೂಡ.",
      chat: "ಚಾಟ್",
      study: "ಅಧ್ಯಯನ",
      wellness: "ಯೋಗಕ್ಷೇಮ",
      settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
      currentMood: "ಪ್ರಸ್ತುತ ಮೂಡ್",
      featuresTitle: "ನಿಮ್ಮ AI ಉತ್ತಮ ಸ್ನೇಹಿತ",
      moodSupport: "ಮೂಡ್ ಪತ್ತೆ ಮತ್ತು ಭಾವನಾತ್ಮಕ ಬೆಂಬಲ",
      studyHelp: "ಅಧ್ಯಯನ ಸಹಾಯ ಮತ್ತು ಕಲಿಕೆಯ ಸಾಧನಗಳು",
      wellnessTracking: "ಯೋಗಕ್ಷೇಮ ಮತ್ತು ದೈನಂದಿನ ಯೋಜನೆ",
      privacyFirst: "ಗೌಪ್ಯತೆ-ಮೊದಲ ಮತ್ತು ಸುರಕ್ಷಿತ",
    },
    ml: {
      welcome: "BestuAI ലേക്ക് സ്വാഗതം",
      tagline: "വെറും സ്മാർട്ട് മാത്രമല്ല, നിങ്ങളുടെ മികച്ച സുഹൃത്ത് കൂടിയാണ്.",
      chat: "ചാറ്റ്",
      study: "പഠനം",
      wellness: "ക്ഷേമം",
      settings: "ക്രമീകരണങ്ങൾ",
      currentMood: "നിലവിലെ മൂഡ്",
      featuresTitle: "നിങ്ങളുടെ AI മികച്ച സുഹൃത്ത്",
      moodSupport: "മൂഡ് തിരിച്ചറിയൽ & വൈകാരിക പിന്തുണ",
      studyHelp: "പഠന സഹായം & പഠന ഉപകരണങ്ങൾ",
      wellnessTracking: "ക്ഷേമം & ദൈനംദിന ആസൂത്രണം",
      privacyFirst: "സ്വകാര്യത-ആദ്യം & സുരക്ഷിതം",
    },
    pa: {
      welcome: "BestuAI ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
      tagline: "ਸਿਰਫ਼ ਸਮਾਰਟ ਹੀ ਨਹੀਂ, ਬਲਕਿ ਤੁਹਾਡਾ ਸਭ ਤੋਂ ਵਧੀਆ ਦੋਸਤ ਵੀ।",
      chat: "ਚੈਟ",
      study: "ਪੜ੍ਹਾਈ",
      wellness: "ਸਿਹਤ",
      settings: "ਸੈਟਿੰਗਾਂ",
      currentMood: "ਮੌਜੂਦਾ ਮੂਡ",
      featuresTitle: "ਤੁਹਾਡਾ AI ਸਭ ਤੋਂ ਵਧੀਆ ਦੋਸਤ",
      moodSupport: "ਮੂਡ ਪਛਾਣ ਅਤੇ ਭਾਵਨਾਤਮਕ ਸਹਾਇਤਾ",
      studyHelp: "ਪੜ੍ਹਾਈ ਸਹਾਇਤਾ ਅਤੇ ਸਿੱਖਣ ਦੇ ਸਾਧਨ",
      wellnessTracking: "ਸਿਹਤ ਅਤੇ ਰੋਜ਼ਾਨਾ ਯੋਜਨਾਬੰਦੀ",
      privacyFirst: "ਨਿਜਤਾ-ਪਹਿਲਾਂ ਅਤੇ ਸੁਰੱਖਿਅਤ",
    },
    or: {
      welcome: "BestuAI କୁ ସ୍ୱାଗତ",
      tagline: "କେବଳ ସ୍ମାର୍ଟ ନୁହେଁ, ତୁମର ସର୍ବୋତ୍ତମ ବନ୍ଧୁ ମଧ୍ୟ।",
      chat: "ଚାଟ୍",
      study: "ଅଧ୍ୟୟନ",
      wellness: "ସୁସ୍ଥତା",
      settings: "ସେଟିଂସ୍",
      currentMood: "ବର୍ତ୍ତମାନର ମୁଡ୍",
      featuresTitle: "ଆପଣଙ୍କର AI ସର୍ବୋତ୍ତମ ବନ୍ଧୁ",
      moodSupport: "ମୁଡ୍ ଚିହ୍ନଟ ଏବଂ ଭାବନାତ୍ମକ ସହାୟତା",
      studyHelp: "ଅଧ୍ୟୟନ ସହାୟତା ଏବଂ ଶିକ୍ଷା ଉପକରଣ",
      wellnessTracking: "ସୁସ୍ଥତା ଏବଂ ଦୈନନ୍ଦିନ ଯୋଜନା",
      privacyFirst: "ଗୋପନୀୟତା-ପ୍ରଥମ ଏବଂ ସୁରକ୍ଷିତ",
    },
    as: {
      welcome: "BestuAI লৈ আপোনাক স্বাগতম",
      tagline: "কেৱল স্মাৰ্ট নহয়, আপোনাৰ সৰ্বোত্তম বন্ধুও।",
      chat: "চেট",
      study: "অধ্যয়ন",
      wellness: "সুস্বাস্থ্য",
      settings: "ছেটিংছ",
      currentMood: "বৰ্তমানৰ মূড",
      featuresTitle: "আপোনাৰ AI সৰ্বোত্তম বন্ধু",
      moodSupport: "মূড চিনাক্তকৰণ আৰু আৱেগিক সহায়তা",
      studyHelp: "অধ্যয়ন সহায়তা আৰু শিক্ষণ সঁজুলি",
      wellnessTracking: "সুস্বাস্থ্য আৰু দৈনন্দিন পৰিকল্পনা",
      privacyFirst: "গোপনীয়তা-প্ৰথম আৰু সুৰক্ষিত",
    },
    ur: {
      welcome: "BestuAI میں آپ کا خوش آمدید",
      tagline: "صرف ذہین ہی نہیں، بلکہ آپ کا بہترین دوست بھی۔",
      chat: "چیٹ",
      study: "مطالعہ",
      wellness: "بہبود",
      settings: "ترتیبات",
      currentMood: "موجودہ مزاج",
      featuresTitle: "آپ کا AI بہترین دوست",
      moodSupport: "موڈ کی شناخت اور جذباتی مدد",
      studyHelp: "مطالعہ کی مدد اور سیکھنے کے آلات",
      wellnessTracking: "بہبود اور روزانہ منصوبہ بندی",
      privacyFirst: "رازداری پہلے اور محفوظ",
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  return (
    <div className="min-h-screen transition-all duration-500 ease-in-out">
      <ConfettiAnimation show={showConfetti} />
      
      {/* Header */}
      <header className={`border-b-2 ${moodColors.border} backdrop-blur-md bg-white/80 dark:bg-gray-900/80 transition-all duration-500`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 animate-bounce-in">
              <div className={`w-12 h-12 bg-gradient-to-r ${moodColors.gradient} rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle`}>
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                  BestuAI ✨
                </h1>
                <p className={`text-sm ${moodColors.text} font-medium`}>
                  {t.tagline}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                className="btn-cheerful relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isDarkMode ? (
                  <Sun className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:rotate-180" />
                ) : (
                  <Moon className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </Button>

              <Badge
                variant="outline"
                className={`hidden sm:flex ${moodColors.bg} ${moodColors.text} ${moodColors.border} border-2 px-3 py-1 rounded-full font-semibold animate-pulse-gentle`}
              >
                {language.toUpperCase()} 🌍
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        {activeTab === "chat" && (
          <div className="mb-6 space-y-6 animate-bounce-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                {t.welcome} 🎉
              </h2>
              <div className="flex items-center justify-center gap-3 animate-float">
                <Star className="w-6 h-6 text-yellow-500 animate-pulse-gentle" />
                <Rainbow className="w-6 h-6 text-pink-500 animate-pulse-gentle" />
                <p className={`text-lg font-semibold ${moodColors.text}`}>
                  {t.featuresTitle}
                </p>
                <Zap className="w-6 h-6 text-purple-500 animate-pulse-gentle" />
                <Sparkles className="w-6 h-6 text-orange-500 animate-pulse-gentle" />
              </div>
            </div>

            {/* Mood Indicator */}
            <div className="max-w-md mx-auto transform hover:scale-105 transition-transform duration-300">
              <MoodIndicator
                currentMood={currentMood}
                language={language}
              />
            </div>

            {/* Quick Features Overview */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <Card className="card-cheerful text-center p-6 group cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-blue-200 hover:border-blue-400">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-gentle"></div>
                  <MessageCircle className="w-10 h-10 mx-auto mb-3 text-blue-500 relative z-10 group-hover:animate-bounce" />
                </div>
                <p className="text-sm font-semibold text-blue-600 group-hover:text-blue-700">{t.moodSupport}</p>
              </Card>

              <Card className="card-cheerful text-center p-6 group cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-green-200 hover:border-green-400">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-gentle"></div>
                  <BookOpen className="w-10 h-10 mx-auto mb-3 text-green-500 relative z-10 group-hover:animate-bounce" />
                </div>
                <p className="text-sm font-semibold text-green-600 group-hover:text-green-700">{t.studyHelp}</p>
              </Card>

              <Card className="card-cheerful text-center p-6 group cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-pink-200 hover:border-pink-400">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-gentle"></div>
                  <Heart className="w-10 h-10 mx-auto mb-3 text-pink-500 relative z-10 group-hover:animate-bounce" />
                </div>
                <p className="text-sm font-semibold text-pink-600 group-hover:text-pink-700">{t.wellnessTracking}</p>
              </Card>

              <Card className="card-cheerful text-center p-6 group cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-purple-200 hover:border-purple-400">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse-gentle"></div>
                  <User className="w-10 h-10 mx-auto mb-3 text-purple-500 relative z-10 group-hover:animate-bounce" />
                </div>
                <p className="text-sm font-semibold text-purple-600 group-hover:text-purple-700">{t.privacyFirst}</p>
              </Card>
            </div>
          </div>
        )}

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-2 border-purple-200 rounded-2xl p-2 shadow-lg">
            <TabsTrigger
              value="chat"
              className="flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">{t.chat} 💬</span>
            </TabsTrigger>
            <TabsTrigger
              value="study"
              className="flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-50 dark:hover:bg-green-900/20"
            >
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">
                {t.study} 📚
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="wellness"
              className="flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-pink-50 dark:hover:bg-pink-900/20"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden sm:inline">
                {t.wellness} 💪
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 rounded-xl font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Settings className="w-5 h-5" />
              <span className="hidden sm:inline">
                {t.settings} ⚙️
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="h-[600px] animate-bounce-in">
            <Card className="h-full card-cheerful border-2 border-blue-200 shadow-2xl bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <ChatInterface
                language={language}
                currentMood={currentMood}
                onMoodChange={handleMoodChange}
              />
            </Card>
          </TabsContent>

          <TabsContent value="study" className="animate-bounce-in">
            <div className="card-cheerful border-2 border-green-200 rounded-2xl shadow-xl bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20">
              <StudySupport language={language} />
            </div>
          </TabsContent>

          <TabsContent value="wellness" className="animate-bounce-in">
            <div className="card-cheerful border-2 border-pink-200 rounded-2xl shadow-xl bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-pink-900/20 dark:to-rose-900/20">
              <WellnessTracker language={language} />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-bounce-in">
            <div className="card-cheerful border-2 border-purple-200 rounded-2xl shadow-xl bg-gradient-to-br from-purple-50/50 to-violet-50/50 dark:from-purple-900/20 dark:to-violet-900/20 p-4">
              <SettingsPanel
                language={language}
                onLanguageChange={handleLanguageChange}
                isDarkMode={isDarkMode}
                onThemeToggle={handleThemeToggle}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-gradient-to-r from-purple-200 to-pink-200 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-md mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 animate-pulse-gentle">
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Made with Love by Manisha Junare
              </p>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
              Version 1.0.0 • Privacy-First AI Companion 🔒✨
            </p>
            <div className="flex justify-center gap-1 text-xl animate-float">
              🌟 🎨 🚀 💝 🌈
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}