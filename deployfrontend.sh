rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "code cleanup"
git push origin main