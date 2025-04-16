<!DOCTYPE html>
<html>
<head>
    <title>eSewa V2 Redirect</title>
</head>
<body>
    <p>Redirecting to eSewa...</p>

    <form id="esewaForm" action="https://rc-epay.esewa.com.np/epay/main" method="POST">
        <input type="hidden" name="amount" value="{{ $amount }}">
        <input type="hidden" name="tax_amount" value="{{ $taxAmount }}">
        <input type="hidden" name="total_amount" value="{{ $totalAmount }}">
        <input type="hidden" name="transaction_uuid" value="{{ $transactionUuid }}">
        <input type="hidden" name="product_code" value="{{ $productCode }}">
        <input type="hidden" name="product_service_charge" value="0">
        <input type="hidden" name="product_delivery_charge" value="0">
        <input type="hidden" name="success_url" value="{{ $successUrl }}">
        <input type="hidden" name="failure_url" value="{{ $failureUrl }}">
        <input type="hidden" name="signed_field_names" value="{{ $signedFieldNames }}">
        <input type="hidden" name="signature" value="{{ $signature }}">

        <button type="submit">Pay with eSewa</button>
    </form>

    <script>
        document.getElementById('esewaForm').submit();
    </script>
</body>
</html>
