$content = [System.IO.File]::ReadAllText('bombonbloom/index.html', [System.Text.Encoding]::UTF8)

function Check-Imgs($varName) {
    if ($content -match "(?s)const $varName\s*=\s*\[(.+?)\];\s*(?:const|/\*|$)") {
        $arr = $matches[1]
        $m = [regex]::Matches($arr, '(?m)^\s*img:\s*"([^"]+)",')
        Write-Host "$varName images:"
        for ($i = 0; $i -lt $m.Count; $i++) {
            Write-Host "  [$i] $($m[$i].Groups[1].Value)"
        }
    }
}

Check-Imgs "bbbCategorias"
Check-Imgs "lingoteCategorias"
Check-Imgs "obleaCategorias"
Check-Imgs "pequebloomCategorias"

