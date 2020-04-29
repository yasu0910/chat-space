$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="main-chat__main__message">
                <div class="message-name">
                  ${message.user_name}
                </div>
                <div class="message-date">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__main__message-text">
                <p class="main-chat__main__message-text">
                  ${message.content}
                </p>
              </div>
              <img src=${message.image} >`
          return html;
        } else {
          var html =
          `<div class="main-chat__main__message">
                <div class="message-name">
                  ${message.user_name}
                </div>
                <div class="message-date">
                  ${message.created_at}
                </div>
              </div>
              <div class="main-chat__main__message-text">
                <p class="main-chat__main__message-text">
                  ${message.content}
                </p>
              </div>`
          return html;
        };
      }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
        $('.main-chat__main').append(html);
        $('.main-chat__main').animate({ scrollTop: $('.main-chat__main')[0].scrollHeight});
        $('form')[0].reset();
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
});