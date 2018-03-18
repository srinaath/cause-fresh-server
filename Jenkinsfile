pipeline {
  agent {
    node {
      label 'NodeEng'
    }
    
  }
  stages {
    stage('') {
      steps {
        sh 'sh "npm install"'
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
  }
}