$content = [System.IO.File]::ReadAllText('bombonbloom/index.html', [System.Text.Encoding]::UTF8)

function Check-Taglines($varName) {
    if ($content -match "(?s)const $varName\s*=\s*\[(.+?)\];\s*(?:const|/\*|$)") {
        $arr = $matches[1]
        $m = [regex]::Matches($arr, '(?m)^\s*tagline:\s*"([^"]+)",')
        Write-Host "$varName taglines:"
        for ($i = 0; $i -lt $m.Count; $i++) {
            Write-Host "  [$i] $($m[$i].Groups[1].Value)"
        }
    }
}

Check-Taglines "bbbCategorias"
Check-Taglines "lingoteCategorias"
Check-Taglines "obleaCategorias"
Check-Taglines "pequebloomCategorias"

