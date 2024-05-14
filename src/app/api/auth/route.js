import { NextResponse } from 'next/server'
 
export async function GET() {
    const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwidHlwIjoiYXQrand0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJqcnVpLm9saXZlaXJhbHZlc0BnbWFpbC5jb20iLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwicm9sZXMiOlsiQXBwbGljYXRpb25cL0ZlYXRoZXJTdXBlclVzZXIiLCJBcHBsaWNhdGlvblwvRmVhdGhlclN5c3RlbUFkbWluaXN0cmF0b3IiLCJBcHBsaWNhdGlvblwvZmVhdGhlcjEiLCJkZXZvcHMiLCJzdWJzY3JpYmVyIiwiYW5hbHl0aWNzIiwiY3JlYXRvciIsImludGVncmF0aW9uX2RldiIsIm9ic2VydmVyIiwicHVibGlzaGVyIiwic3lzdGVtIiwiZXZlcnlvbmUiXSwiaXNzIjoiaHR0cHM6XC9cL2lzLmludGVncmF0aW9uLmZlYXRoZXItbGFiLmNvbTo5NDQ0XC9vYXV0aDJcL3Rva2VuIiwiZ2l2ZW5fbmFtZSI6Impvc2UgcnVpIiwiY2xpZW50X2lkIjoiQm9XN2x4NmwxSU5sTWtqMWtkdjNjQ0JWMGF3YSIsImF1ZCI6IkJvVzdseDZsMUlObE1rajFrZHYzY0NCVjBhd2EiLCJuYmYiOjE3MTU0NjY3NTMsImF6cCI6IkJvVzdseDZsMUlObE1rajFrZHYzY0NCVjBhd2EiLCJzY29wZSI6Im9wZW5pZCIsImV4cCI6MTcxNTQ3MDM1MywiaWF0IjoxNzE1NDY2NzUzLCJmYW1pbHlfbmFtZSI6Impvc2UgcnVpIiwianRpIjoiMDU2NGViYzAtMjk0OC00MWI0LWIzYjktMTU5NGM3MDFmOTFkIiwiZW1haWwiOiJqcnVpLm9saXZlaXJhbHZlc0BnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImpydWkub2xpdmVpcmFsdmVzQGdtYWlsLmNvbSJ9.VLL-DUdN_f6M6SIyalT_oZLjoUvBLFbFIyI7Mrx45u1WJwBF5eQcTZAJLzK7SGEsv4aMcKisxiQUehdWW45FYwtcpeu0cYhJaE3HELA0wNVVvVQgwkI0tQuJbkA4gJQlRpgHWqbjFo3melzF379dziK_CF8L49PQriTMJiJ6ymX0goNq_UYLjFrs42_MuV2i9yXqIML1uBcCAbqab9w5E2y7EAxHhtrQofrzQBKe6CcFZwY-kHdZLeucVgCHgVIbjULNOSshpwZIx4WrZ0JqqyHiEY5bFnoaUPjLViADuvr9L2RsixlTO1YGYjPpIbwKxtKyJd4GupFXyjTI4APUZw`
        },
        redirect: "follow"
      
      }
    const res = await fetch(`http://k8s.integration.feather-lab.com:32744/subscriptions/`, requestOptions);
    const data = await res.json();
    console.log("======data", data)
    return NextResponse.json(data)
}