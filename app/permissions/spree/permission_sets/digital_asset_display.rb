module Spree
  module PermissionSets
    class DigitalAssetDisplay < PermissionSets::Base
      def activate!
        can [:admin, :display], Spree::DigitalAsset
        can [:admin, :display], Spree::Folder
      end
    end
  end
end
