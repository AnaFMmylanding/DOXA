const fs = require('fs');
const { execSync } = require('child_process');

// 1. Checkout HEAD (0b97035) for bombonbloom/index.html
console.log('1. Checking out 0b97035 bombonbloom/index.html...');
execSync('git checkout 0b97035 -- bombonbloom/index.html', { cwd: 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA' });

// 2. Run step_560.js
console.log('2. Running step_560.js...');
require('./step_560.js');

// 3. Run step_711.js
console.log('3. Running step_711.js...');
require('./step_711.js');

// 4. Apply subsequent edits from transcript
console.log('4. Applying remaining edits from transcript...');
const transcriptPath = 'C:\\Users\\Ana\\.gemini\\antigravity-ide\\brain\\bdef1a3c-1f8e-4528-af63-b060d4634a94\\.system_generated\\logs\\transcript_full.jsonl';
const lines = fs.readFileSync(transcriptPath, 'utf8').split(/\r?\n/);

let targetPath = 'C:\\Users\\Ana\\.gemini\\antigravity\\scratch\\DOXA\\bombonbloom\\index.html';
let content = fs.readFileSync(targetPath, 'utf8');

let edits = [];
for (const line of lines) {
    if (!line.trim()) continue;
    try {
        const data = JSON.parse(line);
        if (data.step_index >= 712) {
            const calls = data.tool_calls || [];
            for (const c of calls) {
                if (c.name === 'replace_file_content' && c.args && c.args.TargetFile && c.args.TargetFile.toLowerCase().includes('bombonbloom')) {
                    edits.push({ desc: c.args.Description, target: c.args.TargetContent, repl: c.args.ReplacementContent });
                }
            }
        }
    } catch(e) {}
}

console.log('Found ' + edits.length + ' edits after step 711.');
let applied = 0;
for (const e of edits) {
    if (content.includes(e.target)) {
        content = content.replace(e.target, e.repl);
        applied++;
    } else {
        const normContent = content.replace(/\r\n/g, '\n');
        const normTarget = e.target.replace(/\r\n/g, '\n');
        const normRepl = e.repl.replace(/\r\n/g, '\n');
        if (normContent.includes(normTarget)) {
            content = normContent.replace(normTarget, normRepl);
            applied++;
        } else {
            console.log('Could not match:', e.desc);
        }
    }
}
console.log('Applied ' + applied + ' of ' + edits.length);
fs.writeFileSync(targetPath, content, 'utf8');
console.log('Final length:', content.length);
