FROM node
COPY . .
RUN npm i
ARG URL
ENV NEXT_PUBLIC_URL ${URL}
RUN npm run build
