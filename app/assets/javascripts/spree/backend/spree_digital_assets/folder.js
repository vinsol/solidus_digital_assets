var Folder = function (selectors) {
  this.folderAssetsContainer = selectors.folderAssetsContainer;
  this.folderArea = selectors.folderArea;
  this.treeMenuContainer = selectors.treeMenuContainer;
  this.wrapper = selectors.wrapper;
  this.body = selectors.body;
  this.buttonGroup = selectors.buttonGroup;
  this.modificationContent = selectors.modificationContent;
};

Folder.prototype.init = function () {
  var _this = this;

  this.body.find('#admin_new_folder').on('click', function() {
    _this.addFolderSetup($(this));
  });

  this.wrapper.on('click', 'a.rename-folder', function() {
    _this.renameFolderSetup($(this));
  });

  this.wrapper.on('click', '.folder-area .folder-image', function() {
    _this.openFolder($(this));
  });

  this.wrapper.on('click', '.modal input[type="submit"]', function(event) {
    event.preventDefault();
    $.ajax(_this.getRequestParams($(this)));
  });
};

Folder.prototype.addFolderSetup = function (link) {
  this.removeName();
  this.changeFormForCreate();
};

Folder.prototype.renameFolderSetup = function (link) {
  var dataLink = link.closest('.folder-area').find('.folder-link');
  this.addName(dataLink);
  this.removeParentId();
  this.changeFormForUpdate(dataLink);
};

Folder.prototype.createFolder = function (data) {
  var $folderElement = $('.add-sidebar-folder').clone().removeClass('add-sidebar-folder hide');
  this.addAttributes($folderElement, data);
  return $folderElement;
};

Folder.prototype.openFolder = function (folderImage) {
  folderImage.closest('.folder-area').find('.folder-link').click();
};

Folder.prototype.addAttributes = function (element, data) {
  element.find('a.delete-folder').attr('href', '/admin/folders/' + data['id']);
  element.find('a.sidebar-default-font')
    .attr('data-id', data['id'])
    .attr('href', '/admin/digital_assets?folder_id=' + data['id'])
    .text(data['name']);
};

Folder.prototype.getRequestParams = function (link) {
  var _this = this;
  return {
    'url': this.wrapper.find('.modal #new_folder_form').attr('action'),
    'method': this.wrapper.find('.modal #new_folder_form').attr('method'),
    'dataType': 'JSON',
    'data': {
      'utf8': this.wrapper.find('.modal #new_folder_form').find('[name="utf8"]').val(),
      'authenticity_token': this.wrapper.find('.modal #new_folder_form').find('[name="authenticity_token"]').val(),
      'commit': link.val(),
      'folder': this.getFolderAttributes()
    },
    success: function(data) {
      _this.wrapper.find('.modal').modal('hide').data('bs.modal', null);
      _this.addNewFolderToCurrentFolder(data['folder']);
    }
  };
};

Folder.prototype.getFolderAttributes = function () {
  var parentFolderId = this.wrapper.find('.modal #new_folder_form').find('.parent_id').val();
  var folderAttributes = {
    'name': this.wrapper.find('.modal #new_folder_form').find('#folder_name').val()
  };
  if(parentFolderId) {
    folderAttributes['parent_id'] = parentFolderId;
  }
  return folderAttributes;
};

Folder.prototype.addNewFolderToCurrentFolder = function (data) {
  var folderHTML = this.createCenterContainerFolderArea(data);
  this.wrapper.find('#folder_assets').append(folderHTML);
};

Folder.prototype.createCenterContainerFolderArea = function (data) {
  var $folderArea = this.modificationContent.find('.folder-area').clone();
  var folderUrl = '/admin/digital_assets?folder_id=' + data['id'];
  var folderDeleteUrl = '/admin/folders/' + data['id'];
  $folderArea.find('a.folder-link')
    .attr('data-id', data['id'])
    .attr('href', folderUrl)
    .text(data['name']);

  $folderArea
    .find("a[data-method='delete']")
    .attr('href', folderDeleteUrl);

  return $folderArea;
};

Folder.prototype.removeName = function () {
  this.wrapper.find('.modal').find('#folder_name').val('');
};

Folder.prototype.addName = function (link) {
  var folderName = link.text();
  this.wrapper.find('.modal').find('#folder_name').val(folderName);
};

Folder.prototype.changeFormForUpdate = function (link) {
  var folderId = link.data('id');
  this.wrapper.find('.modal #myModalLabel').text('Update Folder');
  this.wrapper.find('.modal #new_folder_form').attr('action', "/admin/folders/" + folderId);
  this.wrapper.find('.modal #new_folder_form').attr('method', 'put');
  this.wrapper.find('.modal #new_folder_form').find('input[type="submit"]').val('Update Folder');
};

Folder.prototype.changeFormForCreate = function () {
  this.wrapper.find('.modal #myModalLabel').text('Add New Folder');
  this.wrapper.find('.modal #new_folder_form').attr('action', "/admin/folders/");
  this.wrapper.find('.modal #new_folder_form').attr('method', 'post');
  this.wrapper.find('.modal #new_folder_form').find('input[type="submit"]').val('Create Folder');
};

$(function () {
  var selectors = {
    folderAssetsContainer: $('#folder_assets'),
    folderArea: $('.folder-area'),
    treeMenuContainer: $('div.tree-menu-container'),
    wrapper: $('#wrapper'),
    body: $('body'),
    buttonGroup: $('.btn-group'),
    modificationContent: $('.modification-content')
  };
  var folder = new Folder(selectors);
  folder.init();
});
