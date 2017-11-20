var anchors = $("presto");
for(var i=0; i<anchors.length; i++)
  render(anchors[i]);

function render(anchor) {
  // Extracts info from the anchor and passes it to addComponent
  
  var children = $(anchor).children();
  
  var text = [];
  if(anchor.getAttribute("p-text"))
    text = anchor.getAttribute("p-text").split("|");
  
  var type = anchor.getAttribute("p-type")
  
  addComponent(type, anchor, children, text, null);
}

function addComponent(type, anchor, children, text, component)
{
  if(!component) {  // loop until component loads
    loadComponent(type, anchor, children, text);
    return;
  }
  
  // replace <presto>
  component = $.parseHTML(component);
  $(anchor).replaceWith(component);
  
  component = $(component);   // finds the component in the DOM

  component.find("center").replaceWith(children);
  component.addClass(anchor.className);
  
  for(var i=0; i<text.length; i++) {
    spanToReplace = component.find("#holder"+i);
    spanToReplace.replaceWith(text[i]);
  }
  
  if( type == "nav")
    navAddActive(anchor.getAttribute("p-activeI"));
}

function loadComponent(type, anchor, children, text){
  $.get("../../../components/"+type+".html", function(comp) {
    addComponent(type, anchor, children, text, comp); 
  }, "html");
}

function navAddActive(activeI) {
  $($("nav li")[Number.parseInt(activeI)]).addClass("active");
}
