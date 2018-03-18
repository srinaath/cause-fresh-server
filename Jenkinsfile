pipeline {
  agent {
    node {
      label 'CauseFreshNewest'
    }
    
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm install'
        sh 'npm start'
      }
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
  }
}