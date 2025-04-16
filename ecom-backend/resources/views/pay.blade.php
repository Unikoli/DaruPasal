<!DOCTYPE html>
<html>
<head>
    <title>Pay with eSewa</title>
</head>
<body>
    <form id="esewa-form" method="POST" action="{{ route('prepare') }}">
        @csrf
        <button type="submit">Pay with eSewa</button>
    </form>
</body>
</html>
