pm2 delete t08lega-web
git checkout develop
git pull
rm -rf .next
unzip -o deploy_package.zip
rm -f deploy_package.zip
pm2 start ecosystem.config.cjs