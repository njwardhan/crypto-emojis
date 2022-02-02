rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "favicon added"
git push origin main