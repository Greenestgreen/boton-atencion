

var socket = io();

if (Notification.permission !== "denied") {
  Notification.requestPermission();
}


function notifyMe(task) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    console.log(task);
    // If it's okay let's create a notification
    if (task.img) {
      task.img = 'https://i.imgur.com/NVx6k3C.png'
    }
    var img = task.img;
    var text = task.task;
    //var notification = new Notification('To do list', { body: text, icon: img });
    var notification = new Notification(task.name, { body: text, icon:img })
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        notifyMe(task);
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

var params = $.deparam(window.location.search);

socket.on('connect', function() {

   socket.emit('join',params, function(err){
     if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }
   });
});

socket.on('updateUserList',function (users) {
  users = users.filter(function(name){
    return  name !== params.name;
  });


  var usersArray = {
    'users': users
  };
  var template = $('#users-template').html();
  var html = Mustache.render(template,usersArray);

  $('#users').html(html);
});

socket.on('newRequest',function (task) {
  console.log(task);
  notifyMe(task);
});




$('#users').on('click', 'a', function() {

  var name = $(this).attr("rel");
  var task = $(this).attr("task");

  socket.emit('createRequest', {
    name: name,
    task: task
  }, function(){

  });
});
