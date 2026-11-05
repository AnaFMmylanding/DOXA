$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

$startLine = -1
$endLine = -1

for ($i = 3040; $i -lt 3080; $i++) {
    if ($lines[$i] -match "\[RUEDA 3:") {
        $startLine = $i - 1 # the comment banner start
        Write-Host "Found Rueda 3 comment banner start at line $($startLine + 1): $($lines[$startLine])"
        break
    }
}

for ($i = 3470; $i -lt 3520; $i++) {
    if ($lines[$i] -match "MOTOR 1: RUEDAS ESTILO DOXA") {
        $endLine = $i - 1 # the comment banner before MOTOR 1
        Write-Host "Found MOTOR 1 comment banner start at line $($endLine + 1): $($lines[$endLine])"
        break
    }
}

Write-Host "Lines to be replaced: from $($startLine + 1) to $($endLine)"
Write-Host "Line before start: $($lines[$startLine - 1])"
Write-Host "First line to replace: $($lines[$startLine])"
Write-Host "Last line to replace: $($lines[$endLine - 1])"
Write-Host "First line preserved after: $($lines[$endLine])"

