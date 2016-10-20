#!/bin/bash
PORT=3000

echo "GET /headlines/zhou"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/headlines/zhou
echo ""

echo "PUT /headline"
curl -X PUT http://localhost:3000/headline -H 'Content-Type:application/json' -d '{"headline" : "something"}'
echo ""

echo "GET /email/zhou"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/email/zhou
echo ""

echo "PUT /email"
curl -X PUT http://localhost:3000/email -H 'Content-Type:application/json' -d '{"email" : "new eamil"}'
echo ""

echo "GET /zipcode/zhou"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/zipcode/zhou
echo ""

echo "PUT /zipcode"
curl -X PUT http://localhost:3000/zipcode -H 'Content-Type:application/json' -d '{"zipcode" : "new zipcode"}'
echo ""

echo "GET /avatars/zhou"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/avatars/zhou
echo ""

echo "PUT /avatar"
curl -X PUT http://localhost:3000/avatar -H 'Content-Type:application/json' -d '{"avatar" : "new avatar"}'
echo ""