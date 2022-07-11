//create a web extension that will cite the website/journal

//open side bar
function handleClick() {
  browser.sidebarAction.open();
}

//retrieve info from webpage
document.getElementById('btnretrieve').onclick = function(){
  
  //get author name
  var author = "";
  var other = document.getElementsByTagName('li');
  for (var i=0;i<other.length;i++) {
    if (other[i].className.toLowerCase()=='author') author=other[i].getElementsByTagName('a')[0].innerHTML;
  }
  document.getElementById('lname').value = author;

  //get page year


  //get page name
  browser.tabs.query({active: true, currentWindow: true})
    .then(tabs => {
      let tab = tabs[0]; // Safe to assume thesre will only be one result
      document.getElementById('pname').value = tab.title;
    })

  //get page url
  browser.tabs.query({currentWindow: true, active: true})
    .then((tabs) => {
      let tab = tabs[0]; // Safe to assume thesre will only be one result
      document.getElementById('purl').value = tab.url;
  }, console.error)

}


//generate formatted referencing
document.getElementById('btngenerate').onclick = function(){
  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;
  var webyear = document.getElementById('year').value;
  var webtitle = document.getElementById('pname').value;
  var weburl = document.getElementById('purl').value;

  if (webtitle !== "" && weburl !== ""){
    if (fname !== "")
      //get the initial of first name if not empty
      var fnameChar = fname.charAt(0);

    if (lname == "")
      //set anonymous if last name is empty
      lname = "Anonymous";
    
    if (webyear == "")
      //set unknown year if year is empty
      webyear = "n.d.";

    //get today's date
    const todayDate = new Date();
    todayDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    

    //print standard referencing
    var referencing = lname + ", " + fnameChar + ". (" + webyear + ") " + webtitle + ". Available at: " + weburl + " (Accessed: " + todayDate + ").";
    document.getElementById('biblo').value = referencing;

    //print intext citation
    var intext = "(" + lname + ", " + webyear + ")";
    document.getElementById('intext').innerHTML = intext;


  }else{
    //remind user to inser title and url
    alert("Page title and URL is empty");
  }

}

//open side bar
browser.browserAction.onClicked.addListener(handleClick);
  