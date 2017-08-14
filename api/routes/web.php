<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

//product routes
// get product list
$app->get('/product', 'ProductController@getProductList');
// get all available product categories
$app->get('product/categories', 'ProductController@getCategories');
// get product details
$app->get('/product/{id}', 'ProductController@getProductDetails');
// get product reccomendations based on ID
$app->get('product/{id}/recommendations', 'ProductController@getRecommendations');

// session routes
// get session list
$app->get('/session', 'SessionController@getSessionList');
// create event
$app->post('/session/event', 'SessionController@createEvent');
// get event list
$app->get('/session/event/{sessionId}', 'SessionController@getEventBySessionId');
