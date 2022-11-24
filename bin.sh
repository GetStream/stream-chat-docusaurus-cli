#!/bin/bash
set -eo pipefail  # if a command fails it stops the execution

# capture the current execution path
export CURRENT_WORKING_PATH=$(pwd) 

usage() {
  echo "stream-docusaurus - a CLI tool to build, manage, and test Stream Docusaurus documentation$(echo $'\n ')"
  echo "npx stream-chat-docusaurus [options]$(echo $'\n ')"
  echo "options:"
  echo "-h, --help                                show brief help"
  echo "-b, --build                               build docusaurus static files for deployment"
  echo "-nv, --new-version NEW_VERSION SDK_NAME   specify and cut a new docs version of an SDK. SDK_NAME should be lowercase without spaces"
  echo "-s, --start                               start docusaurus server"
  echo "-a, --algolia                             upload the resulting content to algolia"
}

main() {
  while test $# -gt 0;
  do
    case $1 in
      -i|--init)
        echo "
        *****************************************************
        using -i or ---init Init flag is no longer necessary. -s works now.
        *****************************************************
        "
        shift
        ;;
      -b|--build)
        BUILD='true'
        shift
        ;;
      -h|--help)
        usage
        exit 0
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
      -a|--algolia)
        ALGOLIA='true'
        shift
        ;;
      *)
        usage
        exit 0
        ;;
    esac
  done

  # move execution to the package directory
  PACKAGE_DIR=$(dirname $(dirname $0)"/"$(readlink $0))

  if [[ ${VERSION} == true ]]; then
    if [ ${#NEW_VERSION} == 0 ] || [ ${#SDK_NAME} == 0 ]; then
      echo "Missing NEW_VERSION or SDK_NAME. Skipping versioning.."
    else
      yarn docusaurus docs:version:"$SDK_NAME" "$NEW_VERSION";

      if [ ! -d "$CURRENT_WORKING_PATH/docusaurus/${SDK_NAME}_versioned_docs" ]; then
        cp -r "$SDK_NAME"* "$CURRENT_WORKING_PATH"/docusaurus
        rm -rf "$SDK_NAME"*
        find "$CURRENT_WORKING_PATH"/docusaurus -maxdepth 1 -mindepth 1 -type d -regex ".*/${SDK_NAME}_version.*" -exec ln -s {} \;
        find "$CURRENT_WORKING_PATH"/docusaurus -maxdepth 1 -mindepth 1 -type f -regex ".*/${SDK_NAME}_version.*" -exec ln -s {} \;
      fi
    fi
  fi
  
  # symlink the versioned artifacts, docusaurus can't handle them otherwise
  for VERSIONED_ARTIFACT in "$CURRENT_WORKING_PATH"/docusaurus/*_version*; do
    ln -sf $VERSIONED_ARTIFACT "$PACKAGE_DIR"
  done
  # symlink the shared directory from package dir to current working path
  ln -sf "$PACKAGE_DIR"/shared "$CURRENT_WORKING_PATH"/docusaurus

  function cleanup {
    rm "$CURRENT_WORKING_PATH"/docusaurus/shared
    for VERSIONED_ARTIFACT in "$CURRENT_WORKING_PATH"/docusaurus/*_version*; do
      rm "$PACKAGE_DIR/${VERSIONED_ARTIFACT##*/}"
    done
  }

  trap cleanup EXIT

  if [[ ${START} == true ]]; then
    yarn --cwd $PACKAGE_DIR start;
  fi

  if [[ ${BUILD} == true ]]; then
    yarn --cwd $PACKAGE_DIR build;
    rm -rf build/
    rm algolia-objects.json
    mv -f $PACKAGE_DIR/build $CURRENT_WORKING_PATH/
    mv -f $PACKAGE_DIR/algolia-objects.json $CURRENT_WORKING_PATH/
  fi
  if [[ ${ALGOLIA} == true ]]; then
    node $PACKAGE_DIR/replace-algolia-objects.js
  fi
}


echo "Stream Chat Docusaurus CLI"
main $*
exit 0
