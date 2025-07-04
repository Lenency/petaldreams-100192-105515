#!/bin/bash
cd /home/kavia/workspace/code-generation/petaldreams-100192-105515/petal_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

