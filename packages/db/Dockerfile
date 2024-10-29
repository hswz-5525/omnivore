FROM node:18.16

# 更改 APT 源
RUN { \
    echo "deb http://mirrors.tuna.tsinghua.edu.cn/debian/ buster main non-free contrib"; \
    echo "deb-src http://mirrors.tuna.tsinghua.edu.cn/debian/ buster main non-free contrib"; \
    echo; \
} > /etc/apt/sources.list && \
    apt-get update
    
WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .

COPY /packages/db/package.json ./packages/db/package.json

RUN apt-get update && apt-get install -y \
  postgresql \
  uuid-runtime

RUN yarn install

ADD /packages/db ./packages/db
ADD /packages/db/setup.sh ./packages/db/setup.sh

CMD ["yarn", "workspace", "@omnivore/db", "migrate"]
