const fs = require('fs');
const readline = require('readline');

async function run() {
    const transcriptPath = 'C:\\Users\\Ana\\.gemini\\antigravity-ide\\brain\\bdef1a3c-1f8e-4528-af63-b060d4634a94\\.system_generated\\logs\\transcript_full.jsonl';
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let edits = [];

    for await (const line of rl) {
        if (!line.trim()) continue;
        try {
            const data = JSON.parse(line);
            const calls = data.tool_calls || [];
            for (const c of calls) {
                if ((c.name === 'replace_file_content' || c.name === 'multi_replace_file_content') && c.args && c.args.TargetFile && c.args.TargetFile.toLowerCase().includes('bombonbloom')) {
                    edits.push({ desc: c.args.Description, time: data.created_at, call: c });
                }
            }
        } catch (e) {}
    }

    console.log('Edits count:', edits.length);
    edits.forEach((e, idx) => console.log(idx, e.time, e.desc));
}

run();
