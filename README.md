# ServiceManager

---

## 🔰 Introduction

---

**C’est une application web conçue pour l’entreprise SAFARELEC, située dans le quartier industriel d’El Jadida.**

**Le but de cette application est de digitaliser le processus de gestion des interventions internes de l’entreprise.**

L’idée est la suivante :

- **SAFARELEC collabore avec une seule agence à la fois.**
- **Chaque agence fournit à SAFARELEC des employés chargés de la maintenance des équipements électriques.**
- **À la fin de chaque journée, les employés doivent renseigner un système interne basé sur Excel, développé en VBA (Visual Basic for Applications), afin de déclarer les détails de leur travail quotidien.**
- **L’administrateur consulte régulièrement les statistiques liées aux activités des employés.**

## ⚠️ Problématique

---

Ce système interne engendre de nombreux problèmes, aussi bien pour les employés que pour l’administration de SAFARELEC.

### Problématique côté employés:

---

- **Les employés doivent obligatoirement se déplacer physiquement vers l’unité centrale où est situé le système de SAFARELEC.**
- **Ils doivent également faire face à la complexité du système ainsi qu’au mécanisme de validation strict mis en place via VBA.**
- **Les données personnelles des employés ne sont pas sécurisées, car toute personne ayant accès au système peut les consulter librement.**
- **Le système tombe parfois en panne, ce qui engendre des problèmes pour les employés.**

### Problématique côté administration:

---

- **Les administrateurs de SAFARELEC doivent également se déplacer vers l’unité centrale où est situé le système.**
- **Le tableau de bord est complexe à lire et difficile à contrôler, ce qui rend l'analyse des données inefficace et prend beaucoup de temps.**
- **Il n’y a aucune obligation imposée aux employés de déclarer leur journée ; c’est à l’administrateur de faire respecter cette procédure, et non au système.**
- **Le problème de pannes fréquentes persiste, affectant également les administrateurs.**

Bien sûr ce que j’ai mentionné ce n’est rien que 10% des problème avec le système de **SAFARELEC basé sur VBA.**

## 💡 ServiceManager comme solution

---

Le rôle de notre application web est de résoudre autant de problèmes que possible. Je ne dirai pas qu'elle résout tous les problèmes, car toute personne ayant une expérience dans le domaine industriel vous dira qu'il est impossible de concevoir un logiciel parfait dès le départ. Cependant, notre objectif est de créer un système aussi performant que possible, de le livrer au client, de recueillir des retours et de l’améliorer progressivement.

`ServiceManager` est le nom de notre application web chargée de gérer les interventions des employés. Les fonctionnalités offertes par `ServiceManager` sont les suivantes :

### 🏠 Espace utilisateur commun entre les administrateurs et les employées

---

**Espace principal permettant aux utilisateurs (administrateurs et employés) de se connecter à leurs comptes, ainsi que de créer de nouveaux comptes.**

### 👤 Espace employée

---

Espace dédié aux employés. Cet espace comprend un tableau de bord simple affichant leurs activités et interventions, ainsi qu’une navigation vers d’autres pages : soumettre une intervention, consulter le profil, envoyer un mail, etc.

### 🛡️ Espace Administrateur

---

Espace dédié aux administrateurs de SAFARELEC. Il leur permet de consulter les différents profils des employés inscrits sur le système, ainsi que les statistiques, les interventions, les activités des employés, leurs e-mails, leurs demandes, etc.

### 📬 Espace de messagerie

---

Espace dédié aux échanges d’e-mails entre les différents utilisateurs du système, en particulier les messages envoyés par les administrateurs aux employés, ainsi que les demande et les réclamations envoyées par les employés aux administrateurs.

### 🔐 Espace Gestion des comptes

---

Cet espace contient les différentes demandes de création de comptes soumises par les employés.

En effet, un employé ne peut pas créer de compte directement, ce qui garantit la sécurité du système. L'employé soumet une demande de création, de modification ou de suppression de compte, et c’est à l’administrateur de valider l’action souhaitée par l’employé.

### 📝 Espace de soumission des formulaires

---

Espace où les employés soumettent leurs résultats journaliers dans un formulaire sécurisé et flexible. Une fois que l'employé a rempli ses données, il peut soit envoyer le formulaire à l'administrateur (qui ne pourra plus être modifié), soit sauvegarder le formulaire (qui pourra être modifié ultérieurement) et l'envoyer dans un délai maximum de 24 heures.

## 🎓 Cadre du projet

---

Ce projet est réalisé dans le cadre du stage d'initiation de première année de la filière ILISI (Ingénierie Logicielle et Intégration des Systèmes Informatiques).