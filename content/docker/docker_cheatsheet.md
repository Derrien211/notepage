# 🐋```docker```

- **new format: ```docker [management command] [subcommand] (options)```**

- ```version```: gets installed version of docker, can be used as check if docker is running
- ```info```: detailed information



###  ```container```

#### start/stop/remove

- ```run --publish 80:80 nginx``` : starts docker container based on image called "nginx" on port 80:80 (**important**: always provide image last)
  - ```-d|--detach```: run container in background
  - ```--name [name]```: specifies name of container
  - ```-e|--env```: pass environment variable to container (e.g. ```MYSQL_RANDOM_ROOT_PASSWORD=yes```)
  - ```--rm```: automatically removes container when it exits
- ```stop [container id/name]```: stop container
- ```ls```: lists all running containers
  - ```-a```: lists all containers
- ```start [container id/name]```: starts a stopped container
- ```logs [container id/name]```: gets logs for specified container
- ```rm [container id/name]```: removes container(s)
  - ```-f```: force to remove running container



#### What's happening inside a container?

- ```top [container id/name]```: lists processes running insinde of specified container
- ```stats (container id/name)```: shows live stream of container resource usage statistics; if **no** container id/name is provided, it shows stats for **all** running containers
- ```inspect [container id/name]```: displays metadata about the container and how it was initialized, returns JSON
- ```exec -it [container id/name][COMMAND]```: interactively executing COMMAND on existing container
- ```run -it [container id/name]```: start container interactively with pseudo-TTY terminal (```-i -t```)
  - leave with ```exit``` (stops container)
- ``` start -ai [container id/name]```: start stopped container interactively



#### Docker Networking

- ```port [container id/name]```: get used ports of specified container
- ```run -p|--publish [HOST:CONTAINER]```: expose ports when running container
- ```inspect [container id/name] --format "{{.NetworkSettings.IPAddress}}"```: inspect IP Address of container
- ```run --network [network id/name]```: run new container on specified network

### ```network```

- ```ls```: list existing networks
- ```inspect [network id/name]```: shows details about specified network
- ```create [name]```: creates new network
- ```connect [network id/name] [container id/name]```: connect existing container to specified network
- ```disconnect [network id/name] [container id/name]```: disconnect container from network

--------------

### Important Notes

- ```apt-get update && apt-get install -y procps```: install procps for ```ps aux```usage, since it is no longer part of **mysql** image
- **Alpine Linux**: very small Linux distribution focused on security; no *bash* pre-installed
- **Avoid static IP addresses**
- **default bridge network has no default DNS, so create custom networks**



