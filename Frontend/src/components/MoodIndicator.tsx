import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Smile, Frown, Zap, Meh } from 'lucide-react';

interface MoodIndicatorProps {
  currentMood: string;
  language: string;
}

export function MoodIndicator({ currentMood, language }: MoodIndicatorProps) {
  const moodData = {
    happy: {
      icon: <Smile className="w-6 h-6" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 border-yellow-200',
      en: { name: 'Happy', description: 'Feeling joyful and positive!' },
      hi: { name: 'खुश', description: 'खुशी और सकारात्मक महसूस कर रहे हैं!' },
      mr: { name: 'आनंदी', description: 'आनंदी आणि सकारात्मक वाटत आहे!' },
      bn: { name: 'খুশি', description: 'আনন্দিত এবং ইতিবাচক বোধ করছেন!' },
      ta: { name: 'மகிழ்ச்சி', description: 'மகிழ்ச்சியாகவும் நேர்மறையாகவும் உணர்கிறீர்கள்!' },
      te: { name: 'సంతోషం', description: 'ఆనందంగా మరియు సానుకూలంగా అనిపిస్తోంది!' },
      gu: { name: 'ખુશ', description: 'આનંદિત અને સકારાત્મક લાગે છે!' },
      kn: { name: 'ಸಂತೋಷ', description: 'ಸಂತೋಷ ಮತ್ತು ಧನಾತ್ಮಕ ಭಾವನೆ!' },
      ml: { name: 'സന്തോഷം', description: 'സന്തോഷവും പോസിറ്റിവും ആയി തോന്നുന്നു!' },
      pa: { name: 'ਖੁਸ਼', description: 'ਖੁਸ਼ ਅਤੇ ਸਕਾਰਾਤਮਕ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ!' },
      or: { name: 'ଖୁସି', description: 'ଆନନ୍ଦିତ ଏବଂ ସକାରାତ୍ମକ ଲାଗୁଛି!' },
      as: { name: 'আনন্দিত', description: 'আনন্দিত আৰু ইতিবাচক অনুভৱ কৰিছে!' },
      ur: { name: 'خوش', description: 'خوش اور مثبت محسوس کر رہے ہیں!' }
    },
    sad: {
      icon: <Frown className="w-6 h-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200',
      en: { name: 'Sad', description: 'It\'s okay to feel down sometimes' },
      hi: { name: 'उदास', description: 'कभी-कभी उदास होना ठीक है' },
      mr: { name: 'दुःखी', description: 'कधी कधी दुःखी होणे सामान्य आहे' },
      bn: { name: 'দুঃখিত', description: 'কখনো কখনো মন খারাপ হওয়া স্বাভাবিক' },
      ta: { name: 'சோகம்', description: 'சில நேரங்களில் மனமுடைவு ஏற்படுவது சரியே' },
      te: { name: 'దుఃఖం', description: 'కొన్ని సార్లు దుఃఖం అనుభవించడం సరియే' },
      gu: { name: 'ઉદાસ', description: 'કેટલીકવાર ઉદાસ થવું સામાન્ય છે' },
      kn: { name: 'ದುಃಖ', description: 'ಕೆಲವೊಮ್ಮೆ ದುಃಖವಾಗುವುದು ಸಾಮಾನ್ಯ' },
      ml: { name: 'സങ്കടം', description: 'ചിലപ്പോൾ സങ്കടപ്പെടുന്നത് സാധാരണമാണ്' },
      pa: { name: 'ਉਦਾਸ', description: 'ਕਈ ਵਾਰ ਉਦਾਸ ਹੋਣਾ ਸਧਾਰਨ ਗੱਲ ਹੈ' },
      or: { name: 'ଦୁଃଖିତ', description: 'କେତେବେଳେ ଦୁଃଖ ଲାଗିବା ସାଧାରଣ କଥା' },
      as: { name: 'দুখী', description: 'কেতিয়াবা দুখ পোৱাটো স্বাভাৱিক' },
      ur: { name: 'اداس', description: 'کبھی کبھی اداس ہونا عام بات ہے' }
    },
    stressed: {
      icon: <Zap className="w-6 h-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50 border-red-200',
      en: { name: 'Stressed', description: 'Take a deep breath, you\'ve got this' },
      hi: { name: 'तनावग्रस्त', description: 'गहरी सांस लें, आप यह कर सकते हैं' },
      mr: { name: 'तणावग्रस्त', description: 'दीर्घ श्वास घ्या, तुम्ही हे करू शकता' },
      bn: { name: 'চাপে', description: 'গভীর নিঃশ্বাস নিন, আপনি পারবেন' },
      ta: { name: 'மன அழுத்தம்', description: 'ஆழமாக மூச்சுவிடுங்கள், உங்களால் முடியும்' },
      te: { name: 'ఒత్తిడి', description: 'లోతుగా ఊపిరి తీసుకోండి, మీరు చేయగలరు' },
      gu: { name: 'તણાવ', description: 'ઊંડા શ્વાસ લો, તમે કરી શકો છો' },
      kn: { name: 'ಒತ್ತಡ', description: 'ಆಳವಾಗಿ ಉಸಿರಾಡಿ, ನೀವು ಮಾಡಬಲ್ಲಿರಿ' },
      ml: { name: 'സമ്മർദ്ദം', description: 'ആഴത്തിൽ ശ്വസിക്കൂ, നിങ്ങൾക്ക് കഴിയും' },
      pa: { name: 'ਤਣਾਅ', description: 'ਡੂੰਘਾ ਸਾਹ ਲਓ, ਤੁਸੀਂ ਇਹ ਕਰ ਸਕਦੇ ਹੋ' },
      or: { name: 'ଚାପ', description: 'ଗଭୀର ନିଶ୍ୱାସ ନିଅନ୍ତୁ, ଆପଣ ପାରିବେ' },
      as: { name: 'চাপ', description: 'গভীৰভাৱে উশাহ লওক, আপুনি পাৰিব' },
      ur: { name: 'تناؤ', description: 'گہری سانس لیں، آپ یہ کر سکتے ہیں' }
    },
    excited: {
      icon: <Heart className="w-6 h-6" />,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50 border-pink-200',
      en: { name: 'Excited', description: 'Amazing energy! Let\'s make the most of it' },
      hi: { name: 'उत्साहित', description: 'अद्भुत ऊर्जा! इसका सबसे अच्छा उपयोग करते हैं' },
      mr: { name: 'उत्साहित', description: 'अप्रतिम ऊर्जा! याचा सर्वोत्तम वापर करूया' },
      bn: { name: 'উত্সাহিত', description: 'অসাধারণ শক্তি! এর সর্বোচ্চ ব্যবহার করি' },
      ta: { name: 'உற்சாகம்', description: 'அற்புதமான ஆற்றல்! இதை சிறப்பாக பயன்படுத்துவோம்' },
      te: { name: 'ఉత్సాహం', description: 'అద্భుతమైన శక్తి! దీనిని బాగా వినియోగించుకుందాం' },
      gu: { name: 'ઉત્સાહિત', description: 'અદ્ભુત ઊર્જા! આનો શ્રેષ્ઠ ઉપયોગ કરીએ' },
      kn: { name: 'ಉತ್ಸಾಹ', description: 'ಅದ್ಭುತ ಶಕ್ತಿ! ಇದನ್ನು ಚೆನ್ನಾಗಿ ಬಳಸಿಕೊಳ್ಳೋಣ' },
      ml: { name: 'ആവേശം', description: 'അതിശയകരമായ ഊർജ്ജം! ഇത് മികച്ച രീതിയിൽ ഉപയോഗിക്കാം' },
      pa: { name: 'ਉਤਸ਼ਾਹ', description: 'ਸ਼ਾਨਦਾਰ ਊਰਜਾ! ਇਸ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਇਸਤੇਮਾਲ ਕਰੀਏ' },
      or: { name: 'ଉତ୍ସାହିତ', description: 'ଅଦ୍ଭୁତ ଶକ୍ତି! ଏହାର ସର୍ବୋତ୍ତମ ବ୍ୟବହାର କରିବା' },
      as: { name: 'উৎসাহিত', description: 'অসাধাৰণ শক্তি! ইয়াৰ সৰ্বোত্তম ব্যৱহাৰ কৰোঁ' },
      ur: { name: 'پرجوش', description: 'حیرت انگیز توانائی! اس کا بہترین استعمال کریں' }
    },
    neutral: {
      icon: <Meh className="w-6 h-6" />,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50 border-gray-200',
      en: { name: 'Neutral', description: 'Feeling balanced and steady' },
      hi: { name: 'सामान्य', description: 'संतुलित और स्थिर महसूस कर रहे हैं' },
      mr: { name: 'तटस्थ', description: 'संतुलित आणि स्थिर वाटत आहे' },
      bn: { name: 'নিরপেক্ষ', description: 'সুষম এবং স্থির অনুভব করছেন' },
      ta: { name: 'நடுநிலை', description: 'சமநிலையாகவும் நிலையாகவும் உணர்கிறீர்கள்' },
      te: { name: 'తటస్థం', description: 'సంతులితంగా మరియు స్థిరంగా అనిపిస్తోంది' },
      gu: { name: 'તટસ્થ', description: 'સંતુલિત અને સ્થિર લાગે છે' },
      kn: { name: 'ತಟಸ್ಥ', description: 'ಸಮತೋಲನ ಮತ್ತು ಸ್ಥಿರತೆ ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ' },
      ml: { name: 'നിഷ്പക്ഷ', description: 'സന്തുലിതവും സ്ഥിരവുമായി തോന്നുന്നു' },
      pa: { name: 'ਨਿਰਪੱਖ', description: 'ਸੰਤੁਲਿਤ ਅਤੇ ਸਥਿਰ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ' },
      or: { name: 'ନିରପେକ୍ଷ', description: 'ସନ୍ତୁଳିତ ଏବଂ ସ୍ଥିର ଲାଗୁଛି' },
      as: { name: 'নিৰপেক্ষ', description: 'সন্তুলিত আৰু স্থিৰ অনুভৱ কৰিছে' },
      ur: { name: 'غیر جانبدار', description: 'متوازن اور مستحکم محسوس کر رہے ہیں' }
    }
  };

  const mood = moodData[currentMood as keyof typeof moodData] || moodData.neutral;
  const moodText = mood[language as keyof typeof mood] || mood.en;

  return (
    <Card className={`${mood.bgColor} border-4 ${mood.color.replace('text-', 'border-')} shadow-xl animate-bounce-in card-cheerful`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`${mood.color} animate-pulse-gentle transform hover:scale-110 transition-transform duration-300`}>
            {mood.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold">{moodText.name}</h3>
              <Badge 
                variant="secondary" 
                className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none animate-pulse-gentle px-3 py-1 rounded-full"
              >
                ✨ Current Mood ✨
              </Badge>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {moodText.description} 🌟
            </p>
          </div>
          <div className="text-3xl animate-float">
            {currentMood === 'happy' ? '🎉' : 
             currentMood === 'sad' ? '🌧️' :
             currentMood === 'stressed' ? '🌿' :
             currentMood === 'excited' ? '🚀' : '😌'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}