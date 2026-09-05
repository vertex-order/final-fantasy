# Build the deployable site into build/ (gitignored, matches CI).
build:
    rm -rf build
    mkdir build
    cp -r site/. build/
    mv build/page.dc.html build/index.html

# Build then serve build/ locally, like the real deploy.
serve: build
    cd build && python -m http.server 8000

clean:
    rm -rf build
