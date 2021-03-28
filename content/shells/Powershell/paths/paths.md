# PowerShell Commands that are related to paths

## List paths and pathlengths

```powershell
get-childitem -recurse | select @{Name="path";Expression={$_.fullname}},@{Name="pathlength";Expression={$_.fullname.length}}| sort pathlength | format-list
```
