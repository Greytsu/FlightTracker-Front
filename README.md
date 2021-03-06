
  
# Projet Flight Tracker - FRONT  
  
- [Projet Flight Tracker - SCRAPER](#projet-flight-tracker---scraper)
  * [Auteurs](#auteurs)
  * [Introduction](#introduction)
  * [Base de données](#base-de-donn-es)
  * [Scraper](#scraper)
    + [Technologies](#technologies)
    + [Utilisation](#utilisation)
      - [Docker](#docker)
      - [Lancement manuel](#lancement-manuel)
      - [Explications](#explications)
  * [API Rest](#api-rest)
    + [Technologies](#technologies-1)
    + [Utilisation](#utilisation-1)
      - [Docker](#docker-1)
      - [Lancement manuel](#lancement-manuel-1)
      - [Swagger](#swagger)
      - [Explications](#explications-1)
  * [Front](#front)
    + [Technologies](#technologies-2)
    + [Utilisation](#utilisation-2)
      - [Lancement manuel](#lancement-manuel-2)
      - [Explications](#explications-2)

## Auteurs  
  
- [COUJANDASSAMY Olivier](https://github.com/Greytsu)  
- [STROHL Lucas](https://github.com/LucasStrohl)  
  
## Introduction  
  
Ce projet a pour but d'afficher sur un site web une carte contenant tous les avions actifs sur une période donnée. Il est également possible d'afficher ces données sous forme de tableau.  
  
Ce projet est composé de trois programmes :  
- [Data scraper](https://github.com/Greytsu/FlightTracker) : (Spring batch) récupère périodiquement les données sur l'API [AirLabs](https://airlabs.co/) puis  les stock sur la base de données  
- [API Rest](https://github.com/Greytsu/FlightTracker) : (Spring boot) met à disposition les données pour le front  
- [Front](https://github.com/Greytsu/FlightTracker) : (ReactJS) affichage des données  
  
```mermaid 
graph LR 
A(BATCH) --> B((Database)) 
B --> C(REST API) 
C --> D(FRONT) 
```  
  
## Base de données

Voici la structure de la base de données

**Plane**

| Column | Type |
| --- | --- |
| :key: regNumber | String |
| aircraft_icao | String |

**Flight**

| Column | Type |
| --- | --- |
| :key: hex| String |
| flight_number | String |
| flight_iata | String |
| dep_iata | String |
| dep_icao | String |
| arr_iata | String |
| arr_icao | String |
| airline_icao | String |
| airline_iata | String |
| flag| String |

**FlightInfo**

| Column | Type |
| --- | --- |
| :key: id  | int |
| lat | double |
| lng | double |
| alt | int |
| dir | int |
| speed | int |
| v_speed| double |
| updated | Date |
| status | String |

## Scraper

### Technologies
- Java : JDK 17
- Spring batch
- ORM : JPA
- BDD : MySQL :dolphin:

### Utilisation

#### Docker
Il est possible de récupérer l'image Docker préconfigurée de ce programme.


Récupérer l'image:
```
docker pull greytsu/flight-tracker-scraper:1.0
```

Lancer l'image:
```
docker run -d --rm -it greytsu/flight-tracker-scraper:1.0
```

Arrêter le conteneur:
```
docker stop <container id>
```

#### Lancement manuel
Il est également possible de récupérer le repo et lancer le projet manuellement.

Cloner le repo : 
```
git clone https://github.com/Greytsu/FlightScraper.git
```
Avant de lancer l'application, veuillez créer un fichier de propriétés _application.properties_ dans le package _resources_.
```
spring.datasource.url=<url bdd mysql>  
spring.jpa.show-sql=false  
spring.jpa.hibernate.ddl-auto=update  
spring.jpa.properties.hibernate.jdbc.batch_size=100
```

#### Explications
Le scraper va récupérer les données sur l'API publique de AirLabs, le nombre de requêtes étant limité à 1000 par mois, nous avons déterminé un intervalle de 45 minutes.

## API Rest

### Technologies
- Java : JDK 17
- Spring boot
- ORM : JPA
- BDD : MySQL :dolphin:

### Utilisation

#### Docker
Il est possible de récupérer l'image Docker préconfigurée de ce programme.


Récupérer l'image:
```
docker pull greytsu/flight-tracker-api:1.0
```

Lancer l'image en attribuant un port:
```
docker run -d --rm -p <port>:8080 -it greytsu/flight-tracker-api:1.0
```

Arrêter le conteneur:
```
docker stop <container id>
```

#### Lancement manuel
Il est également possible de récupérer le repo et lancer le projet manuellement.

Cloner le repo : 
```
git clone https://github.com/Greytsu/FlightTracker.git
```
Avant de lancer l'application, veuillez créer un fichier de propriétés _application.properties_ dans le package _resources_.
```
spring.datasource.url=<url bdd mysql>   
spring.jpa.hibernate.ddl-auto=validate  
spring.jpa.show-sql=true  
spring.mvc.pathmatch.matching-strategy = ANT_PATH_MATCHER  
server.servlet.context-path=/flightTracker/api
```
#### Swagger
```
http://localhost:<port>/flightTracker/api/swagger-ui/
```

#### Explications
L'API met à disposition un endpoint permettant de récupérer les avions, ce dernier attend plusieurs paramètres dont les valeurs de pagination (page, nb d'éléments par page) et une date pour récupérer les avions actifs sur une date précise.

## Front

### Technologies
- ReactJS (ES6)

### Utilisation

#### Lancement manuel

cloner le projet:
```
git clone https://github.com/Greytsu/FlightTracker-Front.git
```
Pour installer tous les packages nécessaire : 
```
npm install
```
Créer le fichier .env à la racine du projet et l'implémenter avec les informations suivantes :
```
REACT_APP_SYNCFUSION_TOKEN={syncfusion api key (optional)}
REACT_APP_GOOGLE_MAP_API_KEY={google cloud platform api key}
REACT_APP_FLIGHTTRAKER_API_URL=http://localhost:8080/flightTracker/api/v1
```
 Lancement de l'application :
```
npm start
```
URL par défaut de l'application :
```
http://localhost:3000
```  

#### Explications
La partie front permet à l'utilisateur de consulter et manipuler une carte du monde affichant la position de tous les avions actifs à un instant T, il y a également un affichage sous forme de tableau proposant plusieurs tris possible.

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

<small><i><a href='https://stackedit.io/'>Written with StackEdit</a></i></small>