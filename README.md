# Quizorama
This simple web application is made by deploying directly on AWS Elastic Beanstalk, with setup done via Cloud9 CLI. This is a modified version of the Quizlet by allowing multiple choice questions for each of the questions. This project was done in two ways: variations of deployement policies on EC2 and provisioned images via ECR and Docker. 

## Deployement on EC2 Instance ##
Initially, there was a few sequence of commands used to deploy it directly on EC2 instance. Then, the Elastic Beanstalk (EB) configurations were triggered and done through .ebextensions config files. Various forms of deployement for in-place (within the scope of EB) such as rolling, all at once, and immutable. Blue/Green deployements were also tried using the swap URLs by building a clone for the EB made. It was a common observation that immutable and blue/green took way longer than all at once but preferred as the safest option. 

Here's the list of commands to run it on EC2 instance. These should be executed on Cloud9 CLI:


`
curl -s http://169.254.169.254/latest/meta-data
curl -s http://169.254.169.254/latest/meta-data
`
