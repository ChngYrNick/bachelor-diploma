all: build run

build:
	latexmk -xelatex \
	-synctex=1 main.tex

run:
	# Я использую xreader для просмотра PDF
	zathura main.pdf &

clean:
	rm *.aux \
	*.fdb_latexmk \
	*.fls \
	*.log \
	*.out \
	*.synctex.gz \
	*.toc
