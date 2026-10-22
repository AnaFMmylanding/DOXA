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
            if (data.step_index === 659) {
                const tc = data.tool_calls[0];
                console.log('TargetFile:', tc.args.TargetFile);
                fs.writeFileSync('C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\scratch\\update_script_from_659.py', tc.args.CodeContent, 'utf8');
                console.log('Saved script from step 659!');
            }
        } catch (e) {}
    }
}

run();
