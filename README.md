# Full Stack Developer Project

## Demo
[http://fullstackapp.hau.me](http://fullstackapp.hau.me)


## Profile Project

Requirements
1. Interface
    - Product
        - Detail View
    - Search
    - Analyitics
        - Session Detail
2. Features
    - Cacheing (4-6 hours)
    - Traffic Analytics (Track Session)
    - Extra Credit 3rd party API or feature that enhances the project
    
Data
GET http://www.poolsupplyworld.com/api.cfm  
RESPONSE

	[int, ...]  


GET http://www.poolsupplyworld.com/api.cfm?productid=itemid  
RESPONSE

	{  
		images: [url, ...],  
		description: string,  
		aboveground: bool,  
		id: int,  
		type: string,  
		name: string,  
		brand: string  
	}
	
	
## Technology
To framework or not to framework? That is the question.
If I don't framework I will either have to do a lot more work for the features that I typically expect, like routing and MVC, but potentially allows me to show off more of my own code or vision clearly.

Cacheing: 
1. Redis
2. Memcached
3. MongoDB
4. Custom file based cacheing
5. Elasticsearch
6. MySQL

Redis has a json module, or I can store serialized json in a standard redis object.  
Memcached is really simple to configure and use, but according to critical evaluation redis is better at everything.  
MongoDB supports native json storage and queries are going to be easier to write for searches, but redis is going to be much faster.  
A custom file based cacheing system is easy and very customizeable, but won't provide the me the mechanisms for searching or the speed of memcached. However, a custom search reduces the dependencies and configuration required to stand up this app on another system.  
Elasticsearch would make fulltext searching a breeze, but would be the most complex to set up and configure.  
MySQL is default and built in.  

Portability is a concern for me too. How do I create an ecosystem that requires minimal configuration to get running on a new machine. 


### Ecosystem options
* No frameworks  
    * Pros
        * No libraries obscuring what is entirely my code
    * Cons
        * Probably will require too many hours to produce the desired result
        * May have to re-learn processes that are handled by frameworks.
        * Will have to consider cross browser coding that JS libraries take care of.
* Laravel + jQuery  
    * Pros
        * Should be relatively easy to evaluate
        * Cross browser JS taken care of
    * Cons
        * I have less experience with Laravel so s
* Laravel (lumen?) or ZF3 + Angular 
    * Pros
        * Would allow me to complete the project and more in reasonable time 
        * Highly portable
        * My code would look better because I wouldn't be experimenting with something less familiar.
        * Could easily port to a mobile app through cordova
    * Cons
        * Unfamiliar ecosystem may make evaluating code more difficult
        * Do I really need the bulk of a framework for such simple api calls?
        

### Decision Time
Back-end  
Laravel Homestead Pre-packs everything I need  
Laravel Lumen for API  
MySQL for data because of the standard models  
GuzzleHTTP for requests to poolsupplyworld api

Front-end  
Angular (2)  
Angular Material for Components and Theme  
Covavlent Theme for Layout and varoius components  

Version Control  
Github

Other
SOA


## Minimum viable TO-DO
* Move product api sync to cron job
* Mirror nav on mobile
* Write at least 1 karma test
* Write at least 1 php unit test
* Bugs
     * Add blanks to final row of product listing to prevent oversize

## Things I would do with more time
* Unit testing  
* (Google or FB) authentication to access analytics
* Vagrantfile for portable environment
* Standards appropriate status messages from API
* Data categorization and filtering	from the side-nav
* Proper image carousel in product details 
* Local app-side cacheing
* Complete the spec files in the frontend
* Clean up the layout a lot
* Add mouseover in analytics to show product
* Timeout the session to split revisits


## Installation instructions
This project runs on [laravel homstead](https://laravel.com/docs/5.4/homestead) or requires 
* Git
* Node/NPM
* Composer
* PHP >= 5.6.4
* OpenSSL PHP Extension
* PDO PHP Extension
* Mbstring PHP Extension
* Redis

After you have the dependencies clone the repo 
	
	git clone https://github.com/HexKrak/FullStackApp.git

Then cd into the directory and run composer to install the dependencies

	# Install api dependencies
	cd FullStackApp/api
	composer install
	php artisan migrate
	
	# Install user interface dependencies
	cd ../frontend
	npm install
	
	# Install @angular/cli to serve the app
	npm install @angular/cli -g
	
Create the laravel .env file with the following (api/.env)

	DB_CONNECTION=mysql
	DB_HOST=127.0.0.1
	DB_PORT=3306
	DB_DATABASE=homestead
	DB_USERNAME=homestead
	DB_PASSWORD=secret
	APP_DEBUG=true
	SESSION_DRIVER=file
	API_KEY=<your poolsupplyworld.com API key>
	
Set up your local hosts file with the following records

	192.168.10.10	fullstack.api

If you're running homestead `vagrant up` the virtual box.
Run `ng serve` from your frontend folder.

You should now be able to access http://localhost:4200 from your browser.
	
## Thoughts and notes
For SEO implimenting a node server, or using a service like prerender.io to render the pages would be paramount.
Unless I impliment pagination there's no benefit to fetching and cacheing individual items. I'm better off creating a syncronization with my local DB rather than a traditional cacheing model.  
Lumen doesn't have session capabilites built in, this forces me to comply with stateless distributed app models, so I'll have to generate some sort of token for the client to use to identify and track unique client sessions.  
CORS in lumen really should be built in considering what it's designed for, but after some experimentation with some custom middleware I found  Barryvdh\Cors to be incredibly standards compliant and verbose. 
Homestead doesn't seem to have any way to serve vanilla html and using their proxy with ng serve seems to have some sort of conflict. I'll revert to having the user run the frontend locally and lavarval on homestead or an enabled webserver. I'd much rather it be in one box, but that will require forking the homestead repo and adding additional scripting.
An issue with uglify-js v3 requires using a 2.x version. Added to package file because as a dependency it installs 3.x.  
Rebuilding the angular app kills the service temporarilly. For continuious delivery I'd need to build in a parallell folder then transfer over to the live site.  
4K Optomization might be even more tricky than mobile  


## Installation notes: DigitalOcean Fedora 26
	yum -y update
	yum install php nginx composer git openssl php-pdo php-mbstring redis mariadb mariadb-server php-fpm php-memcached memcached
	#nodejs version is way behind here, installing node version manager
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
	#use nvm to install current version of node
	nvm install node
	#install @angular/cli globally, can be done locally if necessary, but makes refrencing `ng` easier
	npm install @angular/cli -g
    cd /var/www/
    git clone https://github.com/HexKrak/FullStackApp.git
    cd FullStackApp/frontend
    npm install
    ng build --prod #I actually had to upgrade my droplet temporarilly here to get enough ram to do the build
    cd ../api
    composer install
    vi .env #paste in .env config
    php artisan migrate
    vi /etc/nginx/conf.d/fullstackapp.conf #paste in conf from FullStackApp/resources/nginx-site.conf
    #put selinux in permissive or create semodules and install them

## Testing
Test top to bottom.
* Do the routes return expected responses
* Does the controler return what it should independant of services
* Do the services return expected results independant of data layer
* Does the data layer return expected results
	