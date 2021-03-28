# Ape Workspace Command Line Interface 

## Benutzerdokumentation



### 1. Was ist die Ape Workspace CLI?

Das Ape Workspace Command Line Interface (CLI) ist ein Tool zum Erstellen der grundlegenden Projektstruktur für ein WebLine Mobile 2 AddIn. 

Die Ape Workspace CLI wird über die *PowerShell* installiert, aufgerufen und ausgeführt.



### 2. Wie installiere ich die Ape Workspace CLI?

Die Ape Workspace CLI ist ein benutzerdefiniertes .NET Tool und benötigt deshalb die .NET CLI, um als Tool installiert werden zu können. Die .NET CLI ist Teil des .NET SDK und ist somit im Regelfall auf den Rechnern der Entwickler bereits installiert.

Zur Kontrolle, ob die .NET CLI installiert ist, reicht folgender Aufruf über die *PowerShell*:

```powershell
dotnet
```

Ist die .NET CLI installiert, werden als Output Bedienhinweise für das `dotnet` Kommando angezeigt.

Fehlt die .NET CLI, folgt als Output ein Fehler.  Weitere Informationen zur Installation der .NET CLI finden sich in der [Microsoft Dokumentation](https://docs.microsoft.com/en-us/dotnet/core/tools/?tabs=netcore2x).



##### Installation des Tools

Die Installation der Ape Workspace CLI erfolgt über das `dotnet tool` Kommando unter Angabe des Pfades des NuGet-Feeds, in dem sich das NuGet-Package der Ape Workspace CLI befindet, und dem Namen des zu installierenden Tools.

```powershell
#Befehl zur Installation der Ape Workspace CLI als .NET Tool

$nugetFeed = "\\intern.intend.de\corp\NuGetRepo\Channels\Intend.Ape";
dotnet tool install -g ape.workspace.cli --add-source $nugetFeed; 

#HINWEIS:
#Feed kann direkt als Zeichenkette der Option --add-source als Parameter übergeben werden.
#Verwendung einer Variablen wegen Fehlern durch Zeilenumbruch beim Kopieren.
```



##### Installierte Tools anzeigen

Zum Anzeigen der installierten .NET Tools dient folgender Befehl:

```powershell
dotnet tool list -g
```



##### Installiertes Tool updaten

Sollte es eine neue Version der Ape Workspace CLI geben, kann wie folgt ein Update durchgeführt werden:

```powershell
$nugetFeed = "\\intern.intend.de\corp\NuGetRepo\Channels\Intend.Ape";
dotnet tool update -g ape.workspace.cli --add-source $nugetFeed;

#HINWEIS:
#Feed kann direkt als Zeichenkette der Option --add-source als Parameter übergeben werden.
#Verwendung einer Variablen wegen Fehlern durch Zeilenumbruch beim Kopieren.
```



### 3. Wie verwende ich die Ape Workspace CLI?

Da die Ape Workspace CLI als globales Tool auf dem Rechner installiert wurde, reicht das Aufrufen über den Befehl `apews` aus.

Die Ape Workspace CLI benötigt zur Erstellung der WLM2-AddIn-Projektstruktur zwingend den *Projektnamen* als Parameter. Alle weiteren Parameter sind optional.



#####apews-Kommando

Die Projektstruktur wird in dem Ordner erstellt, der zum Zeitpunkt des Aufrufs das *current working directory* ist. Das `apews`-Kommando muss also aus dem **Zielordner** heraus aufgerufen werden.

Die Erstellung einer Projektstruktur für ein WLM2-AddIn erfolgt wie folgt:

```powershell
#Beispiele zur Verwendung des Befehls "apews"
#Aufruf erfolgt aus dem Verzeichnis, in dem das AddIn erstellt werden soll

apews -n [Projektname] #einfacher Aufruf: kein Präfix, Templates werden installiert

apews -n [Projektname] -p [Projektpraefix] -t [true | false] #vollständiger Aufruf
```



#####Liste der verfügbaren Parameter

| Kürzel | Langname       | Funktion                                                     | erforderlich? |
| ------ | -------------- | :----------------------------------------------------------- | ------------- |
| -n     | --project-name | Core-Name der AddIn-Solution *und* der Projekte.<br /><br />Beispiel: "RLP.EIF"<br />Solutionname: "[Präfix].RLP.EIF"<br />Projektnamen: "RLP.EIF.[Business\|Service\|UI]" | ja            |
| -p     | --prefix       | Präfix der AddIn-Solution, welches nicht für die Projektnamen verwendet wird.<br /><br />Beispiel: "Intend.Wlm2.Addin"<br />Solutionname: "Intend.Wlm2.Addin.[Core-Name]"<br />Projektnamen: "[Core-Name].[Business\|Service\|UI]" | nein          |
| -t     | --templates    | Argumente: *true* oder *false*<br />Bestimmt, ob die WLM2-AddIn Templates vor Erstellen der Projektstruktur installiert werden sollen oder nicht.<br />Sofern nicht angegeben, werden die Templates installiert. | nein          |



### 4. Was leistet die Ape Workspace CLI?

Die Ape Workspace CLI übernimmt folgende Aufgaben zur Erstellung einer Projektstruktur für ein WLM2-AddIn:

- das Installieren der dotnet-Templates für den Workspace & die Projekte, falls nicht anders angegeben
- Anlegen des Ape Workspace **inklusive** Ordnerstruktur, Create-Release-Skripten usw.
- Anlegen der AddIn-Solution innerhalb des Workspaces
- Anlegen eines Basis Business-, Service- und -UI-Projekts innerhalb des Workspaces, **inklusive** Service_Module- und UI-Module-Klassen mit Codebeispielen zur Registierung der UnityContainer
- Hinzufügen der Projekte zur AddIn-Solution
- Wiederherstellen der NuGet-Referenzen



### 5. Wie sieht der Output für ein WLM2-AddIn aus?

Das Anlegen eines WLM2 AddIns über die Ape Workspace CLI erzeugt folgenden Output:

```powershell
C:\USERS\REBECCAV\DESKTOP\TESTORDNER
│   ApeWorkspace.json
│   Intend.Wlm2.Addin.Beispiel.sln
│   NuGet.Config
│
├───Config
│   └───ApeVs
│           __file$Version__.props
│
├───Docs
│       .gitkeep
│
├───Source
│   ├───src
│   │   │   .gitkeep
│   │   │
│   │   ├───Beispiel.Business
│   │   │   │   Beispiel.Business.csproj
│   │   │   │
│   │   │   ├───obj
│   │   │   │       Beispiel.Business.csproj.nuget.cache
│   │   │   │       Beispiel.Business.csproj.nuget.g.props
│   │   │   │       Beispiel.Business.csproj.nuget.g.targets
│   │   │   │       project.assets.json
│   │   │   │
│   │   │   └───Properties
│   │   │           AssemblyInfo.cs
│   │   │
│   │   ├───Beispiel.Service
│   │   │   │   Beispiel.Service.csproj
│   │   │   │   Service_Module.cs
│   │   │   │
│   │   │   ├───obj
│   │   │   │       Beispiel.Service.csproj.nuget.cache
│   │   │   │       Beispiel.Service.csproj.nuget.g.props
│   │   │   │       Beispiel.Service.csproj.nuget.g.targets
│   │   │   │       project.assets.json
│   │   │   │
│   │   │   └───Properties
│   │   │           AssemblyInfo.cs
│   │   │
│   │   ├───Beispiel.UI
│   │   │   │   Beispiel.UI.csproj
│   │   │   │   UI_Module.cs
│   │   │   │
│   │   │   ├───obj
│   │   │   │       Beispiel.UI.csproj.nuget.cache
│   │   │   │       Beispiel.UI.csproj.nuget.g.props
│   │   │   │       Beispiel.UI.csproj.nuget.g.targets
│   │   │   │       project.assets.json
│   │   │   │
│   │   │   └───Properties
│   │   │           AssemblyInfo.cs
│   │   │
│   │   └───_Bundle
│   │       │   _Bundle.csproj
│   │       │
│   │       ├───obj
│   │       │       project.assets.json
│   │       │       _Bundle.csproj.nuget.cache
│   │       │       _Bundle.csproj.nuget.g.props
│   │       │       _Bundle.csproj.nuget.g.targets
│   │       │
│   │       └───Properties
│   │               AssemblyInfo.cs
│   │
│   └───test
│           .gitkeep
│
└───Task
    ├───Build
    │   ├───MsBuild
    │   │       Build.ps1
    │   │       Clean.ps1
    │   │
    │   └───NuGet
    │           pack.ps1
    │
    ├───Cleanup
    │   └───Workspace
    │           .gitkeep
    │
    ├───Common
    │       Initialize-TaskSystem.ps1
    │       nuget.exe
    │       NuGet.ps1
    │       TaskSystem.psm1
    │       VisualStudio.ps1
    │       Workspace.ps1
    │
    ├───Publish
    │   └───NuGet
    │           push.ps1
    │
    └───Trigger
            Clear-Workspace.ps1
            Create-CI-Release.ps1
            Create-Release.ps1
```

