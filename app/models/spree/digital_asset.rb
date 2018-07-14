SUPPORTED_IMAGE_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif", "image/bmp"]
SUPPORTED_IMAGES_REGEX = Regexp.new('\A(' + SUPPORTED_IMAGE_FORMATS.join('|') + ')\Z')

module Spree
  class DigitalAsset < Asset

    self.table_name = "spree_digital_assets"

    belongs_to :folder
    has_many :assets

    has_attached_file :attachment, 
                      styles: { mini: '48x48>', small: '100x100>', product: '240x240>', large: '600x600>' },
                      default_style: :product,
                      default_url: 'noimage/:style.png',
                      url: '/spree/digital_assets/:id/:style/:basename.:extension',
                      path: ':rails_root/public/spree/digital_assets/:id/:style/:basename.:extension',
                      convert_options: { all: '-strip -auto-orient -colorspace sRGB' }

    do_not_validate_attachment_file_type :attachment

    validates :name, :attachment, :folder, presence: true

    before_post_process :image?
    before_validation :assign_default_name, on: :create
    
    attr_accessor :position
    
    private
      def image?
        (attachment_content_type =~ SUPPORTED_IMAGES_REGEX).present?
      end

      def assign_default_name
        self.name = File.basename(attachment_file_name.to_s, '.*').titleize.truncate(255) if name.blank?
      end
  end
end
