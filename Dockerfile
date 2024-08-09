# 使用官方的 Node.js 镜像作为基础镜像
FROM node:18 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到工作目录
COPY public/ /app/public
COPY src/ /app/src


# 构建 React 应用
RUN npm run build

# 使用官方的 Nginx 镜像作为基础镜像来托管构建的应用
# FROM nginx:alpine

# 复制构建的文件到 Nginx 的默认静态文件目录
# COPY --from=build /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
# CMD ["nginx", "-g", "daemon off;"]

# 暂时不使用nginx 下面默认3000 端口
CMD ["npm", "start"]