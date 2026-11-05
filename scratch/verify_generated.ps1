$content = [System.IO.File]::ReadAllText('scratch/generated_arrays.js', [System.Text.Encoding]::UTF8)

function Test-Array($varName) {
    if ($content -match "(?s)const $varName\s*=\s*\[(.+?)\];\s*(?:const|/\*|$)") {
        $arr = $matches[1]
        $m = [regex]::Matches($arr, '(?m)^\s*n:\s*"([^"]+)",')
        Write-Host "$varName has $($m.Count) categories:"
        for ($i = 0; $i -lt $m.Count; $i++) {
            Write-Host "  [$i] $($m[$i].Groups[1].Value)"
        }
    } else {
        Write-Host "ERROR: $varName not found"
    }
}

Test-Array "bbbCategorias"
Test-Array "lingoteCategorias"
Test-Array "obleaCategorias"
Test-Array "pequebloomCategorias"

