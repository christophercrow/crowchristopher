PORT=3000

echo "🔍 Checking for Node processes on port $PORT..."
PIDS=$(lsof -i tcp:$PORT -sTCP:LISTEN -t)

for PID in $PIDS; do
  CMD=$(ps -p $PID -o comm=)
  if [[ "$CMD" == "node" || "$CMD" == "npm" || "$CMD" == "react-scripts" ]]; then
    echo "🛑 Killing $CMD process with PID $PID on port $PORT..."
    kill -9 $PID
  else
    echo "⚠️ Skipping PID $PID ($CMD) — not a dev server process."
  fi
done

echo "🚀 Starting dev server..."
npm start
