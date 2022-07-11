FROM node
COPY . .
RUN npm i
ENV NEXT_PUBLIC_URL ${URL}
RUN npm run build
