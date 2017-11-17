#!/usr/bin/env bash
touch ~/Projects/jaykaron.github.io/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/Chroma.js > ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/BACKGROUND.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/WELCOME.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/PC.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/Platform.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/HUD.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js
cat ~/Projects/jaykaron.github.io/projects/chroma/scripts/INIT.js >> ~/Projects/jaykaron.github.io/projects/chroma/chroma.js

date "+build successful at %H:%M:%S"

exit 0
