## 1. Jenkins是什么?
- Jenkins 是一款业界流行的开源持续集成工具，广泛用于项目开发，具有自动化构建、测试和部署等功能。


## 2.创建React项目

```js
create-react-app react-cicd
```

## 3. 安装JDK

```js
cd /usr/local/src
wget http://img.zhufengpeixun.cn/jdk1.8.0_211.tar.gz
tar -xzvf jdk1.8.0_211.tar.gz 
mkdir /usr/java
cp -r /usr/local/src/jdk1.8.0_211 /usr/java
ln -s /usr/java/jdk1.8.0_211/bin/java /usr/bin/java
```

## 4. 安装jenkins
- [update-center](https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json)
- 1/etc/sysconfig/jenkins1 1JENKINS_USER="root"`

```js
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
yum install -y jenkins
```

## 5. 安装插件
- Generic Webhook Trigger web触发器
  - http://<UserID>:<API Token>@<Jenkins IP地址>:端口/generic-webhook-trigger/invoke
  - http://admin:passwd@115.29.64.253:8080/generic-webhook-trigger/invoke    
- Publish Over SSH 通过SSH布署服务器
- nvm wrapper 提供node环境

## 5. 关闭防火墙
```js
systemctl stop firewalld.service
systemctl disable firewalld.service
```

## 6. 配置webhook
- 添加远程仓库地址，配置登录名及密码及分支
- 添加触发器
- 添加和测试钩子



## 7. 编写构建脚本
```js
npm config set registry http://registry.npm.taobao.org/ &&
npm install &&
npm -rf build &&
npm run build 
```

## 9. 安装nginx

vi /etc/yum.repos.d/nginx.repo
```js
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
安装nginx
```
```js
yum install nginx -y
```

## 10. 布署服务器
- Publish Over SSH
- 系统管理-系统设置里找到 `Publish over SSH`
- ssh-copy-id命令可以把本地主机的公钥复制到远程主机的authorized_keys文件上,实现免登录

```js
ssh-keygen -t rsa
ssh-copy-id 192.168.1.2
```

```js
npm config set registry http://registry.npm.taobao.org/ &&
npm install &&
npm -rf build &&
npm run build 
cd build&&
tar -zcvf build.tar.gz *
```

```js
cd /usr/share/nginx/html &&
tar -xzvf build.tar.gz &&
rm -rf build.tar.gz
```



## 11. 邮件提醒


npm install
如果环境被设置成NODE_ENV=production的话就不会安装所有包

rm -rf ./dist 
npm run build

红蓝发布
- [Jenkins打造强大的前端自动化工作流](http://www.sohu.com/a/228518515_820120)

- [Jenkins Git安装设置](https://www.yiibai.com/jenkins/jenkins_git_setup.html)

- [Jenkins详细教程](https://www.jianshu.com/p/5f671aca2b5a)
