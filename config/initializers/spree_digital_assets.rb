Spree::Backend::Config.configure do |config|
  config.menu_items << config.class::MenuItem.new(
    [:digital_assets],
    'image',
    condition: -> { can?(:admin, Spree::DigitalAsset) }
  )
end

Spree::Config.roles.assign_permissions :admin, [Spree::PermissionSets::DigitalAssetDisplay,
                                                Spree::PermissionSets::DigitalAssetManagement]
