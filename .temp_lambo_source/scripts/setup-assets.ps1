# Run once from project root:  .\scripts\setup-assets.ps1
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$img = Join-Path $root "assets\img"
$shared = Join-Path $root "assets\models\_shared"
$glbUrl = "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb"

$models = @{
  revuelto          = @{ hero = "hero.jpg"; spin = @("hero.jpg","gallery-front.jpg","gallery-yellow.jpg","gallery-rear.jpg","gallery-wheel.jpg") }
  "huracan-tecnica" = @{ hero = "gallery-yellow.jpg"; spin = @("gallery-yellow.jpg","gallery-front.jpg","gallery-rear.jpg","gallery-wheel.jpg") }
  "huracan-sto"     = @{ hero = "gallery-rear.jpg"; spin = @("gallery-rear.jpg","gallery-yellow.jpg","gallery-wheel.jpg","gallery-front.jpg") }
  urus              = @{ hero = "gallery-yellow.jpg"; spin = @("gallery-yellow.jpg","gallery-front.jpg","gallery-rear.jpg","gallery-interior.jpg") }
  countach          = @{ hero = "gallery-front.jpg"; spin = @("gallery-front.jpg","gallery-rear.jpg","gallery-yellow.jpg","gallery-wheel.jpg") }
}

New-Item -ItemType Directory -Force -Path $shared | Out-Null
$glbPath = Join-Path $shared "supercar.glb"
if (-not (Test-Path $glbPath)) {
  Write-Host "Downloading placeholder GLB..."
  Invoke-WebRequest -Uri $glbUrl -OutFile $glbPath -UseBasicParsing
}

foreach ($slug in $models.Keys) {
  $cfg = $models[$slug]
  $base = Join-Path $root "assets\models\$slug"
  foreach ($sub in @("3d","360","gallery")) {
    New-Item -ItemType Directory -Force -Path (Join-Path $base $sub) | Out-Null
  }
  Copy-Item (Join-Path $img $cfg.hero) (Join-Path $base "hero.jpg") -Force
  Copy-Item $glbPath (Join-Path $base "3d\model.glb") -Force
  $i = 0
  foreach ($src in $cfg.spin) {
    for ($r = 0; $r -lt 3; $r++) {
      $name = "frame-{0:D3}.jpg" -f $i
      Copy-Item (Join-Path $img $src) (Join-Path $base "360\$name") -Force
      $i++
    }
  }
  $g = 0
  foreach ($src in $cfg.spin) {
    if ($g -ge 2) { break }
    $gName = "{0:D2}.jpg" -f ($g + 1)
    Copy-Item (Join-Path $img $src) (Join-Path $base "gallery\$gName") -Force
    $g++
  }
  Write-Host "OK $slug"
}

Write-Host "Done. Open index.html with Live Server."
