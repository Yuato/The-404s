#!/bin/bash

connect="yuant15@cs1xd3.cas.mcmaster.ca:/home/yuant15/public_html/"

echo "This is a script that will transfer a file to yuant15's remote server"
echo "Which directory  would you want to push to (blank for public_html):"
read directory

echo "What file in this directory would you like to push:"
read file

echo "Now pushing $PWD/$file to $connect$directory type "Confirm" to confirm."
read confirm

if [[ "$confirm" == "Confirm" ]]; then
	echo "adding $PWD$file"
	scp "./$file" "$connect$directory"
else
	echo "Canceled"
fi
