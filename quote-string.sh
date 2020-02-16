#!/bin/bash

file="$1"

fileContent=`cat "$file"`
#echo "${fileContent::1}" ~ ${fileContent:0:1}
if [[ "${fileContent:0:1}" != "'" ]]; then 
  sed -ie "1s/^/'/" "$1"
fi

if [[ "${fileContent: -1}" != "'" ]]; then 
  sed -ie "1s/$/'/" "$1"
fi

