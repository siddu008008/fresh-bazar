$src = 'C:\Users\ADMIN\Downloads\freshbazar images'
$dest = 'e:\vibecode1\frontend\public\images'

if (!(Test-Path $dest)) { 
    New-Item -ItemType Directory -Path $dest 
}

$mappings = @{
    "appleImage001.png" = "apple.png"
    "bannanaImage002.webp" = "banana.webp"
    "image_12.jpg" = "carrot.jpg"
    "image_3.jpg" = "tomato.jpg"
    "image_5.jpg" = "potato.jpg"
    "image_16.jpg" = "onion.jpg"
    "image_30.jpg" = "cauliflower.jpg"
    "image_28.jpg" = "brinjal.jpg"
    "image_19.jpg" = "green_chilli.jpg"
    "image_10.jpg" = "capsicum.jpg"
    "image_33.jpg" = "broccoli.jpg"
    "image_18.jpg" = "mint.jpg"
    "image_20.jpg" = "curry_leaves.jpg"
    "image_21.jpg" = "cabbage.jpg"
    "image_26.jpg" = "coriander.jpg"
    "image_34.jpg" = "cucumber.jpg"
    "image_32.jpg" = "green_peas.jpg"
    "image_37.jpg" = "lemon.jpg"
    "image_35.jpg" = "spring_onion.jpg"
    "image_2.jpg" = "ginger.jpg"
    "image_12.webp" = "papaya.webp"
    "image_13.webp" = "pineapple.webp"
    "image_9.png" = "kiwi.png"
    "image_10.png" = "mango.png"
    "image_16.png" = "pomegranate.png"
    "image_17.webp" = "watermelon.webp"
    "image_18.webp" = "grapes_green.webp"
    "image_19.webp" = "grapes_black.webp"
    "image_5.webp" = "coconut.webp"
    "image_6.webp" = "dragon_fruit.webp"
    "image_8.webp" = "guava.webp"
    "image_11.webp" = "muskmelon.webp"
    "image_21.png" = "orange.png"
    "image_22.webp" = "sapota.webp"
}

foreach ($item in $mappings.GetEnumerator()) {
    $fileSrc = Join-Path $src $item.Key
    $fileDest = Join-Path $dest $item.Value
    if (Test-Path $fileSrc) {
        Copy-Item $fileSrc $fileDest -Force
        Write-Host "Copied $($item.Key) to $($item.Value)"
    } else {
        Write-Warning "Source file not found: $fileSrc"
    }
}

Write-Host "Finished copying images."
