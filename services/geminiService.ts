import { GoogleGenAI, GenerateContentParameters } from "@google/genai";

interface ImagePart {
    data: string;
    mimeType: string;
}

/**
 * Gets a response from the Gemini AI based on user input and section content.
 * @param userInput The user's question.
 * @param sectionContent The content of the current e-book section.
 * @param image Optional image object with base64 data and mimeType.
 * @returns A promise that resolves to the AI's text response.
 * @throws An error if the API call fails.
 */
export async function getAiResponse(userInput: string, sectionContent: string, image?: ImagePart): Promise<string> {
    try {
        // API key is now sourced directly from environment variables as per guidelines.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        let systemInstruction: string;
        let contents: GenerateContentParameters['contents'];

        if (image) {
             systemInstruction = `أنت مساعد خبير في كتاب عن إدارة الخوادم.
            مهمتك هي وصف الصورة المقدمة وشرح علاقتها بالنص المرفق حول إدارة الخوادم.
            إذا لم تكن الصورة مرتبطة بالنص، صف الصورة فقط.
            أجب دائمًا باللغة العربية.
            النص للرجوع إليه:
            ---
            ${sectionContent}
            ---`;
            
            const imagePart = {
                inlineData: {
                    mimeType: image.mimeType,
                    data: image.data,
                },
            };
            const textPart = { text: userInput || "صف هذه الصورة في سياق النص المقدم." };
            contents = { parts: [textPart, imagePart] };

        } else {
            systemInstruction = `أنت مساعد خبير ومختص في محتوى الكتاب المقدم إليك.
            مهمتك هي الإجابة على سؤال المستخدم بالاعتماد **فقط وحصريًا** على النص المقدم أدناه.
            **لا تستخدم أي معرفة خارجية على الإطلاق.**
            إذا كان الجواب غير موجود بشكل واضح وصريح في النص، فيجب عليك الرد بـ: "لا يمكنني الإجابة على هذا السؤال بناءً على النص المقدم."
            أجب دائمًا باللغة العربية الفصحى.
            
            النص الذي يجب الاعتماد عليه:
            ---
            ${sectionContent}
            ---`;
            contents = userInput;
        }
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        return response.text;
    } catch (err) {
        console.error("Gemini Service Error:", err);
        // Re-throw the error to be caught by the calling component
        throw new Error((err as Error).message || "An unknown error occurred with the AI service.");
    }
}
