$files = Get-ChildItem -Path "scratch\*.js", "bombonbloom\*.html", "doxa\*.html"
foreach ($f in $files) {
    $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
    if ($text.IndexOf("Relajac") -ge 0 -and $text.IndexOf("subActivos") -ge 0) {
        Write-Host "Found in $($f.FullName)"
        $idx = $text.IndexOf("Relajac")
        $start = [Math]::Max(0, $idx - 100)
        $len = [Math]::Min(1500, $text.Length - $start)
        Write-Host $text.Substring($start, $len)
        break
    }
}

