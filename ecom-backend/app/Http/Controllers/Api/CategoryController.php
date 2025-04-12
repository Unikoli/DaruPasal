<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::all());
    }
    public function store(Request $request)
    {
        $request->validate(['category_name' => 'required|string']);
        $category = new Category();
        $category->category_name=$request->category_name;

        if($category->save())
        {
            return response()->json([
                'message' => 'Category created',
                 'category' => $category]);

        }
        else
        {
            return response()->json([
                'message' => 'Failed to create Category '
            ]);

        }

    }
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->only('category_name'));

        return response()->json(['message' => 'Category updated', 'category' => $category]);
    }
    public function destroy($id)
    {
        Category::destroy($id);
        return response()->json(['message' => 'Category deleted']);
    }
}
