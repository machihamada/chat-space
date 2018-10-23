$(function(){
  function buildHTML(message){
    if (message.content) {
      if (message.image) {
        var insertImage = `<img class="lower-message__image" src="${message.image}">`;
      } else {
        var insertImage = '';
      }
      var html =
                  ` <div class="message">
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.name}
                        </div>
                        <div class="upper-message__date">
                          <!-- = format_posted_time(message.created_at) -->
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-meesage">
                        <p class="lower-message__content">
                          ${message.content}
                        </p>
                          ${insertImage}
                      </div>
                    </div>`
      return html;
    }
  }

  function scroll_view(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
  }

  function form_reset(){
    $('#new_message')[0].reset();
  }

  var updateTime = 5000;
  setInterval(autoUpdate, updateTime);

  function autoUpdate() {

    var user_url = document.location.pathname;
    if (user_url.match(/messages/)) {
      $.ajax({
        type: 'GET',
        url: user_url,
        dataType: 'json'
      })
      .done(function(messages) {
        var user_message_number = $('.message').length;
        if(user_message_number != messages.length) {
          for (var i = user_message_number; i < messages.length; i++) {
            var html = buildHTML(messages[i]);
            $('.messages').append(html);
            form_reset();
            scroll_view();
          }
        }
      })
      .fail(function() {
        alert('error');
      });
    }
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      form_reset();
      scroll_view();

    })

    .fail(function(){
      alert('error');
    })

    .always(function(){
      $(".form__submit").removeAttr("disabled");
    })
  });
});

