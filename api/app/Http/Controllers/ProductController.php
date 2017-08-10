<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
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
    public function getList()
    {
    	$productList = Product::all();
    	return response()->json($productList);
    }

    /**
    * Retrieve the product for the given ID.
    *
    * @param  int  $id
    * @return Response
    */
    public function getDetails($id)
    {
    	return Product::find($id);
    }
}
