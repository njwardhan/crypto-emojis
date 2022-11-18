rsync -r src/ docs/
rsync build/contracts/* docs/
git add .
git commit -m "Goerli testnet deployment"
git push origin main