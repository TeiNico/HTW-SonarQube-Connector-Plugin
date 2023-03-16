# htw-sonarqube-connector-plugin README

Dieses VSCode Plugin wurde im Rahmen einer Masterarbeit entwickelt.
Es bietet eine Schnittstelle zwischen VSCode und dem SonarQube-Server unter der Domain https://nico-teichert.tech.

Im Rahmen der Masterarbeit sind zudem zwei weitere Repositories entstanden, welche benutzerdefinierte Regeln für den SonarQube Server beinhalten.
Diese können hier eingesehen werden:
- [Generelle Java Regeln](https://github.com/TeiNico/HTW-Java-Rules-General)
- [Java Regeln für Aufgabe 1](https://github.com/TeiNico/HTW-Java-Rules-Aufgabe_1)


## Plugin starten

### Voraussetzung

- [Visual Studio Code](https://code.visualstudio.com/)
- [SonarLint Extension](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
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
|[3.](#nr-3)|Matrikelnummer eingeben|- Hinterlegt die Matrikelnummer im VSCode Plugin<br>-Validiert lediglich das Format der Matrikelnummer|- Matrikelnummer|
|[4.](#nr-4)|Erstelle Projekte in SonarQube|Erstellt automatisch 3 Projekte in SonarQube:<br>- \<Matrikelnummer>_Aufgabe-1<br>- \<Matrikelnummer>_Aufgabe-2<br>- \<Matrikelnummer>_Aufgabe-3<br>- Verknüpft die zugehörigen Qualitätsprofile mit den erstellten Projekten||
|[5.](#nr-5)|Setze QualityProfile für Projekt|Verändert das in SonarQube hinterlegte Qualitätsprofil im ausgewählten Projekt|- SonarQube Projekt<br>- Qualitätsprofil|
|[6.](#nr-6)|Analyse durchführen|Führt eine Analyse des aktuell in VSCode geöffneten Projekts für das ausgewählte SonarQube Projekt durch|- sonar-scanner.bat<br>- Projekt|

Die definierten Funktionen hinter den Befehlen verwenden im die offizielle [API-Schnittstelle von SonarQube](https://next.sonarqube.com/sonarqube/web_api/api/alm_integrations).<br>
Um die Funktionalitäten vollumfänglich nutzen zu können, muss die Matrikelnummer, als auch der SonarQube Token im Plugin hinterlegt werden.<br>
Um die Analyse durchführen zu können (Nr. 6), wird ein zusätzliches Paket benötigt. Dieses können Sie sich [hier herunterladen](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/).

## Bedienung

### Nr. 1 
Die Aktivierung des Plugins muss wie [in Punkt 9 und 10](#anleitung) beschrieben durchgeführt werden.

### Nr. 2
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

Wenn der Token gültig ist, erscheint die Meldung **"✅ SonarQube Token wurde hinzugefügt:"**. Zudem ändert sich in der Statusbar der Status des **SonarQube Tokens** von **"❌"** zu **"✅"**.

![image](https://user-images.githubusercontent.com/40828962/225733275-3d3c9a6f-cef7-4b2c-babb-3056690d8113.png)

### Nr. 3
Die Matrikelnummer muss im Plugin hinterlegt werden. Der dazugehörige Befehl kann über die Befehlspalette, oder aber mit einem Klick auf den Button **Matrikelnummer** in der Statusbar, ausgeführt werden.

![image](https://user-images.githubusercontent.com/40828962/225754304-b5d72af7-f16e-46d6-a9b9-1e5f930053be.png)

Anschließend muss die Matrikelnummer Token in der Eingabeaufforderung eingegeben werden.

![image](https://user-images.githubusercontent.com/40828962/225754786-894cdc60-f66e-4476-81b1-15e89059e6fe.png)

Wenn die Matrikelnummer nicht dem Muster **s0XXXXXX** entspricht, wird die Fehlermeldung **❗ Matrikelnummer nicht gültig.❗** ausgegeben.

![image](https://user-images.githubusercontent.com/40828962/225755215-825729e3-c9aa-41b7-95f5-2342ecf961bc.png)

Wenn die Matrikelnummer gültig ist, erscheint die Meldung **"✅ Matrikelnummer wurde hinzugefügt:"**. Zudem ändert sich in der Statusbar der Status der **Matrikelnummer** von **"❌"** zu **"\<Matrikelnummer> ✅"**.

![image](https://user-images.githubusercontent.com/40828962/225755788-61fbf4ad-3761-4a0f-85a4-28f0e4d3e2ef.png)

Wenn die **Matrikelnummer**, als auch der **SonarQube Token** gesetzt sind, ändert sich der Status von **QualityProfil ändern** von **"❌"** zu **"🕵️‍♂️"**. Außerdem erscheint der Button **"Projekte erstellen 🔨"** in der Statusbar.

### Nr. 4
Um Projekte in SonarQube zu erstellen und die richtigen Qualitätsprofile automatisch zu hinterlegen, muss der Befehl **Erstelle Projekte in SonarQube** ausgeführt werden. Dies kann über die Befehlspalette, oder aber mit einem Klick auf den Button **"Projekte erstellen 🔨"** in der Statusbar, ausgeführt werden.

![image](https://user-images.githubusercontent.com/40828962/225757732-aa64fb76-b96e-4cac-a2a1-98cb7457fbdd.png)

Wenn mindestens eines der Projekte angelegt werden kann, erscheint die Meldung **🎉 Projekte wurden angelegt. 🎉**. Wenn ein Projekt nicht angelegt werden konnte, weil es schon existiert, erscheint die Meldung **❌ Request failed with status code 400**.

Die angelegten Projekte können anschließend im SonarQube Server unter dem Punkt **Projects** eingesehen werden.

![image](https://user-images.githubusercontent.com/40828962/225758699-cf36344f-7259-4a38-8a9b-1f552a7b1037.png)

### Nr. 5

Um das Qualitätsprofil eines Projekts zu verändern, kann der Befehl **Setze QualityProfile für Projekt** genutzt werden. Diese ist über die Befehlspalette, oder aber über de Button **"QualityProfil ändern 🕵️‍♂️"** aufzurufen.

![image](https://user-images.githubusercontent.com/40828962/225761027-81a3993a-5e34-4070-9ec8-ba7c70624d7b.png)

Anschließend werden alle vorhanden Projekte des Nutzers vom SonarQube Server geladen und zur Auswahl in VSCode bereitgestellt. Die Auswahl kann durch ein Klick mit der linken Maustaste auf des entsprechende Projekt, oder aber durch drücken der **ENTER** Taste, bestätigt werden.

![image](https://user-images.githubusercontent.com/40828962/225762528-ec163a0c-a55b-45f8-8cbc-71ba73952a42.png)

Wenn ein [automatisch erstelltes Projekt](#nr-4) ausgewählt wird, werden im Anschluss zwei Qualitätsprofile zur Auswahl bereitgestellt. Dabei handelt sich um die für das Projekt spezifisch entwickelten Qualitätsprofile in der **Standard** und **Detailed** Version. Wenn ein anderes Projekt ausgewählt wird, kann der Nutzer aus allen auf dem SonarQube Server zugänglichen Qualitätsprojekten auswählen.

![image](https://user-images.githubusercontent.com/40828962/225764809-6e7f44e1-a916-405c-9430-552bca42ae91.png)

Mit einem Klick auf das enstprechende Profil, bzw. mit der Bestätigung der Auswahl durch das drücken von der Taste **Enter**, wird das Qualitätsprofil für das Projekt gesetzt.

### Nr. 6

Um eine Analyse durchführen zu können, muss ein zusätzliches [Paket](https://docs.sonarqube.org/latest/analyzing-source-code/scanners/sonarscanner/) heruntergeladen werden.
Anschließend kann der Befehl **Analyse durchführen** über die Befehlspalette, oder aber über den Button **"Analyse durchführen"** gestartet werden.

![image](https://user-images.githubusercontent.com/40828962/225767378-d7f8313b-5006-4ce7-884c-8c8c0df42fa2.png)

Es öffnet sich der FileExplorer, indem die **sonar-scanner.bat** Datei ausgewählt werden muss.

![image](https://user-images.githubusercontent.com/40828962/225767885-eaadaf17-f6a6-4a21-910c-d2668aa7b24e.png)

Wenn die richtige Datei ausgewählt wird, ändert sich der Status von **Analyse durchführen** von **❌** zu **🚀**.

![image](https://user-images.githubusercontent.com/40828962/225768232-7bda5eef-8d14-4ab5-9d11-ab28ee77ab7d.png)

Zudem werden alle vorhanden Projekte des Nutzers vom SonarQube Server geladen und zur Auswahl in VSCode bereitgestellt. Die Auswahl kann durch ein Klick mit der linken Maustaste auf des entsprechende Projekt, oder aber durch drücken der **ENTER** Taste, bestätigt werden.

![image](https://user-images.githubusercontent.com/40828962/225762528-ec163a0c-a55b-45f8-8cbc-71ba73952a42.png)

Im Anschluss wird das in VSCode geöffnete Projekt, mit dem ausgewähltem SonarQube Projekt überprüft. Dabei öffnet sich ein Terminal mit dem Namen **Run Analyses**, in dem man den Status der Analyse verfolgen kann. In dem Terminal sollte zum Schluss die Meldung **EXECUTION SUCCESS** ausgegeben werden. Zudem erscheint die Meldung **Ergebnis im Browser öffnen?**. Durch einen Klick auf den **Öffnen** Button, wird dann das entsprechende Projekt in SonarQube geöffnet.

![image](https://user-images.githubusercontent.com/40828962/225769198-539a8adc-7536-4395-b411-5a80bcdf9a53.png)

Der Nutzer hat anschließend die Möglichkeit die Analyse Ergebnisse auf dem SonarQube Server einzusehen.

![image](https://user-images.githubusercontent.com/40828962/225769565-8a0e5b12-3fb2-4326-9cb3-07a91a1f3ef1.png)

