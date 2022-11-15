git add .

set arg1="Dinge"

if not "%1"=="" (
	set arg1=%1
)

git commit -a -m %arg1%

git push -u origin-ssh