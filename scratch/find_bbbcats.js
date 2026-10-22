const fs = require('fs');
const readline = require('readline');

async function run() {
    const transcriptPath = 'C:\\Users\\Ana\\.gemini\\antigravity-ide\\brain\\bdef1a3c-1f8e-4528-af63-b060d4634a94\\.system_generated\\logs\\transcript_full.jsonl';
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const data = JSON.parse(line);
            if (line.includes('bbbCategorias')) {
                console.log(data.step_index, data.type, data.created_at);
                if (data.tool_calls) {
                    data.tool_calls.forEach(tc => console.log('  tool:', tc.name, tc.args.Description || tc.args.Instruction));
                }
            }
        } catch (e) {}
    }
}

run();
