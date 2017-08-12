<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}