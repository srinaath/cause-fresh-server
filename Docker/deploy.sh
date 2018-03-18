#!/bin/sh
 sudo ssh -i CauseFreshNew.pem ubuntu@54.82.33.76 <<EOF
 cd /home/ubuntu/sites/cause-fresh-client
 git pull
 yarn install
 yarn build

cd /home/ubuntu/sites/cause-fresh-server
git pull
 npm install
 cp -R  /home/ubuntu/sites/cause-fresh-client/build ./public

 exit
EOF
