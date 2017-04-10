[SolidusDigitalAssets](https://github.com/vinsol/solidus_digital_assets)
==================

Solidus Port of [SpreeDigitalAssets](https://github.com/vinsol-spree-contrib/spree_digital_assets).

This gem allows you to have a central repository of your store's assets. The assets can be uploaded
in advance and can be associated with the products/variants at the time of product/variant
creation.

This will also act as a central repository that can be used to access all the assets of the system
and can then be used in different products.

## Features

* Has default folders “Documents”, “Photos” and “Graphics”

* Assets can be uploaded to each folder by using the upload feature

* Ability to view assets in List view

* Excellent UI

* Ability to remove / edit / download each asset

* Associate assets while creating product / variant


Installation
------------

Add solidus_digital_assets to your Gemfile:

```ruby
gem solidus_digital_assets', github: 'vinsol/solidus_digital_assets'
```

Bundle your dependencies and run the installation generator:

```shell
bundle
bundle exec rails g solidus_digital_assets:install
bundle exec rails g solidus_digital_assets:seed
```

Testing
-------

First bundle your dependencies, then run `rake`. `rake` will default to building the dummy app if it does not exist, then it will run specs. The dummy app can be regenerated by using `rake test_app`.

```shell
bundle
bundle exec rspec spec
```

When testing your applications integration with this extension you may use it's factories.
Simply add this require statement to your spec_helper:

```ruby
require 'solidus_digital_assets/factories'
```

Screenshots
-----------
![Root Folder](/Screenshots/1.png?raw=True "Root Folder")

![Asset Folder](/Screenshots/2.png?raw=True "Asset Folder")

![Associate Asset](/Screenshots/3.png?raw=True "Associate Asset")

Credits
-------

[![vinsol.com: Ruby on Rails, iOS and Android developers](http://vinsol.com/vin_logo.png "Ruby on Rails, iOS and Android developers")](http://vinsol.com)

Copyright (c) 2016 [vinsol.com](http://vinsol.com "Ruby on Rails, iOS and Android developers"), released under the New MIT License
