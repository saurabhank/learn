FROM docker.elastic.co/apm/apm-server:7.12.1
COPY apm-server.yml /usr/share/apm-server/apm-server.yml
USER root
RUN chown root:apm-server /usr/share/apm-server/apm-server.yml
RUN yum install net-tools -y
RUN chmod go-w /usr/share/apm-server/apm-server.yml
USER apm-server
