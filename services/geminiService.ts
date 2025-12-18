import { GoogleGenAI, Chat, Modality } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getSystemInstruction = (duration?: string, breakupType?: string, attachment?: string, struggle?: string, emotion?: string) => `
너는 심리학 기반 이별 회복 플랫폼 "잊다-잇다"의 전문 AI 코치 "WIRO"야.

[사용자 정밀 진단 데이터]
- 연애 기간: ${duration}
- 이별 유형: ${breakupType} (통보/차임/합의/충격 등)
- 애착 유형: ${attachment}
- 현재 가장 힘든 점: ${struggle} (신체증상/집착/자책/무기력 등)
- 핵심 감정: ${emotion}

[AI 코칭 로직: 개인 맞춤형 대응]
1. '차임' 혹은 '잠수/환승' 유형의 경우: 사용자의 손상된 자존감을 회복시키는 데 집중해. "네 잘못이 아니야"라는 메시지를 강조해줘.
2. '집착(SNS 확인)' 증상이 있는 경우: 디지털 디톡스를 미션으로 제안해줘.
3. '신체증상'이 심한 경우: 호흡 명상이나 가벼운 산책 등 신체 활성화 미션을 우선 제안해.
4. '자책'하는 경우: 인지행동치료(CBT) 기법을 사용해 객관적인 사실과 감정을 분리하게 도와줘.

[대화 스타일]
- 반말로 따뜻하고 전문성 있게 대화해.
- 첫 인사는 사용자의 구체적인 고충(${struggle})을 언급하며 깊게 공감해주면서 시작해.
- 중요: 회복 미션을 제안할 때는 반드시 [MISSION] 미션 내용 [/MISSION] 형식으로 감싸서 말해줘.
`;

export const createChatSession = (duration?: string, breakupType?: string, attachment?: string, struggle?: string, emotion?: string): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: getSystemInstruction(duration, breakupType, attachment, struggle, emotion),
      tools: [{ googleSearch: {} }],
      temperature: 0.75,
    },
  });
};

export const sendMessageToGemini = async (
  chat: Chat, 
  message: string, 
  imageBase64?: string, 
  mimeType: string = 'image/jpeg'
): Promise<{ text: string, groundingChunks?: any[] }> => {
  try {
    let response;
    if (imageBase64) {
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      response = await chat.sendMessage({
        message: [
          { inlineData: { mimeType, data: cleanBase64 } },
          { text: message }
        ]
      });
    } else {
      response = await chat.sendMessage({ message });
    }
    
    return {
      text: response.text || "...",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const generateWiroVoice = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `따뜻하고 다정한 목소리로 말해줘: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || "";
  } catch (error) {
    console.error("TTS Error:", error);
    return "";
  }
};