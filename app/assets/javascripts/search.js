$(function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =  `
                  <div class='chat-group-user chat-group-user__add clearfix'>
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                  </div>
                  `
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `
    <div class='chat-group-user clearfix'>
    <p class='chat-group-user__name'>${user}</p>
    </div>`
    search_list.append(html);
  }
  function addChatMember(id,name) {
    var html =
                `<div class='chat-group-user chat-group-user__remove clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=${id}>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $('#user-search-result').empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
       });
     }
     else {
       appendNoUser("一致するユーザーはいません");
     }

     $(".chat-group-user__add").on("click",".user-search-add",function(){
             var id =  $(this).attr("data-user-id");
             var name = $(this).attr("data-user-name");
             $(this).parent().empty();
             addChatMember(id,name);
           });
          $(".chat-group-form__field--right").on("click",".js-remove-btn",function(){
             $(this).parent().empty();
          });
   })
    .fail(function() {
       alert('ユーザー検索に失敗しました');
    })
  });


});
