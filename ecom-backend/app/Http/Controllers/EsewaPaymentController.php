<!-- <?php -->

// namespace App\Http\Controllers;

// use App\Models\Payment;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;
// use Illuminate\Support\Str;

// class EsewaPaymentController extends Controller
// {
    // public function showForm()

    // {
    //     $transaction_uuid = 'TXN-' . Str::uuid();

    //     $data = [
    //         'amount' => 100,
    //         'tax_amount' => 10,
    //         'total_amount' => 110,
    //         'transaction_uuid' => $transaction_uuid,
    //         'product_code' => 'EPAYTEST',
    //         'product_service_charge' => 0,
    //         'product_delivery_charge' => 0,
    //         'success_url' => route('esewa.success'),
    //         'failure_url' => route('esewa.failure'),
    //         'signed_field_names' => 'total_amount,transaction_uuid,product_code',
    //     ];
    //     // Save to DB with pending status
    //     Payment::create([
    //         'transaction_uuid' => $data['transaction_uuid'],
    //         'amount' => $data['amount'],
    //         'tax_amount' => $data['tax_amount'],
    //         'total_amount' => $data['total_amount'],
    //         'product_code' => $data['product_code'],
    //         'status' => 'pending',
    //     ]);


    //     $signedFieldNames = explode(',', $data['signed_field_names']);

    //     $signatureString = '';
    //     foreach ($signedFieldNames as $field) {
    //         $signatureString .= $data[$field];
    //     }

    //     $data['signature'] = base64_encode(
    //         hash_hmac('sha256', $signatureString, env('ESEWA_SECRET_KEY'), true)
    //     );


    //     return view('form', compact('data'));
    // }

    // public function success(Request $request)
    // {
    //     $uuid = $request->input('transaction_uuid');

    //     $transaction = Payment::where('transaction_uuid', $uuid)->first();

    //     if ($transaction) {
    //         $transaction->status = 'success';
    //         $transaction->save();
    //     }

    //     return response()->json([
    //         'message' => 'Payment Success ✅',
    //         'transaction' => $transaction
    //     ]);
    // }


    // public function failure(Request $request)
    // {
    //     return "Payment Failed ❌<br><pre>" . print_r($request->all(), true) . "</pre>";
    // }


    //     public function checkout()
    //     {
    //         return view('checkout');
    //     }

    //     public function initiatePayment(Request $request)
    //     {
    //         // Normally you'd validate and fetch these dynamically
    //         $amount = 100; // example amount
    //         $pid = uniqid(); // unique payment ID

    //         return view('esewa_redirect', [
    //             'amount' => $amount,
    //             'pid' => $pid
    //         ]);
    //     }

    //     public function success(Request $request)
    //     {
    //         $amt = $request->amt;
    //         $oid = $request->oid;
    //         $refId = $request->refId;

    //         // Optional: Verify with eSewa server
    //         $response = Http::asForm()->post('https://rc-epay.esewa.com.np/api/epay/verify', [
    //             'amt' => $amt,
    //             'rid' => $refId,
    //             'pid' => $oid,
    //             'scd' => 'EPAYTEST'
    //         ]);

    //         if (str_contains($response->body(), 'Success')) {
    //             return "Payment Successful! Ref ID: $refId";
    //         } else {
    //             return "Payment Verification Failed!";
    //         }
    //     }

    //     public function fail(Request $request)
    //     {
    //         return "Payment Failed or Cancelled!";
    //     }
    //     public function v2Checkout()
    // {
    //     $amount = 100;
    //     $taxAmount = 10;
    //     $totalAmount = $amount + $taxAmount;

    //     $transactionUuid = uniqid(); // Or a proper UUID
    //     $productCode = 'EPAYTEST';
    //     $successUrl = route('esewa.success'); // or any real success route
    //     $failureUrl = route('esewa.fail');

    //     // Fields to sign
    //     $signedFieldNames = 'total_amount,transaction_uuid,product_code';
    //     $fieldsToSign = [
    //         'total_amount' => $totalAmount,
    //         'transaction_uuid' => $transactionUuid,
    //         'product_code' => $productCode,
    //     ];

    //     // Concatenate values in order of signedFieldNames
    //     $stringToSign = '';
    //     foreach (explode(',', $signedFieldNames) as $field) {
    //         $stringToSign .= $fieldsToSign[$field];
    //     }

    //     // Your secret key (get from eSewa for production)
    //     $secretKey = '8gBmC4G9nLfnFeXE'; // example test key from eSewa documentation

    //     // Generate the signature using HMAC SHA-256
    //     $signature = base64_encode(hash_hmac('sha256', $stringToSign, $secretKey, true));

    //     return view('esewa_v2_redirect', compact(
    //         'amount',
    //         'taxAmount',
    //         'totalAmount',
    //         'transactionUuid',
    //         'productCode',
    //         'successUrl',
    //         'failureUrl',
    //         'signedFieldNames',
    //         'signature'
    //     ));
    // }

//     public function showPaymentPage()
//     {
//         return view('pay');
//     }

//     public function preparePayment(Request $request)
//     {
//         $tuid = now()->timestamp;

//         $message = "total_amount=110,transaction_uuid=$tuid,product_code=EPAYTEST";
//         $secret = '8gBm/:&EnhH.1/q'; // Replace with your real eSewa secret key

//         $signature = base64_encode(hash_hmac('sha256', $message, $secret, true));

//         $data = [
//             "amount" => "100",
//             "tax_amount" => "10",
//             "total_amount" => "110",
//             "product_delivery_charge" => "0",
//             "product_service_charge" => "0",
//             "product_code" => "EPAYTEST",
//             "transaction_uuid" => $tuid,
//             "success_url" => route('esewa.success'),
//             "failure_url" => route('esewa.failure'),
//             "signature" => $signature,
//             "signed_field_names" => "total_amount,transaction_uuid,product_code"
//         ];
//         Payment::create([
//             'transaction_uuid' => $data['transaction_uuid'],
//             'amount' => $data['amount'],
//             'tax_amount' => $data['tax_amount'],
//             'total_amount' => $data['total_amount'],
//             'product_code' => $data['product_code'],
//             'status' => 'complete',
//         ]);

//         return view('redirect', compact('data'));
//     }

//     public function redirectToEsewa(Request $request)
//     {
//         // Not needed unless you're POSTing from JS or custom logic
//     }

//     public function success(Request $request)
//     {
//         $decodedString = base64_decode($request->data);
//         $data = json_decode($decodedString, true);

//         if (isset($data["status"]) && $data["status"] === "COMPLETE") {
//             // Mark transaction complete
//             return "✅ Payment Completed Successfully.";
//         }

//         return "⚠️ Invalid or Incomplete Payment.";
//     }

//     public function failure(Request $request)
//     {
//         return "❌ Payment Failed or Cancelled.";
//     }
// }
