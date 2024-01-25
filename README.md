Name: Lou Zhanzhi A0288570R
**Rails part**

First make sure you have ruby on rails properly set up, this project is built on rails 7.1.2

After downloading the file, in your terminal, cd to current folder, and run

```bundle install```

then run 
```rails db:create```
and 
```rails db:migrate```

Finally, run 

```rails s```

make sure it runs on http://127.0.0.1:3000

**React part**

run 
```yarn install```
to install necessary dependancies.

Then, run 
```yarn start``` 
and type y to let it run on localhost:3001.

***If for some reason you are not able to run the backend on http://127.0.0.1:3000, remember to go to react part, package.json line 5 and change "proxy" to the address your backend is running on.***

After your app is running, to gain full access for CRUD operations, please first sign up using username "admin", and then login using "admin". Non-admin users are not given access to delete posts that are not created by them.

