from node:16-alpine3.14
workdir "/front"
copy ./package.json ./
copy ./package-lock.json ./
run ls
run npm install
copy . .
cmd ["npm", "start"]
