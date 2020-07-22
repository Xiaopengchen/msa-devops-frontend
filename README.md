# msa-devops-frontend

Website URL:
https://msa-devops-2020-06-xche836.azurewebsites.net


Description of build and release pipeline:

the pipeline runs on a Linux agent. the pipeline only run when a commit is pushed to the master and develop branch.

the rootDir variable contains the string 'my-app' and the buildDir variable contains the string 'my-app/build'.

The first task finds, downloads and caches the version of Node.js in version 10.x.

Then we build our react app using the commands in -scripts. We changes to the root directory 'my-app'. The "npm install" installs the packages and the "npm run build" builds the app and puts the production ready build in the "build" folder in our current directory ("my-app").

Then we zip the folder through - task: ArchiveFiles@2.

Finally, the last task lookd in the '$(Build.ArtifactStagingDirectory)' and publish the zip in that directory.
