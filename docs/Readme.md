# Qu'est ce qu'azog ?

Azog permet de concevoir une application front-end en faisant abstraction du langage de programmation.
L'attention n'est pas portée sur la logique métier de l'application mais sur la conception de composants unitaires qui vont définir la vue.

## Conception MVVM

Les vues sont définies de manière à dépendre d'un vue-model dont l'implémentation est libre mais qui doit respecter une interface. Lors de la conception d'une vue, on définit d'une part l'interface du vue-model correspondant (nom et type des propriétés exposées à la vue) et d'autre part des données mockées qui vont permettre de tester la réactivité de la vue lors de changements intervenant dans le vue-model.

## Programmation déclarative

Le code qui s'abstrait de l'usage d'un langage de programmation en particulier est écrit en JSON. Ce format de données est tout à fait arbitraire et pourrait être remplacé par n'importe quel autre syntaxe. L'important est que cette syntaxe est déclarative et donc possède un expressivité limitée comparé à un langage de programmation classique (javascript, c#, java, ...).

## Démonstration

```
git clone https://github.com/faygus/azog.git
cd azog
npm install
npm run demo
```
