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
                    edits.push(c);
                }
            }
        } catch (e) {}
    }

    console.log('Total edits found in transcript:', edits.length);
    let targetPath = 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
    let content = fs.readFileSync(targetPath, 'utf8');

    let applied = 0;
    for (let i = 0; i < edits.length; i++) {
        const edit = edits[i];
        if (edit.name === 'replace_file_content') {
            const target = edit.args.TargetContent;
            const repl = edit.args.ReplacementContent;
            if (content.includes(target)) {
                content = content.replace(target, repl);
                applied++;
            } else {
                // Try normalizing line endings
                const normContent = content.replace(/\r\n/g, '\n');
                const normTarget = target.replace(/\r\n/g, '\n');
                const normRepl = repl.replace(/\r\n/g, '\n');
                if (normContent.includes(normTarget)) {
                    content = normContent.replace(normTarget, normRepl);
                    applied++;
                } else {
                    console.log('Edit ' + i + ' failed to match: ' + edit.args.Description);
                }
            }
        }
    }

    console.log('Applied ' + applied + ' of ' + edits.length + ' edits.');
    fs.writeFileSync(targetPath, content, 'utf8');
    console.log('Restored bombonbloom/index.html! Length: ' + content.length);
}

run();
