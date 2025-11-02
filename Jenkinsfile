pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'ayushnayak123'    // change to your username
    DOCKERHUB_CREDS = 'DockerCred'
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
        script {
          bat "docker build -t %DOCKERHUB_USER%/user-service:%BUILD_TAG% ./services/user-service"
          bat "docker build -t %DOCKERHUB_USER%/order-service:%BUILD_TAG% ./services/order-service"
        }
      }
    }

    stage('Login & Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            bat """
              echo %PASSWORD% | docker login -u %USERNAME% --password-stdin
              docker push %DOCKERHUB_USER%/user-service:%BUILD_TAG%
              docker push %DOCKERHUB_USER%/order-service:%BUILD_TAG%
            """
          }
        }
      }
    }

    stage('Deploy Using Docker Compose') {
      steps {
        script {
          bat "docker compose down || exit 0"
          bat "set TAG=%BUILD_TAG% && docker compose up -d --no-build"
        }
      }
    }

    stage('Verify Deployment') {
      steps {
        script {
          sleep 5
          bat "curl -sS http://localhost:3001/health"
          bat "curl -sS http://localhost:3002/health"
        }
      }
    }
  }

  post {
    success { echo "✅ Pipeline completed successfully!" }
    failure { echo "❌ Pipeline failed! Check console output." }
  }
}
