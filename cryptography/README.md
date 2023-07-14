# Getting started

* Install quarto.   On Mac, with Homebrew, you can do:
  ```
  brew install quarto
  ```

* Render the `.qmd` files to HTML (LaTeX compilation fails, for some currently unknown reason, but we only really need the HTML):
  ```
  quarto render --to html
  ```

* Point your web browser to the html, by typing into the URL bar something like:

  ```
  file:///Users/myusername/summer-experience-challenges/cryptography/_book/index.html
  ```

  Alternatively, launch a HTTP server from the `_book` directory:

  ```
  cd _book
  python -m http.server 8000
  ```

  then you can view the HTML by opening `http://localhost:8000`.

* For live recompilation whenever a file is changed, you can ordinarily use `quarto preview`, but sadly this isn't triggered when JavaScript files are edited (only `.qmd` files).

  The closest I've found is this. You will need `entr` (you can do `brew install entr`).

  `ls *.js *.qmd _quarto.yml | entr quarto render --to html`

  This will run `quarto render` whenever any of the listed files change. There's a slight hitch: if you create a new file or delete a file you will have to restart this command.
