$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

$startLine = -1
$endLine = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "\[RUEDA 3:") {
        $startLine = $i - 1
        Write-Host "Found Rueda 3 at line $($startLine + 1): $($lines[$startLine])"
        break
    }
}

for ($i = $startLine; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "MOTOR 1: RUEDAS ESTILO DOXA") {
        $endLine = $i - 1
        Write-Host "Found MOTOR 1 at line $($endLine + 1): $($lines[$endLine])"
        break
    }
}

Write-Host "startLine = $startLine, endLine = $endLine"

