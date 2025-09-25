import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Send, Mic, Heart, Smile, Frown, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bestu';
  timestamp: Date;
  mood?: 'happy' | 'sad' | 'stressed' | 'excited' | 'neutral';
}

interface ChatInterfaceProps {
  language: string;
  currentMood: string;
  onMoodChange: (mood: string) => void;
}

const moodResponses = {
  en: {
    happy: [
      "That's awesome! I'm so happy for you! 🎉",
      "Your happiness is contagious! Keep spreading those good vibes! ✨",
      "I love seeing you this excited! Let's make the most of this energy!"
    ],
    sad: [
      "I'm here for you, bestu. It's okay to feel sad sometimes. 💙",
      "Take a deep breath with me. You're stronger than you know. 🌸",
      "Remember, after every storm comes a rainbow. I believe in you! 🌈"
    ],
    stressed: [
      "Let's take a moment to breathe together. Inhale... exhale... 🫧",
      "You've got this! One step at a time, we'll figure it out together. 💪",
      "Stress is temporary, but your strength is permanent. I'm here to help! 🌿"
    ],
    excited: [
      "Your energy is amazing! Let's channel this into something productive! ⚡",
      "I love your enthusiasm! What exciting things are we working on today? 🚀",
      "This positive energy is exactly what we need! Let's conquer the day! 🔥"
    ]
  },
  hi: {
    happy: [
      "वाह! मैं आपके लिए बहुत खुश हूं! 🎉",
      "आपकी खुशी संक्रामक है! इन अच्छे विचारों को फैलाते रहें! ✨",
      "मुझे आपको इतना उत्साहित देखना अच्छा लगता है! आइए इस ऊर्जा का सदुपयोग करते हैं!"
    ],
    sad: [
      "मैं आपके साथ हूं दोस्त। कभी-कभी उदास होना ठीक है। 💙",
      "मेरे साथ गहरी सांस लें। आप जितना सोचते हैं उससे कहीं ज्यादा मजबूत हैं। 🌸",
      "याद रखें, हर तूफान के बाद इंद्रधनुष आता है। मुझे आप पर भरोसा है! 🌈"
    ],
    stressed: [
      "आइए एक साथ सांस लेते हैं। सांस अंदर... सांस बाहर... 🫧",
      "आप यह कर सकते हैं! एक-एक कदम करके, हम मिलकर इसे हल करेंगे। 💪",
      "तनाव अस्थायी है, लेकिन आपकी शक्ति स्थायी है। मैं मदद के लिए यहां हूं! 🌿"
    ],
    excited: [
      "आपकी ऊर्जा अद्भुत है! आइए इसे किसी उत्पादक काम में लगाएं! ⚡",
      "मुझे आपका उत्साह पसंद है! आज हम किस रोमांचक चीज़ पर काम कर रहे हैं? 🚀",
      "यह सकारात्मक ऊर्जा वही है जिसकी हमें जरूरत है! आइए दिन को जीतते हैं! 🔥"
    ]
  },
  mr: {
    happy: [
      "वाह! मी तुझ्यासाठी खूप आनंदी आहे! 🎉",
      "तुझा आनंद संसर्गजन्य आहे! हे चांगले विचार पसरवत राहा! ✨",
      "तुला इतका उत्साहित बघून मला छान वाटते! या ऊर्जेचा सदुपयोग करूया!"
    ],
    sad: [
      "मी तुझ्यासोबत आहे मित्रा। कधी कधी दुःखी होणे सामान्य आहे। 💙",
      "माझ्यासोबत दीर्घ श्वास घे। तू जितका विचार करतोस त्यापेक्षा जास्त मजबूत आहेस। 🌸",
      "लक्षात ठेव, प्रत्येक वादळानंतर इंद्रधनुष्य येते। माझा तुझ्यावर विश्वास आहे! 🌈"
    ],
    stressed: [
      "चला एकत्र श्वास घेऊया। श्वास आत... श्वास बाहेर... 🫧",
      "तू हे करू शकतोस! एक एक पाऊल टाकून, आपण मिळून हे सोडवू। 💪",
      "तणाव तात्पुरता आहे, पण तुझी शक्ती कायमची आहे। मी मदतीसाठी इथे आहे! 🌿"
    ],
    excited: [
      "तुझी उर्जा अप्रतिम आहे! चला याचा उपयोग काही उत्पादक कामात करूया! ⚡",
      "मला तुझा उत्साह आवडतो! आज आपण कोणत्या रोमांचक गोष्टीवर काम करत आहोत? 🚀",
      "ही सकारात्मक ऊर्जा आम्हाला हवी आहे! चला दिवस जिंकूया! 🔥"
    ]
  },
  bn: {
    happy: [
      "দারুণ! আমি আপনার জন্য খুব খুশি! 🎉",
      "আপনার খুশি সংক্রামক! এই ভালো অনুভূতি ছড়িয়ে দিন! ✨",
      "আপনাকে এত উত্সাহী দেখে আমার ভালো লাগছে! এই শক্তির সদ্ব্যবহার করি!"
    ],
    sad: [
      "আমি আপনার সাথে আছি বন্ধু। কখনো কখনো দুঃখ হওয়া স্বাভাবিক। 💙",
      "আমার সাথে গভীর নিঃশ্বাস নিন। আপনি যতটা ভাবেন তার চেয়ে বেশি শক্তিশালী। 🌸",
      "মনে রাখবেন, প্রতিটি ঝড়ের পর রংধনু আসে। আমি আপনার উপর বিশ্বাস রাখি! 🌈"
    ],
    stressed: [
      "চলুন একসাথে শ্বাস নিই। শ্বাস নিন... ছাড়ুন... 🫧",
      "আপনি পারবেন! একটি একটি করে পদক্ষেপ, আমরা একসাথে এটা সমাধান করব। 💪",
      "চাপ অস্থায়ী, কিন্তু আপনার শক্তি স্থায়ী। আমি সাহায্যের জন্য এখানে! 🌿"
    ],
    excited: [
      "আপনার শক্তি অসাধারণ! চলুন এটাকে কোনো উৎপাদনশীল কাজে লাগাই! ⚡",
      "আপনার উৎসাহ আমার পছন্দ! আজ আমরা কী রোমাঞ্চকর কাজ করছি? 🚀",
      "এই ইতিবাচক শক্তিই আমাদের দরকার! চলুন দিনটা জিতে নিই! 🔥"
    ]
  },
  ta: {
    happy: [
      "அற்புதம்! உங்களுக்காக நான் மிகவும் மகிழ்ச்சி! 🎉",
      "உங்கள் மகிழ்ச்சி தொற்றக்கூடியது! இந்த நல்ல உணர்வுகளை தொடர்ந்து பரப்புங்கள்! ✨",
      "உங்களை இவ்வளவு உற்சாகமாக பார்ப்பது எனக்கு பிடிக்கிறது! இந்த ஆற்றலை சிறப்பாக பயன்படுத்துவோம்!"
    ],
    sad: [
      "நான் உங்களுடன் இருக்கிறேன் நண்பரே। சில நேரங்களில் சோகமாக இருப்பது சரியே। 💙",
      "என்னுடன் ஆழமாக மூச்சு விடுங்கள். நீங்கள் நினைப்பதை விட மிகவும் வலிமையானவர். 🌸",
      "நினைவில் கொள்ளுங்கள், ஒவ்வொரு புயலுக்கும் பிறகு வானவில் வரும். உங்கள் மீது எனக்கு நம்பிக்கை! 🌈"
    ],
    stressed: [
      "ஒன்றாக சுவாசிப்போம். மூச்சு உள்ளே... வெளியே... 🫧",
      "உங்களால் முடியும்! ஒரு அடி எடுத்து வைத்து, நாம் இணைந்து இதை தீர்ப்போம். 💪",
      "மன அழுத்தம் தற்காலிகம், ஆனால் உங்கள் வலிமை நிரந்தரம். நான் உதவ இங்கே இருக்கிறேன்! 🌿"
    ],
    excited: [
      "உங்கள் ஆற்றல் அற்புதம்! இதை ஏதாவது பயனுள்ள வேலையில் செலுத்துவோம்! ⚡",
      "உங்கள் உற்சாகம் எனக்கு பிடிக்கிறது! இன்று நாம் என்ன அற்புதமான வேலை செய்கிறோம்? 🚀",
      "இந்த நேர்மறை ஆற்றல் தான் நமக்கு தேவை! நாளை வெல்வோம்! 🔥"
    ]
  },
  te: {
    happy: [
      "అద్భుతం! మీ కోసం నేను చాలా సంతోషంగా ఉన్నాను! 🎉",
      "మీ ఆనందం అంటుకుంటుంది! ఈ మంచి భావాలను వ్యాప్తి చేయండి! ✨",
      "మిమ్మల్ని ఇంత ఉత్సాహంగా చూడటం నాకు చాలా ఇష్టం! ఈ శక్తిని బాగా వినియోగించుకుందాం!"
    ],
    sad: [
      "నేను మీతో ఉన్నాను మిత్రమా. కొన్ని సార్లు దుఃఖం అనుభవించడం సరియే। 💙",
      "నాతో కలిసి లోతుగా ఊపిరి తీసుకోండి. మీరు అనుకున్నదానికంటే చాలా బలవంతులు. 🌸",
      "గుర్తుంచుకోండి, ప్రతి తుఫాను తర్వాత ఇంద్రధనుస్సు వస్తుంది. మీపై నాకు నమ్మకం! 🌈"
    ],
    stressed: [
      "కలిసి ఊపిరి పీల్చుకుందాం. ఊపిరి లోపలికి... బయటకు... 🫧",
      "మీరు చేయగలరు! ఒక్కో అడుగు వేస్తూ, మనం కలిసి దీన్ని పరిష్కరిస్తాం। 💪",
      "ఒత్తిడి తాత్కాలికం, కానీ మీ బలం శాశ్వతం. నేను సహాయానికి ఇక్కడ ఉన్నాను! 🌿"
    ],
    excited: [
      "మీ శక్తి అద్భుతం! దీన్ని ఏదైనా ఉత్పాదక పనిలో వినియోగించుకుందాం! ⚡",
      "మీ ఉత్సాహం నాకు నచ్చుతుంది! ఈరోజు మనం ఏ ఆసక్తికరమైన పనిపై పనిచేస్తున్నాం? 🚀",
      "ఈ సానుకూల శక్తి మనకు అవసరం! రోజును గెలుచుకుందాం! 🔥"
    ]
  },
  gu: {
    happy: [
      "વાહ! હું તમારા માટે ખૂબ જ ખુશ છું! 🎉",
      "તમારો આનંદ ચેપી છે! આ સારી લાગણીઓ ફેલાવતા રહો! ✨",
      "તમને આટલા ઉત્સાહિત જોવાનું મને ગમે છે! આ ઊર્જાનો શ્રેષ્ઠ ઉપયોગ કરીએ!"
    ],
    sad: [
      "હું તમારી સાથે છું મિત્ર. કેટલીકવાર ઉદાસ થવું એ સામાન્ય છે. 💙",
      "મારી સાથે ઊંડા શ્વાસ લો. તમે વિચારો છો તેના કરતાં વધુ મજબૂત છો. 🌸",
      "યાદ રાખો, દરેક તોફાન પછી મેઘધનુષ આવે છે. મને તમારા પર વિશ્વાસ છે! 🌈"
    ],
    stressed: [
      "ચાલો સાથે શ્વાસ લઈએ. શ્વાસ અંદર... બહાર... 🫧",
      "તમે કરી શકો છો! એક પગલું પછી બીજું, આપણે સાથે મળીને આ ઉકેલીશું. 💪",
      "તણાવ કામચલાઉ છે, પરંતુ તમારી શક્તિ કાયમી છે. હું મદદ માટે અહીં છું! 🌿"
    ],
    excited: [
      "તમારી ઊર્જા અદ્ભુત છે! આને કોઈ ઉત્પાદક કામમાં લગાવીએ! ⚡",
      "તમારો ઉત્સાહ મને ગમે છે! આજે આપણે કયા રોમાંચક કામ પર કામ કરી રહ્યા છીએ? 🚀",
      "આ સકારાત્મક ઊર્જા જ આપણને જોઈએ છે! ચાલો દિવસ જીતીએ! 🔥"
    ]
  },
  kn: {
    happy: [
      "ಅದ್ಭುತ! ನಿಮಗಾಗಿ ನಾನು ತುಂಬಾ ಸಂತೋಷ! 🎉",
      "ನಿಮ್ಮ ಸಂತೋಷ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ! ಈ ಒಳ್ಳೆಯ ಭಾವನೆಗಳನ್ನು ಹರಡುತ್ತಲೇ ಇರಿ! ✨",
      "ನಿಮ್ಮನ್ನು ಇಷ್ಟು ಉತ್ಸಾಹದಿಂದ ನೋಡುವುದು ನನಗೆ ಇಷ್ಟ! ಈ ಶಕ್ತಿಯನ್ನು ಚೆನ್ನಾಗಿ ಬಳಸಿಕೊಳ್ಳೋಣ!"
    ],
    sad: [
      "ನಾನು ನಿಮ್ಮ ಜೊತೆ ಇದ್ದೇನೆ ಮಿತ್ರ. ಕೆಲವೊಮ್ಮೆ ದುಃಖವಾಗುವುದು ಸಾಮಾನ್ಯ. 💙",
      "ನನ್ನೊಂದಿಗೆ ಆಳವಾಗಿ ಉಸಿರಾಡಿ. ನೀವು ಯೋಚಿಸುವುದಕ್ಕಿಂತ ಹೆಚ್ಚು ಬಲಶಾಲಿ. 🌸",
      "ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ, ಪ್ರತಿ ಚಂಡಮಾರುತದ ನಂತರ ಮಳೆಬಿಲ್ಲು ಬರುತ್ತದೆ. ನಿಮ್ಮ ಮೇಲೆ ನನಗೆ ನಂಬಿಕೆ! 🌈"
    ],
    stressed: [
      "ಒಟ್ಟಿಗೆ ಉಸಿರಾಡೋಣ. ಉಸಿರು ಒಳಗೆ... ಹೊರಗೆ... 🫧",
      "ನೀವು ಮಾಡಬಲ್ಲಿರಿ! ಒಂದೊಂದು ಹೆಜ್ಜೆ ಇಟ್ಟು, ನಾವು ಒಟ್ಟಿಗೆ ಇದನ್ನು ಪರಿಹರಿಸೋಣ. 💪",
      "ಒತ್ತಡ ತಾತ್ಕಾಲಿಕ, ಆದರೆ ನಿಮ್ಮ ಶಕ್ತಿ ಶಾಶ್ವತ. ನಾನು ಸಹಾಯಕ್ಕೆ ಇಲ್ಲಿದ್ದೇನೆ! 🌿"
    ],
    excited: [
      "ನಿಮ್ಮ ಶಕ್ತಿ ಅದ್ಭುತ! ಇದನ್ನು ಏನಾದರೂ ಉತ್ಪಾದಕ ಕೆಲಸದಲ್ಲಿ ಬಳಸೋಣ! ⚡",
      "ನಿಮ್ಮ ಉತ್ಸಾಹ ನನಗೆ ಇಷ್ಟ! ಇಂದು ನಾವು ಯಾವ ರೋಮಾಂಚಕ ಕೆಲಸದ ಮೇಲೆ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇವೆ? 🚀",
      "ಈ ಧನಾತ್ಮಕ ಶಕ್ತಿ ನಮಗೆ ಬೇಕಾದುದು! ದಿನವನ್ನು ಗೆಲ್ಲೋಣ! 🔥"
    ]
  },
  ml: {
    happy: [
      "അത് അതിശയകരം! നിങ്ങൾക്ക് വേണ്ടി ഞാൻ വളരെ സന്തോഷിക്കുന്നു! 🎉",
      "നിങ്ങളുടെ സന്തോഷം പകർച്ചവ്യാധി! ഈ നല്ല വികാരങ്ങൾ പ്രചരിപ്പിച്ചുകൊണ്ടിരിക്കൂ! ✨",
      "നിങ്ങളെ ഇത്രയും ആവേശത്തോടെ കാണുന്നത് എനിക്ക് ഇഷ്ടം! ഈ ഊർജ്ജം മികച്ച രീതിയിൽ ഉപയോഗിക്കാം!"
    ],
    sad: [
      "ഞാൻ നിങ്ങളോടൊപ്പമുണ്ട് സുഹൃത്തേ. ചിലപ്പോൾ സങ്കടപ്പെടുന്നത് സാധാരണമാണ്. 💙",
      "എന്നോടൊപ്പം ആഴത്തിൽ ശ്വസിക്കൂ. നിങ്ങൾ വിചാരിക്കുന്നതിനേക്കാൾ കൂടുതൽ ശക്തരാണ്. 🌸",
      "ഓർക്കുക, ഓരോ കൊടുങ്കാറ്റിന് ശേഷവും മഴവില്ല് വരുന്നു. നിങ്ങളിൽ എനിക്ക് വിശ്വാസമുണ്ട്! 🌈"
    ],
    stressed: [
      "നമുക്ക് ഒരുമിച്ച് ശ്വസിക്കാം. ശ്വാസം അകത്തേക്ക്... പുറത്തേക്ക്... 🫧",
      "നിങ്ങൾക്ക് കഴിയും! ഓരോ ചുവടും എടുത്തുവച്ച്, നമുക്ക് ഒരുമിച്ച് ഇത് പരിഹരിക്കാം. 💪",
      "സമ്മർദ്ദം താൽക്കാലികമാണ്, എന്നാൽ നിങ്ങളുടെ ശക്തി ശാശ്വതമാണ്. സഹായത്തിന് ഞാൻ ഇവിടെയുണ്ട്! 🌿"
    ],
    excited: [
      "നിങ്ങളുടെ ഊർജ്ജം അതിശയകരം! ഇത് എന്തെങ്കിലും ഉൽപ്പാദനക്ഷമമായ പ്രവർത്തനത്തിൽ ഉപയോഗിക്കാം! ⚡",
      "നിങ്ങളുടെ ആവേശം എനിക്ക് ഇഷ്ടം! ഇന്ന് നമ്മൾ ഏത് ആവേശകരമായ കാര്യത്തിൽ പ്രവർത്തിക്കുന്നു? 🚀",
      "ഈ പോസിറ്റീവ് എനർജി നമുക്ക് വേണ്ടത്! ദിവസം ജയിക്കാം! 🔥"
    ]
  },
  pa: {
    happy: [
      "ਸ਼ਾਨਦਾਰ! ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਬਹੁਤ ਖੁਸ਼ ਹਾਂ! 🎉",
      "ਤੁਹਾਡੀ ਖੁਸ਼ੀ ਛੂਤ ਦੀ ਤਰ੍ਹਾਂ ਫੈਲਦੀ ਹੈ! ਇਨ੍ਹਾਂ ਚੰਗੀਆਂ ਭਾਵਨਾਵਾਂ ਨੂੰ ਫੈਲਾਉਂਦੇ ਰਹੋ! ✨",
      "ਤੁਹਾਨੂੰ ਇੰਨਾ ਉਤਸ਼ਾਹਿਤ ਦੇਖਣਾ ਮੈਨੂੰ ਚੰਗਾ ਲੱਗਦਾ ਹੈ! ਇਸ ਊਰਜਾ ਦਾ ਸਭ ਤੋਂ ਵਧੀਆ ਇਸਤੇਮਾਲ ਕਰੀਏ!"
    ],
    sad: [
      "ਮੈਂ ਤੁਹਾਡੇ ਨਾਲ ਹਾਂ ਦੋਸਤ। ਕਈ ਵਾਰ ਉਦਾਸ ਹੋਣਾ ਸਧਾਰਨ ਗੱਲ ਹੈ। 💙",
      "ਮੇਰੇ ਨਾਲ ਡੂੰਘਾ ਸਾਹ ਲਓ। ਤੁਸੀਂ ਸੋਚਦੇ ਹੋ ਉਸ ਤੋਂ ਕਿਤੇ ਜ਼ਿਆਦਾ ਮਜ਼ਬੂਤ ਹੋ। 🌸",
      "ਯਾਦ ਰੱਖੋ, ਹਰ ਤੂਫ਼ਾਨ ਤੋਂ ਬਾਅਦ ਇੰਦਰਧਨੁਸ਼ ਆਉਂਦਾ ਹੈ। ਮੈਨੂੰ ਤੁਹਾਡੇ ਤੇ ਭਰੋਸਾ ਹੈ! 🌈"
    ],
    stressed: [
      "ਆਓ ਮਿਲ ਕੇ ਸਾਹ ਲਈਏ। ਸਾਹ ਅੰਦਰ... ਬਾਹਰ... 🫧",
      "ਤੁਸੀਂ ਇਹ ਕਰ ਸਕਦੇ ਹੋ! ਇੱਕ ਇੱਕ ਕਦਮ ਰੱਖ ਕੇ, ਅਸੀਂ ਮਿਲ ਕੇ ਇਸ ਨੂੰ ਹੱਲ ਕਰਾਂਗੇ। 💪",
      "ਤਣਾਅ ਅਸਥਾਈ ਹੈ, ਪਰ ਤੁਹਾਡੀ ਤਾਕਤ ਸਥਾਈ ਹੈ। ਮੈਂ ਮਦਦ ਲਈ ਇੱਥੇ ਹਾਂ! 🌿"
    ],
    excited: [
      "ਤੁਹਾਡੀ ਊਰਜਾ ਸ਼ਾਨਦਾਰ ਹੈ! ਇਸ ਨੂੰ ਕਿਸੇ ਲਾਭਦਾਇਕ ਕੰਮ ਵਿੱਚ ਲਗਾਈਏ! ⚡",
      "ਮੈਨੂੰ ਤੁਹਾਡਾ ਉਤਸ਼ਾਹ ਪਸੰਦ ਹੈ! ਅੱਜ ਅਸੀਂ ਕਿਸ ਦਿਲਚਸਪ ਕੰਮ ਤੇ ਕੰਮ ਕਰ ਰਹੇ ਹਾਂ? 🚀",
      "ਇਹੀ ਸਕਾਰਾਤਮਕ ਊਰਜਾ ਸਾਡੇ ਲਈ ਲੋੜੀਂਦੀ ਹੈ! ਆਓ ਦਿਨ ਜਿੱਤੀਏ! 🔥"
    ]
  },
  or: {
    happy: [
      "ଅଦ୍ଭୁତ! ଆପଣଙ୍କ ପାଇଁ ମୁଁ ବହୁତ ଖୁସି! 🎉",
      "ଆପଣଙ୍କର ଖୁସି ସଂକ୍ରାମକ! ଏହି ଭଲ ଭାବନାଗୁଡ଼ିକୁ ଫୈଲାଇବାରେ ଲାଗିରୁହନ୍ତୁ! ✨",
      "ଆପଣଙ୍କୁ ଏତେ ଉତ୍ସାହିତ ଦେଖିବା ମୋର ପସନ୍ଦ! ଏହି ଶକ୍ତିର ସର୍ବୋତ୍ତମ ବ୍ୟବହାର କରିବା!"
    ],
    sad: [
      "ମୁଁ ଆପଣଙ୍କ ସହିତ ଅଛି ବନ୍ଧୁ। କେତେବେଳେ ଦୁଃଖ ଲାଗିବା ସାଧାରଣ କଥା। 💙",
      "ମୋ ସହିତ ଗଭୀର ନିଶ୍ୱାସ ନିଅନ୍ତୁ। ଆପଣ ଭାବୁଛନ୍ତି ସେତିକିରୁ ଅଧିକ ଶକ୍ତିଶାଳୀ। 🌸",
      "ମନେରଖନ୍ତୁ, ପ୍ରତ୍ୟେକ ଝଡ଼ ପରେ ଇନ୍ଦ୍ରଧନୁ ଆସେ। ଆପଣଙ୍କ ଉପରେ ମୋର ବିଶ୍ୱାସ! 🌈"
    ],
    stressed: [
      "ଆସନ୍ତୁ ଏକସାଥେ ନିଶ୍ୱାସ ନେବା। ନିଶ୍ୱାସ ଭିତରେ... ବାହାରେ... 🫧",
      "ଆପଣ ପାରିବେ! ଗୋଟିଏ ପଦକ୍ଷେପ ପରେ ଆଉ ଗୋଟିଏ, ଆମେ ମିଳିତ ହୋଇ ଏହାର ସମାଧାନ କରିବା। 💪",
      "ଚାପ ଅସ୍ଥାୟୀ, କିନ୍ତୁ ଆପଣଙ୍କର ଶକ୍ତି ସ୍ଥାୟୀ। ମୁଁ ସାହାଯ୍ୟ ପାଇଁ ଏଠାରେ ଅଛି! 🌿"
    ],
    excited: [
      "ଆପଣଙ୍କର ଶକ୍ତି ଅଦ୍ଭୁତ! ଏହାକୁ କୌଣସି ଉତ୍ପାଦନଶୀଳ କାର୍ଯ୍ୟରେ ଲଗାଇବା! ⚡",
      "ଆପଣଙ୍କର ଉତ୍ସାହ ମୋର ପସନ୍ଦ! ଆଜି ଆମେ କେଉଁ ରୋମାଞ୍ଚକର କାମରେ କାମ କରୁଛୁ? 🚀",
      "ଏହି ସକାରାତ୍ମକ ଶକ୍ତି ଆମର ଦରକାର! ଦିନଟାକୁ ଜିତିବା! 🔥"
    ]
  },
  as: {
    happy: [
      "অসাধাৰণ! আপোনাৰ বাবে মই অতি আনন্দিত! 🎉",
      "আপোনাৰ আনন্দ সংক্ৰামক! এই ভাল অনুভৱবোৰ বিয়পাই থাকক! ✨",
      "আপোনাক ইমান উৎসাহিত দেখি মোৰ ভাল লাগিছে! এই শক্তিৰ সৰ্বোত্তম ব্যৱহাৰ কৰোঁ!"
    ],
    sad: [
      "মই আপোনাৰ লগত আছোঁ বন্ধু। কেতিয়াবা দুখ পোৱাটো স্বাভাৱিক। 💙",
      "মোৰ লগত গভীৰভাৱে উশাহ লওক। আপুনি ভবাতকৈ অধিক শক্তিশালী। 🌸",
      "মনত ৰাখিব, প্ৰতিটো ধুমুহাৰ পিছত ৰামধেনু আহে। আপোনাৰ ওপৰত মোৰ বিশ্বাস! 🌈"
    ],
    stressed: [
      "আহক একেলগে উশাহ লওঁ। উশাহ ভিতৰলৈ... বাহিৰলৈ... 🫧",
      "আপুনি পাৰিব! এটা এটা পদক্ষেপ লৈ, আমি মিলি এইটো সমাধান কৰিম। 💪",
      "চাপ অস্থায়ী, কিন্তু আপোনাৰ শক্তি স্থায়ী। মই সহায়ৰ বাবে ইয়াতে আছোঁ! 🌿"
    ],
    excited: [
      "আপোনাৰ শক্তি অসাধাৰণ! ইয়াক কিবা উৎপাদনশীল কামত ব্যৱহাৰ কৰোঁ! ⚡",
      "আপোনাৰ উৎসাহ মোৰ ভাল লাগে! আজি আমি কি ৰোমাঞ্চকৰ কামত কাম কৰি আছোঁ? 🚀",
      "এই ইতিবাচক শক্তিয়ে আমাৰ প্ৰয়োজন! দিনটো জয় কৰোঁ! 🔥"
    ]
  },
  ur: {
    happy: [
      "زبردست! میں آپ کے لیے بہت خوش ہوں! 🎉",
      "آپ کی خوشی متعدی ہے! یہ اچھی جذبات کو پھیلاتے رہیں! ✨",
      "آپ کو اتنا پرجوش دیکھنا مجھے اچھا لگتا ہے! اس توانائی کا بہترین استعمال کریں!"
    ],
    sad: [
      "میں آپ کے ساتھ ہوں دوست۔ کبھی کبھی اداس ہونا عام بات ہے۔ 💙",
      "میرے ساتھ گہری سانس لیں۔ آپ اپنے خیال سے کہیں زیادہ مضبوط ہیں۔ 🌸",
      "یاد رکھیں، ہر طوفان کے بعد قوس قزح آتی ہے۔ مجھے آپ پر یقین ہے! 🌈"
    ],
    stressed: [
      "آئیے ایک ساتھ سانس لیتے ہیں۔ سانس اندر... باہر... 🫧",
      "آپ یہ کر سکتے ہیں! ایک ایک قدم، ہم مل کر اسے حل کریں گے۔ 💪",
      "تناؤ عارضی ہے، لیکن آپ کی طاقت مستقل ہے۔ میں مدد کے لیے یہاں ہوں! 🌿"
    ],
    excited: [
      "آپ کی توانائی حیرت انگیز ہے! اسے کسی مفید کام میں لگائیں! ⚡",
      "مجھے آپ کا جوش پسند ہے! آج ہم کس دلچسپ کام پر کام کر رہے ہیں؟ 🚀",
      "یہی مثبت توانائی ہمیں چاہیے! دن کو جیتتے ہیں! 🔥"
    ]
  }
};

