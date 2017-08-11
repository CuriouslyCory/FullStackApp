<?php

namespace App\Http\Controllers;

use App\Product;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
	const API_PATH = "http://www.poolsupplyworld.com/api.cfm";
	
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Retrieve the product list
     *
     * @param  int  $id
     * @return Response
     */
    public function getProductList()
    {
    	// Check to see if the data needs to be refreshed
    	// This needs to be moved to a queued job
    	if(!$this->checkIntegrety()){
    		$this->refreshProducts();
    	}
    	
    	// Retrieve the data from the local MySQL DB
    	$productList = Product::all();
    	return response()->json($productList);
    }

    /**
    * Retrieve the product for the given ID.
    *
    * @param  int  $id
    * @return Response
    */
    public function getProductDetails($id)
    {
    	// Query local db for individual product
    	return Product::find($id);
    }
    
    /**
     * Retrieve the timeestamp of the current set.
     *
     * @param  int  $id
     * @return Response
     */
    private function checkIntegrety()
    {
    	
    	$products = Product::where('id', '>' , 1)
		    				->take(1)
		    				->get();
    	
    	// No products, no integrety
    	if($products->count() < 1){
    		return false;
    	}
    	
//     	foreach($products as $product){
//     		var_dump($product);
//     	}
//     	die();
    }
    
    /**
     * Truncate and refresh the products table
     * 
     * What would  happen if this got triggered by two processes at once?
     * 
     * @return boolean 
     */
    private function refreshProducts()
    {
    	// Retrieve a current product set from the API
    	$products = $this->getApiData();
    	
    	// Now that we have products, truncate the table
    	$this->truncateTable();
    	
    	// Insert new products
    	$this->insertProducts($products);
    	
    }
    
    /**
     * Retrieve product data from the api and refresh the DB
     * 
     * I really feel like this should be  in a provider rather than the controller
     * After testing, this really needs to become a job not something inline, data takes too long to query from api
     * 
     * @return void
     */
    private function getApiData()
    {
    	// empty array for new products
    	$products = [];
    	
    	$client = new Client();
    	$res = $client->request('GET', self::API_PATH, [
    			'headers' => [
    					'authkey' => env('API_KEY')
    			]
    	]);
    	
    	$result= json_decode($res->getBody());
    	if(count($result) > 0){
    		foreach($result as $key => $productId){
    			$prodResult = $client->request('GET', self::API_PATH . "?productid=" . $productId, [
    					'headers' => [
    							'authkey' => env('API_KEY')
    					]
    			]);
    			
    			// TO-DO: add fault checking here
    			$products[] = json_decode($prodResult->getBody());
    		}
    	}
    	
    	return $products;

    }
    
    /**
     * Save product array into table
     * 
     * @param unknown $products
     * @return void
     */
    private function insertProducts($products)
    {
    	Product::insert($products);
    }
    
    /**
     * Truncate the products table
     * 
     * @return void
     */
    private function truncateTable()
    {
    	Product::truncate();
    }
}
