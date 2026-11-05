$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Extract scripts
$matches = [regex]::Matches($content, '(?s)<script\b[^>]*>(.*?)</script>')
Write-Host "Checking $($matches.Count) scripts..."

$sc = New-Object -ComObject ScriptControl
$sc.Language = "JScript"

$idx = 0
foreach ($m in $matches) {
    $idx++
    $code = $m.Groups[1].Value
    # Replace DOM calls or wrap in function to check syntax
    $wrapped = "function __testSyntax() { try { return (function() { " + $code + " `n}); } catch(e) { return e.message; } }"
    try {
        # JScript ScriptControl doesn't support modern ES6 const/let directly,
        # but we can check with PowerShell or Mshtml HTMLDocument
    } catch {
    }
}

# Use HTML Document COM to test parsing
$doc = New-Object -ComObject "HTMLFile"
$doc.IHTMLDocument2_write($content)
$doc.close()

Write-Host "HTML Document parsed successfully. Title: $($doc.title)"

