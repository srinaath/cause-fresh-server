#!/bin/sh
 sudo ssh -i ../CauseFreshNew.pem ubuntu@54.82.33.76 <<EOF
 cd /home/ubuntu/sites/cause-fresh-client
 git pull
yarn install
 yarn build
echo "Completed CLient"

echo "started server"
cd /home/ubuntu/sites/cause-fresh-server
git pull
echo "Pulled server"
 npm install
 rm -rf ./public
 echo "Deleted Public"
 cp -R  /home/ubuntu/sites/cause-fresh-client/build ./public
 echo "Copy Complete"
 exit
EOF
