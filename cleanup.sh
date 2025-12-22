#!/bin/bash

# Clean up old static files - keep only Next.js app
rm -f index.html
rm -f script.js
rm -f style.css
rm -f sw.js
rm -f next.config.js
rm -f favicon.ico
rm -f manifest.json
rm -rf fonts
rm -rf libs

echo "Cleanup complete! Old static files removed."
echo "Next.js app is ready to go."
