# Before

Clone the repository

`npm run install`

# How to run

`npm link` - at root level

`npm link if-endava` where you have your manifest file

The path of the plugins in the yml file would be if-endava (is the same as the name on the package.json)
The methods used would be: 
1. AwsImporter
2. ClimatiqCalculator
3. BoavistaStorage


This is an example where the code was commented and just to log the values inside each plugin
![image](https://github.com/en-andrei-serdulet/test-example/assets/138209444/189ba446-ed5d-4dd1-bbf7-8277e297ea3a)
As you can notice from the image, when we run `npm link if-endava` it will create a node_modules folder where our repository is added by the name **if-endava** this would be the path used in the yml file.
The main file where you export the plugins will be the identifier for each plugin function used in the *method* key in the manifest.
