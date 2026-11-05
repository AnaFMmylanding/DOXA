$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath)

$start = -1
$end = -1
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i].IndexOf("function initBBBStyleWheel(") -ge 0) {
        $start = $i
    }
    if ($start -ne -1 -and $lines[$i].IndexOf("CONTROLADOR CENTRAL") -ge 0) {
        $end = $i
        break
    }
}

Write-Host "initBBBStyleWheel starts at line: $($start + 1) and ends before line: $($end + 1)"
