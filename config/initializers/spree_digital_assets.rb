Spree::Backend::Config.configure do |config|
  config.menu_items << config.class::MenuItem.new(
    [:digital_assets],
    'image',
    condition: -> { can?(:admin, Spree::Product) }
  )
end
