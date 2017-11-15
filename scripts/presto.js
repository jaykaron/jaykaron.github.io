var toRender = $("presto");
for(var i=0; i<toRender.length; i++)
  render(toRender[i]);

function render(item){
  var text = []
  if(item.getAttribute("data-text"))
    text = item.getAttribute("data-text").split("|");
  addComponent(item.getAttribute("data-type")+".html", item, text, null);
}

function addComponent(sourceFile, anchor, info, component)
{
  if(!component) {
    loadComponent("../../../components/"+sourceFile, anchor, info);
    return;
  }
  component = $.parseHTML(component);
  $(anchor).replaceWith(component);
  component = $(component);   // finds the component in the DOM
  console.log(anchor.className);
  component.addClass(anchor.className);
  
  for(var i=0; i<info.length; i++) {
    spanToReplace = component.find("#holder"+i);
    spanToReplace.replaceWith(info[i]);
  }
}

function loadComponent(sourceFile, anchor, info){
  $.get(sourceFile, function(data) {
    addComponent(sourceFile, anchor, info, data); 
  }, "html");
}
