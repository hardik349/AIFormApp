import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '',
});

export async function parseWithAI(text) {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `
            You are a multilingual parser. 
            Extract ONLY the following fields from the text: 
            {"userName": "...", "buildingName": "...", "address": "...", "dateTime": "..."}.
            If a value is missing, return an empty string.
            Always respond ONLY in valid JSON, nothing else.
          `,
        },
        { role: 'user', content: text },
      ],
      response_format: { type: 'json_object' },
    });

    const raw = JSON.parse(response.choices[0].message?.content || '{}');

    // normalize keys (in case GPT decides to rename)
    return {
      userName: raw.userName || raw.name || '',
      buildingName: raw.buildingName || raw.buidingName || '',
      address: raw.address || '',
      dateTime: raw.dateTime || '',
    };
  } catch (error) {
    console.error('AI parse error:', error);
    return { userName: '', buildingName: '', address: '', dateTime: '' };
  }
}
