rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "hosting"
git push origin main