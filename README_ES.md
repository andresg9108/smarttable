# Tabla inteligente #

## Contenido ##

1. Introducción.
2. Dependencias.
3. Empezando.

## Introducción ##

El objetivo de este proyecto es proporcionar una tabla html inteligente.

## Dependencias ##

* Node.js (https://nodejs.org).
  - Ejecuta "node --version" en la consola de su sistema operativo para ver si ya está instalado.
* CLI de Npm (https://docs.npmjs.com/cli).
  - En Windows viene con el instalador de Node.js, en los sistemas operativos basados en Linux deberá instalarlo.
  - Ejecuta "npm --version" en la consola de su sistema operativo para ver si ya está instalado.

## Empezando ##

Para instalar Smart Table en nuestro proyecto debemos ejecutar el siguiente comando.

~~~
npm i smarttable-ag
~~~

Ahora podemos incluir los siguientes archivos JavaScript en nuestro proyecto y comenzar a usar todo lo que Smart Table tiene reservado para nosotros.

```html
...
<head>
  ...
  <script src="node_modules/smarttable-ag/dist/main.min.js"></script>
</head>
...
```

En el archivo “./test.html” puede encontrar un ejemplo simple de uso, el archivo “./index.html” contiene un ejemplo un poco más robusto pero también podemos echarle un vistazo. La siguiente explicación se basará en el archivo “./test.html”.

Primero añadiremos una etiqueta HTML de tipo “table” con id llamado “tablefields” y un estilo con sentencias CSS que nos permitirá ocultar dicha “tabla” de la vista del documento HTML (puedes quitar el estilo por un momento para ver cómo queda y también puedes usar clases CSS si quieres).

```html
...
<body>

  <table id="tablefields" style="display: none;">
  </table>

</body>
...
```

Ahora vamos a añadir las etiquetas que contendrá nuestra nueva “tabla”.

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

Lo primero que encontramos es una etiqueta “tr”, el algoritmo toma esta etiqueta y todo lo que contiene y lo agrega a la tabla principal que creamos luego. Es importante poner la declaración 'data-type="data"' para que el programa sabe que "tr" es una fila de datos. Dentro de “tr” encontramos etiquetas comunes “td” en tablas HTML, "data-ignorefield='true'" le dice al algoritmo que cualquier cosa dentro de este campo cuando esté en la tabla principal, debe ser ignorada al recuperar los datos de la tabla principal, "data-input='select'" le dice al algoritmo que lo que hay dentro es un "select" al recuperar los datos de la tabla (cuando está en la tabla principal) y lo mismo ocurre con "data-input='text'", "data-input='radio'" y "data-input='checkbox'". También vea que el botón dentro de "\<td data-ignorefield='true'\>" contiene la clase "smarttable-ag-delete", aquí podemos crear los botones que queramos pero el botón que contiene esta clase nos permitirá borrar el campo.

Ahora vamos a crear nuestro formulario, donde podemos crear los campos y botones que queramos y también incluir nuestra tabla principal de la siguiente manera.

```html
...
<body>

  <form method="post" onsubmit="return false;">
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
</body>
...
```

Vemos como nuestra tabla principal tiene un id llamado “tabla1” y etiquetas HTML comunes en una tabla con algunas peculiaridades. La etiqueta '\<tr data-type="title"\>' es muy importante porque además de servir como título para nuestra tabla, le dice a nuestro algoritmo cómo se llamarán los datos en el momento de recuperarlos, las declaraciones "data-id" contienen estos nombres.

Nuestro formulario también contiene un botón que, cuando se hace clic él, ejecuta la siguiente instrucción "oSmartTableAg.add('#table1', '#tablefields')". La función “oSmartTableAg.add()” se encarga de agregar una nueva fila a nuestra tabla principal usando el “tr” de la primera tabla que creamos y recibe dos parámetros, el identificador de la tabla principal y el identificador de la otra tabla.

Finalmente, debemos indicar cuál es nuestra tabla principal y lo haremos agregando el siguiente script a nuestro archivo HTML que utiliza la instrucción “oSmartTableAg.loadTableEvents()”.

```html
...
<script>
    
oSmartTableAg.loadTableEvents({
  smarttable: ['#table1']
});

</script>
...
```

Si todo va bien, verá los cambios en el navegador.

Para obtener los datos que el usuario final agrega a la tabla principal, debemos usar la instrucción “oSmartTableAg.getArrayFromTable()”, esta recibe el identificador de la tabla principal como único parámetro de la siguiente manera.

```js
oSmartTableAg.getArrayFromTable('#table1');
```