export function ChatInterface({ language, currentMood, onMoodChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'hi' ? 'नमस्ते! मैं BestuAI हूं, आपका सबसे अच्छा दोस्त और अध्ययन साथी! आज आपका मूड कैसा है?' 
           : language === 'mr' ? 'नमस्कार! मी BestuAI आहे, तुझा सर्वोत्तम मित्र आणि अभ्यास सहकारी! आज तुझा मूड कसा आहे?'
           : 'Hi there! I\'m BestuAI, your best friend and study companion! How are you feeling today?',
      sender: 'bestu',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectMood = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('awesome') || 
        lowerText.includes('खुश') || lowerText.includes('अच्छा') || lowerText.includes('आनंदी')) {
      return 'happy';
    }
    if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('upset') ||
        lowerText.includes('उदास') || lowerText.includes('दुःखी')) {
      return 'sad';
    }
    if (lowerText.includes('stress') || lowerText.includes('anxious') || lowerText.includes('worried') ||
        lowerText.includes('तनाव') || lowerText.includes('चिंता')) {
      return 'stressed';
    }
    if (lowerText.includes('excited') || lowerText.includes('energy') || lowerText.includes('pumped') ||
        lowerText.includes('उत्साह') || lowerText.includes('ऊर्जा')) {
      return 'excited';
    }
    return 'neutral';
  };

  const generateResponse = (userMessage: string, detectedMood: string): string => {
    const responses = moodResponses[language as keyof typeof moodResponses] || moodResponses.en;
    const moodResponses_arr = responses[detectedMood as keyof typeof responses];
    
    if (moodResponses_arr && moodResponses_arr.length > 0) {
      return moodResponses_arr[Math.floor(Math.random() * moodResponses_arr.length)];
    }
    
    // Default responses
    const defaultResponses = {
      en: "I'm here to listen and help! Tell me more about what's on your mind.",
      hi: "मैं सुनने और मदद करने के लिए यहां हूं! मुझे बताएं कि आपके मन में क्या है।",
      mr: "मी ऐकण्यासाठी आणि मदत करण्यासाठी येथे आहे! तुझ्या मनात काय आहे ते मला सांगा."
    };
    
    return defaultResponses[language as keyof typeof defaultResponses] || defaultResponses.en;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Detect mood and generate response
    const detectedMood = detectMood(inputText);
    if (detectedMood !== 'neutral') {
      onMoodChange(detectedMood);
    }

    setTimeout(() => {
      const response = generateResponse(inputText, detectedMood);
      const bestuMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bestu',
        timestamp: new Date(),
        mood: detectedMood !== 'neutral' ? detectedMood as any : undefined
      };

      setMessages(prev => [...prev, bestuMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getMoodIcon = (mood?: string) => {
    switch (mood) {
      case 'happy': return (
        <div className="flex items-center gap-1">
          <Smile className="w-4 h-4 text-yellow-500 animate-bounce" />
          <span className="text-lg">😊</span>
        </div>
      );
      case 'sad': return (
        <div className="flex items-center gap-1">
          <Frown className="w-4 h-4 text-blue-500" />
          <span className="text-lg">😔</span>
        </div>
      );
      case 'stressed': return (
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-green-500" />
          <span className="text-lg">😰</span>
        </div>
      );
      case 'excited': return (
        <div className="flex items-center gap-1">
          <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
          <span className="text-lg">🤩</span>
        </div>
      );
      default: return <span className="text-lg">😌</span>;
    }
  };

  const getMoodColors = (mood?: string) => {
    switch (mood) {
      case 'happy':
        return {
          bg: 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30',
          border: 'border-yellow-300',
          text: 'text-yellow-700 dark:text-yellow-300'
        };
      case 'sad':
        return {
          bg: 'bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
          border: 'border-blue-300',
          text: 'text-blue-700 dark:text-blue-300'
        };
      case 'stressed':
        return {
          bg: 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
          border: 'border-green-300',
          text: 'text-green-700 dark:text-green-300'
        };
      case 'excited':
        return {
          bg: 'bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30',
          border: 'border-pink-300',
          text: 'text-pink-700 dark:text-pink-300'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30',
          border: 'border-purple-300',
          text: 'text-purple-700 dark:text-purple-300'
        };
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => {
          const moodColors = getMoodColors(message.mood);
          return (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-bounce-in`}
            >
              <Card className={`max-w-xs p-4 border-2 transition-all duration-300 hover:scale-105 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg border-purple-300' 
                  : `${moodColors.bg} ${moodColors.border} shadow-md`
              }`}>
                <div className="flex items-start space-x-2">
                  {message.sender === 'bestu' && (
                    <div className="flex-shrink-0 animate-pulse-gentle">
                      {getMoodIcon(message.mood)}
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      message.sender === 'user' ? 'text-white' : moodColors.text
                    }`}>
                      {message.text}
                    </p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                  {message.sender === 'user' && (
                    <span className="text-lg animate-bounce">👤</span>
                  )}
                </div>
              </Card>
            </div>
          );
        })}
        
        {isTyping && (
          <div className="flex justify-start animate-bounce-in">
            <Card className="max-w-xs p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-pulse-gentle">
                  <span className="text-lg">🤖</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">
                  BestuAI is thinking... ✨
                </span>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t-2 border-gradient-to-r from-purple-200 to-pink-200 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className="flex space-x-3">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'hi' ? 'अपना संदेश टाइप करें... ✨' 
              : language === 'mr' ? 'तुझा संदेश टाइप कर... ✨'
              : 'Type your message... ✨'
            }
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-2 border-purple-200 rounded-xl font-medium placeholder:text-purple-400 focus:border-purple-400 focus:ring-purple-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
          />
          <Button 
            size="icon" 
            variant="outline"
            className="btn-cheerful border-2 border-orange-300 bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 hover:scale-110"
          >
            <Mic className="w-4 h-4" />
            <span className="sr-only">Voice message</span>
          </Button>
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            className="btn-cheerful bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        <div className="mt-2 text-center">
          <p className="text-xs text-purple-600 dark:text-purple-300 animate-pulse">
            💡 {language === 'hi' ? 'मैं यहाँ आपकी मदद के लिए हूँ!' 
                : language === 'mr' ? 'मी तुमच्या मदतीसाठी येथे आहे!'
                : 'I\'m here to help you shine!'} ⭐
          </p>
        </div>
      </div>
    </div>
  );
}