# URLエンコードされたファイル名を修正するスクリプト
$files = Get-ChildItem -Path "content/posts" -Filter "*.md" -Recurse | Where-Object { $_.Name -match "%" }

foreach ($file in $files) {
    $oldName = $file.Name
    $decodedName = [System.Web.HttpUtility]::UrlDecode($oldName)
    
    # ファイル名として使えない文字を置換
    $decodedName = $decodedName -replace '[<>:"/\\|?*]', '-'
    
    if ($decodedName -ne $oldName) {
        $newPath = Join-Path $file.DirectoryName $decodedName
        Write-Host "リネーム: $oldName -> $decodedName"
        Rename-Item -Path $file.FullName -NewName $decodedName -ErrorAction SilentlyContinue
    }
}

Write-Host "完了: $($files.Count)件のファイルを処理しました"

