# Usamos una imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos de nuestra app dentro del contenedor
COPY . .

# Instalamos las dependencias
RUN npm install

# Exponemos el puerto que utilizamos en el contenedor
EXPOSE 3001

# Comando para arrancar el microservicio
CMD ["npm", "start"]
