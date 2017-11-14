#!/usr/bin/env bash
touch ~/Projects/jaykaron.github.io/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/Chroma.js > ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/BACKGROUND.js >> ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/WELCOME.js >> ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/PC.js >> ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/Platform.js >> ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/HUD.js >> ~/Projects/ChromaJSPort/chroma.js
cat ~/Projects/jaykaron.github.io/scripts/INIT.js >> ~/Projects/ChromaJSPort/chroma.js

date "+build successful at %H:%M:%S"

exit 0
