#!/bin/bash

SUC='\033[1;32m'
ERR='\033[1;31m'
OFF='\033[0m'

function check_dependence {
    echo Проверка установки $1
    if [[ $(type -p $1) ]]; then
        echo -e ${SUC}OK${OFF}
        if [[ $2 ]]; then
            echo Проверка версии $1
            version=$("$1" --version)
            if [[ "$version" > $2 ]]; then
                echo -e ${SUC}OK${OFF}
            else
                echo -e "${ERR}Ошибка:${OFF} Версия $1 должна быть выше $2"
                exit 1
            fi
        fi
    else
        echo -e "${ERR}Ошибка:${OFF} $1 не найден"
        exit 1
    fi
}

dependencies=(
    yarn
    mongod
)

check_dependence node 7.0
for package in ${dependencies[@]}
do
    check_dependence $package
done
