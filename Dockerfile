FROM node:alpine

# Définit le répertoire de travail, où l'application résidera dans le Docker
WORKDIR /usr/src/app

# Copie package.json et package-lock.json à l'intérieur du Docker
COPY package*.json ./

# Exécute la commande npm install pour installer les dépendances de l'application dans Docker
RUN npm install

# Copie le reste des fichiers de l'application dans Docker
COPY . .

# Expose le port sur lequel l'application écoute
EXPOSE 5173

# Commande de démarrage de l'application
CMD ["npm", "run", "dev"]
