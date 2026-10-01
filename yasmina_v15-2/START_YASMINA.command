#!/bin/bash
cd "$(dirname "$0")"
clear
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed."
  echo "Please install Node.js from https://nodejs.org/ and then double-click this file again."
  read -n 1 -s -r -p "Press any key to close..."
  echo
  exit 1
fi

echo "Starting Yasmina Collection..."
node server.js &
SERVER_PID=$!
trap 'kill $SERVER_PID 2>/dev/null' EXIT
sleep 1
open "http://localhost:3000/admin.html"
echo
 echo "Yasmina is running at http://localhost:3000"
echo "Keep this window open while using the website."
echo "Close this window when you are finished."
echo
wait $SERVER_PID
