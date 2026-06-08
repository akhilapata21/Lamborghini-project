$ErrorActionPreference = "Stop"
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)

# Unsplash — Lamborghini-tagged photos (free license)
$photos = @{
  revuelto          = "https://images.unsplash.com/photo-1713856626688-0ef33e41942a?auto=format&w=1920&q=85"
  "huracan-tecnica" = "https://images.unsplash.com/photo-1725201708427-412b7d783c0d?auto=format&w=1920&q=85"
  "huracan-sto"     = "https://images.unsplash.com/photo-1725201762733-f927c486d8a5?auto=format&w=1920&q=85"
  urus              = "https://images.unsplash.com/photo-1725201641145-8f293d095e42?auto=format&w=1920&q=85"
  countach          = "https://images.unsplash.com/photo-1710476308798-ac679d17e316?auto=format&w=1920&q=85"
}

foreach ($slug in $photos.Keys) {
  $base = Join-Path $root "assets\models\$slug"
  New-Item -ItemType Directory -Force -Path "$base\3d", "$base\360", "$base\gallery" | Out-Null
  Invoke-WebRequest -Uri $photos[$slug] -OutFile (Join-Path $base "hero.jpg") -UseBasicParsing
  for ($i = 0; $i -lt 18; $i++) {
    Copy-Item (Join-Path $base "hero.jpg") (Join-Path $base "360\frame-$("{0:D3}" -f $i).jpg") -Force
  }
  Copy-Item (Join-Path $base "hero.jpg") (Join-Path $base "gallery\01.jpg") -Force
}

$glb = Join-Path $root "assets\models\revuelto\3d\model.glb"
if (-not (Test-Path $glb)) {
  Invoke-WebRequest -Uri "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ToyCar/glTF-Binary/ToyCar.glb" -OutFile $glb -UseBasicParsing
}

$imgDir = Join-Path $root "assets\img"
if (-not (Test-Path $imgDir)) {
  New-Item -ItemType Directory -Force -Path $imgDir | Out-Null
}
Copy-Item (Join-Path $root "assets\models\revuelto\hero.jpg") (Join-Path $root "assets\img\hero.jpg") -Force
Write-Host "Lamborghini photos installed."
