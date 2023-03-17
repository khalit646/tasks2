Код для построения таблиц лежит в файле src/database.sql

GET hostname/api/film  
Возвращает все фильмы  


GET hostname/api/film?id=1  
Возвращает фильм по id  


GET hostname/api/film?genre=1  
Возвращает фильмы с жанром id  1  


GET hostname/api/film?name=film  
Возвращает фильмы с названием film  


POST hostname/api/film  
{  
    "name": "",  
    "created": "",  
    "genres": [1, 2] // где 1 2 id жанров  
}  
Вносит фильм в базу данных  


PUT hostname/api/film  
{  
    "id": 1  
    "name": "",  
    "created": "",  
    "genres": [1, 2] // где 1 2 id жанров  
}  
Обновляет фильм и связи с жанрами  


DELETE hostname/api/film?id=1  
удаляет фильм с id = 1  


GET hostname/api/genre  
Возвращает все жанры  


GET hostname/api/genre?id=1  
Возвращает жанр с id 1  


GET hostname/api/genre?name=genre  
Вовращает жанр по имени  


GET hostname/api/genre?film=1  
Возвращает жанры пренадлежащие фильму с id 1  


POST hostname/api/genre  
{  
    "name": "genre"  
}  
Вносит в базу жанр с названием genre  


PUT hostname/api/genre  
{  
    "id": 1,  
    "name": ""  
}  
переименовывает жанр  


DELETE hostname/api/genre?id=1  
Удаляет жанр
