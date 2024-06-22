FROM postgres:12.19-bullseye

RUN apt-get update \
    && apt-get install -y postgresql-contrib

COPY init.sql /docker-entrypoint-initdb.d/
RUN chown postgres:postgres /docker-entrypoint-initdb.d/init.sql
RUN chmod 755 /docker-entrypoint-initdb.d/init.sql