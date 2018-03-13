FROM node:8.9

LABEL maintainer = Srinaath Ravichandran

EXPOSE 4000

ENV JENKINS_HOME /var/jenkins_home

VOLUME jenkins-data /var/jenkins_home
VOLUME /var/run/docker.sock /var/run/docker.sock
VOLUME "$HOME" /home
