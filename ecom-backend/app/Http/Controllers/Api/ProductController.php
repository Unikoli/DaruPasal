<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //displays all the products
    // public function index()
    // {
    //     return response()->json(Product::all());
    // }
    public function index()
    {
        return response()->json(Product::with('category')->get());
    }
    //display product by id
    // public function show($id)
    // {
    //     $product = Product::find($id);
    //     if (!$product) return response()->json(['message' => 'Product not found'], 404);

    //     // Extract category name using the relationship
    // $product->category_name = $product->category->name ?? 'Unknown';
    //     return response()->json($product);
    // }
    // Controller
public function show($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }
        // $product->category_name = $product->category->name ?? 'Unknown';

    return response()->json($product); // category_name will be auto-included
}

    // Display products by category
    public function productsByCategory($categoryId)
    {
        $products = Product::whereHas('category', function ($query) use ($categoryId) {
            $query->where('id', $categoryId);
        })->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found in this category'], 404);
        }

        return response()->json($products);
    }

    //stores the products in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'required|exists:categories,id',
            'image_url' => 'nullable',
            'volume' => 'nullable',
            'alcohol' => 'nullable',
            'country' => 'nullable',
        ]);


        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->volume = $request->volume;
        $product->country = $request->country;
        $product->alcohol = $request->alcohol;
        $product->description = $request->description;
        // $product->image_url = $request->image_url;
        $product->category_id = $request->category_id;
        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/uploads'), $filename);
            $product->image_url = 'storage/uploads/' . $filename;
        }


        if ($product->save()) {
            return response()->json(
                [
                    'message' => 'Product added!',
                    'product' => $product
                ],
                201
            );
        }
    }
    //update the products
    // public function update(Request $request, $id)
    // {
    //     $product = Product::find($id);
    //     if (!$product) {
    //         return response()->json(['message' => 'Product not found'], 404);
    //     }

    //     // Validate only the fields that may be updated
    //     $request->validate([
    //         'name' => 'sometimes|string',
    //         'price' => 'sometimes|numeric',
    //         'stock' => 'sometimes|integer',
    //         'description' => 'nullable|string',
    //     ]);

    //     // Update only the fields that are present in the request
    //     if ($request->has('name')) {
    //         $product->name = $request->name;
    //     }

    //     if ($request->has('price')) {
    //         $product->price = $request->price;
    //     }

    //     if ($request->has('stock')) {
    //         $product->stock = $request->stock;
    //     }

    //     if ($request->has('description')) {
    //         $product->description = $request->description;
    //     }

    //     $product->save();

    //     return response()->json([
    //         'message' => 'Product updated',
    //         'product' => $product,
    //     ]);
    // }
    public function update(Request $request, $id)
    {
        // Find the product by its ID
        $product = Product::find($id);

        // If the product does not exist, return a 404 error
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Validate the incoming request data
        $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric',
            'stock' => 'sometimes|required|integer',
            'category_id' => 'sometimes|required|exists:categories,id',
            'image_url' => 'nullable',
        ]);

        if ($request->has('name')) {
            $product->name = $request->name;
        }

        if ($request->has('description')) {
            $product->description = $request->description;
        }

        if ($request->has('price')) {
            $product->price = $request->price;
        }

        if ($request->has('stock')) {
            $product->stock = $request->stock;
        }
        if ($request->has('volume')) {
            $product->volume = $request->volume;
        }
        if ($request->has('country')) {
            $product->country = $request->country;
        }
        if ($request->has('alcohol')) {
            $product->alcohol = $request->alcohol;
        }

        if ($request->has('category_id')) {
            $product->category_id = $request->category_id;
        }

        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $product->image_url = 'uploads/' . $filename;
        }

        // Save the updated product to the database
        if ($product->update()) {
            return response()->json([
                'message' => 'Product updated successfully',
                'product' => $product
            ]);
        }

        return response()->json(['message' => 'Failed to update product'], 500);
    }

    //delete the product based on id
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) return response()->json(['message' => 'Product not found'], 404);

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
    //buy the products by the authenticated user
    public function buy($id)
    {
        $product = Product::find($id);
        if (!$product || $product->stock < 1) {
            return response()->json(['message' => 'Product not available'], 404);
        }

        // Simulate purchase (reduce stock)
        $product->decrement('stock');

        return response()->json([
            'message' => 'Purchase successful',
            'product' => $product
        ]);
    }
}
