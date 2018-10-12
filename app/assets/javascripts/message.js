$(function(){
  function buildHTML(message){
    if (message.image_url) {
      var insertImage = message.image.url
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
                  </div>
                  </div>
                  <div class="lower-meesage">
                  <p class="lower-message__image">
                  ${insertImage}
                  </p>
                  </div>
                  </div>`
    return html;
  }
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
      alert('成功');
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

    })

    .fail(function(){
      alert('error');
    })

  })

});

