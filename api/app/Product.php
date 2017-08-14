<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
	protected $fillable = []; 	
	
	public static function all($columns = ['*'])
	{
		return( self::trimToOneImage( parent::all($columns) ) );
	}
	
	private static function trimToOneImage($products)
	{
		foreach($products as $product){
			$product['images'] = explode(',', $product['images'])[0];
		}
		return $products;
	}
	
	public static function getRecommendations($id, $limit, $columns = ['*'])
	{
		$product = self::find($id);
		
		// this will work, but with enough time I would build a neural network to find more targeted recommendations
		$products = self::where([['brand', '=', $product->brand], ['aboveground','=',$product->aboveground], ['id', '!=', $product->id]])
							->orWhere([['type','=',$product->brand], ['aboveground','=',$product->aboveground], ['id', '!=', $product->id]])
							->inRandomOrder()
							->take(5)
							->get();

		// if there aren't at least $limit, merge in random other products
		if(count($products) < $limit) {
			$adtlProducts  = self::where('id', '>', '0')
								->inRandomOrder()
								->take($limit - count($products))
								->get();
			$products = $products->merge($adtlProducts);
		}
		
		return self::trimToOneImage($products);
	}
	
	public static function getCategories()
	{
		return( 
			DB::table('products')
				->select('type')
				->groupBy('type')
				->get() 
		);
	}
}