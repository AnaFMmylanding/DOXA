const fs = require('fs');
const readline = require('readline');

async function run() {
    const transcriptPath = 'C:\\Users\\Ana\\.gemini\\antigravity-ide\\brain\\bdef1a3c-1f8e-4528-af63-b060d4634a94\\.system_generated\\logs\\transcript_full.jsonl';
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let lastView = null;
    let stepIdx = null;

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const data = JSON.parse(line);
            if (data.type === 'VIEW_FILE' && data.content && data.content.includes('bbbCategorias')) {
                lastView = data.content;
                stepIdx = data.step_index;
            }
        } catch (e) {}
    }

    console.log('Last view step:', stepIdx, 'Length:', lastView ? lastView.length : 0);
}

run();
