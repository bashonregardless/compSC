#!/bin/bash

file="$1"

fileContent=`cat "$file"`
if [[ "${fileContent:0:1}" != "'" ]]; then 
  sed -ie "1s/^/'/" "$1"
fi

if [[ "${fileContent: -1}" != "'" ]]; then 
  sed -ie "1s/$/'/" "$1"
fi

