# donie-banana.github.io
dit is een ding dat ik doe wanneer ik me verveel (voornamelijk tijdens klas)

ookal is dit niet super belangrijk zou ik het toch fijn vinden als niemand dit kopieert. 
dit is verder te zien in de All rights reserved licensie.

ga naar donie-banana.github.io om dit project te bekijken / spelen.

--------------------------------------------------------------------------

** Nederlands **

<h2>hoe maak ik een custom newpage? (english underneath)</h2>
<h3>DISCLAIMER</h3>
Je kan stap 2 en 3 omwisselen of gewoon wachten met stap 2 als je het niet gelijk op je new page wilt hebben maar eerst ff designen.
De pagina gebruikt actief de bestanden op de locatie waar ze staan, verplaats of verwijder ze en het werkt niet meer.

<h3>STAP 1: MAAK FOLDER MET BESTANDEN AAN</h3>
Maak een folder aan met als naam iets zoals “customChromeTheme”, de naam kan je eigenlijk gewoon zelf kiezen.
De bestanden die er sws in moeten zijn: newpage.html en manifest.json
Newpage html is de pagina, deze kan je designen met css en functies met js.
PHP is NIET mogelijk aangezien dit een client side thema is.
<h4>STAP 1.1 MAAK DE MANIFEST.JSON</h4>
De manifest.json verteld chrome wat die met deze bestanden aan moet. 
Voor een custom newpage is "chrome_url_overrides": { "newtab": "newtab.html”} sws al nodig.
Voorbeeld: 
```json
{
    "manifest_version": 3,
    "name": "gekke henkie",
    "version": "1.0",
    "description": "mijn eigen thema",
    "chrome_url_overrides": {
      "newtab": "newtab.html"
    },
    "permissions": [],
    "icons": {
      "48": "img/banana.png"
    }
}
```
<h3>STAP 2 CHROME://EXTENSIONS/</h3>
Ga naar chrome://extensions/, klik rechts boven “developer mode” aan. Nu kan je links boven op “load unpacked” klikken. Klik hiermee de map aan de je net hebt aangemaakt.

<h3>STAP 3 DESIGN EN CREEER</h3>
Nu kan je net als een normale webpagina hem verder maken.

--------------------------------------------------------------------------

** English **

<h2>how do I create a custom newpage?</h2>
<h3>DISCLAIMER</h3>
You can swap steps 2 and 3 or just wait with step 2 if you don't want it on your new page right away but design it first.
The page actively uses the files in the location where they are, move or delete them and it won't work anymore.

<h3>STEP 1: CREATE FILE FOLDER</h3>.
Create a folder named something like “customChromeTheme”, you can actually just choose the name yourself.
The files that should be in there are: newpage.html and manifest.json.
Newpage html is the page, you can design it with css and functions with js.
PHP is NOT possible as this is a client side theme.
<h4>STEP 1.1 MAKE THE MANIFEST.JSON</h4>
The manifest.json tells chrome what to do with these files. 
For a custom newpage, “chrome_url_overrides”: { “newtab”: “newtab.html”} is needed.
Example: 
```json
{
    “manifest_version": 3,
    “name": ‘mad henkie’,
    “version": ‘1.0’,
    “description": ‘my own theme’,
    “chrome_url_overrides": {
      “newtab": ”newtab.html”
    },
    “permissions": [],
    “icons": {
      “48": ”img/banana.png”
    }
}
```
<h3>STEP 2 CHROME://EXTENSIONS/</h3>
Go to chrome://extensions/, click on “developer mode” at the top right. Now you can click “load unpacked” on the top left. Click on the folder you just created.

<h3>STEP 3 DESIGN AND CREATE</h3>
Now you can create it just like a normal web page.
<br>
<sub>Translated with DeepL.com (free version)</sub>