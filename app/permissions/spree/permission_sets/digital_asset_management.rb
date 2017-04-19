module Spree
  module PermissionSets
    class DigitalAssetManagement < PermissionSets::Base
      def activate!
        can [:admin, :manage], Spree::DigitalAsset
        can [:admin, :manage], Spree::Folder
      end
    end
  end
end
