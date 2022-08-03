# AWS TEST ARCHITECTURE

- `Node` = 16.x.x

## AWS

- CloudFormation
- CloudFront
- S3
- ApiGateway
- Lambda
- RDS Aurora Serverless
- DynamoDB
- VPC
- EC2
- Secrets Manager
- Cognito

## Hooks (Husky)
- commit = synth (cloudformation template)
- push = test:fns (tests lambdas)

## Architecture
- CDK
  - Services; Deploy on Cloudformation (Stack Services)
- APP
  - FrontEnd
- Backend
  - application:
    - lambda-functions
    - errors
    - helpers
    - middlewares
  - domain:
    - use-cases
    - services
    - contracts:
      - gateways (apis)
      - repos (DB)
  - main:
    - config(envs)
    - sample_events (test local lambdas)
  - infra:
    - gateways (apis)
    - repos
      - dynamodb
      - postgres
  - types = actions for lambdas
- Tests
  - cdk
  - lambda-functions

## Config Enviroment

```sh
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
````


## CDK

```sh
npm install -g aws-cdk

cdk --version

cdk bootstrap aws://AWS_ID/

Other commands:
cdk bootstrap
	Deploys the CDK Toolkit staging stack; see Bootstrapping
cdk deploy
	Deploys the specified stack(s)
cdk destroy
	Destroys the specified stack(s)
cdk diff
	Compares the specified stack with the deployed stack or a local CloudFormation template
cdk metadata
	Displays metadata about the specified stack
cdk init
	Creates a new CDK project in the current directory from a specified template
cdk context
````


## Useful Commands

* `npm install` do this first
* `npm run lint` check code style
* `npm t` run unit tests
* `npm start` run UI application on [localhost](http://localhost:3000)
* `npm run synth` synthesize the CloudFormation template
* `npx cdk bootstrap` prepare your environment
* `npm run deploy` build and deploy your app
* `npm run diff` diff your deployed stack


## Test Local Lambda Function

* `npm run synth` do this first
* `AWS::Lambda::Function` search for
* `Example: getUserFunction29C5D011` example ID lambda
* `sam local invoke lambdaFunction29C5D011 -e backend/main/sample_events/test.json -n backend/main/sample_events/envs/env.json` run local docker with test

## Useful Commands To Test Local Lambda
* Path = `/backend/main/sample_events/terminal-commands.md`
