#!/bin/bash
package=stream-chat-docusaurus

build() {
    if [ ! -d "docusaurus" ]; then
        init
    fi

    echo "build docusaurus static files..."

    cd docusaurus
    yarn clear; yarn build;
    cd ..
}

init() {
    echo "initializing..."

    rm -rf docusaurus
    tar -xzf docusaurus.tar.gz

    cd docusaurus

    # finding and symlinking directorys (d) and files (f) within the SDK repo docusaurus directory
    find $STREAM_SDK_PATH/docusaurus -maxdepth 1 -mindepth 1 -type d -exec ln -s {} \;
    find $STREAM_SDK_PATH/docusaurus -maxdepth 1 -mindepth 1 -type f -exec ln -s {} \;

    yarn
    if [[ -z "${CUSTOM_INSTALLS}" ]]; then
        echo "No custom installs to add, proceeding.."
    else
        echo "Found custom plugins to install: $CUSTOM_INSTALLS"
        yarn add $CUSTOM_INSTALLS
    fi
    cd ..
}

serve() {
    if [ ! -d "docusaurus" ]; then
        init
    fi

    cd docusaurus

    if [ ! -d "build" ]; then
        cd ..
        build
        cd docusaurus
    fi

    yarn serve
    cd ..
}

start_server() {
    if [ ! -d "docusaurus" ]; then
        init
    fi

    echo "starting docusaurus server..."

    cd docusaurus
    yarn clear; yarn start;
    cd ..
}

version() {
    if [ ! -d "docusaurus" ]; then
        init
    fi

    cd docusaurus
    yarn docusaurus docs:version:$SDK_NAME $NEW_VERSION;

    if [ ! -d "$STREAM_SDK_PATH/docusaurus/${SDK_NAME}_versioned_docs" ]; then
        cp -r $SDK_NAME* $STREAM_SDK_PATH/docusaurus
        rm -rf $SDK_NAME*
        find $STREAM_SDK_PATH/docusaurus -maxdepth 1 -mindepth 1 -type d -regex ".*/${SDK_NAME}_version.*" -exec ln -s {} \;
        find $STREAM_SDK_PATH/docusaurus -maxdepth 1 -mindepth 1 -type f -regex ".*/${SDK_NAME}_version.*" -exec ln -s {} \;
    fi
}

usage() {
    echo "$package - a CLI tool to build, manage, and test Stream Docusaurus documentation`echo $'\n '`"
    echo "npx $package [options]`echo $'\n '`"
    echo "options:"
    echo "-h, --help                                show brief help"
    echo "-i, --init                                initialize docusaurus workspace"
    echo "-c, --custom-install=PACKAGES             specify any custom packages to install in docusaurus"
    echo "-b, --build                               build docusaurus static files for deployment"
    echo "-nv, --new-version NEW_VERSION SDK_NAME   specify and cut a new docs version of an SDK. SDK_NAME should be lowercase without spaces"
    echo "-s, --start                               start docusaurus server"
    echo "-t, --test-build                          BETA (not working correctly): serve built docusaurus to locally test production build"
}

main() {
    while test $# -gt 0;
    do
        case $1 in
            -b|--build)
                BUILD='true'
                shift
                ;;
            -c=*|--custom-installs=*)
                CUSTOM_INSTALLS=`echo "${1#*=}" | tr ',' ' '`
                shift
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            -i|--init)
                INIT='true'
                shift
                ;;
            -nv|--new-version)
                VERSION='true'
                NEW_VERSION="$2"
                SDK_NAME="$3"
                shift 3
                ;;
            -s|--start)
                START='true'
                shift
                ;;
            -t|--test-build)
                SERVE='true'
                shift
                ;;
            *)
                usage
                exit 0
                ;;
        esac
    done

    # capture the current execution path
    export STREAM_SDK_PATH=`pwd`

    # move execution to the package directory
    cd $(dirname $(dirname $0)"/"$(readlink $0))

    if [[ ${INIT} == true ]]; then
        init
    fi


    if [[ ${VERSION} == true ]]; then
        if [ ${#NEW_VERSION} == 0 ] || [ ${#SDK_NAME} == 0 ]; then
            echo "Missing NEW_VERSION or SDK_NAME. Skipping versioning.."
        else
            version
        fi
    fi

    if [[ ${START} == true ]]; then
        start_server
    fi

    if [[ ${BUILD} == true ]]; then
        build
    fi

    if [[ ${SERVE} == true ]]; then
        serve
    fi
}

echo "Stream Chat Docusaurus CLI"
main $*
exit 0