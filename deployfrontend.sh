rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "gitignore update"
git push origin main