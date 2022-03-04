rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "test fix"
git push origin main