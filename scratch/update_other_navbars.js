const fs = require('fs');

const files = [
    'cookie/index.html',
    'doxa/index.html',
    'index.html',
    'lingote/index.html',
    'oblea/index.html'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    // 1. CSS update for mobile
    const oldCss = `            .mobile-toggle {
                display: flex;
                margin-left: auto;
            }

            .navbar-menu .navbar-logo {
                display: none !important;
            }`;

    const newCss = `            .navbar {
                padding: 0 16px;
                height: 70px;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                gap: 12px;
            }

            .mobile-toggle {
                display: flex;
                order: 1;
                margin-left: auto;
            }

            .navbar-logo {
                display: inline-flex !important;
                order: 2;
                padding: 6px 14px !important;
                font-size: 11px !important;
                letter-spacing: 2.5px !important;
                border-radius: 2px;
            }

            .navbar-logo.active {
                display: inline-flex !important;
                order: 2;
                padding: 6px 14px !important;
                font-size: 11px !important;
                background-color: var(--accent-color) !important;
                color: #000000 !important;
                transform: none !important;
            }`;

    if (content.includes(oldCss)) {
        content = content.replace(oldCss, newCss);
        changed = true;
        console.log(file, ': CSS updated');
    } else {
        console.log(file, ': oldCss not found');
    }

    // 2. HTML update: move DOXA outside navbar-menu if it's currently inside
    // Find pattern: <a href="..." class="navbar-logo active">DOXA</a>\s*</div>\s*</nav>
    const regex = /(\s*<!--[^\n]*-->\s*<a\s+href="[^"]*"\s+class="navbar-logo\s+active">DOXA<\/a>)\s*(<\/div>\s*<\/nav>)/i;
    if (regex.test(content)) {
        content = content.replace(regex, (match, p1, p2) => {
            // p1 is the logo link, p2 is </div>\n</nav>
            return '\n            </div>\n' + p1.trim() + '\n        </nav>';
        });
        changed = true;
        console.log(file, ': HTML updated');
    } else {
        console.log(file, ': regex for HTML logo not matched');
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(file, ': Saved successfully');
    }
});
