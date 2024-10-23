# apt update && apt install -y halibut
CMD="rm -rf build && mkdir -p build && cd build && emcmake cmake /source/puzzles-20241021.05f4f63 && cmake --build . --target untangle untangle-kaios-extras"

docker run -it --rm -v $(pwd):/source -w /source emscripten/emsdk:3.1.69 sh -c "$CMD"

rm -rf build/auxiliary
rm -rf build/CMakeFiles
rm -rf build/kaios
rm -rf build/unfinished
rm -rf build/Makefile
rm -rf build/CmakeCache.txt
rm -rf build/*.webapp
rm -rf build/*.a     
rm -rf build/*.cmake