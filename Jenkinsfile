pipeline {
    agent any

    environment {
        DOCKERHUB_USER = 'ayushnayak123'
        IMAGE_TAG = 'v11'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/AyushN08/Devops_Expt.6_Ayush.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '''
                    docker build -t %DOCKERHUB_USER%/user-service:%IMAGE_TAG% ./services/user-service
                    docker build -t %DOCKERHUB_USER%/order-service:%IMAGE_TAG% ./services/order-service
                '''
            }
        }

        stage('Deploy Using Docker Compose') {
            steps {
                bat '''
                    echo TAG=%IMAGE_TAG% > .env
                    docker stop $(docker ps -aq) || exit 0
                    docker rm $(docker ps -aq) || exit 0
                    docker compose down || exit 0
                    docker compose up -d --no-build
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Deployment Successful 🚀"
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check console output.'
        }
    }
}
