$csprojFile = Get-ChildItem "path\to\file\extension"

$xml = [xml](Get-Content $csprojFile)

($xml.Project.ItemGroup.PackageReference | Where Include -Match "Your-Package-Reference-or-Pattern").Version = "new-version-as-string"

$xml.Save($csprojFile.Fullname)