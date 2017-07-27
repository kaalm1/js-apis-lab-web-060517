//define functions here
var createGist = function(file_name, content, description, token){

  alldata = {
  "description": description,
  "public": true,
  "files": {}
  }
  alldata.files[file_name] = {content: content}

  $.ajax({
  url: 'https://api.github.com/gists',
  type: 'POST',
  headers: {
    Authorization: "token " + token
  },
  data: JSON.stringify(alldata)
  }).done(function(response){
      let username = response.owner.login
      myGists(username, token)
    })
};

var myGists = function (username, token){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/gists',
    method: 'GET',
  }).done(function(response){
    li = response.map(function(r){
      return `<li> <a href= ${r.html_url} >${r.description}  </a></li>`
    }).join('')
    document.getElementsByClassName("responses").innerHTML = `<ul> ${li} </ul>`
  })
};

var bindCreateButton = function() {
  // call functions here
 $('form.gist').on('submit',function(){
   createGist(this.file_name.value, this.content.value, this.description.value, this.token.value)
   event.preventDefault()
 })

};

$(document).ready(function(){
  bindCreateButton()
});

// "8a6277ec8ad198ada27c1517cdf70455b66c2d84"
// "776fded5b8340989ef2682276c01d04c10959bcb"
