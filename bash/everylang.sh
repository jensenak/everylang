#!/bin/bash

# The following functions define a behavior that... 'resembles' object-oriented programming.

# new "constructs" an object. It actually just builds arrays of methods and  attributes in a pseudo-namespace.
new() {
    declare -g obj_${2}_methods
    methods=obj_${2}_methods
    declare -gA obj_${2}_attrs
    attrs=obj_${2}_attrs

    eval "$attrs=$(${1} attrs)"
    eval "$methods=$(${1} methods)"
}

# call is used to execute a method on an "object"
call() {
    varname=obj_${1}_methods[$2]
    eval ${!varname}
}

# retrieve an attribute of an "object"
attrget() {
    varname=obj_${1}_attrs[$2]
    echo ${!varname}
}

# set an attribute of an "object"
attrset() {
    varname=obj_${1}_attrs[$2]
    eval '[ ${'$varname'+exists} ]'
    if [[ $? -eq 0 ]]
    then
        eval ${varname}=$3
    fi
}

############################################
# The objects and methods for this program #
############################################

sayname() {
    attrget bob name
}

person() {
    if [[ "${1}x" == "attrsx" ]]
    then
        echo "([name]=unset [age]=unset [type]=person)"
    fi

    if [[ "${1}x" == "methodsx" ]]
    then
        echo "([sayname]=sayname)"
    fi
}

echo "Hello. Time to play duck duck goose"
echo "Please enter a list of names separated by spaces"
read -a players
for player in players
do
    new person ${!player}
done
echo "Thanks, now a number of rounds to play"
read num

echo "Done"
