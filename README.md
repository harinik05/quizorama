# Quizorama
This simple web application is made by deploying directly on AWS Elastic Beanstalk, with setup done via Cloud9 CLI. This is a modified version of the Quizlet by allowing multiple choice questions for each of the questions. This project was done in two ways: variations of deployement policies on EC2 and provisioned images via ECR and Docker. 

## Deployement on EC2 Instance ##
Initially, there was a few sequence of commands used to deploy it directly on EC2 instance. Then, the Elastic Beanstalk (EB) configurations were triggered and done through .ebextensions config files. Various forms of deployement for in-place (within the scope of EB) such as rolling, all at once, and immutable. Blue/Green deployements were also tried using the swap URLs by building a clone for the EB made. It was a common observation that immutable and blue/green took way longer than all at once but preferred as the safest option. 

Here's the list of commands to run it on EC2 instance. These should be executed on Cloud9 CLI:

### Configurations for EC2 ###
`
curl -s http://169.254.169.254/latest/meta-data
`

This will return the address for the mac:

`
curl -s http://169.254.169.254/latest/meta-data/mac
`

This is used to redirect to the security groups or ipv4

`
curl -s http://169.254.169.254/latest/meta-data/mac/address 
`

`
curl -s http://169.254.169.254/latest/meta-data/mac/address/security-group-ids 
`

Open up the port on web for the security group so that your IP can access and run the website:

`
aws ec2 authorize-security-group ingress --group-id sg-XXX --port 8080 --protocol tcp --cidr youripxx/32
`


`
aws ec2 describe-security-groups --group-ids sg-xx --output-text --filters Name=ip-permission.to-port,values=8080
`

`
Port 8080: npm start
`

To see the results of this, head to publicipv/8080.This can be placed on git by using git init command

### Configurations for EB ###
Complete the installation for EB using git clone EBLinkxxx. These are the commands used to deploy on EB:
1. `eb init`: Region, repo on codecommit, files for .ebextensions
2. `eb create --single`: Creates an EC2 instance instead of spinning up an ELB. This means that its a single-instance web environment type, so we will not be able to do rolling or rolling with additional batch (because they require ELB)
3. `eb status`: view the health information (grey in progress, green is done), instance pops up (CName to view the website)
4. `eb logs`: You can see if the app started here
5. `eb events`
6. `eb deploy`: After you make some changes to the code, commit to git and deploy

To run the immutable or all at once, you can modify the rolling.config file. To implement blue/green deployement, git clone and swap url under actions. This can also be done on command line:

`
eb swap quizoroma --destination-name quizoroma-clone
eb terminate quizoroma
`

#### Debugging ####
Sometimes, it may state that aws eb service role is not available. In that case, create a test env and terminate it. Complete eb create again to sort out this issue in IAM


## Deployement on Docker ##
Apart from the DockerFile, you can run on Docker by building an image there. This can be connected to ECR repository


`
docker build --quiroroma
`

Create a repo on ECR and authenticate via JSON web token for temp credentials
`
aws ecr get-login-password | docker login --username AWS --password -stdin accountnoxxx.dkr.ecr.us-east-1.amazonaws.com/quizoroma
`


Get the image id:
`
docker images
`


`
docker tag docker_idxxx accountnoxxx.dkr.ecr.us-east-1.amazonaws.com/quizoroma
`

#### Debugging ####
Give IAM role permission to read ECR


