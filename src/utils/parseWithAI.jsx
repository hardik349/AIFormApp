import OpenAI from 'openai';

const client = new OpenAI({
  apiKey:
    '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',
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
