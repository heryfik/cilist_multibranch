pipeline {
 agent any
	 options {
    buildDiscarder(logRotator(numToKeepStr: '5'))   
  }

 environment {
   GIT_COMMIT_SHORT = sh(returnStdout: true, script: '''echo $GIT_COMMIT | head -c 7''')
   
 }

 stages {
   stage('Prepare .env') {
     steps {
       sh 'echo GIT_COMMIT_SHORT=$(echo $GIT_COMMIT_SHORT) > .env'
        echo ("BRACH = ${env.BRANCH_NAME}")
     }
   }
   stage('Build frontend') {
     steps {
       dir('frontend') {
         sh 'docker build . -t cilist-pipeline-deploy:$GIT_COMMIT_SHORT'
         sh 'docker tag cilist-pipeline-deploy:$GIT_COMMIT_SHORT heryfik/cilist-pipeline-deploy:$GIT_COMMIT_SHORT'
         sh 'docker push heryfik/cilist-pipeline-deploy:$GIT_COMMIT_SHORT'
       }
     }
   }
	 
	 stage('Deploy Front end to remote server') {
     steps {
       sshPublisher(publishers: [sshPublisherDesc(configName: 'Remote Deploy', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '''docker-compose up -d
      
       sleep 40
''', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '.env,docker-compose.yaml')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
     }
   }
 }
}
