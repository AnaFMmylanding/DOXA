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
            const calls = data.tool_calls || [];
            for (const c of calls) {
                if (c.args && c.args.TargetFile && c.args.TargetFile.toLowerCase().includes('bombonbloom')) {
                    if (data.created_at >= '2026-10-21T06:00:00Z' && data.created_at <= '2026-10-21T14:00:00Z') {
                        console.log(data.step_index, data.created_at, c.name, c.args.Description || c.args.Instruction);
                    }
                }
            }
        } catch (e) {}
    }
}

run();
