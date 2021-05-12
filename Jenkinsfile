pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo '*** START BUILD ***'
                sh 'npm install'
                sh 'npm run build --prod'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
