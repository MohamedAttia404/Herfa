<?php

namespace App\Http\Controllers\API\product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Yajra\DataTables\DataTables ; 
use App\Product;
use App\User;
use App\Category;

class ProductController extends Controller
{
    
    public function index()
    {
        // return ProductResource::collection(
        //     Product::all()
          //    Product::paginate(5)
        //  );
        return Product::all();

    }


//     function create () {
//         $users=User::all();
//         $categories=Category::all();
//         return view('products.create',[
//             'users' => $users,
//             'categories' => $categories,
//         ]);
//         }   
             
    public function store(Request $request) {
        $request['user_id']= 1;
        $request['category_id']=1;
        $request['image']=Storage::disk('public')->put('images',$request->profile);
        $product=Product::create($request->all());
        return $product ;

      
    }     

public function show($id)
{
    return new ProductResource(
        Product::find($id)
    );

}

public function edit()
{ 
  $request=request();
 $product_id=$request->product;
 $product= Product::find($product_id); 
return $product;
 }


public function update(Request $request, $id)
{
    if($request->profile){
        Storage::disk('public')->delete($request->oldimg);
        $request['image']=Storage::disk('public')->put('images',$request->profile);
    }else{
        $request['image']=$request->oldimg;
    }
 $product= Product::findOrFail($id); 
  $product->update($request->all());
   return $product->fresh();
}

public function destroy($id)
   { 
   
    $product= Product::find($id); 
if(!$product){
    return json_encode(array("ERROR"=>"faild to delete this product"));
 }
 else{
    Storage::disk('public')->delete($product->image);
    $product->delete(); 
    return json_encode(array("msg"=>"this product deleted sussecfully"));
}
   
    }


}

