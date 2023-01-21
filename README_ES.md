# Smart Table #

## Content ##

1. [Introduction.](#Introduction "Introduction")
2. [Dependencies.](#Dependencies "Dependencies")
3. [Getting started.](#GettingStarted "Getting started")

## Introduction <span name="Introduction"></span> ##

The goal of this project is to provide a smart html table.

## Dependencies <span name="Dependencies"></span> ##

* Node.js (https://nodejs.org).
  - Run "node -v" in your OS console to see if it is already installed.
* Npm CLI (https://docs.npmjs.com/cli).
  - On Windows it comes with the Node.js installer, on Linux based OSs you will need to install it.
  - Run "npm -v" in your OS console to see if it is already installed.

## Getting started <span name="GettingStarted"></span> ##

To install Smart Table in our project we must execute the following command.

~~~
npm i smarttable-ag
~~~

We can now include the following JavaScript files in our project and start using everything Smart Table has in store for us.

```html
...
<head>
  ...
  <script src="node_modules/jquery/dist/jquery.min.js"></script>
  <script src="node_modules/smarttable-ag/dist/main.min.js"></script>
</head>
...
```

In the file “./test.html” you can find a simple example of use, the file “./index.html” contains a slightly more robust example but we can also take a look at it. The following explanation will be based on the “./test.html” file.

First we will add an HTML tag of type “table”, with id called “tablefields” and a style with CSS statements that will allow us to hide said “table” from the view of the HTML document (you can remove the style for a moment to see how it looks and you can also use CSS classes if you want).

```html
...
<body>

  <table id="tablefields" style="display: none;">
  </table>

</body>
...
```

Now we are going to add the labels that our new “table” will contain.

```html
...
<table id="tablefields" style="display: none;">
  <tr data-type="data">
    <td data-ignorefield="true">
      <button type="button" class="smarttable-ag-delete">
        Delete
      </button>
    </td>
    <td data-input="select">
      <select class="">
        <option value="0">Select a type</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </td>
    <td data-input="text"><input type="text" placeholder="Name" /></td>
    <td data-input="text"><input type="text" placeholder="Last name" /></td>
    <td data-input="text"><input type="text" placeholder="Phone" /></td>
    <td data-input="radio">
      <input type="radio" />
    </td>
    <td data-input="checkbox">
      <input type="checkbox" />
    </td>
  </tr>
</table>
...
```

The first thing we find is a “tr” tag, the algorithm takes this tag and everything it contains and adds it to the main table that we create later, it is important to put the 'data-type="data"' declaration so that the program knows that "tr" is a row of data. Inside “tr” we find common “td” tags in HTML tables, 'data-ignorefield="true"' tells the algorithm that anything inside this field when in the main table should be ignored when retrieving data from the table, 'data - input="select "' tells the algorithm that what is inside is a "select" when retrieving the data from the table (when it is in the main table), and the same goes for 'data -input="text"', 'data-input="radio"' and 'data input="checkbox"'.

Also see that the “button” inside the ‘\<td data-ignorefield="true"\>’ contains the class ‘class="smarttable-ag-delete"’. Here we can create the buttons we want, but the button that contains this class will allow us to delete the field.

Now we will create our "form" where we can create the fields and buttons that we want and also include our main table as follows.

```html
...
<body>

  <form method="post">
    <table id="table1" border="2" style="border: 2px solid;" cellspacing=1>
      <tr>
        <th colspan="7">
          Example #1
        </th>
      </tr>
      <tr data-type="title">
        <th></th>
        <th data-id="type">Type</th>
        <th data-id="name">Name</th>
        <th data-id="lastname">Last Name</th>
        <th data-id="phone">Phone</th>
        <th data-id="myradio">My Radio</th>
        <th data-id="mycheck">My Check</th>
      </tr>
    </table>

    <br />
    <button type="button" onclick="oSmartTableAg.add('#table1', '#tablefields')">
      Add
    </button>
  </form>
...
```

We see how our main table has an id called “table1” and common HTML tags in a table with some quirks. The '\<tr data-type="title"\>' tag is very important, because in addition to serving as a title for our table, it tells our algorithm what the data that we will retrieve will be called at the time, the statements “data-id ” contain these names.

Our “form” also contains a button that, when clicked, executes the following statement “oSmartTableAg.add('#table1', '#tablefields')”. The “oSmartTableAg.add()” function is responsible for adding a new row to our main table using the “tr” from the first table we create and receives two parameters, the identifier of the main table and the identifier of the other table.

Finally, we need to indicate what our main table is and we will do this by adding the following script to our HTML file, which uses the “oSmartTableAg.setEventsFromTable()” instruction.

```html
...
  <script>
  
  oSmartTableAg.setEventsFromTable('#table1');

  </script>
</body>
...
```

If all goes well, you will see the changes in the browser.

To obtain the data that the end user adds to the main table, we must use the statement “oSmartTableAg.getArrayFromTable()”, it receives the identifier of the main table as the only parameter as follows.

```js
oSmartTableAg.getArrayFromTable('#table1')
```