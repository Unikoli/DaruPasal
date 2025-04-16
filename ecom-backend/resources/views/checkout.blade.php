<!DOCTYPE html>
<html>
<head>
    <title>Checkout</title>
</head>
<body>
    <h2>Liquor Shop Checkout</h2>
    <form action="{{ route('esewa.v2.checkout') }}" method="POST">
        @csrf
        <button type="submit">Pay with eSewa</button>
    </form>
</body>
</html>
