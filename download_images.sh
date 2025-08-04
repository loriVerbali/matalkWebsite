#!/bin/bash

# Create the directory if it doesn't exist
mkdir -p public/tabletimages

# Download images and rename them sequentially
echo "Downloading images..."

# Image URLs from saveme.ts
urls=(
    "https://image.pollinations.ai/prompt/a%20cartoon%20of%20a%20girl%20that%20is%20brushing%20her%20teeth?width=512&height=512&seed=5&enhance=true&nologo=true&model=flux",
    "https://image.pollinations.ai/prompt/a%20cartoon%20of%20a%20chinese%20girl%20that%20is%20clean%20her%20teeth?width=512&height=512&seed=5&enhance=true&nologo=true&model=flux",
    "https://image.pollinations.ai/prompt/a%20cartoon%20of%20a%20black%20boy%20that%20is%20getting%20his%20teeth%20checked%20by%20mom?width=512&height=512&seed=5&enhance=true&nologo=true&model=flux",
    "https://image.pollinations.ai/prompt/a%20cartoon%20of%20a%20boy%20that%20is%20looking%20at%20his%20teeth%20in%20the%20mirror?width=512&height=512&seed=5&enhance=true&nologo=true&model=flux"
)

names=(
    "brush-teeth"
    "clean-teeth"
    "check-teeth"
    "look-teeth"
)


# Download each image and rename it
for i in "${!urls[@]}"; do
  echo "Downloading image $((i + 1)) of ${#urls[@]}..."
  curl -L "${urls[$i]}" -o "public/tabletimages/${names[$i]}.png"
done

echo "Download complete! Images saved to public/tabletimages/"
echo "Files: ${names[*]}.png" 