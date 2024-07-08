pipeline{
        agent any
        tools {
                nodejs 'node'
            }
        environment {
                EMAIL = 'davidrodolfo-martinezmiranda@cunoc.edu.gt'
                SSH_KEY = credentials('key-ec2-deploy')
                EC2_INSTANCE = 'ubuntu@ec2-3-80-117-32.compute-1.amazonaws.com'
                PATH_TO_JAR = '/var/lib/jenkins/workspace/ci-cd-front/target/library-0.0.1-SNAPSHOT.jar'
                REMOTE_PATH = '/home/ubuntu/library-0.0.1-SNAPSHOT.jar'
        }
        stages {

       stage('Clone-Repository') {
           steps {
               git branch: "mains", url: 'https://github.com/DRM5314/frontAyd2.git'
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
                echo 'stage for build'
            }
        }

     stage('Deploy') {
            when {
                expression {
                    return env.BRANCH_NAME == 'master'
                }
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'key-ec2-deploy', keyFileVariable: 'SSH_KEY')]) {
                script {
                        sh """
                        ssh -i $SSH_KEY $EC2_INSTANCE 'sudo pkill -f "java -jar $REMOTE_PATH"'
                        scp -v -o StrictHostKeyChecking=no -i $SSH_KEY  $PATH_TO_JAR $EC2_INSTANCE:$REMOTE_PATH
                        ssh -v -o StrictHostKeyChecking=no -i $SSH_KEY $EC2_INSTANCE 'sudo java -jar $REMOTE_PATH --spring.profiles.active=master > /dev/null 2>&1 &'
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
