pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'YOUR_DOCKERHUB_USERNAME'   // change this
    DOCKERHUB_CREDS = 'DockerCred'               // Jenkins credentials ID
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
          sh "docker build -t ${DOCKERHUB_USER}/user-service:${BUILD_TAG} ./services/user-service"
          sh "docker build -t ${DOCKERHUB_USER}/order-service:${BUILD_TAG} ./services/order-service"
        }
      }
    }

    stage('Login & Push to Docker Hub') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDS}", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
            sh "docker push ${DOCKERHUB_USER}/user-service:${BUILD_TAG}"
            sh "docker push ${DOCKERHUB_USER}/order-service:${BUILD_TAG}"
          }
        }
      }
    }

    stage('Deploy Using Docker Compose') {
      steps {
        script {
          sh "docker-compose down || true"
          sh "TAG=${BUILD_TAG} docker-compose up -d --no-build"
        }
      }
    }

    stage('Verify Deployment') {
      steps {
        script {
          sleep 5
          sh "curl -sS http://localhost:3001/health || (echo 'user-service unhealthy' && exit 1)"
          sh "curl -sS http://localhost:3002/health || (echo 'order-service unhealthy' && exit 1)"
        }
      }
    }
  }

  post {
    success {
      echo '✅ Pipeline completed successfully!'
    }
    failure {
      echo '❌ Pipeline failed! Check console logs.'
    }
  }
}
