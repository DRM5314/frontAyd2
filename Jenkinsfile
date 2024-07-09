pipeline{
        agent any
        tools {
                nodejs 'node'
            }
        environment {
                EMAIL = 'davidrodolfo-martinezmiranda@cunoc.edu.gt'
                SSH_KEY = credentials('key-ec2-deploy')
                EC2_INSTANCE = 'ubuntu@ec2-52-203-218-219.compute-1.amazonaws.com'
                PATH_TO_DIST = '/var/lib/jenkins/workspace/CI-CD-FRONT/dist'
                REMOTE_PATH = '/home/ubuntu'
        }
        stages {
        stage('Clean Workspace') {
            steps {
                script {
                    // Eliminar solo archivos y carpetas específicos
                    sh 'rm -rf ./dist' // Eliminar la carpeta de distribución, por ejemplo
                    sh 'rm -rf ./node_modules' // Eliminar las dependencias instaladas, si es necesario
                }
            }
        }
       stage('Clone-Repository') {
           steps {
               git branch: "main", url: 'https://github.com/DRM5314/frontAyd2.git'
               echo 'Repo clone successful'
           }
        }
        stage("npm install") {
            steps{
                sh 'npm install'
            }
          }

        stage('Package') {
            steps {
                sh 'npx ng build --configuration production --verbose'
                echo 'stage for build'
            }
        }

     stage('Deploy') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'key-ec2-deploy', keyFileVariable: 'SSH_KEY')]) {
                script {
                        sh """
                        
                        scp -v -o StrictHostKeyChecking=no -i $SSH_KEY -r $PATH_TO_DIST $EC2_INSTANCE:$REMOTE_PATH
                        
                        """
                    }
                }
            }
        }


       }
        post {
            failure {
                emailext(
                    subject: "- Build # $BUILD_NUMBER - ${currentBuild.currentResult}! in branch",
                    mimeType: 'text/html',
                    to: "${env.EMAIL}",
                    body: " - Build # $BUILD_NUMBER - ${currentBuild.currentResult}:\n\n\t\tCheck console output at $BUILD_URL to view the results."
                )
            }
            success {
                emailext(
                    subject: "- Build # $BUILD_NUMBER - ${currentBuild.currentResult}!",
                    mimeType: 'text/html',
                    to: "${env.EMAIL}",
                    body: " - Build # $BUILD_NUMBER - ${currentBuild.currentResult}:\n\n\t\tCheck console output at $BUILD_URL to view the results."
                )
            }
    }

}
