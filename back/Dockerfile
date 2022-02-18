from alpine:3.15
workdir /back
copy Gemfile Gemfile.lock ./
run apk add build-base tzdata vim git sqlite-dev
run apk add ruby-dev=3.0.3-r0
run apk add nodejs=16.14.0-r0
run gem install bundler
run bundle install
copy ./ ./
cmd rails server -b 0.0.0.0
