import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  Volume2, 
  Palette,
  User,
  Settings,
  Heart,
  Download,
  Trash2
} from 'lucide-react';

interface SettingsPanelProps {
  language: string;
  onLanguageChange: (language: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function SettingsPanel({ 
  language, 
  onLanguageChange, 
  isDarkMode, 
  onThemeToggle 
}: SettingsPanelProps) {
  const texts = {
    en: {
      settings: 'Settings',
      appearance: 'Appearance',
      language: 'Language',
      privacy: 'Privacy & Security',
      notifications: 'Notifications',
      account: 'Account',
      about: 'About BestuAI',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      dataEncryption: 'Data Encryption',
      localStorage: 'Local Storage Only',
      voiceNotifications: 'Voice Notifications',
      studyReminders: 'Study Reminders',
      wellnessNudges: 'Wellness Nudges',
      exportData: 'Export Data',
      clearData: 'Clear All Data',
      version: 'Version',
      support: 'Support',
      feedback: 'Send Feedback',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      description: 'Your AI companion for emotional support, study assistance, and wellness tracking.',
      features: 'Core Features',
      moodDetection: 'Mood Detection & Emotional Support',
      studySupport: 'Personalized Study Support',
      privacyFirst: 'Privacy-First Design',
      multiLanguage: 'Multi-Language Support',
      enabled: 'Enabled',
      disabled: 'Disabled'
    },
    hi: {
      settings: 'सेटिंग्स',
      appearance: 'दिखावट',
      language: 'भाषा',
      privacy: 'गोपनीयता और सुरक्षा',
      notifications: 'सूचनाएं',
      account: 'खाता',
      about: 'BestuAI के बारे में',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      dataEncryption: 'डेटा एन्क्रिप्शन',
      localStorage: 'केवल स्थानीय भंडारण',
      voiceNotifications: 'आवाज़ सूचनाएं',
      studyReminders: 'अध्ययन रिमाइंडर',
      wellnessNudges: 'कल्याण रिमाइंडर',
      exportData: 'डेटा निर्यात करें',
      clearData: 'सभी डेटा साफ़ करें',
      version: 'संस्करण',
      support: 'सहायता',
      feedback: 'प्रतिक्रिया भेजें',
      privacyPolicy: 'गोपनीयता नीति',
      terms: 'सेवा की शर्तें',
      description: 'भावनात्मक समर्थन, अध्ययन सहायता और कल्याण ट्रैकिंग के लिए आपका AI साथी।',
      features: 'मुख्य विशेषताएं',
      moodDetection: 'मूड डिटेक्शन और भावनात्मक समर्थन',
      studySupport: 'व्यक्तिगत अध्ययन सहायता',
      privacyFirst: 'गोपनीयता-प्रथम डिज़ाइन',
      multiLanguage: 'बहु-भाषा समर्थन',
      enabled: 'सक्षम',
      disabled: 'अक्षम'
    },
    mr: {
      settings: 'सेटिंग्ज',
      appearance: 'दिसणे',
      language: 'भाषा',
      privacy: 'गोपनीयता आणि सुरक्षा',
      notifications: 'सूचना',
      account: 'खाते',
      about: 'BestuAI बद्दल',
      darkMode: 'डार्क मोड',
      lightMode: 'लाइट मोड',
      dataEncryption: 'डेटा एन्क्रिप्शन',
      localStorage: 'फक्त स्थानिक भांडार',
      voiceNotifications: 'आवाज सूचना',
      studyReminders: 'अभ्यास स्मरणपत्रे',
      wellnessNudges: 'कल्याण स्मरणपत्रे',
      exportData: 'डेटा निर्यात करा',
      clearData: 'सर्व डेटा साफ करा',
      version: 'आवृत्ती',
      support: 'समर्थन',
      feedback: 'अभिप्राय पाठवा',
      privacyPolicy: 'गोपनीयता धोरण',
      terms: 'सेवा अटी',
      description: 'भावनिक समर्थन, अभ्यास सहाय्य आणि कल्याण ट्रॅकिंगसाठी तुमचा AI साथी.',
      features: 'मुख्य वैशिष्ट्ये',
      moodDetection: 'मूड डिटेक्शन आणि भावनिक समर्थन',
      studySupport: 'वैयक्तिकृत अभ्यास सहाय्य',
      privacyFirst: 'गोपनीयता-प्रथम डिझाइन',
      multiLanguage: 'बहु-भाषा समर्थन',
      enabled: 'सक्षम',
      disabled: 'अक्षम'
    },
    bn: {
      settings: 'সেটিংস',
      appearance: 'চেহারা',
      language: 'ভাষা',
      privacy: 'গোপনীয়তা ও নিরাপত্তা',
      notifications: 'বিজ্ঞপ্তি',
      account: 'অ্যাকাউন্ট',
      about: 'BestuAI সম্পর্কে',
      darkMode: 'ডার্ক মোড',
      lightMode: 'লাইট মোড',
      dataEncryption: 'ডেটা এনক্রিপশন',
      localStorage: 'শুধুমাত্র স্থানীয় সংরক্ষণ',
      voiceNotifications: 'ভয়েস বিজ্ঞপ্তি',
      studyReminders: 'অধ্যয়ন স্মারক',
      wellnessNudges: 'সুস্থতা স্মারক',
      exportData: 'ডেটা রপ্তানি',
      clearData: 'সব ডেটা পরিষ্কার',
      version: 'সংস্করণ',
      support: 'সহায়তা',
      feedback: 'মতামত পাঠান',
      privacyPolicy: 'গোপনীয়তা নীতি',
      terms: 'সেবার শর্তাবলী',
      description: 'আবেগীয় সহায়তা, অধ্যয়ন সহায়তা এবং সুস্থতা ট্র্যাকিংয়ের জন্য আপনার AI সঙ্গী।',
      features: 'মূল বৈশিষ্ট্য',
      moodDetection: 'মেজাজ সনাক্তকরণ ও আবেগের সহায়তা',
      studySupport: 'ব্যক্তিগত অধ্যয়ন সহায়তা',
      privacyFirst: 'গোপনীয়তা-প্রথম ডিজাইন',
      multiLanguage: 'বহু-ভাষা সমর্থন',
      enabled: 'সক্রিয়',
      disabled: 'নিষ্ক্রিয়'
    },
    ta: {
      settings: 'அமைப்புகள்',
      appearance: 'தோற்றம்',
      language: 'மொழி',
      privacy: 'தனியுரிமை மற்றும் பாதுகாப்பு',
      notifications: 'அறிவிப்புகள்',
      account: 'கணக்கு',
      about: 'BestuAI பற்றி',
      darkMode: 'இருண்ட பயன்முறை',
      lightMode: 'ஒளி பயன்முறை',
      dataEncryption: 'தரவு குறியாக்கம்',
      localStorage: 'உள்ளூர் சேமிப்பு மட்டும்',
      voiceNotifications: 'குரல் அறிவிப்புகள்',
      studyReminders: 'படிப்பு நினைவூட்டல்கள்',
      wellnessNudges: 'நல்வாழ்வு நினைவூட்டல்கள்',
      exportData: 'தரவு ஏற்றுமதி',
      clearData: 'அனைத்து தரவும் அழிக்க',
      version: 'பதிப்பு',
      support: 'ஆதரவு',
      feedback: 'கருத்து அனுப்பு',
      privacyPolicy: 'தனியுரிமை கொள்கை',
      terms: 'சேவை விதிமுறைகள்',
      description: 'உணர்ச்சிப் ஆதரவு, படிப்பு உதவி மற்றும் நல்வாழ்வு கண்காணிப்புக்கான உங்கள் AI துணை.',
      features: 'முக்கிய அம்சங்கள்',
      moodDetection: 'மனநிலை கண்டறிதல் & உணர்ச்சி ஆதரவு',
      studySupport: 'தனிப்பட்ட படிப்பு ஆதரவு',
      privacyFirst: 'தனியுரிமை-முதல் வடிவமைப்பு',
      multiLanguage: 'பல மொழி ஆதரவு',
      enabled: 'செயல்படுத்தப்பட்டது',
      disabled: 'முடக்கப்பட்டது'
    }
  };

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'as', name: 'অসমীয়া (Assamese)' },
    { code: 'ur', name: 'اردو (Urdu)' },
    { code: 'sa', name: 'संस्कृत (Sanskrit)' },
    { code: 'ne', name: 'नेपाली (Nepali)' },
    { code: 'ks', name: 'कॉशुर (Kashmiri)' },
    { code: 'sd', name: 'سنڌي (Sindhi)' },
    { code: 'doi', name: 'डोगरी (Dogri)' },
    { code: 'kok', name: 'कोंकणी (Konkani)' },
    { code: 'mai', name: 'मैथिली (Maithili)' },
    { code: 'mni', name: 'মৈতৈলোন্ (Manipuri)' },
    { code: 'brx', name: 'बर\' (Bodo)' }
  ];

  const t = texts[language as keyof typeof texts] || texts.en;

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            {t.appearance}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <p>{isDarkMode ? t.darkMode : t.lightMode}</p>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={onThemeToggle} />
          </div>
        </CardContent>
      </Card>

      {/* Language */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t.language}
          </CardTitle>
          <CardDescription>
            Choose your preferred language from all Indian languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {languageOptions.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            {t.privacy}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>{t.dataEncryption}</p>
              <p className="text-sm text-muted-foreground">
                All conversations are encrypted locally
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {t.enabled}
            </Badge>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p>{t.localStorage}</p>
              <p className="text-sm text-muted-foreground">
                Data never leaves your device
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {t.enabled}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            {t.notifications}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>{t.studyReminders}</p>
              <p className="text-sm text-muted-foreground">
                Get reminders for your study sessions
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>{t.wellnessNudges}</p>
              <p className="text-sm text-muted-foreground">
                Reminders for hydration, breaks, and posture
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>{t.voiceNotifications}</p>
              <p className="text-sm text-muted-foreground">
                Enable voice responses from BestuAI
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            {t.account}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Download className="w-4 h-4 mr-2" />
            {t.exportData}
          </Button>
          
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            {t.clearData}
          </Button>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            {t.about}
          </CardTitle>
          <CardDescription>
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4>{t.features}</h4>
            <ul className="text-sm text-muted-foreground space-y-1 mt-2">
              <li>• {t.moodDetection}</li>
              <li>• {t.studySupport}</li>
              <li>• {t.privacyFirst}</li>
              <li>• {t.multiLanguage}</li>
            </ul>
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center text-sm">
            <span>{t.version}</span>
            <Badge variant="outline">1.0.0</Badge>
          </div>
          
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              {t.feedback}
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="flex-1">
                {t.privacyPolicy}
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                {t.terms}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}