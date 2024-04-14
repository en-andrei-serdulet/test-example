# AwsImporter

The AwsImporter plugin allows users to input essential details concerning an Amazon Web Services (AWS) virtual machine. This information is then leveraged to automatically populate usage metrics in your manifest. These metrics can be seamlessly transmitted through a plugin pipeline, aiding in monitoring disk, memory and CPU utilization.

### 1. Create an AWS VM instance
You can create one using [console.aws.amazon.com](https://console.aws.amazon.com/console/home).  <br/>

<b>Note:</b> 
For our porposes we used an Amazon Linux AMI. (amazon/al2023-ami-2023.3.20240312.0)

### 2. Create readonly user

Create an IAM user without console access. This will allow read only access to the required metrics. 
Assign to the user only the following AWS Managed policies: 
1. CloudWatchReadOnlyAccess
2. AmazonEC2ReadOnlyAccess  

Export the access keys and store them safely. Will be needed at step 6. 

### 3. Create a IAM role to allow EC2 to push data to CW
Create an IAM role and assign it the AWS Managed policy "CloudWatchAgentServerPolicy". Add a Trust Relationship as described below. 
<details>
<summary>IAM Trust Relationship</summary>
<br>

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": {
                "Service": "ec2.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
```

</details>

### 4. Configure CloudWatch agent 
Install cloudwatch agent on the VM. Use the relevant command based on your distribution of Linux. You can use the [AWS Cloudwatch Agent Configuration wizard](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/create-cloudwatch-agent-configuration-file-wizard.html)

The cloudwatch agent config looked like this for us (by default is should be /opt/aws/amazon-cloudwatch-agent/bin/config. json if you used the wizard):
<details>
<summary>Cloudwatch Agent Configuration</summary>
<br>

```json
{
    "agent": {
        "metrics_collection_interval": 60,
        "run_as_user": "cwagent"
    },
    "metrics": {
        "namespace": "CloudwatchAgentMetrics",
        "append_dimensions": {
            "ImageId": "${aws:ImageId}",
            "InstanceId": "${aws:InstanceId}",
            "InstanceType": "${aws:InstanceType}"
        },
        "metrics_collected": {
            "cpu": {
                "measurement": [
                    "cpu_usage_user",
                    "cpu_usage_system"
                ],
                "metrics_collection_interval": 60,
                "totalcpu": true,
                "resources": [
                    "*"
                ]
            },
            "disk": {
                "measurement": [
                    "used_percent",
                    "free",
                    "used",
                    "total"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ]
            },
            "diskio": {
                "measurement": [
                    "io_time"
                ],
                "metrics_collection_interval": 60,
                "resources": [
                    "*"
                ]
            },
            "mem": {
                "measurement": [
                    "mem_used_percent",
                    "mem_available_percent"
                    "mem_total"
                ],
                "metrics_collection_interval": 60
            },
            "swap": {
                "measurement": [
                    "swap_used_percent"
                ],
                "metrics_collection_interval": 60
            }
        }
    }
}
```

</details>

### 5. (Optional) Check the metrics in AWS Cloudwatch

See [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/PublishMetrics.html#ViewGraphs) for more details.

### 6. Add credentials to `.env`

To manage your AWS authentication details securely, you can create a file called .env in the main directory of your project. This file serves as a convenient location to store sensitive information like access keys and secret keys. By storing this information in a dedicated file, you can easily access and manage your AWS authentication details across your project.

In the .env file, you'll define key-value pairs for your AWS credentials, following a specific format. For example:

```txt
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```

Replace your_access_key_id and your_secret_access_key with your actual AWS access key ID and secret access key, respectively. Remember to keep this file secure and never expose it publicly, as it contains sensitive information that grants access to your AWS resources.


## Node config

- `aws-importer`: Specifies configurations related to AWS importing process
  - `tag`: Set instance tag
  - `location`: Specifies the AWS region
  - `aws-observation`: Sets the observation period for AWS metrics in seconds. This defines how frequently metrics are collected and analyzed
  - `aws-services`: Determines the final output if we want the ec2, ebs or both to be received
- `metric`: Contains configurations related to metrics.
  - `cloudwatch-namespace`: Defines the namespace for CloudWatch metrics. The namespace is used to categorize metrics, making it easier to organize and manage them.
  - `client-namespace`: Specifies the namespace for the AWS EC2 client. This namespace is used to identify the AWS service to which the client belongs.

## Inputs

Please ensure to include the details of your virtual machine in the designated `inputs` field within your `manifest`. This section requires the following essential information:

- `timestamp`: Provide an ISO8601 `timestamp` representing the beginning of your observation period. By adding the `duration` to this initial `timestamp`, we determine the end time of your observation period.
- `duration`: Specify the `duration` of your observation period in seconds. This `duration` value is added to the `timestamp` to calculate the end time of your observation period.

All of these details are given as `inputs`. Additionally, you'll need to set up an instance of the `aws-importer` plugin to manage the specific `input` data for AWS. Below is an example of how a fully configured manifest:

```yaml
name: aws-importer
description: example manifest utilizing the AWS plugin
tags: null
initialize:
  plugins:
    aws-importer:
      method: AwsImporter
      path: 'aws-importer'
      global-config:
        aws-importer:
          tag: 'GreenSoftware'
          location: eu-central-1
          aws-services: 'ec2, ebs'
          aws-observation: 60
        metric:
          cloudwatch-namespace: 'CloudwatchAgentMetrics'
          client-namespace: 'AWS/EC2'
  outputs: ['yaml']
tree:
  children:
    child:
      pipeline:
        - aws-importer
      inputs:
        - timestamp: '2024-03-26T14:08:00.000Z'
          duration: 3600
```

The input will grab AWS metrics for 3600 seconds (1 hour) period beginning at 14:08 UTC on 26th March 2024

Execute the following command from the project root to run the unit tests
```sh
npm run test-aws-importer
```

## Outputs

The AWS importer plugin will enhance the information in your `manifest` by adding the following shared details:

- `timestamp`: the per-input `timestamp`
- `duration`: the per-input `duration` in seconds
- `location`: VM region, which is added as a global config
- `geolocation`: VM region geolocation
- `cloud/vendor`: VM instance vendor
- `cloud/service`: VM instance service
- `cloud/instance-type`: VM instance name

For each result, there is aditional data. It can contains utilization or storage details:

- `memory/utilization`: percentage memory utilization
- `cpu/utilization`: percentage CPU utilization
Or:
- `storage/type`: storage type
- `storage/capacity`: storage capacity

If there is one virtual machine, the outputs will look as follow:

```yaml
outputs:
  - timestamp: '2024-03-26T14:08:00.000Z'
    duration: 3600
    location: eu-central-1
    geolocation: 50.1213155,8.471759
    cloud/vendor: aws
    cloud/service: ec2
    cloud/instance-type: t2.micro
    memory/utilization: 0.6914698759172085
    cpu/utilization: 0.9272994995117188
  - timestamp: '2024-03-26T14:08:00.000Z'
    duration: 3600
    location: eu-central-1
    geolocation: 50.1213155,8.471759
    cloud/vendor: aws
    cloud/service: ebs
    storage/type: ssd
    storage/capacity: 8
```

Executing the following command from the project root:

```sh
npm install
ie --manifest ./examples/manifests/aws-importer.yml --output ./examples/manifests/aws-importer-computed.yml
```

The results will be saved to a new `yaml` file in `./examples/manifests`.
