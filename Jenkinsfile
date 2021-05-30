pipeline {
    agent any
  
    environment {        
        SSH_SERVER_CREDENTIAL_ID = "bad-laptop"
    }

    stages {
        stage('Build') {
            steps {
                echo '*** START BUILD ***'
              script {
                 if(isUnix()) {
                sh 'npm install'
                sh 'npm run build --prod'
              } else {
                bat 'npm install'
                bat 'npm run build --prod'
              }
              }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo '*** START DEPLOY ***'
                script {
                    sshPublisher(
                        continueOnError: false, 
                        failOnError: true,
                        publishers: [
                            sshPublisherDesc(
                                configName: SSH_SERVER_CREDENTIAL_ID,
                                transfers: [
                                    sshTransfer(
                                        sourceFiles: '**/dist/*',
                                        removePrefix: 'dist',
                                        remoteDirectory: 'jenkins-deploy-test'
                                    ),
//                                     sshTransfer(
//                                         sourceFiles: '/wars/**/*.war',
//                                         removePrefix: 'wars',
//                                         remoteDirectory: 'jenkins-deploy-test'
//                                     )
                                ],
                                verbose: true
                            )
                        ]
            )
                }
                echo '*** END DEPLOY ***'
          }
        }
    }
}
