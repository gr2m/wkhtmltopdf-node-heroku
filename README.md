wkhtmltopdf + node + heroku
===========================

This is a quick and dirty example node app for heroku,
that converts any publicly available URL to PDF.

If PDF has not yet been generated, it will generated the
PDF, otherwise return it.

Note: Each time the heroku server gets restarted, all
generated PDFs are lost.


Examples
--------

    1. Convert http://www.google.ch/search?q=html+to+pdf
    
    http://wkhtmltopdf-node.herokuapp.com/www.google.ch/search?q=html+to+pdf
    
    2. The same via https
    
    https://wkhtmltopdf-node.herokuapp.com/www.google.ch/search?q=html+to+pdf
    
    3. Dynamically generated pages using JavaScript
    
    http://wkhtmltopdf-node.herokuapp.com/acid3.acidtests.org
    
    
Setup
-----

Get a free Heroku Account: http://devcenter.heroku.com/articles/quickstart

```
$ heroku create -s cedar
$ git push heroku master
```

Follow the instructions in the command line