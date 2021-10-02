# This is an example program that splits PATH env var at delim char ':',
# then prints each dir in PATH in new line
echo "$PATH" | tr : '\n'
