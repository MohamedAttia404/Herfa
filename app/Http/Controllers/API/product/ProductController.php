<?php

namespace App\Http\Controllers\API\product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File; 
use Illuminate\Support\Facades\Auth;
use Yajra\DataTables\DataTables ; 
use App\Product;
use App\User;
use App\Category;
use  App\Http\Controllers\API\BaseController ;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;



class ProductController extends Controller
{
    
    public function index()
    {
        // return ProductResource::collection(
        //     Product::all()
          //    Product::paginate(5)
        //  );


        // return Product::all();
          return ProductResource::collection(Product::paginate(3));
   

    }


//     function create () {
//         $users=User::all();
//         $categories=Category::all();
//         return view('products.create',[
//             'users' => $users,
//             'categories' => $categories,
//         ]);
//         }   
             
    public function store(StoreProductRequest $request) {
        $request['user_id']= 1;
        $request['category_id']=1;

        // $request['image']=Storage::disk('public')->put('images',$request->image);
        // $product=Product::create($request->all());
        // return $product ;

        
        // if ($request->hasFile('image'))
        // {
        // $file      = $request->file('image');
        // $filename  = $file->getClientOriginalName();
        // $extension = $file->getClientOriginalExtension();
        // $picture   = date('His').'-'.$filename;
        // $file->move(public_path('image'), $picture);
       
   

        if($request->hasFile('image'))
        {$request['image']=Storage::disk('local')->put('images',$request->image);}
        // {
            // $file = $request->file('image');
            // $extension = $file->getClientOriginalExtension();
            // $filename = time().'.'.$extension;
            // Storage::disk('public')->put('images/'.$filename, File::get($file));
            // }
            // $request->img=$filename; 
            ////////////////////////////////////////////////////////
            // $file = $request->file('image');
            // $filename = $file->getClientOriginalName();
            // $extension = $file->getClientOriginalExtension();
            // $picture = date('His').'-'.$filename;
            // $file->move(public_path('img'), $picture); }

        $product=Product::create($request->all());
        // return $product ;
        // return response()->json($product, 201); 
        return $product;
      
    }     

public function show($id)
{
    return new ProductResource(
        Product::find($id)
    );

}

// public function edit()
// { 
//   $request=request();
//  $product_id=$request->product;
//  $product= Product::find($product_id); 
// return $product;
//  }


public function update(UpdateProductRequest $request, $id)
{
    // if($user) {
    //     if(array_key_exists('profile',$request->all())){
    //         Storage::disk('public')->delete($user->avatar);
    //         $request['image']=Storage::disk('public')->put($this->path,$request['profile']);
    //     }

    // if($request->profile){
    //     if(array_key_exists('profile',$request->all())){
    //     Storage::disk('public')->delete($request->image);
    //     $request['image']=Storage::disk('public')->put($this->path,$request['profile']);
        // $request['image']=Storage::disk('public')->put('images',$request->profile);
    if($request->image){
        Storage::disk('local')->delete($request->image);
        $request['image']=Storage::disk('local')->put('images',$request->image);
    }else{
        $request['image']=$request->image;
    }
        $product= Product::findOrFail($id); 
        $product->update($request->all());
        return $product->fresh();
}

// return json_encode(array("ERROR"=>"NOT EXSIST"));
// return response()->json($product, 200);
    // else{
    //     $request['image']=$request->oldimg;
    // }
//  $product= Product::findOrFail($id); 
//   $product->update($request->all());
//    return $product->fresh();


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

