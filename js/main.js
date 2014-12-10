(function(){
  $( document ).ready(function() {
    var $body = $('body');
    
    $('.nav-primary>ul>li').on('click', function(event) {

      if ($(this).hasClass('show-child-items')) {
        $(this).removeClass('show-child-items')
      } else {
        $(this).addClass('show-child-items').siblings().removeClass('show-child-items');
      }
      
      event.preventDefault();
    });

    $('#save-plan').on('click', function(event) {
      $('#saving').css('top', 0);

      setTimeout(function() {
        $('#saving').css('top', '-100px');
        $('#saved').css('top', '0');

        setTimeout(function() {
          $('#saved').css('top', '-100px');

        }, 2000);

      }, 5000);

    })

    $('.compose-new-message').on('click', function(event) {
      $('.message-entry').removeClass('message-hidden');
      $('.message-entry textarea').focus()
    });

    $('.close-compose').on('click', function(event) {
      $('.message-entry').addClass('message-hidden');
    });

    $('.close-pane').on('click', function(event) {
      $body.removeClass('show-side-pane show-side-pane-messages show-side-pane-info');

      event.preventDefault();
    });

    $('#coaching-notification').on('click', function(event) {
      $('.tooltip').fadeIn()

      $('body').one('click', function(event) {
        $('.tooltip').fadeOut()
      })
    })

    $('.icon-user-messages').on('click', function(event) {
      if ($body.hasClass('show-side-pane-messages')) {
        $body.removeClass('show-side-pane show-side-pane-messages');
      } else {
        $body.addClass('show-side-pane show-side-pane-messages').removeClass('show-side-pane-info');
      }

      event.preventDefault();
    });

    $('.icon-user-info').on('click', function(event) {
      if ($body.hasClass('show-side-pane-info')) {
        $body.removeClass('show-side-pane show-side-pane-info');
      } else {
        $body.addClass('show-side-pane show-side-pane-info').removeClass('show-side-pane-messages');
      }

      event.preventDefault();
    });


    $('.icon-admin-nav').on('click', function() {
      $body.toggleClass('show-admin-nav');
    });

    $('.close-message').on('click', function(event) {
      $(this).parents('.message').fadeOut();
      event.preventDefault();
    });

    $('.btn-primary').on('click', function() {
      $('.messages').append('<div class="message message-admin"><div class="message-meta clearfix"><span class="left">You</span><time class="right">10:32am</time></div><div class="message-content"><a class="close-message" href="#">␡</a><p>' + $('.message-entry textarea').val() + '</p></div></div>')
      $('.message-entry textarea').val('');
      $('.messages').animate({ scrollTop: $('.messages').height() }, "slow");
    });

    $('.message-entry textarea').on('change paste keyup', function() {
      
      if ($(this).val().length) {
        $('.btn-primary').removeClass('disabled');
      } else {
        $('.btn-primary').addClass('disabled');
      }
    });

    $body.on('click', '.remove-plan-item', function() {
      $(this).parents('tr').fadeOut();
    });

    $('.plan-length .btn').on('click', function() {
      $(this).addClass('btn-primary').removeClass('btn-secondary').siblings().removeClass('btn-primary').addClass('btn-secondary');
    });

    $('.add-activities-list .add-plan-item').on('click', function() {
      $('.table-activity').append('<tr><td><img src="/img/icon-move.svg" alt="mobile actvity" /></td><td><strong>' + $(this).parent().find('strong').text() + '</strong><div>' + $(this).parent().find('p').text() + '</div></td><td><input type="text" class="plan-duration" /></td><td><div class="plan-frequency"><div class="remove-plan-item"></div></div></td></tr>')
    });

    $('.panel header').on('click', function(event) {
      var $panel = $(this).parent('.panel')

      if ($panel.hasClass('panel-open')) {
        $panel.removeClass('panel-open');
      } else {
        $panel.addClass('panel-open')
      }
    });

    if ($body.hasClass('page-plan-builder')) {
      $('.add-activities-list div').draggable({
        containment: '.page-trackers',
        helper: "clone",
        revert: 'invalid',
        scroll: true,
        over: function(e, ui) {
          $(ui.helper[0]).addClass("success");
        }
      });

      $('.table-plan tbody').sortable({
        opacity: 0.8,
        scroll: false,
        change: function(event, ui) {
          console.log(event, ui);

          // mobileDashboardStats = $('.mobile-dashboard-designer ul').sortable('toArray');
          mobileDashboardStats = [];
          $('.mobile-dashboard-designer li').each(function() {
            mobileDashboardStats.push($(this).attr('id'));
          })
          console.log(mobileDashboardStats);
          
        }
      });

      $('#search').hideseek({
        highlight: true
      });
    }

    $('#schedule-click').on('click', function() {
      $('.schedule-modal').addClass('show-modal');
    })

    // Make stat containers dropable
    // $('.table-activity').droppable({
    //   hoverClass: "ui-state-hover",
    //   drop: function(event, ui) {

    //     // var statType, 
    //     //     statVal,
    //     //     statIndex;

    //     console.log(event, ui);
    //     console.log(ui.helper.context);
    //     console.log(event.target);

    //     $('.table-activity').append('<tr><td><img src="/img/icon-move.svg" alt="mobile actvity" /></td><td><strong>' + $(ui.helper.context).find('strong').text() + '</strong><div>' + $(ui.helper.context).find('p').text() + '</div></td><td><input type="text" class="plan-duration" /></td><td><div class="plan-frequency"><div class="remove-plan-item"></div></div></td></tr>')

    //     // console.log($(ui.helper.context).data('box-type'));

    //     // statIndex = $(event.target).data('stat-index');

    //     // // Determine if dragged div is stress box or stat box
    //     // if ($(ui.helper.context).data('box-type') === 'stress') {

    //     // } else {
    //     //   // Get value of dragged stat
    //     //   statType = $(ui.helper.context).data('stat-type');
    //     //   statVal = $(ui.helper.context).data('stat-val');

    //     //   addDashboardStat(statType, statVal, statIndex);

    //     //   $(event.target).find('h3').text(statVal);
    //     //   $(event.target).find('h4').text(statType);
    //     // }


    //     // $(event.target).attr('data-stat-dropped', 'true');
    //     // $(event.target).data('stat-type', statType)
    //     // console.log(statType);
    //     // console.log(statVal);

        

    //     // console.log(dashboardStats);
    //     // $(ui.helper.context).addClass('hide-add-stat')
        
    //     // // Set value of stat in container
        
    //     // $(event.target).addClass('stat-dropped');
    //   },

    //   // Condition for accepting a drag and drop
    //   accept: function (draggable) {
    //     return true;
    //     // console.log(this);
    //     // console.log(draggable);
    //     // console.log($(this).attr("data-stat-dropped"));
    //     // // console.log($(draggable).data("stat-drop"));

    //     // if ($(this).attr('data-stat-dropped') === 'true') {
    //     //   return false;
    //     // };

    //     // // Condition for stress box
    //     // // 
    //     // // add data attr if stat box added
    //     // if ($(this).data("box-type") != null) {
    //     //   if ($(this).data("box-type") === $(draggable).data("box-type")) return true;
    //     // }
    //     // return false;
    //   }
    // });

  });
}());