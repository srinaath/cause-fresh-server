#!/bin/sh
 sudo ssh -i ../CauseFreshNew.pem ubuntu@54.82.33.76 <<EOF
 cd /home/ubuntu/sites/cause-fresh-client
 git checkout develop
 git pull
yarn install
 yarn build
echo "Completed Client Pull and build"

echo "started server"
cd /home/ubuntu/sites/cause-fresh-server
git checkout develop
git pull
echo "Pulled server"
 npm install
 rm -rf ./public
 echo "Deleted Public"
 cp -R  /home/ubuntu/sites/cause-fresh-client/build ./public
 echo "Copy Complete"
 exit
EOF
