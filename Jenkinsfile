pipeline{
    agent any

    options {
        timestamps()
        skipDefaultCheckout()
    }

    environment {
        VITE_API_URL = 'http://localhost:8000'
    }

    stages {
        stage('Checkout') {
            deleteDir()
            checkout scm
        }
        stage('Environment') {
            nodejs(
                nodeJSInstallationName: 'NodeJS 22',
            ) {
                sh '''
                    echo "Node version: $(node -v)"
                    echo "NPM version: $(npm -v)"
                '''
            }
        }
        stage('Install dependencies') {
            nodejs(
                nodeJSInstallationName: 'NodeJS 22',
            ) {
                sh '''
                    npm ci
                '''
            }
        }
        stage('Lint') {
            step {
                nodejs(
                    nodeJSInstallationName: 'NodeJS 22',
                ) {
                    sh '''
                        npm run lint
                    '''
                }
            }
        }
        stage('Build') {
            nodejs(
                nodeJSInstallationName: 'NodeJS 22',
            ) {
                sh '''
                    npm run build
                '''
            }
        }
        stage('Verify Artifacts') {
            nodejs(
                nodeJSInstallationName: 'NodeJS 22',
            ) {
                sh '''
                    test -f dist/index.html

                    echo "Conteúdo do artefato:"
                    find dist -maxdepth 2 -type f | sort
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts(
                artifacts: 'dist/**/*',
                fingerprint: true,
                onlyIfSuccessful: true
            )

            echo 'Frontend CI aprovada.'
        }

        failure {
            echo 'Frontend CI falhou.'
        }
    }
}