#!/bin/bash
# Quick test script for payment status endpoint
# Usage: ./test-payment-status.sh cs_test_YOUR_SESSION_ID

SESSION_ID=$1

if [ -z "$SESSION_ID" ]; then
  echo "Usage: ./test-payment-status.sh <session_id>"
  echo "Example: ./test-payment-status.sh cs_test_a1b2c3d4"
  exit 1
fi

echo "Testing session status for: $SESSION_ID"
echo ""

curl -X GET "http://localhost:3000/api/checkout/session-status?session_id=$SESSION_ID" \
  -H "Content-Type: application/json" \
  | python -m json.tool 2>/dev/null || cat

echo ""
echo ""
echo "Expected response:"
echo '{ "status": "complete" }  // or "open" or "expired"'

