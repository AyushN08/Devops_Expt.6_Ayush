pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'ayushnayak123'
    BUILD_TAG = "v${env.BUILD_NUMBER}"
  }

  stages {

    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Images') {
      steps {
        bat """
        docker build -t %DOCKERHUB_USER%/user-service:%BUILD_TAG% ./services/user-service
        docker build -t %DOCKERHUB_USER%/order-service:%BUILD_TAG% ./services/order-service
        """
      }
    }

    stage('Deploy Using Docker Compose') {
      steps {
        bat """
        echo TAG=%BUILD_TAG% > .env
        docker compose down || exit 0
        docker compose up -d --no-build
        """
      }
    }

    stage('Verify Deployment') {
      steps {
        bat """
        curl -s http://localhost:3001/health
        curl -s http://localhost:3002/health
        """
      }
    }
  }

  post {
    success {
      echo "✅ Pipeline completed successfully (Build-only, no push)!"
    }
    failure {
      echo "❌ Pipeline failed! Check console output."
    }
  }
}
