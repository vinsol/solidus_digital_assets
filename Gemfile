source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Provides basic authentication functionality for testing parts of your engine
gem 'solidus', github: 'geminimvp/solidus', branch: 'image_overrides'
gem 'solidus_auth_devise', github: 'solidusio/solidus_auth_devise'
gem 'rails', '< 5.2.1'
gem 'remotipart', '~> 1.2'
gem 'jquery-fileupload-rails', '~> 0.4.6'

group :development, :test do
  gem "pry-rails"
end

group :test do
  gem 'rails-controller-testing'
end

gemspec
