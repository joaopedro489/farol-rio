FROM node:22-alpine
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN npx prisma generate
RUN yarn build
EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate reset --force && yarn seed && node dist/src/main"]
