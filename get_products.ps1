[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$apiKey = '6169583|m657Xdip6yxBI1ZRo5B3jhQMVvNvrOtciCP43hM90fc3b021'
$headers = @{
    'Authorization' = "Bearer $apiKey"
    'Accept' = 'application/json'
}

Write-Host "Connecting to SellAuth API..." -ForegroundColor Cyan

$shopId = $null
$shopName = ""
$shopsRes = $null

try {
    $shopsRes = Invoke-RestMethod -Uri "https://api.sellauth.com/v1/shops" -Headers $headers -Method Get
} catch {
    Write-Host "Standard API endpoint returned error, trying internal API endpoint..." -ForegroundColor Yellow
    try {
        $shopsRes = Invoke-RestMethod -Uri "https://api-internal-3.sellauth.com/v1/shops" -Headers $headers -Method Get
    } catch {
        Write-Host "[ERROR] Could not connect to SellAuth: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

$shopsRes | ConvertTo-Json -Depth 5 | Out-File -FilePath "shops.json" -Encoding utf8

$shop = if ($shopsRes -is [array]) { $shopsRes[0] } elseif ($shopsRes.data) { $shopsRes.data[0] } else { $shopsRes }
$shopId = $shop.id
$shopName = $shop.name

Write-Host "[OK] Connected to store: $shopName (Shop ID: $shopId)`n" -ForegroundColor Green

$prodRes = $null
try {
    $prodRes = Invoke-RestMethod -Uri "https://api.sellauth.com/v1/shops/$shopId/products" -Headers $headers -Method Get
} catch {
    try {
        $prodRes = Invoke-RestMethod -Uri "https://api-internal-3.sellauth.com/v1/shops/$shopId/products" -Headers $headers -Method Get
    } catch {
        Write-Host "[ERROR] Failed to fetch products: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

$prodRes | ConvertTo-Json -Depth 10 | Out-File -FilePath "products.json" -Encoding utf8

$prods = if ($prodRes.data) { $prodRes.data } elseif ($prodRes -is [array]) { $prodRes } else { @($prodRes) }

$summary = @()
$summary += "=================================================="
$summary += "SELLAUTH STORE: $shopName (Shop ID: $shopId)"
$summary += "Total Products Found: $($prods.Count)"
$summary += "=================================================="

foreach ($p in $prods) {
    $summary += ""
    $summary += "PRODUCT: $($p.name) (ID: $($p.id))"
    if ($p.variants -and $p.variants.Count -gt 0) {
        foreach ($v in $p.variants) {
            $summary += "   - Variant: $($v.name) | Variant ID: $($v.id) | Price: $($v.price) USD"
        }
    } else {
        $summary += "   - Single Item | Price: $($p.price) USD"
    }
}

$summary | Out-File -FilePath "products_summary.txt" -Encoding utf8
$summary | ForEach-Object { Write-Host $_ -ForegroundColor Yellow }

Write-Host "`n[SUCCESS] Successfully saved shops.json, products.json, and products_summary.txt!" -ForegroundColor Green
