$text = [System.IO.File]::ReadAllText("scratch/bbb_with_articulaciones.html", [System.Text.Encoding]::UTF8)

$start = $text.IndexOf("const bbbCategorias = [")
if ($start -ge 0) {
    $end = $text.IndexOf("];", $start) + 2
    $bbbArray = $text.Substring($start, $end - $start)
    [System.IO.File]::WriteAllText("scratch/all_8_bbb_categories.js", $bbbArray, [System.Text.Encoding]::UTF8)
    Write-Host "Extracted all 8 bbbCategorias ($($bbbArray.Length) chars)."
}

