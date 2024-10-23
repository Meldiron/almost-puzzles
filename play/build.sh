CMD="apt update && apt install -y halibut && rm -rf build && mkdir -p build && cd build && emcmake cmake /source/puzzles-20241021.05f4f63 && cmake --build ."

docker run -it --rm -v $(pwd):/source -w /source emscripten/emsdk:3.1.69 sh -c "$CMD"

cd build
# find . -type f ! -name "*.html" ! -name "*.js" ! -name "*.wasm" -exec rm -f {} +
# rm -r ./*/ 
cd ..
