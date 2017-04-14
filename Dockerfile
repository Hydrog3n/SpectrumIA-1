
FROM xataz/nginx

LABEL Description="Forn for Pente game" \
      tags="latest" \
      maintainer="hydrog3n <https://github.com/hydrog3n>"

COPY spectrum.conf /nginx/sites-enabled/
RUN mkdir -p /nginx/www/spectrum/
COPY dist/ /nginx/www/spectrum/

ENTRYPOINT ["/usr/local/bin/startup"]
CMD ["/bin/s6-svscan", "/etc/s6.d"]