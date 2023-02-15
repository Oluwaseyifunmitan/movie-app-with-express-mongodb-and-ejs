FROM node
WORKDIR /app
COPY . .
RUN yarn
RUN yarn tsc
EXPOSE 4000
CMD ["yarn","start"]