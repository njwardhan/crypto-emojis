rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "tested contract"
git push origin main