Spree::Image.class_eval do

  private

  def attachment_accepted?
    no_attachment_errors
  end
end
