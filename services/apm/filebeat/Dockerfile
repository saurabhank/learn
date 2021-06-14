FROM docker.elastic.co/beats/filebeat:7.13.1
COPY filebeat.yml /usr/share/filebeat/filebeat.yml

USER root
RUN yum install net-tools -y
RUN chmod go-w /usr/share/filebeat/filebeat.yml
RUN chown root:filebeat /usr/share/filebeat/filebeat.yml
USER filebeat
#RUN filebeat setup -e