# Full Stack Developer Project

## 1. Profile Project

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
	
## 2. Technology
To framework or not to framework? That is the question.
If I don't framework I will either have to do a lot more work for the features that I typically expect, like routing and MVC, but potentially allows me to show off more of my own code or vision clearly.

Cacheing: 
1. Redis
2. Memcached
3. MongoDB
4. Custom file based cacheing
5. Elasticsearch

Redis has a json module, or I can store serialized json in a standard redis object.  
Memcached is really simple to configure and use, but according to critical evaluation redis is better at everything.  
MongoDB supports native json storage and queries are going to be easier to write for searches, but redis is going to be much faster.  
A custom file based cacheing system is easy and very customizeable, but won't provide the me the mechanisms for searching or the speed of memcached. However, a custom search reduces the dependencies and configuration required to stand up this app on another system.  
Elasticsearch would make fulltext searching a breeze, but would be the most complex to set up and configure.

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
Redis for data

Front-end
Angular (2)
Angular Material for Components and Theme
Covavlent Theme for Layout and varoius components

Version Control
Store in Github

Other
Test Driven Design
SOA


## 3. Things I want to do
* Unit testing  
* Google authentication to access analytics


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
	
	git clone https://github.com/HexKrak/FullStackProject.git

Then cd into the directory and run composer to install the dependencies

	cd FullStackProject
	composer install
