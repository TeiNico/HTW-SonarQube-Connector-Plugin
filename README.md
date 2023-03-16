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

10. Aktivieren Sie Plugin, indem Sie den Befehl **"HTW: Plugin aktivieren ✅"** in der Befehlspalette suchen und ausführen

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
|[1.](#nr-1)|Plugin aktivieren ✅|- Aktiviert das Plugin<br>- Zeigt die Felder in der Statusbar an||
|[2.](#nr-2)|SonarQube Token eingeben|- Hinterlegt den SonarQube Token im VSCode Plugin<br>- Überprüft die Gültigkeit des eingegebenen Tokens|- SoarQube Token|
|3.|Matrikelnummer eingeben|- Hinterlegt die Matrikelnummer im VSCode Plugin<br>-Validiert lediglich das Format der Matrikelnummer|- Matrikelnummer|
|4.|Erstelle Projekte in SonarQube|Erstellt automatisch 3 Projekte in SonarQube:<br>- \<Matrikelnummer>_Aufgabe-1<br>- \<Matrikelnummer>_Aufgabe-2<br>- \<Matrikelnummer>_Aufgabe-3<br>- Verknüpft die zugehörigen Qualitätsprofile mit den erstellten Projekten||
|5.|Setze QualityProfile für Projekt|Verändert das in SonarQube hinterlegte Qualitätsprofil im ausgewählten Projekt|- SonarQube Projekt<br>- Qualitätsprofil|
|6.|Analyse durchführen|Führt eine Analyse des aktuell in VSCode geöffneten Projekts für das ausgewählte SonarQube Projekt durch|- sonar-scanner.bat<br>- Projekt|

Die definierten Funktionen hinter den Befehlen verwenden im die offizielle [API-Schnittstelle von SonarQube](https://next.sonarqube.com/sonarqube/web_api/api/alm_integrations).<br>
Um die Funktionalitäten vollumfänglich nutzen zu können, muss die Matrikelnummer, als auch der SonarQube Token im Plugin hinterlegt werden.<br>
Um die Analyse durchführen zu können (Nr. 6), wird ein zusätzliches Paket benötigt. Dieses können Sie sich [hier herunterladen]().

## Bedienung

#### Nr. 1 
Die Aktivierung des Plugins muss wie [oben](#anleitung) beschrieben durchgeführt werden.

#### Nr. 2
Der SonarQube Token muss zur Authentifizierung auf dem SonarQube Server im Plugin hinterlegt werden. 
Der Token kann nach erofolgreichem Login auf dem SonarQube Server unter dem Menüpunkt **My Account** > **Security**, mit **Generate** angelegt werden.
Mehr Informationen finden Sie [hier](https://docs.sonarqube.org/8.9/user-guide/user-account/generating-and-using-tokens/).

![image](https://user-images.githubusercontent.com/40828962/225729389-ef40cf52-4cb7-49bb-b2f2-cdbd0558b92b.png)

Wenn der Token nicht mehr benötigt wird, kann dieser wie unter 4. im Bild zusehen ist, mit einem Klick auf **Revoke** aus der Liste gelöscht werden.

Der erstellte Token muss dann im Plugin hinterlegt werden. Der dazugehörige Befehl kann über die Befehlspalette, oder aber mit einem Klick auf den Button **SonarQube Token** in der Statusbar, ausgeführt werden.

![image](https://user-images.githubusercontent.com/40828962/225731741-3e631882-da97-4d57-a19b-cf5c81c298a7.png)

Anschließend muss der SonarQube Token in der Eingabeaufforderung eingegeben werden.

![image](https://user-images.githubusercontent.com/40828962/225732271-aa5ce9e1-1ac0-4d4c-84e3-067a37de1cad.png)

Wenn der Token ungültig ist, erscheint die Meldung **"❗ Login mit dem angegebenem SonarQube Token nicht möglich. ❗"**.

![image](https://user-images.githubusercontent.com/40828962/225732612-4532b654-7990-4f11-99bf-3c2479622401.png)

Wenn der Token gültig ist, erscheint die Meldung **"✅ SonarQube Token wurde hinzugefügt:"**. Zudem ändert sich in der Statusbar der Status des SonarQube Tokens von **"❌"** zu **"✅"**.

![image](https://user-images.githubusercontent.com/40828962/225733275-3d3c9a6f-cef7-4b2c-babb-3056690d8113.png)

#### Nr. 3

#### Nr. 4

#### Nr. 5

#### Nr. 6

#### Nr. 7


