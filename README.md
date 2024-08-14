# litmotion


## TODO
[] - Set des max pour la durée, le nombre de fps et calculer le pad sur l'incrémentation des images
[] - Gérer les vidéos
[] - Gérer le son
[] - Fixer les imports avec des alias @

[] - Chaque projet a un framerate par défaut
[] - Chaque projet a une dimmension width / height par défaut
[] - Système de renders avec framerate et dimmensions différentes
[] - Composant englobant le tout -> body est géré maison
[] - Le composant englobant se voit attribué des varibles css scoppées à tout ses enfants : framerate (default-framerate / render-framerate), frame actuelle (dans le projet / dans la composition), durée (du projet / de la composition), timecode actuel (du projet / de la composition), la largeur par défaut du projet (default-width), la largeur du render (render-width), la hauteur par défaut du projet (default-height), la hauteur du render (render-height).
[] - Chaque composant récupère : framerate (defaultFramerate / renderFramerate), frame actuelle (dans le projet / dans la composition), durée (du projet / de la composition), timecode actuel (du projet / de la composition), le nom du render actuel, la largeur par défaut du projet (defaultWidth), la largeur du render (renderWidth), la hauteur par défaut du projet (defaultHeight), la hauteur du render (renderHeight).

[] - Chaque render par défaut est lié à toutes les versions (peut etre changé)
[] - Chaque render peut avoir un renderFramerate, un renderWidth et un renderHeight

[] - Gérer la compat avec https://motion.dev/
[] - Gérer la compat avec GSAP - ThreeJS