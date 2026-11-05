$text = [System.IO.File]::ReadAllText("scratch/old_bombonbloom.html", [System.Text.Encoding]::UTF8)

$start = $text.IndexOf("const bbbCategorias = [")
if ($start -ge 0) {
    $end = $text.IndexOf("];", $start) + 2
    $bbbArray = $text.Substring($start, $end - $start)
    [System.IO.File]::WriteAllText("scratch/original_bbb_array.js", $bbbArray, [System.Text.Encoding]::UTF8)
    Write-Host "Extracted original bbbCategorias ($($bbbArray.Length) chars)."
} else {
    Write-Host "Not found"
}

