<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

use App\Http\Controller\ProductController;

class ProductControllerTest extends TestCase
{
    /**
     * Test the result of calling the get product list.
     *
     * @return void
     */
	public function testGetProductListResponseHasResults()
    {
    	// check that there's aproducts array
    	$this->json('GET', '/product')
	    	->seeJson([
	    			'id' => 2170,
	    	]);
    }
    
    /**
    * Test the result of calling the get product details.
    *
    * @return void
    */
    public function testGetProductDetailsResponseHasResults()
    {
    	// check that the correct product was returned
    	$this->json('GET', '/product/2170')
    	->seeJson([
    			'name' => '280 Pressure Side Automatic Pool Cleaner',
    	]);
    	
    }
    
    /**
     * Test the result of calling the get recommendations
     *
     * @return void
     */
    public function testGetRecommendationsResponseHasResults()
    {
    	// since this is a cleaner, there should be at least 1 cleaner in the recommendations
    	// this would potentially fail if there were more products in the database and should be refined further based on results
    	$this->json('GET', '/product/2170/recommendations')
    	->seeJson([
    			'type' => 'cleaner',
    	]);
    	
    }
    
    /**
     * Test the result of calling get categories
     * 
     * @return void
     */
    public function testGetCategoriesResponseHasResults()
    {
    	// check that there is at least one known category in the list
    	$this->json('GET', '/product/categories')
    	->seeJson([
    			'type'=>'cleaner'
    	]);
    }
    
    /**
     * Test the result of calling get categories
     *
     * @return void
     */
    public function testCheckIntegrity()
    {
    	// check that there is at least one known category in the list
    	$response = $this->get('ProductController@checkIntegrity');
    	
//     	var_dump($response->getContent());
    }
    
    
    
}
