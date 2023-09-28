pipeline {
    agent any
    environment{
        name='Deep'
    }
    parameters{
        string(name: 'person', defaultValue: 'Joe T', description:"Hello world")
        booleanParam(name: 'isMale', defaultValue: true, description:"")
    }
    stages {
        stage('Run a command') {
            steps {
                sh 'date'
                sh 'pwd'
                sh 'ls'
            }
        }
        stage('Run all commands together') {
            steps {
                sh '''
                date
                pwd
                ls
                cal 2022
                '''
            }
        }
        stage('Print Environment variables') {
            environment{
                username='Walke'
            }
            steps {
                sh 'echo "${name}"'
                sh 'echo "${username}"'
                sh 'echo "${person}"'
            }
        }
        stage('Parameters') {
            steps {
                sh 'echo Parameters'
            }
        }
        stage('Continue ?') {
            input{
                message "Should we continue?"
                ok "Yes we should"
            }
            steps {
                echo 'Test'
                 sh 'echo "${name}"'
                sh 'echo "${username}"'
            }
        }
        stage('Test') {
            steps {
                echo 'Test'
                 sh 'echo "${name}"'
                sh 'echo "${username}"'
            }
        }
        stage('Build') {
            steps {
                echo 'Build'
            }
        }
        stage('Deploy on test') {
            steps {
                echo 'Deploy on test'
            }
        }
        stage('Deploy on prod') {
            steps {
                echo 'Deploy on prod'
            }
        }
    }
    post{
        always{
            echo "Alive"
        }
        success{
            echo "Success"
        }
        failure{
            echo "failure"
        }
    }
}
