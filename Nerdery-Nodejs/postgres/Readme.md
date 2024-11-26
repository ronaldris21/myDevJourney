Hi Team!
Just a heads up for next week!
I've seen the content about databases and I couldn't find info about how or where do we have to run the commands.
So I would suggest to use docker and pgadmin.
I had some issues configuring the enviroment, so this may be useful for you guys.
Just follow the below video tutorial:

* <https://www.loom.com/share/28d94f14dd55445f83e91a0577854512?sid=62240a7d-f476-4e64-a541-508b1330c13f>

docker-compose.yml
version: '3.8'

services:
  postgres_container:
    image: postgres:17
    container_name: postgres_container
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: test_db
    networks:
      - my_network
    ports:
      - "5432:5432"
  
  pgadmin4_container:
    image: dpage/pgadmin4
    container_name: pgadmin4_container
    environment:
      PGADMIN_DEFAULT_EMAIL: <admin@admin.com>
      PGADMIN_DEFAULT_PASSWORD: admin
    networks:
      - my_network
    ports:
      - "5050:80"

networks:
  my_network:
    driver: bridge

Some extra commands I used in the video:

docker inspect postgres_container
docker inspect postgres_container | grep IPAddress

SELECT * FROM customer
Database file:
<https://neon.tech/postgresql/postgresql-getting-started/postgresql-sample-database>
Configure Docker:
Windows: <https://www.youtube.com/watch?v=cMyoSkQZ41E>
Mac: <https://www.youtube.com/watch?v=-EXlfSsP49A>
Database schema:
<https://neon.tech/postgresqltutorial/printable-postgresql-sample-database-diagram.pdf>

# DOCUMENTATION FOLLOWED ON THIS NOTES
<https://neon.tech/postgresql/tutorial>
