$filePath = "bombonbloom/index.html"
$lines = [System.IO.File]::ReadAllLines($filePath, [System.Text.Encoding]::UTF8)

# 4706 is index 4705, 5946 is index 5945
$extracted = @()
for ($i = 4705; $i -le 5945; $i++) {
    $extracted += $lines[$i]
}

[System.IO.File]::WriteAllLines("scratch/init_bbb_wheel.js", $extracted, [System.Text.Encoding]::UTF8)
Write-Host "Extracted $($extracted.Length) lines."

