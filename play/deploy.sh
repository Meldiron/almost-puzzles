if [ -z "$1" ]; then
  echo "Provide Surge token"
  exit 1
fi

SURGE_TOKEN="$1" # surge token

CMD="npm install --global surge && surge . simon-tatham-puzzles.surge.sh"

docker run -it --env SURGE_TOKEN="$SURGE_TOKEN" --rm -v $(pwd)/build:/source -w /source node:23-alpine3.19 sh -c "$CMD"
