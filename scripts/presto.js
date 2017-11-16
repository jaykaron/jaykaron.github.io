var toRender = $("presto");
for(var i=0; i<toRender.length; i++)
  render(toRender[i]);

function render(anchor){
  var text = []
  if(anchor.getAttribute("p-text"))
    text = anchor.getAttribute("p-text").split("|");
  var type = anchor.getAttribute("p-type")
  addComponent(type, anchor, text, null);
}

function addComponent(type, anchor, info, component)
{
  if(!component) {
    loadComponent(type, anchor, info);
    return;
  }
  component = $.parseHTML(component);
  $(anchor).replaceWith(component);
  component = $(component);   // finds the component in the DOM
  component.addClass(anchor.className);
  
  for(var i=0; i<info.length; i++) {
    spanToReplace = component.find("#holder"+i);
    spanToReplace.replaceWith(info[i]);
  }
  
  if( type == "nav")
    navAddActive(anchor.getAttribute("p-activeI"));
}

function loadComponent(type, anchor, info){
  $.get("../../../components/"+type+".html", function(p) {
    addComponent(type, anchor, info, p); 
  }, "html");
}

function navAddActive(activeI) {
  $($("nav li")[Number.parseInt(activeI)]).addClass("active");
}
