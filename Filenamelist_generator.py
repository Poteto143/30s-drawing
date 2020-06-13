"""
このPythonファイルは、script.jsで使用する
ディレクトリ一覧を出力するプログラムです。
実行すると、同じ場所に「filenames.json」
という名前でjsonファイルが出力されます。
jsonの内容はassets\imagesにあるファイルの
名前をリストにまとめた物です。
"""
import glob
import json

files = glob.glob("assets\images\*")
filenamelist = []
for f in files:
    filenamelist.append(f)

with open("filenames.json", "w") as f:
    json.dump(filenamelist, f, indent=4)