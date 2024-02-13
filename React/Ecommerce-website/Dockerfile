# # Etapa de construcción para el frontend
# FROM node:16 AS frontend-build
# WORKDIR /usr/src/app
# COPY frontend/ ./frontend/
# RUN cd frontend && npm install && npm run build

# # Etapa de construcción para el servidor
# FROM node:16 AS server-build
# WORKDIR /root/
# COPY --from=frontend-build /usr/src/app/frontend/build ./frontend/build
# COPY server/package*.json ./server/
# RUN cd server && npm install
# COPY server/server.js ./server/

# EXPOSE 3080

# CMD ["node", "./server/server.js"]






# Usa la imagen oficial de Node como base
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app/server
# Copia los archivos de la aplicación al contenedor
COPY ./server/
# Instala las dependencias
RUN npm install
# Expone el puerto en el que el servidor se ejecutará
EXPOSE 5004
# Comando para iniciar el servidor
CMD ["npm", "run", "start"]






# Establece el directorio de trabajo
WORKDIR /app/frontend
# Copia los archivos de la aplicación al contenedor
COPY ./frontend/
# Instala las dependencias
RUN npm install
# Expone el puerto en el que el frontend se ejecutará
EXPOSE 5000
# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]





















