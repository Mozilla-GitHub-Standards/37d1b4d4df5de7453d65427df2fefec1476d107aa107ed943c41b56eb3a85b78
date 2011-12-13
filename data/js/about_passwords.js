
function setLoginInfo(loginInfo) {
  about.console.log("setLoginInfo");
  var scores = loginInfo.scores;
  var scoreEl = $("#overall-score");
  scoreEl.text(scores.overall);
  if (scores.overall > 80) { 
    scoreEl.addClass("strong"); 
  } else if (scores.overall > 50) { 
    scoreEl.addClass("medium") 
  } else { 
    scoreEl.addClass("weak"); 
  }
  if (scores.avg_strength > 80) {
    $("#avg-strength").text("high ("+scores.avg_strength+")");
    $("#avg-strength").addClass("strong");
  }
  else if (scores.avg_strength > 50) {
    $("#avg-strength").text("medium ("+scores.avg_strength+")");
    $("#avg-strength").addClass("medium");
  }
  else {
    $("#avg-strength").text("low ("+scores.avg_strength+")");
    $("#avg-strength").addClass("weak");
  }
  $("#num-duplicates").text(scores.duplicates);
  $("#num-similar").text(scores.similarity);
  $("#num-unsecure").text(scores.unsecure);
  $("#num-old").text(scores.over_ninty);
  $("#total-logins").text(scores.logins);


  $("#logins-list").empty();
  $("#logins-tmpl").tmpl({logins: loginInfo.logins}).appendTo("#logins-list");
  
  // hookup our popovers
  $('span[type="shared"]').popover({
    placement: 'below',
    title: function() 'Shared Passwords',
    html: true,
    content: function() {
      var dups = $(this).attr('data').split(',');
      var l = dups.pop()
      var t = dups.join(', ') + ' and ' + l;
      return "The following websites use the same password: <strong>"+t+"</strong>.  "+
        "If any one of these sites has a security problem, all of these "+
        "sites could be compromised.  You should change the passwords "+
        "on all of these sites as soon as possible.";
    }
  });

  $('span[type="similar"]').popover({
    placement: 'below',
    title: function() 'Similar Passwords',
    html: true,
    content: function() {
      var dups = $(this).attr('data').split(',');
      var l = dups.pop()
      var t = dups.join(', ') + ' and ' + l;
      return "This site uses a password that is similar to the passwords used on <strong>"+t+"</strong>";
    }
  });

  $('span[type="unsecure"]').popover({
    placement: 'below',
    title: function() 'Unsecured Passwords',
    content: function() {
      return "The password for this site is used unencrypted.  Eavesdroppers can view your password when you login to the site.";
    }
  });

  $('span[type="over_90"]').popover({
    placement: 'below',
    title: function() 'Old Passwords',
    content: function() {
      return "You have not changed the password on this site in a very long time.";
    }
  });

  $('span[type="weak_password"]').popover({
    placement: 'below',
    title: function() 'Weak Passwords',
    content: function() {
      return "The password on this site is too simple, you should change the password to something more complex as soon as possible.";
    }
  });

  $('span[type="medium_password"]').popover({
    placement: 'below',
    title: function() 'Moderately Strong Passwords',
    content: function() {
      return "The password on this site may be too simple, you should consider changing it to a more complex password.";
    }
  });

  $('span[type="strong_password"]').popover({
    placement: 'below',
    title: function() 'Congratulations!',
    content: function() {
      return "The password on this site is pretty strong, but that doesn't mean you're safe.  You should consider changing the password every few months.";
    }
  });

  $('span[type="host"]').hover(function() {
    var host = $(this).attr('data');
    var l = loginInfo.logins[host];
    about.console.log(JSON.stringify(l));
    return JSON.stringify(l);
  });
}

$(document).ready(function() {
  about.ready();
  about.console.log("about is loaded");
});