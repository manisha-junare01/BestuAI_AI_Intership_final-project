import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  CheckCircle, 
  Plus,
  FileText,
  Lightbulb,
  Calendar
} from 'lucide-react';

interface StudySupportProps {
  language: string;
}

interface StudyGoal {
  id: string;
  title: string;
  progress: number;
  target: number;
  subject: string;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  summary: string;
}

export function StudySupport({ language }: StudySupportProps) {
  const [studyGoals, setStudyGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Mathematics - Algebra',
      progress: 75,
      target: 100,
      subject: 'Math'
    },
    {
      id: '2',
      title: 'Science - Physics',
      progress: 45,
      target: 100,
      subject: 'Science'
    }
  ]);

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: '1',
      question: 'What is the quadratic formula?',
      answer: 'x = (-b ± √(b²-4ac)) / 2a',
      subject: 'Math',
      difficulty: 'medium'
    },
    {
      id: '2',
      question: 'Define Newton\'s First Law of Motion',
      answer: 'An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force.',
      subject: 'Physics',
      difficulty: 'easy'
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Photosynthesis Overview',
      content: 'Photosynthesis is the process by which plants convert light energy into chemical energy...',
      subject: 'Biology',
      summary: 'Plants use sunlight, water, and CO2 to produce glucose and oxygen through chlorophyll.'
    }
  ]);

  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', subject: '' });

  const texts = {
    en: {
      studyGoals: 'Study Goals',
      flashcards: 'Flashcards',
      notes: 'Notes & Summaries',
      reminders: 'Study Reminders',
      progress: 'Progress',
      addGoal: 'Add Goal',
      nextCard: 'Next Card',
      showAnswer: 'Show Answer',
      hideAnswer: 'Hide Answer',
      addNote: 'Add Note',
      title: 'Title',
      content: 'Content',
      subject: 'Subject',
      summary: 'AI Summary',
      dailyGoal: 'Daily Study Goal',
      weeklyProgress: 'This Week\'s Progress',
      generateQuiz: 'Generate Quiz',
      studyTips: 'Personalized Study Tips',
      createSummary: 'Create Summary'
    },
    hi: {
      studyGoals: 'अध्ययन लक्ष्य',
      flashcards: 'फ्लैशकार्ड',
      notes: 'नोट्स और सारांश',
      reminders: 'अध्ययन रिमाइंडर',
      progress: 'प्रगति',
      addGoal: 'लक्ष्य जोड़ें',
      nextCard: 'अगला कार्ड',
      showAnswer: 'उत्तर दिखाएं',
      hideAnswer: 'उत्तर छुपाएं',
      addNote: 'नोट जोड़ें',
      title: 'शीर्षक',
      content: 'सामग्री',
      subject: 'विषय',
      summary: 'AI सारांश',
      dailyGoal: 'दैनिक अध्ययन लक्ष्य',
      weeklyProgress: 'इस सप्ताह की प्रगति',
      generateQuiz: 'क्विज़ बनाएं',
      studyTips: 'व्यक्तिगत अध्ययन सुझाव',
      createSummary: 'सारांश बनाएं'
    },
    mr: {
      studyGoals: 'अभ्यास उद्दिष्टे',
      flashcards: 'फ्लॅशकार्ड',
      notes: 'नोट्स आणि सारांश',
      reminders: 'अभ्यास स्मरणपत्रे',
      progress: 'प्रगती',
      addGoal: 'उद्दिष्ट जोडा',
      nextCard: 'पुढील कार्ड',
      showAnswer: 'उत्तर दाखवा',
      hideAnswer: 'उत्तर लपवा',
      addNote: 'नोट जोडा',
      title: 'शीर्षक',
      content: 'सामग्री',
      subject: 'विषय',
      summary: 'AI सारांश',
      dailyGoal: 'दैनंदिन अभ्यास उद्दिष्ट',
      weeklyProgress: 'या आठवड्याची प्रगती',
      generateQuiz: 'क्विझ तयार करा',
      studyTips: 'वैयक्तिक अभ्यास सूचना',
      createSummary: 'सारांश तयार करा'
    },
    bn: {
      studyGoals: 'অধ্যয়ন লক্ষ্য',
      flashcards: 'ফ্ল্যাশকার্ড',
      notes: 'নোট ও সারসংক্ষেপ',
      reminders: 'অধ্যয়ন স্মারক',
      progress: 'অগ্রগতি',
      addGoal: 'লক্ষ্য যোগ করুন',
      nextCard: 'পরবর্তী কার্ড',
      showAnswer: 'উত্তর দেখান',
      hideAnswer: 'উত্তর লুকান',
      addNote: 'নোট যোগ করুন',
      title: 'শিরোনাম',
      content: 'বিষয়বস্তু',
      subject: 'বিষয়',
      summary: 'AI সারসংক্ষেপ',
      dailyGoal: 'দৈনিক অধ্যয়ন লক্ষ্য',
      weeklyProgress: 'এই সপ্তাহের অগ্রগতি',
      generateQuiz: 'কুইজ তৈরি করুন',
      studyTips: 'ব্যক্তিগত অধ্যয়ন টিপস',
      createSummary: 'সারসংক্ষেপ তৈরি করুন'
    },
    ta: {
      studyGoals: 'படிப்பு இலக்குகள்',
      flashcards: 'ஃப்ளாஷ் கார்டுகள்',
      notes: 'குறிப்புகள் & சுருக்கங்கள்',
      reminders: 'படிப்பு நினைவூட்டல்கள்',
      progress: 'முன்னேற்றம்',
      addGoal: 'இலக்கு சேர்க்கவும்',
      nextCard: 'அடுத்த கார்டு',
      showAnswer: 'பதில் காட்டு',
      hideAnswer: 'பதில் மறைக்க',
      addNote: 'குறிப்பு சேர்க்கவும்',
      title: 'தலைப்பு',
      content: 'உள்ளடக்கம்',
      subject: 'பாடம்',
      summary: 'AI சுருக்கம்',
      dailyGoal: 'தினசரி படிப்பு இலக்கு',
      weeklyProgress: 'இந்த வாரத்தின் முன்னேற்றம்',
      generateQuiz: 'வினாடி வினா உருவாக்கு',
      studyTips: 'தனிப்பட்ட படிப்பு குறிப்புகள்',
      createSummary: 'சுருக்கம் உருவாக்கு'
    },
    te: {
      studyGoals: 'అధ్యయన లక్ష్యాలు',
      flashcards: 'ఫ్లాష్‌కార్డులు',
      notes: 'గమనికలు & సారాంశాలు',
      reminders: 'అధ్యయన రిమైండర్లు',
      progress: '���ురోగతి',
      addGoal: 'లక్ష్యం జోడించండి',
      nextCard: 'తదుపరి కార్డు',
      showAnswer: 'సమాధానం చూపించు',
      hideAnswer: 'సమాధానం దాచు',
      addNote: 'గమనిక జోడించండి',
      title: 'శీర్షిక',
      content: 'కంటెంట్',
      subject: 'విషయం',
      summary: 'AI సారాంశం',
      dailyGoal: 'దైనిక అధ్యయన లక్ష్యం',
      weeklyProgress: 'ఈ వారపు పురోగతి',
      generateQuiz: 'క్విజ్ రూపొందించండి',
      studyTips: 'వ్యక్తిగత అధ్యయన చిట్కాలు',
      createSummary: 'సారాంశం రూపొందించండి'
    },
    gu: {
      studyGoals: 'અભ્યાસ લક્ષ્યો',
      flashcards: 'ફ્લેશકાર્ડ',
      notes: 'નોંધો અને સારાંશ',
      reminders: 'અભ્યાસ રિમાઇન્ડર',
      progress: 'પ્રગતિ',
      addGoal: 'લક્ષ્ય ઉમેરો',
      nextCard: 'આગલું કાર્ડ',
      showAnswer: 'જવાબ બતાવો',
      hideAnswer: 'જવાબ છુપાવો',
      addNote: 'નોંધ ઉમેરો',
      title: 'શીર્ષક',
      content: 'સામગ્રી',
      subject: 'વિષય',
      summary: 'AI સારાંશ',
      dailyGoal: 'દૈનિક અભ્યાસ લક્ષ્ય',
      weeklyProgress: 'આ અઠવાડિયાની પ્રગતિ',
      generateQuiz: 'ક્વિઝ બનાવો',
      studyTips: 'વ્યક્તિગત અભ્યાસ ટિપ્સ',
      createSummary: 'સારાંશ બનાવો'
    },
    kn: {
      studyGoals: 'ಅಧ್ಯಯನ ಗುರಿಗಳು',
      flashcards: 'ಫ್ಲಾಶ್‌ಕಾರ್ಡ್‌ಗಳು',
      notes: 'ಟಿಪ್ಪಣಿಗಳು ಮತ್ತು ಸಾರಾಂಶಗಳು',
      reminders: 'ಅಧ್ಯಯನ ಜ್ಞಾಪನೆಗಳು',
      progress: 'ಪ್ರಗತಿ',
      addGoal: 'ಗುರಿ ಸೇರಿಸಿ',
      nextCard: 'ಮುಂದಿನ ಕಾರ್ಡ್',
      showAnswer: 'ಉತ್ತರ ತೋರಿಸಿ',
      hideAnswer: 'ಉತ್ತರ ಮರೆಮಾಡಿ',
      addNote: 'ಟಿಪ್ಪಣಿ ಸೇರಿಸಿ',
      title: 'ಶೀರ್ಷಿಕೆ',
      content: 'ವಿಷಯ',
      subject: 'ವಿಷಯ',
      summary: 'AI ಸಾರಾಂಶ',
      dailyGoal: 'ದೈನಂದಿನ ಅಧ್ಯಯನ ಗುರಿ',
      weeklyProgress: 'ಈ ವಾರದ ಪ್ರಗತಿ',
      generateQuiz: 'ಕ್ವಿಜ್ ರಚಿಸಿ',
      studyTips: 'ವೈಯಕ್ತಿಕ ಅಧ್ಯಯನ ಸಲಹೆಗಳು',
      createSummary: 'ಸಾರಾಂಶ ರಚಿಸಿ'
    },
    ml: {
      studyGoals: 'പഠന ലക്ഷ്യങ്ങൾ',
      flashcards: 'ഫ്ലാഷ്കാർഡുകൾ',
      notes: 'കുറിപ്പുകൾ & സാരാംശങ്ങൾ',
      reminders: 'പഠന ഓർമ്മപ്പെടുത്തലുകൾ',
      progress: 'പുരോഗതി',
      addGoal: 'ലക്ഷ്യം ചേർക്കുക',
      nextCard: 'അടുത്ത കാർഡ്',
      showAnswer: 'ഉത്തരം കാണിക്കുക',
      hideAnswer: 'ഉത്തരം മറയ്ക്കുക',
      addNote: 'കുറിപ്പ് ചേർക്കുക',
      title: 'തലക്കെട്ട്',
      content: 'ഉള്ളടക്കം',
      subject: 'വിഷയം',
      summary: 'AI സാരാംശം',
      dailyGoal: 'ദൈനംദിന പഠന ലക്ഷ്യം',
      weeklyProgress: 'ഈ ആഴ്ചയുടെ പുരോഗതി',
      generateQuiz: 'ക്വിസ് സൃഷ്ടിക്കുക',
      studyTips: 'വ്യക്തിഗത പഠന നുറുങ്ങുകൾ',
      createSummary: 'സാരാംശം സൃഷ്ടിക്കുക'
    },
    pa: {
      studyGoals: 'ਪੜ੍ਹਾਈ ਦੇ ਟੀਚੇ',
      flashcards: 'ਫਲੈਸ਼ਕਾਰਡ',
      notes: 'ਨੋਟਸ ਅਤੇ ਸਾਰ',
      reminders: 'ਪੜ੍ਹਾਈ ਯਾਦਦਹਾਨੀ',
      progress: 'ਤਰੱਕੀ',
      addGoal: 'ਟੀਚਾ ਸ਼ਾਮਲ ਕਰੋ',
      nextCard: 'ਅਗਲਾ ਕਾਰਡ',
      showAnswer: 'ਜਵਾਬ ਦਿਖਾਓ',
      hideAnswer: 'ਜਵਾਬ ਲੁਕਾਓ',
      addNote: 'ਨੋਟ ਸ਼ਾਮਲ ਕਰੋ',
      title: 'ਸਿਰਲੇਖ',
      content: 'ਸਮੱਗਰੀ',
      subject: 'ਵਿਸ਼ਾ',
      summary: 'AI ਸਾਰ',
      dailyGoal: 'ਰੋਜ਼ਾਨਾ ਪੜ੍ਹਾਈ ਦਾ ਟੀਚਾ',
      weeklyProgress: 'ਇਸ ਹਫ਼ਤੇ ਦੀ ਤਰੱਕੀ',
      generateQuiz: 'ਕਵਿਜ਼ ਬਣਾਓ',
      studyTips: 'ਨਿੱਜੀ ਪੜ੍ਹਾਈ ਦੇ ਸੁਝਾਅ',
      createSummary: 'ਸਾਰ ਬਣਾਓ'
    },
    or: {
      studyGoals: 'ଅଧ୍ୟୟନ ଲକ୍ଷ୍ୟ',
      flashcards: 'ଫ୍ଲାସକାର୍ଡ',
      notes: 'ନୋଟ୍ସ ଓ ସାରାଂଶ',
      reminders: 'ଅଧ୍ୟୟନ ସ୍ମାରକ',
      progress: 'ଅଗ୍ରଗତି',
      addGoal: 'ଲକ୍ଷ୍ୟ ଯୋଗ କରନ୍ତୁ',
      nextCard: 'ପରବର୍ତ୍ତୀ କାର୍ଡ',
      showAnswer: 'ଉତ୍ତର ଦେଖାନ୍ତୁ',
      hideAnswer: 'ଉତ୍ତର ଲୁଚାନ୍ତୁ',
      addNote: 'ନୋଟ୍ ଯୋଗ କରନ୍ତୁ',
      title: 'ଶୀର୍ଷକ',
      content: 'ବିଷୟବସ୍ତୁ',
      subject: 'ବିଷୟ',
      summary: 'AI ସାରାଂଶ',
      dailyGoal: 'ଦୈନିକ ଅଧ୍ୟୟନ ଲକ୍ଷ୍ୟ',
      weeklyProgress: 'ଏହି ସପ୍ତାହର ଅଗ୍ରଗତି',
      generateQuiz: 'କୁଇଜ୍ ସୃଷ୍ଟି କରନ୍ତୁ',
      studyTips: 'ବ୍ୟକ୍ତିଗତ ଅଧ୍ୟୟନ ପରାମର୍ଶ',
      createSummary: 'ସାରାଂଶ ସୃଷ୍ଟି କରନ୍ତୁ'
    },
    as: {
      studyGoals: 'অধ্যয়নৰ লক্ষ্য',
      flashcards: 'ফ্লাশ্বকাৰ্ড',
      notes: 'টোকা আৰু সাৰাংশ',
      reminders: 'অধ্যয়নৰ স্মাৰক',
      progress: 'অগ্ৰগতি',
      addGoal: 'লক্ষ্য যোগ কৰক',
      nextCard: 'পৰৱৰ্তী কাৰ্ড',
      showAnswer: 'উত্তৰ দেখুৱাওক',
      hideAnswer: 'উত্তৰ লুকুৱাওক',
      addNote: 'টোকা যোগ কৰক',
      title: 'শিৰোনাম',
      content: 'বিষয়বস্তু',
      subject: 'বিষয়',
      summary: 'AI সাৰাংশ',
      dailyGoal: 'দৈনন্দিন অধ্যয়নৰ লক্ষ্য',
      weeklyProgress: 'এই সপ্তাহৰ অগ্ৰগতি',
      generateQuiz: 'কুইজ তৈয়াৰ কৰক',
      studyTips: 'ব্যক্তিগত অধ্যয়নৰ পৰামৰ্শ',
      createSummary: 'সাৰাংশ তৈয়াৰ কৰক'
    },
    ur: {
      studyGoals: 'مطالعے کے اہداف',
      flashcards: 'فلیش کارڈز',
      notes: 'نوٹس اور خلاصے',
      reminders: 'مطالعے کی یاددہانی',
      progress: 'پیش قدمی',
      addGoal: 'ہدف شامل کریں',
      nextCard: 'اگلا کارڈ',
      showAnswer: 'جواب دکھائیں',
      hideAnswer: 'جواب چھپائیں',
      addNote: 'نوٹ شامل کریں',
      title: 'عنوان',
      content: 'مواد',
      subject: 'موضوع',
      summary: 'AI خلاصہ',
      dailyGoal: 'روزانہ مطالعے کا ہدف',
      weeklyProgress: 'اس ہفتے کی پیش قدمی',
      generateQuiz: 'کوئز بنائیں',
      studyTips: 'ذاتی مطالعے کے نکات',
      createSummary: 'خلاصہ بنائیں'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.en;

  const nextFlashcard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const addNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        ...newNote,
        summary: `AI-generated summary: ${newNote.content.substring(0, 100)}...`
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', subject: '' });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.dailyGoal}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={65} className="w-full" />
              <p className="text-xs text-muted-foreground">65% completed</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">{t.weeklyProgress}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={80} className="w-full" />
              <p className="text-xs text-muted-foreground">4/5 days this week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Study Streak</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl">7</p>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">{t.studyGoals}</TabsTrigger>
          <TabsTrigger value="flashcards">{t.flashcards}</TabsTrigger>
          <TabsTrigger value="notes">{t.notes}</TabsTrigger>
          <TabsTrigger value="reminders">{t.reminders}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>{t.studyGoals}</h3>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              {t.addGoal}
            </Button>
          </div>
          
          <div className="grid gap-4">
            {studyGoals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4>{goal.title}</h4>
                    <Badge variant="secondary">{goal.subject}</Badge>
                  </div>
                  <Progress value={(goal.progress / goal.target) * 100} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {goal.progress}/{goal.target} completed
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="flashcards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3>{t.flashcards}</h3>
            <Button variant="outline" size="sm">
              {t.generateQuiz}
            </Button>
          </div>
          
          {flashcards.length > 0 && (
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">
                    Card {currentCard + 1} of {flashcards.length}
                  </CardTitle>
                  <Badge variant={
                    flashcards[currentCard].difficulty === 'easy' ? 'secondary' :
                    flashcards[currentCard].difficulty === 'medium' ? 'default' : 'destructive'
                  }>
                    {flashcards[currentCard].difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="min-h-[100px] p-4 bg-muted rounded-lg">
                  <p>{flashcards[currentCard].question}</p>
                </div>
                
                {showAnswer && (
                  <div className="min-h-[100px] p-4 bg-primary/10 rounded-lg">
                    <p>{flashcards[currentCard].answer}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="flex-1"
                  >
                    {showAnswer ? t.hideAnswer : t.showAnswer}
                  </Button>
                  <Button onClick={nextFlashcard} className="flex-1">
                    {t.nextCard}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="notes" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3>{t.notes}</h3>
              {notes.map((note) => (
                <Card key={note.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      {note.title}
                    </CardTitle>
                    <Badge variant="outline">{note.subject}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm"><strong>{t.summary}:</strong> {note.summary}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-4">
              <h3>{t.addNote}</h3>
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Input
                    placeholder={t.title}
                    value={newNote.title}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  />
                  <Input
                    placeholder={t.subject}
                    value={newNote.subject}
                    onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                  />
                  <Textarea
                    placeholder={t.content}
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    rows={6}
                  />
                  <Button onClick={addNote} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.addNote}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reminders" className="space-y-4">
          <h3>{t.reminders}</h3>
          <div className="grid gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <h4>Mathematics Study Session</h4>
                    <p className="text-sm text-muted-foreground">Today at 3:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <div>
                    <h4>{t.studyTips}</h4>
                    <p className="text-sm text-muted-foreground">
                      {language === 'hi' ? 'छोटे-छोटे ब्रेक लेना याददाश्त बेहतर बनाता है' 
                       : language === 'mr' ? 'लहान विश्रांती घेणे स्मृती सुधारते'
                       : 'Taking short breaks helps improve memory retention'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}