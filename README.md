# htw-sonarqube-connector-plugin README

Dieses VSCode Plugin wurde im Rahmen einer Masterarbeit entwickelt.
Es bietet eine Schnittstelle zwischen VSCode und dem SonarQube-Server unter der Domain https://nico-teichert.tech.

## Installation

### Voraussetzung

- [Visual Studio Code](https://code.visualstudio.com/)
- [git](https://git-scm.com/book/de/v2/Erste-Schritte-Git-installieren)
- [Node.js](https://nodejs.org/de)

### Anleitung

Da das Plugin nicht auf dem VSCode Marktplatz veröffentlicht wurde, muss es lokal gespeichert und ausgeführt werden.
Hierfür sind folgende Schritte durchzuführen:

1. Öffnen Sie VSCode 
2. Öffnen Sie ein Terminal in VSCode mit der Tastenkombinantion **STRG + SHIFT + Ö**
3. Navigieren Sie im Terminal zu dem Ordner, indem Sie das Plugin speichern möchten
```
cd <Ordnerpfad>
```
4. Klonen Sie das GitHub Repository
```
git clone https://github.com/TeiNico/HTW-SonarQube-Connector-Plugin.git
```
5. Navigieren Sie im Terminal in den Ordner des Repository
```
cd .\HTW-SonarQube-Connector-Plugin\
```
6. Installieren Sie alle notwendigen Abhängigkeiten des Plugins mit dem Befehl
```
npm install
```
7. Öffnen Sie anschließend den Ordner mit dem Plugin in VSCode
8. Starten sie den Debugging-Modus für das Pugin indem Sie **F5** drücken, oder im Menü unter **Ausführen** > **Debugging start** auswählen.

![VSCode Debugging Starten](https://user-images.githubusercontent.com/40828962/225690991-d55501b9-2cc0-4d18-b023-28eb04b8d0d4.png)

9. Öffnen Sie die Befehlspalette mit der Tastenkombinantion **STRG + SHIFT + P**, oder im Menü unter **Anzeigen** > **Befehlspalette**

![Befehlspalette öffnen](https://user-images.githubusercontent.com/40828962/225702655-6ac37df2-94fc-4d42-b2ec-6d2beb3c372f.png)

10. Aktivieren Sie Plugin, indem Sie den Befehl **HTW: Plugin aktivieren ✅** in der Befehlspalette suchen und ausführen

![Befehl ausführen](https://user-images.githubusercontent.com/40828962/225703793-c40128ec-cc3c-4e45-8125-1c714a3943c6.png)

Im Anschluss erscheint eine Benachrichtigung in VSCode, welche die Aktivierung des Plugins bestätigt. Des Weiteren erscheinen in der Statusbar einige neue Felder.

![Plugin aktiviert](https://user-images.githubusercontent.com/40828962/225705038-6bb3077c-1ac1-445b-90b6-ce7ed71f89b7.png)

<h3 align="center">🚀 Damit ist das Plugin aktiviert. 🚀</h3>

## Funktionalitäten

Das Plugin verfügt über mehrere Befehle, die unter der Kategorie **HTW** gruppiert wurden.
Die Befehle können alle in der Befehlspalette, sowie mithilfe der grafischen Oberfläche in der Statusbar, ausgeführt werden. 
In der folgenden Tabelle können die unterschiedlichen Funktionen, sowie eine dazugehörige Kurzbeschreibung, entnommen werden.

|Nr.|Titel des Befehls|Kurzbeschreibung|Input|
|:---:|---|---|---|
|1.|Plugin aktivieren ✅|...|...|
|2.|SonarQube Token eingeben|...|...|
|3.|Matrikelnummer eingeben|...|...|
|4.|Erstelle Projekte in SonarQube|...|...|
|5.|Setze QualityProfile für Projekt|...|...|
|6.|Analyse durchführen|...|...|

Die definierten Funktionen hinter den Befehlen verwenden im die offizielle [API-Schnittstelle von SonarQube](https://next.sonarqube.com/sonarqube/web_api/api/alm_integrations).
Um die Analyse durchführen zu können, wird ein zusätzliches Paket benötigt. Dieses können Sie sich [hier herunterladen]().

## Bedienung

