#!/bin/bash
dirName=$1

path="assets/animations/"

# 数値を0埋め4桁に変換する
# _が含まれていた場合既に処理済みと判断して無視する
# 元のファイル名に連番以外の場所に数値があると正しく動作しない
for filePath in ${path}${dirName}/*; do
  if [ `echo ${filePath} | grep '_'` ] ; then
    continue
  fi
  num=`echo "$filePath" | sed -e "s/[^0-9]//g"`
  paddingNum=`printf "%04d\n" "${num}"`
  mv ${filePath} ${filePath%%.*}_${paddingNum}.png
done