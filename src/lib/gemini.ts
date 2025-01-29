import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBh7_ciirpbS88rC8IVUCQJx6EZ5tgATRs');

export async function generateProjectDescription(
    projectName: string,
    projectType: string,
    existingDescription?: string
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Write a concise, professional description (max 2 sentences) for a GitHub project with the following details:
        Project Name: ${projectName}
        Project Type: ${projectType}
        ${existingDescription ? `Current Description: ${existingDescription}` : ''}
        
        Focus on the project's purpose and main technologies used. Keep it factual and clear.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating project description:', error);
        throw new Error('Failed to generate project description');
    }
}
