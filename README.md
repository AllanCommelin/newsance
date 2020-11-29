# Newsance
Projet étudiant M2 Dev à l'ECV Digital.
Travail en équipe : 
Benjamin Duez & Allan Commelin.

Back-office avec : 
- Système de connexion et d'inscription avec gestion des rôles
- CRUD news 
- CRUD artistes avec gestion de la relation genre
- CRUD albums avec gestion de la relation artiste
- CRUD concerts avec gestion de la relation artiste
- Message de notification lors de chaque action de la part de l'admin (success et error)

Front-office avec :
- Une page d'accueil affichant **le top 5 des artistes les plus likés**, les dernières news et les derniers albums. 
- Une page news avec tout les articles et **la possibilité pour un utilisateurs de commenté un article**.
- Une page albums qui affiche les albums.
- Une pages artites qui affiche tout les artistes avec les liens vers les pages de chaque artistes et la **possibilité de liker un artiste**
- Une pages qui liste les concerts.

Chaque page à **un champ de recherche rapide**.

Utilisation de **TailwindCss**

## Installer les dépendances
```
npm install
```

### Démarer le server
```
npm run serve
```


### Démarer JSON-SERVER
```
npm run server
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
