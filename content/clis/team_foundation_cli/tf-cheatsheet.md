# Working with the MS Team Foundation Tool
## Cheat Sheet

### Find Location of TF.exe
```powershell
$tfPath = ((Get-ChildItem -Path "C:\" -Filter "tf.exe" -force -recurse)[0]).fullname
```
Alternatively, add the tf.exe to %PATH%. The commands then have to be invoked with `tf` at the beginning.

### Show all Workspaces on Machine
Regardless of current working directory, lists all server and local workspaces on the machine.
```
tf vc workspaces
```
### Show Current Workfold and Mapping
Shows the TF workspace associated to the current working directory (if any) and the associated server mapping.
```
tf vc workfold
```

### Create New Local Workspace on Machine
Creates the new TFS workspace in the current working directory.
```
tf vc workspace /new:"Workspace-Name" /location:local /collection:http://tfs:8080/tfs/INTEND /noprompt
```
For server workspace, use `/location:server` (but seriously, we don't do that).

### Edit Workspace
Edits the TFS workspace that is associated with the current working directory (if any).
```
#prompts you with options you can edit regarding the workspace
tf vc workspace
```
Alternatively, directly provide the option to edit, like new workspace name, new user, change collection a. s. o.

### Delete Workspace
Deletes a workspace and undoes all pending changes.
```
tf vc workspace /delete "Workspace-Name"
```

### Map Local Folder To Server Folder
Maps the local folder of a TFS workspace to a server folder.
```
tf vc workfold /noprompt /workspace:Workspace-Name "$/Server/Path" "local\Path"
```
If not mapped to a specific server folder, the workspace will alwys be mapped to the root path `"$/"`.

### Get Items From Server
Gets the items matching the specified pattern from the server to the current working directory. Re-creates the server path structure.
Different items can be provided by seperating them with a `whitespace`.
```
tf vc get "*.file" "some-folder" "hello*" /noprompt /recursive
```

### Get all Files from Folder in Latest Version
Gets all files in latest version from specified folder.
```
tf vc get .\SomeFolder /noprompt /recursive
```

### Add New Items to Pending Changes
Adds items or folders (recursively) to a server folder, also adding them to pending changes.
```
tf vc add some-file /noprompt /recurse
```
**CAUTION** as the adding will be relatively to the local as well as mapped server path.

### Check For Pending Changes
Checks for pending changes in specified location.
```
tf vc stat * /recursive
```

### Check-In Pending Changes
Checks in all pending changes relatively from current working directory.
```
tf vc checkin /comment:"some comment" /noprompt
```

### Get Change History
Gets the change history for specified location (recursively) or relatively from current working directory.
```
tf vc hist * /noprompt /recursive
```
--------------------
**This is only a cheatsheet for the most likely cases. The whole documentation can be found [here](https://docs.microsoft.com/en-us/azure/devops/repos/tfvc/checkin-command?view=vsts).**