GAMES="mines mines-kaios-extras net net-kaios-extras ascent ascent-kaios-extras boats boats-kaios-extras inertia inertia-kaios-extras filling filling-kaios-extras lightup lightup-kaios-extras loopy loopy-kaios-extras flip flip-kaios-extras mosaic mosaic-kaios-extras pattern pattern-kaios-extras tents tents-kaios-extras unruly unruly-kaios-extras solo solo-kaios-extras unequal unequal-kaios-extras rect rect-kaios-extras range range-kaios-extras singles singles-kaios-extras tracks tracks-kaios-extras sixteen sixteen-kaios-extras"

# apt update && apt install -y halibut
CMD="rm -rf build && mkdir -p build && cd build && emcmake cmake /source/puzzles-20241021.05f4f63 && cmake --build . --target $GAMES"

docker run -it --rm -v $(pwd):/source -w /source emscripten/emsdk:3.1.69 sh -c "$CMD"

mv build/puzzles-unreleased/*.js  build/
mv build/puzzles-unreleased/*.wasm  build/

rm -rf build/puzzles-unreleased
rm -rf build/auxiliary
rm -rf build/CMakeFiles
rm -rf build/kaios
rm -rf build/unfinished
rm -rf build/Makefile
rm -rf build/CmakeCache.txt
rm -rf build/*.webapp
rm -rf build/*.a     
rm -rf build/*.cmake

mv build/gamelist.txt build/404.html