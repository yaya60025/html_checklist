checklist website
===================

This is a handmade checklist for humans to go through an check if a task
works or fails. At the end the checker can send an email with the fails
to anyone.

In /js/checklist.js you need to set this: receiver email and the list of tasks.
Then just visit the checklist.html in browser and start checking ;)


There are some issues to run it locally, but not in a webserver. If you want to
run it locally me suggest SimpleHTTPServer builtin python. Go into this
directory execute the following command and afterwards visit 0.0.0.0:8000 in
your browser.

    python -m SimpleHTTPServer


