# Async and Defer

 * async Attribute:

- The script is downloaded in the background while the HTML parsing continues.
- Once the script is downloaded, HTML parsing is paused, and the script is executed immediately.
- Scripts are executed as soon as they are available and not necessarily in the order they appear in the HTML.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Async Example</title>
  <script async src="script1.js"></script>
  <script async src="script2.js"></script>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

* defer Attribute:

- The script is downloaded in the background while the HTML parsing continues.
- The script is executed after the HTML is completely parsed.
- Scripts are executed in the order they appear in the HTML.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Defer Example</title>
  <script defer src="script1.js"></script>
  <script defer src="script2.js"></script>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

* Default Script Behavior: Blocks HTML parsing and executes immediately upon encountering the <script> tag.
* async: Downloads in parallel, executes as soon as ready, potentially blocking HTML parsing.
* defer: Downloads in parallel, executes after HTML parsing is complete, maintaining execution order.
* Scripts at the End of Body: Ensures the entire HTML document is parsed before script execution, avoiding blocking and ensuring all DOM elements are available.