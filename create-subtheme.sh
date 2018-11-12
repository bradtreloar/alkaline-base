#!/bin/bash

# Get the name of the new subtheme.
SUBTHEME_NAME=$1

# Get the path to the starterkit.
STARTERKIT_PATH="$(pwd)/starterkit"

# Copy starterkit to subtheme.
mkdir -p ../../custom/$SUBTHEME_NAME
cp -r $STARTERKIT_PATH/* ../../custom/$SUBTHEME_NAME

# Move to subtheme directory.
cd ../../custom/$SUBTHEME_NAME

# Rename theme files
mv starterkit.libraries.yml $SUBTHEME_NAME.libraries.yml
mv starterkit.info.yml.txt $SUBTHEME_NAME.info.yml
mv starterkit.theme $SUBTHEME_NAME.theme

# Find and replace "starterkit" with subtheme name
#for file in $(find . -type f); do sed s/starterkit/$SUBTHEME_NAME/ $file; done