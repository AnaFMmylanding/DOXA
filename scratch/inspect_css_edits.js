const fs = require('fs');
const transcriptPath = 'C:\\Users\\Ana\\.gemini\\antigravity-ide\\brain\\bdef1a3c-1f8e-4528-af63-b060d4634a94\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split(/\r?\n/);

for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const data = JSON.parse(line);
        if (data.step_index >= 910 && data.step_index <= 990) {
            const calls = data.tool_calls || [];
            for (const c of calls) {
                if (c.name === 'replace_file_content' && c.args && c.args.TargetFile && c.args.TargetFile.toLowerCase().includes('bombonbloom')) {
                    console.log('--- Step:', data.step_index, c.args.Description);
                    console.log('TARGET:', c.args.TargetContent);
                    console.log('REPLACEMENT:', c.args.ReplacementContent);
                }
            }
        }
    } catch(e) {}
}
