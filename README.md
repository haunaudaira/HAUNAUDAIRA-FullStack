 <h1 align="center"> - Segunda Practica integradora -  </h1>

### Para esta entrega se incluyó:
- se modifico el modelo de user con los campos indicados en la presentación
- se desarrollaron estrategias de passport para que funcione acorde al modelo de usuarios mencionado anteriormente
- se modificó el sistema de login del usuario para poder trabajar con JWT
- se desarrolló la estrategia "current" para extraer la cookie que contiene el token para obtener el usuario asociado al mismo. En caso de tener el token, devuelve al usuario asociado al token. Caso contrario, devuelve un error de passport. Se implementó un extractor de cookie
- se agregó al router /api/sessions/ la ruta /current, la cual utiliza el modelo de login jwt, para poder devolver en una respuesta el usuario actual

:construction: Proyecto en construcción :construction: