FROM jekyll/jekyll:latest

WORKDIR /srv/jekyll

COPY Gemfile Gemfile ./

RUN bundle install

EXPOSE 4000

CMD ["jekyll", "serve", "--host", "0.0.0.0"]

