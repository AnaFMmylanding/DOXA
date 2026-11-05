$filePath = "bombonbloom/index.html"
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

function Count-Cats($varName) {
    if ($content -match "(?s)const $varName\s*=\s*\[(.+?)\];\s*(?:const|/\*)") {
        $arr = $matches[1]
        $m = [regex]::Matches($arr, '(?m)^\s*n:\s*"([^"]+)",')
        Write-Host "$varName has $($m.Count) categories."
        $i = 0
        foreach ($item in $m) {
            Write-Host "  [$i] $($item.Groups[1].Value)"
            $i++
        }
    } else {
        Write-Host "Could not find $varName"
    }
}

Count-Cats "activosDoxa"
Count-Cats "activosDoxaCookie"
Count-Cats "bbbCategorias"
Count-Cats "lingoteCategorias"
Count-Cats "obleaCategorias"
Count-Cats "pequebloomCategorias"

