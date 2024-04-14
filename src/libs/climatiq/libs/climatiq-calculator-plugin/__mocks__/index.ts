export const mockGlobalConfig = {
  'use-energy-sum': true,
  'use-carbon-sum': true,
  'include-carbon-emissions': true,
  'include-carbon-intensity': true,
}

export const mockInputs = [
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ec2',
    'cloud/instance-type': 't2.micro',
    'memory/utilization': 0.9272994995117188,
    'cpu/utilization': 0.6914698759172085,
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ec2',
    'cloud/instance-type': 't2.micro',
    'memory/utilization': 0.9272994995117188,
    'cpu/utilization': 0.7249047606754452,
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ec2',
    'cloud/instance-type': 't2.micro',
    'memory/utilization': 0.9272994995117188,
    'cpu/utilization': 0.6806377495925492,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
  },

  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: '3600',
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
  },
];

export const mockOutputs =  [
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
    energy: 0.0000109,
    carbon: 0.000004224,
    'carbon-intensity': 387.52293577981646
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
    energy: 0.00009222,
    carbon: 0.00003575,
    'carbon-intensity': 387.65994361309913
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
    energy: 0.0000109,
    carbon: 0.000004224,
    'carbon-intensity': 387.52293577981646
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
    energy: 0.00009222,
    carbon: 0.00003575,
    'carbon-intensity': 387.65994361309913
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'hdd',
    'storage/capacity': 125,
    energy: 0.00009222,
    carbon: 0.00003575,
    'carbon-intensity': 387.65994361309913
  },
  {
    timestamp: '2024-03-26T14:08:00.000Z',
    duration: 3600,
    location: 'eu-central-1',
    geolocation: '50.1213155,8.471759',
    'cloud/vendor': 'aws',
    'cloud/service': 'ebs',
    'storage/type': 'ssd',
    'storage/capacity': 8,
    energy: 0.0000109,
    carbon: 0.000004224,
    'carbon-intensity': 387.52293577981646
  }
]