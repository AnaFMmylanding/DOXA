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
            if (data.step_index === 560) {
                const tc = data.tool_calls[0];
                console.log('Step 560 TargetFile:', tc.args.TargetFile);
                fs.writeFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_560.js', tc.args.CodeContent, 'utf8');
            }
            if (data.step_index === 711) {
                const tc = data.tool_calls[0];
                console.log('Step 711 TargetFile:', tc.args.TargetFile);
                fs.writeFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\step_711.js', tc.args.CodeContent, 'utf8');
            }
        } catch (e) {}
    }
}

run();
