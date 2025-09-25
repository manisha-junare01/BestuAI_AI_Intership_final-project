import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  Droplets, 
  Moon, 
  Dumbbell, 
  Brain, 
  Clock, 
  Heart,
  Coffee,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

interface WellnessTrackerProps {
  language: string;
}

interface WellnessMetric {
  id: string;
  name: string;
  icon: React.ReactNode;
  current: number;
  target: number;
  unit: string;
  color: string;
}

interface DailyTask {
  id: string;
  task: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'study' | 'health' | 'personal';
}

export function WellnessTracker({ language }: WellnessTrackerProps) {
  const [wellnessMetrics, setWellnessMetrics] = useState<WellnessMetric[]>([
    {
      id: 'water',
      name: 'Water',
      icon: <Droplets className="w-4 h-4" />,
      current: 6,
      target: 8,
      unit: 'glasses',
      color: 'text-blue-500'
    },
    {
      id: 'sleep',
      name: 'Sleep',
      icon: <Moon className="w-4 h-4" />,
      current: 7,
      target: 8,
      unit: 'hours',
      color: 'text-purple-500'
    },
    {
      id: 'exercise',
      name: 'Exercise',
      icon: <Dumbbell className="w-4 h-4" />,
      current: 30,
      target: 60,
      unit: 'minutes',
      color: 'text-green-500'
    },
    {
      id: 'meditation',
      name: 'Meditation',
      icon: <Brain className="w-4 h-4" />,
      current: 10,
      target: 15,
      unit: 'minutes',
      color: 'text-orange-500'
    }
  ]);

  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([
    {
      id: '1',
      task: 'Complete Mathematics homework',
      completed: true,
      priority: 'high',
      category: 'study'
    },
    {
      id: '2',
      task: 'Take a 10-minute walk',
      completed: false,
      priority: 'medium',
      category: 'health'
    },
    {
      id: '3',
      task: 'Read for 30 minutes',
      completed: false,
      priority: 'medium',
      category: 'personal'
    },
    {
      id: '4',
      task: 'Practice deep breathing',
      completed: true,
      priority: 'low',
      category: 'health'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const texts = {
    en: {
      wellnessTracker: 'Wellness Tracker',
      dailyPlanning: 'Daily Planning',
      healthMetrics: 'Health Metrics',
      todaysTasks: 'Today\'s Tasks',
      wellnessNudges: 'Wellness Nudges',
      hydrationReminder: 'Time to drink some water! 💧',
      breakReminder: 'You\'ve been studying for 2 hours. Take a 15-minute break!',
      posthureReminder: 'Remember to maintain good posture while studying',
      completed: 'Completed',
      pending: 'Pending',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      study: 'Study',
      health: 'Health',
      personal: 'Personal',
      addTask: 'Add Task',
      dailyGoal: 'Daily Goal',
      weeklyProgress: 'Weekly Progress',
      mindfulMoment: 'Take a mindful moment',
      breatheWith: 'Breathe with BestuAI'
    },
    hi: {
      wellnessTracker: 'कल्याण ट्रैकर',
      dailyPlanning: 'दैनिक योजना',
      healthMetrics: 'स्वास्थ्य मेट्रिक्स',
      todaysTasks: 'आज के कार्य',
      wellnessNudges: 'कल्याण रिमाइंडर',
      hydrationReminder: 'पानी पीने का समय! 💧',
      breakReminder: 'आप 2 घंटे से पढ़ाई कर रहे हैं। 15 मिनट का ब्रेक लें!',
      posthureReminder: 'पढ़ाई करते समय अच्छी मुद्रा बनाए रखना याद रखें',
      completed: 'पूर्ण',
      pending: 'लंबित',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कम',
      study: 'अध्ययन',
      health: 'स्वास्थ्य',
      personal: 'व्यक्तिगत',
      addTask: 'कार्य जोड़ें',
      dailyGoal: 'दैनिक लक्ष्य',
      weeklyProgress: 'साप्ताहिक प्रगति',
      mindfulMoment: 'एक सचेत क्षण लें',
      breatheWith: 'BestuAI के साथ सांस लें'
    },
    mr: {
      wellnessTracker: 'कल्याण ट्रॅकर',
      dailyPlanning: 'दैनंदिन नियोजन',
      healthMetrics: 'आरोग्य मेट्रिक्स',
      todaysTasks: 'आजची कामे',
      wellnessNudges: 'कल्याण स्मरणपत्रे',
      hydrationReminder: 'पाणी पिण्याची वेळ! 💧',
      breakReminder: 'तुम्ही 2 तास अभ्यास करत आहात। 15 मिनिटांचा विश्रांती घ्या!',
      posthureReminder: 'अभ्यास करताना चांगली मुद्रा ठेवणे लक्षात ठेवा',
      completed: 'पूर्ण',
      pending: 'प्रलंबित',
      high: 'उच्च',
      medium: 'मध्यम',
      low: 'कमी',
      study: 'अभ्यास',
      health: 'आरोग्य',
      personal: 'वैयक्तिक',
      addTask: 'कार्य जोडा',
      dailyGoal: 'दैनंदिन उद्दिष्ट',
      weeklyProgress: 'आठवडाभराची प्रगती',
      mindfulMoment: 'एक जागरूक क्षण घ्या',
      breatheWith: 'BestuAI सोबत श्वास घ्या'
    },
    bn: {
      wellnessTracker: 'সুস্থতা ট্র্যাকার',
      dailyPlanning: 'দৈনন্দিন পরিকল্পনা',
      healthMetrics: 'স্বাস্থ্য মেট্রিক্স',
      todaysTasks: 'আজকের কাজগুলি',
      wellnessNudges: 'সুস্থতা স্মারক',
      hydrationReminder: 'পানি পান করার সময়! 💧',
      breakReminder: 'আপনি ২ ঘন্টা ধরে পড়াশোনা করছেন। ১৫ মিনিটের বিরতি নিন!',
      posthureReminder: 'পড়াশোনার সময় ভাল ভঙ্গি বজায় রাখতে মনে রাখবেন',
      completed: 'সম্পন্ন',
      pending: 'মুলতুবি',
      high: 'উচ্চ',
      medium: 'মাঝারি',
      low: 'কম',
      study: 'অধ্যয়ন',
      health: 'স্বাস্থ্য',
      personal: 'ব্যক্তিগত',
      addTask: 'কাজ যোগ করুন',
      dailyGoal: 'দৈনিক লক্ষ্য',
      weeklyProgress: 'সাপ্তাহিক অগ্রগতি',
      mindfulMoment: 'একটি মননশীল মুহূর্ত নিন',
      breatheWith: 'BestuAI এর সাথে শ্বাস নিন'
    },
    ta: {
      wellnessTracker: 'நல்வாழ்வு கண்காணிப்பு',
      dailyPlanning: 'தினசரி திட்டமிடல்',
      healthMetrics: 'ஆரோக்கிய அளவீடுகள்',
      todaysTasks: 'இன்றைய பணிகள்',
      wellnessNudges: 'நல்வாழ்வு நினைவூட்டல்கள்',
      hydrationReminder: 'தண்ணீர் குடிக்கும் நேரம்! 💧',
      breakReminder: 'நீங்கள் 2 மணி நேரமாக படித்துக்கொண்டிருக்கிறீர்கள். 15 நிமிட இடைவேளை எடுங்கள்!',
      posthureReminder: 'படிக்கும்போது நல்ல தோற்றத்தை பராமரிக்க நினைவில் கொள்ளுங்கள்',
      completed: 'முடிந்தது',
      pending: 'நிலுவையில்',
      high: 'உயர்ந்த',
      medium: 'நடுத்தர',
      low: 'குறைந்த',
      study: 'படிப்பு',
      health: 'ஆரோக்கியம்',
      personal: 'தனிப்பட்ட',
      addTask: 'பணி சேர்க்கவும்',
      dailyGoal: 'தினசரி இலக்கு',
      weeklyProgress: 'வாராந்திர முன்னேற்றம்',
      mindfulMoment: 'ஒரு கவனமான தருணம் எடுத்துக்கொள்ளுங்கள்',
      breatheWith: 'BestuAI உடன் மூச்சுவிடுங்கள்'
    },
    te: {
      wellnessTracker: 'శ్రేయస్సు ట్రాకర్',
      dailyPlanning: 'దైనిక ప్రణాళిక',
      healthMetrics: 'ఆరోగ్య మెట్రిక్స్',
      todaysTasks: 'నేటి పనులు',
      wellnessNudges: 'శ్రేయస్సు రిమైండర్లు',
      hydrationReminder: 'నీళ్లు తాగే సమయం! 💧',
      breakReminder: 'మీరు 2 గంటలుగా చదువుతున్నారు. 15 నిమిషాల విరామం తీసుకోండి!',
      posthureReminder: 'చదువుతున్నప్పుడు మంచి భంగిమను కొనసాగించాలని గుర్తుంచుకోండి',
      completed: 'పూర్తయింది',
      pending: 'పెండింగ్',
      high: 'అధిక',
      medium: 'మధ్యమ',
      low: 'తక్కువ',
      study: 'అధ్యయనం',
      health: 'ఆరోగ్యం',
      personal: 'వ్యక్తిగత',
      addTask: 'పని జోడించండి',
      dailyGoal: 'దైనిక లక్ష్యం',
      weeklyProgress: 'వారపు పురోగతి',
      mindfulMoment: 'ఒక మైండ్‌ఫుల్ క్షణం తీసుకోండి',
      breatheWith: 'BestuAI తో శ్వాస తీసుకోండి'
    },
    gu: {
      wellnessTracker: 'આરોગ્ય ટ્રેકર',
      dailyPlanning: 'દૈનિક આયોજન',
      healthMetrics: 'આરોગ્ય મેટ્રિક્સ',
      todaysTasks: 'આજના કાર્યો',
      wellnessNudges: 'આરોગ્ય રિમાઇન્ડર',
      hydrationReminder: 'પાણી પીવાનો સમય! 💧',
      breakReminder: 'તમે 2 કલાકથી અભ્યાસ કરી રહ્યા છો. 15 મિનિટ વિરામ લો!',
      posthureReminder: 'અભ્યાસ કરતી વખતે સારી મુદ્રા જાળવવાનું યાદ રાખો',
      completed: 'પૂર્ણ',
      pending: 'બાકી',
      high: 'ઉચ્ચ',
      medium: 'મધ્યમ',
      low: 'નીચું',
      study: 'અભ્યાસ',
      health: 'આરોગ્ય',
      personal: 'વ્યક્તિગત',
      addTask: 'કાર્ય ઉમેરો',
      dailyGoal: 'દૈનિક લક્ષ્ય',
      weeklyProgress: 'સાપ્તાહિક પ્રગતિ',
      mindfulMoment: 'એક મનપૂર્વક ક્ષણ લો',
      breatheWith: 'BestuAI સાથે શ્વાસ લો'
    },
    kn: {
      wellnessTracker: 'ಯೋಗಕ್ಷೇಮ ಟ್ರ್ಯಾಕರ್',
      dailyPlanning: 'ದೈನಂದಿನ ಯೋಜನೆ',
      healthMetrics: 'ಆರೋಗ್ಯ ಮೆಟ್ರಿಕ್ಸ್',
      todaysTasks: 'ಇಂದಿನ ಕಾರ್ಯಗಳು',
      wellnessNudges: 'ಯೋಗಕ್ಷೇಮ ಜ್ಞಾಪನೆಗಳು',
      hydrationReminder: 'ನೀರು ಕುಡಿಯುವ ಸಮಯ! 💧',
      breakReminder: 'ನೀವು 2 ಗಂಟೆಗಳಿಂದ ಅಧ್ಯಯನ ಮಾಡುತ್ತಿದ್ದೀರಿ. 15 ನಿಮಿಷಗಳ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಿ!',
      posthureReminder: 'ಅಧ್ಯಯನ ಮಾಡುವಾಗ ಉತ್ತಮ ಭಂಗಿಯನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಲು ನೆನಪಿಸಿಕೊಳ್ಳಿ',
      completed: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
      pending: 'ಬಾಕಿ',
      high: 'ಹೆಚ್ಚು',
      medium: 'ಮಧ್ಯಮ',
      low: 'ಕಡಿಮೆ',
      study: 'ಅಧ್ಯಯನ',
      health: 'ಆರೋಗ್ಯ',
      personal: 'ವೈಯಕ್ತಿಕ',
      addTask: 'ಕಾರ್ಯ ಸೇರಿಸಿ',
      dailyGoal: 'ದೈನಂದಿನ ಗುರಿ',
      weeklyProgress: 'ಸಾಪ್ತಾಹಿಕ ಪ್ರಗತಿ',
      mindfulMoment: 'ಒಂದು ಯೋಚನಾಶೀಲ ಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳಿ',
      breatheWith: 'BestuAI ಜೊತೆ ಉಸಿರಾಡಿ'
    },
    ml: {
      wellnessTracker: 'ക്ഷേമ ട്രാക്കർ',
      dailyPlanning: 'ദൈനംദിന ആസൂത്രണം',
      healthMetrics: 'ആരോഗ്യ മെട്രിക്സ്',
      todaysTasks: 'ഇന്നത്തെ ജോലികൾ',
      wellnessNudges: 'ക്ഷേമ ഓർമ്മപ്പെടുത്തലുകൾ',
      hydrationReminder: 'വെള്ളം കുടിക്കാനുള്ള സമയം! 💧',
      breakReminder: 'നിങ്ങൾ 2 മണിക്കൂറായി പഠിക്കുന്നു. 15 മിനിറ്റ് ഇടവേള എടുക്കുക!',
      posthureReminder: 'പഠിക്കുമ്പോൾ നല്ല ഭാവം നിലനിർത്താൻ ഓർക്കുക',
      completed: 'പൂർത്തിയായി',
      pending: 'തീർപ്പുകൽപ്പിക്കാത്ത',
      high: 'ഉയർന്ന',
      medium: 'ഇടത്തരം',
      low: 'കുറഞ്ഞ',
      study: 'പഠനം',
      health: 'ആരോഗ്യം',
      personal: 'വ്യക്തിഗത',
      addTask: 'ജോലി ചേർക്കുക',
      dailyGoal: 'ദൈനംദിന ലക്ഷ്യം',
      weeklyProgress: 'പ്രാപ്തമായ പുരോഗതി',
      mindfulMoment: 'ഒരു മൈന്റഫുൾ നിമിഷം എടുക്കുക',
      breatheWith: 'BestuAI യുമായി ശ്വസിക്കുക'
    },
    pa: {
      wellnessTracker: 'ਸਿਹਤ ਟਰੈਕਰ',
      dailyPlanning: 'ਰੋਜ਼ਾਨਾ ਯੋਜਨਾਬੰਦੀ',
      healthMetrics: 'ਸਿਹਤ ਮੈਟ੍ਰਿਕਸ',
      todaysTasks: 'ਅੱਜ ਦੇ ਕੰਮ',
      wellnessNudges: 'ਸਿਹਤ ਯਾਦਦਹਾਨੀ',
      hydrationReminder: 'ਪਾਣੀ ਪੀਣ ਦਾ ਸਮਾਂ! 💧',
      breakReminder: 'ਤੁਸੀਂ 2 ਘੰਟੇ ਤੋਂ ਪੜ੍ਹਾਈ ਕਰ ਰਹੇ ਹੋ। 15 ਮਿੰਟ ਦਾ ਬ੍ਰੇਕ ਲਓ!',
      posthureReminder: 'ਪੜ੍ਹਾਈ ਕਰਦੇ ਸਮੇਂ ਚੰਗੀ ਮੁਦਰਾ ਬਣਾਈ ਰੱਖਣਾ ਯਾਦ ਰੱਖੋ',
      completed: 'ਪੂਰਾ',
      pending: 'ਬਾਕੀ',
      high: 'ਉੱਚਾ',
      medium: 'ਮੱਧਮ',
      low: 'ਘੱਟ',
      study: 'ਪੜ੍ਹਾਈ',
      health: 'ਸਿਹਤ',
      personal: 'ਨਿੱਜੀ',
      addTask: 'ਕੰਮ ਸ਼ਾਮਲ ਕਰੋ',
      dailyGoal: 'ਰੋਜ਼ਾਨਾ ਟੀਚਾ',
      weeklyProgress: 'ਹਫ਼ਤਾਵਾਰੀ ਤਰੱਕੀ',
      mindfulMoment: 'ਇੱਕ ਸੁਚੇਤ ਪਲ ਲਓ',
      breatheWith: 'BestuAI ਨਾਲ ਸਾਹ ਲਓ'
    },
    or: {
      wellnessTracker: 'ସୁସ୍ଥତା ଟ୍ରାକର',
      dailyPlanning: 'ଦୈନନ୍ଦିନ ଯୋଜନା',
      healthMetrics: 'ସ୍ୱାସ୍ଥ୍ୟ ମେଟ୍ରିକ୍ସ',
      todaysTasks: 'ଆଜିର କାର୍ଯ୍ୟ',
      wellnessNudges: 'ସୁସ୍ଥତା ସ୍ମାରକ',
      hydrationReminder: 'ପାଣି ପିଇବାର ସମୟ! 💧',
      breakReminder: 'ଆପଣ ୨ ଘଣ୍ଟା ଧରି ଅଧ୍ୟୟନ କରୁଛନ୍ତି। ୧୫ ମିନିଟ୍ ବିରାମ ନିଅନ୍ତୁ!',
      posthureReminder: 'ଅଧ୍ୟୟନ କରିବା ସମୟରେ ଭଲ ମୁଦ୍ରା ରଖିବାକୁ ମନେରଖନ୍ତୁ',
      completed: 'ସମ୍ପୂର୍ଣ୍ଣ',
      pending: 'ବିଚାରାଧୀନ',
      high: 'ଉଚ୍ଚ',
      medium: 'ମଧ୍ୟମ',
      low: 'କମ୍',
      study: 'ଅଧ୍ୟୟନ',
      health: 'ସ୍ୱାସ୍ଥ୍ୟ',
      personal: 'ବ୍ୟକ୍ତିଗତ',
      addTask: 'କାର୍ଯ୍ୟ ଯୋଗ କରନ୍ତୁ',
      dailyGoal: 'ଦୈନିକ ଲକ୍ଷ୍ୟ',
      weeklyProgress: 'ସାପ୍ତାହିକ ଅଗ୍ରଗତି',
      mindfulMoment: 'ଏକ ସଚେତନ ମୁହୂର୍ତ୍ତ ନିଅନ୍ତୁ',
      breatheWith: 'BestuAI ସହିତ ନିଶ୍ୱାସ ନିଅନ୍ତୁ'
    },
    as: {
      wellnessTracker: 'সুস্বাস্থ্য ট্ৰেকাৰ',
      dailyPlanning: 'দৈনন্দিন পৰিকল্পনা',
      healthMetrics: 'স্বাস্থ্য মেট্ৰিক্স',
      todaysTasks: 'আজিৰ কামবোৰ',
      wellnessNudges: 'সুস্বাস্থ্য স্মাৰক',
      hydrationReminder: 'পানী খোৱাৰ সময়! 💧',
      breakReminder: 'আপুনি ২ ঘণ্টা ধৰি অধ্যয়ন কৰি আছে। ১৫ মিনিট বিৰতি লওক!',
      posthureReminder: 'অধ্যয়ন কৰোঁতে ভাল ভঙ্গীমা ৰাখিবলৈ মনত ৰাখিব',
      completed: 'সম্পূৰ্ণ',
      pending: 'বিচাৰাধীন',
      high: 'উচ্চ',
      medium: 'মধ্যমীয়া',
      low: 'কম',
      study: 'অধ্যয়ন',
      health: 'স্বাস্থ্য',
      personal: 'ব্যক্তিগত',
      addTask: 'কাম যোগ কৰক',
      dailyGoal: 'দৈনন্দিন লক্ষ্য',
      weeklyProgress: 'সাপ্তাহিক অগ্ৰগতি',
      mindfulMoment: 'এটা সচেতন মুহূৰ্ত লওক',
      breatheWith: 'BestuAI ৰ সৈতে উশাহ লওক'
    },
    ur: {
      wellnessTracker: 'تندرستی ٹریکر',
      dailyPlanning: 'روزانہ منصوبہ بندی',
      healthMetrics: 'صحت کی پیمائش',
      todaysTasks: 'آج کے کام',
      wellnessNudges: 'تندرستی کی یاددہانی',
      hydrationReminder: 'پانی پینے کا وقت! 💧',
      breakReminder: 'آپ 2 گھنٹے سے پڑھ رہے ہیں۔ 15 منٹ کا وقفہ لیں!',
      posthureReminder: 'پڑھتے وقت اچھی کرنسی برقرار رکھنا یاد رکھیں',
      completed: 'مکمل',
      pending: 'زیر التواء',
      high: 'زیادہ',
      medium: 'درمیانی',
      low: 'کم',
      study: 'مطالعہ',
      health: 'صحت',
      personal: 'ذاتی',
      addTask: 'کام شامل کریں',
      dailyGoal: 'روزانہ ہدف',
      weeklyProgress: 'ہفتہ وار پیش قدمی',
      mindfulMoment: 'ایک با شعور لمحہ لیں',
      breatheWith: 'BestuAI کے ساتھ سانس لیں'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const updateMetric = (id: string, increment: number) => {
    setWellnessMetrics(prev => 
      prev.map(metric => 
        metric.id === id 
          ? { ...metric, current: Math.min(metric.current + increment, metric.target) }
          : metric
      )
    );
  };

  const toggleTask = (id: string) => {
    setDailyTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return <Coffee className="w-4 h-4" />;
      case 'health': return <Heart className="w-4 h-4" />;
      case 'personal': return <Clock className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const totalTasks = dailyTasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Wellness Nudges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div className="flex-1">
                <p className="text-sm">{t.hydrationReminder}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              <div className="flex-1">
                <p className="text-sm">{t.breakReminder}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-green-500" />
              <div className="flex-1">
                <p className="text-sm">{t.posthureReminder}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Metrics */}
        <div className="space-y-4">
          <h3>{t.healthMetrics}</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {wellnessMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={metric.color}>{metric.icon}</span>
                      <span className="text-sm">{metric.name}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateMetric(metric.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={(metric.current / metric.target) * 100} 
                      className="w-full" 
                    />
                    <p className="text-xs text-muted-foreground">
                      {metric.current}/{metric.target} {metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mindfulness Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                {t.mindfulMoment}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                {t.breatheWith}
              </Button>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Breathe in... Breathe out...
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Planning */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>{t.dailyPlanning}</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {t.addTask}
            </Button>
          </div>

          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">{t.dailyGoal}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={completionPercentage} className="w-full" />
                <p className="text-xs text-muted-foreground">
                  {completedTasks}/{totalTasks} tasks completed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Task List */}
          <div className="space-y-3">
            <h4>{t.todaysTasks}</h4>
            {dailyTasks.map((task) => (
              <Card key={task.id} className={task.completed ? 'opacity-60' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    
                    <div className="flex-1">
                      <p className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                        {task.task}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(task.category)}
                      <Badge 
                        variant="secondary" 
                        className={getPriorityColor(task.priority)}
                      >
                        {t[task.priority as keyof typeof t]}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Current Time Display */}
      <Card className="text-center">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <p className="text-lg">
              {currentTime.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit'
              })}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}